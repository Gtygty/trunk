define([  'indexApp'
        , 'common/util'
        , 'model/simpleServiceManagementModel'
        , 'service/baseService'
        , 'service/mall/groupAppointManageService'
        , 'timePicker'], function (app, util, vModel) {
  app.controller('simpleServiceManagementCtrl', function ($scope,$http,signValid,ajaxService) {
    
    var Base={
        OrderList: "BMSPromoteOrder/GetPromoteOrderRootList",//获取订单列表
        RemarkDetail: "BMSPromoteOrder/ModifyTelReportServiceRemark",//获取remark
        PushRefundMessage: "BMSPromoteOrder/PromoteOrderSetOrderRefund",//退款通知
    };

    
    
    ($scope.vm = {

      //通用操作
      Common: {
        Init: function(){
          signValid.ValidAccess('#/simpleServiceManagement');// 缓存登录验证
          $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
          $('body').css('overflow', 'auto');

          //初始化时间搜索框
          startDateTextBox = $('#startDate');
          endDateTextBox = $('#endDate');
          $.timepicker.dateRange(
            startDateTextBox,
            endDateTextBox,
            {
              changeMonth: true,
              buttonImageOnly: true,
              dateFormat: 'yy/mm/dd',
              monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
              minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
            }
          );
          //分页参数
          $scope.pageConfig =  {
            totalItems: 0,
            currentPage: 1,    //当前所在的页
            itemsPerPage: 10,  //每页展示的数据条数
            pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
            perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
            rememberPerPage: 'SimpleServiceManagementPerPage',  //使用LocalStorage记住所选择的条目数的名称
            onChange: function () {
              if ($scope.pageConfig.currentPage != 0 ) {
                $scope.vm.simpleServiceManagement.OnSearch();
              }
            }
          }
        }
      },
      //团检管理模块
      simpleServiceManagement:{
          //批量操作
          SelectedBatchAppointment:-1,
          //模块数据
          data:{
            checkedAll:false,
            orderList:[],//当前显示的列表信息

            orderType:[
              { Text: '--全部--', Value:-1000 },
              { Text: '待支付', Value:1000 },
              { Text: '已支付', Value:2000 },
              { Text: '已完成', Value:3000 },
            ],

            goodsName:[
              { Text: '--全部--', Value:-100 },
              { Text: '中医服务', Value:1 },
              { Text: '电话报告解读', Value:2 },
              { Text: '心理咨询', Value:3 },
              { Text: '专项解读', Value:4 },
            ],

            searchParams: {
              OrderId: "",
              OrderType: -100,
              GoodsName: "",
              OrderState: -1000,
              Mobile: "",
              StartTime: "",
              EndTime: ""
            },
            editingOrder: {},
          },
          //清除按钮
          Onclear:function(){
            //搜索框值重置
            $scope.vm.simpleServiceManagement.data.searchParams = {
                OrderId: "",
                OrderType: -100,
                OrderState: -1000,
                Mobile: "",
                StartTime: "",
                EndTime: ""
            };
            //时间框重置
            startDateTextBox[0].value = "";
            endDateTextBox[0].value = "";
          },
          //搜索按钮
          OnSearchClick:function() {
            $scope.vm.simpleServiceManagement.OnSearch();
          },
          OnSearch:function(){
            var ag = $scope.vm.simpleServiceManagement.data.searchParams;
                ag.PageNum = $scope.pageConfig.currentPage;
                ag.Count = $scope.pageConfig.itemsPerPage;
                if (ag.PageNum == 0) {
                  ag.PageNum = 1;
                }
                if ($('#startDate').val()) {
                  ag.StartTime = $('#startDate').val() + ' ' + '00:00:00';
                }else{
                  ag.StartTime = "";  
                }
                if ($('#endDate').val()) {
                  ag.EndTime = $('#endDate').val() + ' ' + '23:59:59';
                }else{
                  ag.EndTime = "";  
                }
            var param = $scope.vm.simpleServiceManagement.data.searchParams;
            var url = Base.OrderList;
            ajaxService.PostMall(url,param,function(result) {
              $scope.pageConfig.totalItems = result.Counts;
              var viewModel = new vModel();
              var page = $scope.pageConfig.currentPage==0?1:$scope.pageConfig.currentPage;
              var pageCount = $scope.pageConfig.itemsPerPage;
              var showDataArr = [];
              var endPage = ((page - 1) * pageCount + pageCount - 1)>result.Counts?result.Counts:((page - 1) * pageCount + pageCount);
              for (var i = (page - 1) * pageCount; i < endPage; i++) {
                if (i < result.Counts) {
                  showDataArr.push(result.PromoteOrders[i]);
                }
              }
              $scope.vm.simpleServiceManagement.data.orderList = viewModel.convertOrderList(showDataArr);
            });
          },
          //导出excel表格
          OnExportCSV:function(){
            var tempArr = [];
            for (var i = 0; i < $scope.vm.simpleServiceManagement.data.orderList.length; i++) {
              if ($scope.vm.simpleServiceManagement.data.orderList[i].Checked) {
                tempArr.push($scope.vm.simpleServiceManagement.data.orderList[i])
              }
            }
            if (tempArr.length == 0) {
              util.showFade('请选择你要导出的订单！');
              return;
            }
            var sourceData = [];
            var columnNameList = ["订单编号","商品名称","买家手机号","下单日期","支付单号","支付价格","订单状态","备注"];
            tempArr.forEach(function(item, index, array){
              sourceData.push({
                "orderId":"\t"+item.orderId,
                "goodsName":item.goodsName,
                "mobile":"\t"+item.mobile,
                "orderTime":item.orderTime,
                "payId":"\t"+item.payId,
                "payAmount":"\t"+item.payAmount,
                'payState': item.payState,
                'remark': item.remark
              })
            })
            util.CreateCSV(columnNameList, sourceData);
          },
          //初始化加载页面
          OnLoad:function(){
              var param = $scope.vm.simpleServiceManagement.data.searchParams;
              var url = Base.OrderList;
              ajaxService.PostMall(url,param,function(result) {
                  $scope.pageConfig.totalItems = result.Counts;
                  var viewModel = new vModel();
                  var page = $scope.pageConfig.currentPage==0?1:$scope.pageConfig.currentPage;
                  var pageCount = $scope.pageConfig.itemsPerPage;
                  var showDataArr = [];
                  var endPage = ((page - 1) * pageCount + pageCount - 1)>result.Counts?result.Counts:((page - 1) * pageCount + pageCount);
                  for (var i = (page - 1) * pageCount; i < endPage; i++) {
                    if (i < result.Counts) {
                      showDataArr.push(result.PromoteOrders[i]);
                    }
                  }
                  $scope.vm.simpleServiceManagement.data.orderList = viewModel.convertOrderList(showDataArr);
              });
          },
          OnModifyRemarkDialog: function (item) {
            $scope.vm.simpleServiceManagement.data.editingOrder = item;
            $('#RemarkDialog').modal('show');   
          },
          OnModifyRemark: function () {
            var item = $scope.vm.simpleServiceManagement.data.editingOrder;
            var params = {
              OrderId: item.orderId,
              Remark: $scope.vm.simpleServiceManagement.data.editingOrder.remark
            };
            var url = Base.RemarkDetail;
             util.ajaxMALLPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                $scope.vm.simpleServiceManagement.OnSearch();
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
              $('#RemarkDialog').modal('hide');
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },
          OnPushRefundMessage: function (item) {
            var params = {
              OrderId: item.orderId
            };
            var url = Base.PushRefundMessage;
             util.ajaxMALLPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                $scope.vm.simpleServiceManagement.OnSearch();
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },
          //全选
          OnCheckedAll: function(){
            for(var i=0; i< $scope.vm.simpleServiceManagement.data.orderList.length; i++){
              var item = $scope.vm.simpleServiceManagement.data.orderList[i];
              item.Checked = $scope.vm.simpleServiceManagement.data.checkedAll; 
            }
          },
          //选择子项
          OnCheckedItem: function(item){
            var self = $scope.vm.simpleServiceManagement.data.orderList,
                length = $scope.vm.simpleServiceManagement.data.orderList.length,
                count = 0;
            for(var i=0; i< length; i++){
              var item = self[i];
              if(item.Checked){  count++; } else { break; }
            }
            if(count && count == length){
              $scope.vm.simpleServiceManagement.data.checkedAll = self[0].Checked;
            } else{
              $scope.vm.simpleServiceManagement.data.checkedAll = false;
            }
          },
          //模块初始化
          Init:function(){
              //加载列表数据
              $scope.vm.simpleServiceManagement.OnLoad();
          }       
      },

      //模块初始化
      Init: function(){
          //模块通用初始化
          $scope.vm.Common.Init();
          
          //模块初始化
          $scope.vm.simpleServiceManagement.Init();
      }

    }).Init();

  });
  return app;
});
