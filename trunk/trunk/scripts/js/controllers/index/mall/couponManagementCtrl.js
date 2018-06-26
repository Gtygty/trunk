define(['indexApp'
        , 'common/util'
        , 'common/const'
        , 'model/mall/CouponModel'
        , 'service/baseService'
        , 'service/mall/couponService'
        , 'timePicker'], function (app, util, Const, vModel,ajaxService) {
  app.controller('couponManagementCtrl', function ($scope,$http,signValid,couponService) {

    ($scope.vm = {
      Common: {
        Init: function(){
          signValid.ValidAccess('#/couponManagement');                                           // 缓存登录验证
          $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
          $('body').css('overflow', 'auto');

        }
      },
      couponManagement:{
          AllChecked: false,
          List:[],
          BatchState:{
            Ids: [],
            State: 0,
          },
          Search:{ 'PageNum': 1,'Count': 10,'CouponTitle': "",'CouponState':-1},
          Current:{
              'CouponTitle':'', //通用卷名称
              'CouponDescription':'', //使用说明
              'Total':'', //发行总量
              'Amount':'', //面值
              'DueTime':'', //订单相对过期时间
              'OrderTypes':[], //订单类型 1：体检套餐类型订单
              'OrderPrice':'', //订单价格下限
              'GoodsType':[], //商品类型　0：体检套餐类型商品 1：实体类型商品 2：服务类型商品
              'StartDate':'', //开始时间
              'EndDate':'' ,//结束时间,
              'StartTime': '',
              'EndTime': ''
          },
          Tag:{
              goodsTypeDDL:[
              { text: '体检套餐', value: 0, checked: false },
              { text: '实物商品', value: 1, checked: false },
              { text: '虚拟产品', value: 2, checked: false }
            ],
              orterTypeDDL:[
              { text: '体检套餐', value: 1, checked: false }
            ]
          },
          TempViewData:'',//临时存放的详情数据
          ReceiveList:[],
          ComsumList:[],
          OnClickAllChecked: function(){
            var da = $scope.vm.couponManagement;

            for(var i=0; i< da.List.length; i++){
              var item = da.List[i];
              item.IsChecked = da.AllChecked;
            }
          },
          OnLoad:function(){//初始化加载数据
              var params = {
                  'PageNum': $scope.vm.couponManagement.pageConfig.currentPage,
                  'Count': $scope.vm.couponManagement.pageConfig.itemsPerPage,
                  'CouponTitle': $scope.vm.couponManagement.Search.CouponTitle,
                  'CouponState': $scope.vm.couponManagement.Search.CouponState
              };
              couponService.Coupon.List({
                params:params,
                callback: function(result,TotalCount){
                    $scope.vm.couponManagement.List = result;
                    $scope.pageConfig = $scope.vm.couponManagement.pageConfig;
                    $scope.pageConfig.totalItems = TotalCount;
                }
              });

          },
          OnOpenAddDiaolog:function(){   //添加通用卷弹框
              var Current={ 'CouponTitle':'', 'CouponDescription':'','Total':'','Amount':'','DueTime':'','OrderTypes':[],
                            'OrderPrice':'','GoodsType':[], 'StartDate':'','EndDate':''};
              goodsTypeDDL=[{ text: '体检套餐', value: 0, checked: false }
                            ,{ text: '实物商品', value: 1, checked: false }
                            ,{ text: '虚拟产品', value: 2, checked: false }],
              orterTypeDDL=[{ text: '体检套餐', value: 1, checked: false }]
              $scope.vm.couponManagement.Tag.goodsTypeDDL = goodsTypeDDL;
              $scope.vm.couponManagement.Tag.orterTypeDDL = orterTypeDDL;
              $scope.vm.couponManagement.Current = Current;
              $('#addOrEditCoupon').modal('show');
          },
          OnAdd: function(){
              couponService.Coupon.Add({
                params:$scope.vm.couponManagement.Current,
                orderTypeDDL:$scope.vm.couponManagement.Tag.orterTypeDDL,
                goodsTypeDDL:$scope.vm.couponManagement.Tag.goodsTypeDDL,
                callback: function(result){
                  $scope.vm.couponManagement.OnLoad();
                  $('#addOrEditCoupon').modal('hide');
                }
              });
          },
          OnDismiss: function(){
              var Current={ 'CouponTitle':'', 'CouponDescription':'','Total':'','Amount':'','DueTime':'','OrderTypes':[],
                            'OrderPrice':'','GoodsType':[], 'StartDate':'','EndDate':''};
              $scope.vm.couponManagement.Current = Current;
          },
          OnGetList: function(state){
              $scope.vm.couponManagement.AllChecked = false;//全选框重新赋值为空
              $scope.vm.couponManagement.Search.CouponState = state;
              $scope.vm.couponManagement.OnLoad();
          },
          OnSearchClick: function(){

              $scope.vm.couponManagement.OnLoad();
          },
          OnBatchStateDialog: function(Event, state){
              var da = $scope.vm.couponManagement,
                  list = da.List,
                  tempData = [];
              for(var i=0; i< list.length; i++){
                  if(list[i].IsChecked) tempData.push(list[i].Id);
              }
              if(tempData.length == 0){
                  util.showFade('请选择您要操作的项!');
                  Event.stopPropagation();
                  return;
              }
              angular.extend(da.BatchState, {
                Ids: tempData,
                State: state
              });
          },
          OnBatchStateUpOrDown: function(){
              var da = $scope.vm.couponManagement;

              couponService.Coupon.SetState({
                param: {
                    "Ids": da.BatchState.Ids,
                    "State": da.BatchState.State
                },
                callback: function(){
                  util.showFade('操作成功!');
                  angular.extend(da.BatchState, {
                    'Ids': [],
                    'State': 0
                  });
                  $scope.vm.couponManagement.OnLoad();
                }
              });
          },
          OnUpOrDown: function(item,state){
            var da = $scope.vm.couponManagement;

            couponService.Coupon.SetState({
              param: {
                  "Ids": [
                    item.Id
                  ],
                  "State": state
              },
              callback: function(){
                util.showFade('操作成功!');
                  $scope.vm.couponManagement.OnLoad();
              }
            });
          },
          OnGetViewData: function(){
              $scope.vm.couponManagement.Current = $scope.vm.couponManagement.TempViewData;
              couponService.Coupon.GetData({
                param: {
                    "itemOrderTypes": $scope.vm.couponManagement.Current.OrderTypes,
                    "itemGoodsType":$scope.vm.couponManagement.Current.GoodsType,
                    "orterTypeDDL":$scope.vm.couponManagement.Tag.orterTypeDDL,
                    "goodsTypeDDL":$scope.vm.couponManagement.Tag.goodsTypeDDL
                },
                callback: function(tempData){
                    $scope.vm.couponManagement.Tag.orterTypeDDL = tempData[0];
                    $scope.vm.couponManagement.Tag.goodsTypeDDL = tempData[1];
                }
              });

          },
          OnGetReceiveList: function(){//获取领取记录
            item = $scope.vm.couponManagement.TempViewData;
            couponService.Coupon.OnGetReceiveList({
                  param: {
                      "PageNum": $scope.vm.couponManagement.receivePageConfig.currentPage,
                      "Count":$scope.vm.couponManagement.receivePageConfig.itemsPerPage,
                      "CouponId":item.Id
                  },
                  callback: function(result,TotalCount){
                      $scope.vm.couponManagement.ReceiveList = result;
                      $scope.receivePageConfig = $scope.vm.couponManagement.receivePageConfig;
                      $scope.receivePageConfig.totalItems = TotalCount;
                  }
              });
          },
          OnGetComsumList: function(){//获取消费记录
            item = $scope.vm.couponManagement.TempViewData;
            couponService.Coupon.OnGetComsumList({
                  param: {
                      "PageNum": $scope.vm.couponManagement.comsumPageConfig.currentPage,
                      "Count":$scope.vm.couponManagement.comsumPageConfig.itemsPerPage,
                      "CouponId":item.Id
                  },
                  callback: function(result,TotalCount){
                      $scope.vm.couponManagement.ComsumList = result;
                      $scope.comsumPageConfig = $scope.vm.couponManagement.comsumPageConfig;
                      $scope.comsumPageConfig.totalItems = TotalCount;
                  }
              });

          },
          //TODO
          OnViewDialog: function(item){
              var activeBanner = $("#navTab li");
              activeBanner.attr('class','');
              activeBanner.eq(0).attr('class','active')
              $('#tabone').attr('class','');
              $('#tabtwo').attr('class','');
              $('#tabthree').attr('class','');
              $('#tabone').attr('class','tab-pane tabPan active');
              $('#tabtwo').attr('class','tab-pane tabPan');
              $('#tabthree').attr('class','tab-pane tabPan');

              $scope.vm.couponManagement.TempViewData = item;
              $scope.vm.couponManagement.OnGetViewData();
              $('#viewDetail').modal('show');
          },
          //分页参数
          receivePageConfig: {
              totalItems: 0,
              currentPage: 1,    //当前所在的页
              itemsPerPage: 10,  //每页展示的数据条数
              pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
              perPageOptions: [10, 20, 30, 40, 50],    //可选择显示条数的数组
              rememberPerPage: 'couponPerPage',  //使用LocalStorage记住所选择的条目数的名称
              onChange: function () {
              if ($scope.vm.couponManagement.pageConfig.currentPage != 0 ) {
                $scope.vm.couponManagement.OnGetReceiveList();
              }
            }
          },
          //分页参数
          comsumPageConfig: {
              totalItems: 0,
              currentPage: 1,    //当前所在的页
              itemsPerPage: 10,  //每页展示的数据条数
              pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
              perPageOptions: [10, 20, 30, 40, 50],    //可选择显示条数的数组
              rememberPerPage: 'couponPerPage',  //使用LocalStorage记住所选择的条目数的名称
              onChange: function () {
              if ($scope.vm.couponManagement.pageConfig.currentPage != 0 ) {
                $scope.vm.couponManagement.OnGetComsumList();
              }
            }
          },
          //分页参数
          pageConfig: {
              totalItems: 0,
              currentPage: 1,    //当前所在的页
              itemsPerPage: 10,  //每页展示的数据条数
              pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
              perPageOptions: [10, 20, 30, 40, 50],    //可选择显示条数的数组
              rememberPerPage: 'couponPerPage',  //使用LocalStorage记住所选择的条目数的名称
              onChange: function () {
              if ($scope.vm.couponManagement.pageConfig.currentPage != 0 ) {
                $scope.vm.couponManagement.OnLoad();
              }
            }
          }
      },
      Init: function(){
          $scope.vm.Common.Init();

          $scope.vm.couponManagement.OnLoad();
      }
    }).Init();

  });
  return app;
});
