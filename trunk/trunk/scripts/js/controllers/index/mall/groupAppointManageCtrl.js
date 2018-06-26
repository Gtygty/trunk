define([  'indexApp'
        , 'common/util'
        , 'common/const'
        , 'model/mall/groupAppointManageModel'
        , 'common/MallConst'
        , 'service/baseService'
        , 'service/mall/groupAppointManageService'
        , 'timePicker'], function (app, util, Const, vModel,mallConst) {
  app.controller('groupAppointManageCtrl', function ($scope,$http,signValid,ajaxService,couponService) {
    
    var Base={
        GoodsList: "BMSEnterpriseAppointment/GetGoodsList",//获取未删除的体检中心和商品
        GetAppointmentList:  "BMSEnterpriseAppointment/AppointmentList", //获取团检预约列表
        AppointmentDateRange: "BMSEnterpriseAppointment/AppointmentDateRange",//获取可预约时间范围
        ModifyAppointmentSuccess: "BMSEnterpriseAppointment/ModifyAppointmentSuccess",//修改为过审
        ModifyAppointmentFinish: "BMSEnterpriseAppointment/ModifyAppointmentFinish",//修改为到检
        ModifyAppointmentCancel: "BMSEnterpriseAppointment/ModifyAppointmentCancel",//修改为取消
        ModifyAppointmentDate: "BMSEnterpriseAppointment/ModifyAppointmentDate",//预约改期
        OrderDetail : "BMSOrder/OrderGoods"//商品详情
    };

    
    
    ($scope.vm = {

      //通用操作
      Common: {
        Init: function(){
          signValid.ValidAccess('#/groupAppointManage');// 缓存登录验证
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
            rememberPerPage: 'GroupAppointmentManagePerPage',  //使用LocalStorage记住所选择的条目数的名称
            onChange: function () {
              if ($scope.pageConfig.currentPage != 0 ) {
                $scope.vm.groupAppointManage.OnSearch();
              }
            }
          }
        }
      },
      //团检管理模块
      groupAppointManage:{
          //加项详情数据
          increaseDetailInfo: {},
          //批量操作
          SelectedBatchAppointment:-1,
          //下拉列表中的常量
          const:{
            SexList:mallConst.Sex,//性别
            MarryList:mallConst.Marry//婚否
          },
          //模块数据
          data:{
            checkedAll:false,
            supplierInfoList:[],//供应商信息
            appointmentStateList:[],//预约状态列表
            appointmentList:[],//当前显示的团检预约列表信息
            appointmentInfo: {},//更改预约状态的item
            appointmentRules:[],

            appointmentType:[
              { Text: '--全部--', Value:-1 },
              { Text: '线下团检', Value:1 },
              { Text: '线上团检', Value:2 },
            ],

            searchParams: {
                PageNum: 1,
                Count: 10,
                Name: null,
                SupplierCode: null,
                MinAppointDate: null,
                MaxAppointDate: null,
                State: -1,
                Mobile: "",
                IdCard: "",
                Gender: null,
                Married: null,
                Type: -1
            }
          },
          ShowIncreaseDetial: function (input) {
            var params = {
                "OrderId": input.IncreaseInfo.OrderId
              };
              var url = Base.OrderDetail;
              util.showAjaxLoading();
              util.ajaxMALLPost($http,url,params,function(result){
                if (result.Code == 1 && result.Data != null){
                  $scope.vm.groupAppointManage.increaseDetailInfo = [];
                  var appointmentGoodsModel = new vModel();
                  var detailInfo = appointmentGoodsModel.convenGoodsData(result.Data);
                  $scope.vm.groupAppointManage.increaseDetailInfo = detailInfo;
                  $("#goodsDetail").modal("show");
                }else {
                  util.showFade(result.Message);
                }
                util.hideAjaxLoading();
              },function(err){
                util.hideAjaxLoading();
                console.log(err);
              });

              $('#increaseDetailModal').modal('show');
          },
          //清除按钮
          Onclear:function(){
            //搜索框值重置
            $scope.vm.groupAppointManage.data.searchParams = {
                PageNum: 1,
                Count: 10,
                Name: null,
                SupplierCode: null,
                MinAppointDate: null,
                MaxAppointDate: null,
                State: -1,
                Mobile: "",
                IdCard: "",
                Gender: null,
                Married: null,
                Type: -1
            };
            //时间框重置
            startDateTextBox[0].value = "";
            endDateTextBox[0].value = "";
          },
          //加载所有的体检中心信息
          OnLoadAllSupplier:function(){
              ajaxService.PostMall(Base.GoodsList,{},function(result) {
                  var viewModel = new vModel();
                  $scope.vm.groupAppointManage.data.supplierInfoList = viewModel.conventToSelectData(result);
              });
          },
          //搜索按钮
          OnSearchClick:function() {
            $scope.vm.groupAppointManage.OnGetList($scope.vm.groupAppointManage.data.searchParams.State);
          },
          OnSearch:function(){
            var ag = $scope.vm.groupAppointManage.data.searchParams;
                ag.PageNum = $scope.pageConfig.currentPage;
                ag.Count = $scope.pageConfig.itemsPerPage;
                if (ag.PageNum == 0) {
                  ag.PageNum = 1;
                }
                if ($('#startDate').val()) {
                  ag.MinAppointDate = $('#startDate').val() + ' ' + '00:00:00';
                }else{
                  ag.MinAppointDate = "";  
                }
                if ($('#endDate').val()) {
                  ag.MaxAppointDate = $('#endDate').val() + ' ' + '23:59:59';
                }else{
                  ag.MaxAppointDate = "";  
                }
            var param = $scope.vm.groupAppointManage.data.searchParams;
            var url = Base.GetAppointmentList;
            ajaxService.PostMall(url,param,function(result) {
                var viewModel = new vModel();
                $scope.vm.groupAppointManage.data.appointmentList = viewModel.convenAppointData(result.AppointmentList);
                $scope.pageConfig.totalItems = result.Counts;
            });
          },
          //导出excel表格
          OnExportCSV:function(){
            var tempArr = [];
            for (var i = 0; i < $scope.vm.groupAppointManage.data.appointmentList.length; i++) {
              if ($scope.vm.groupAppointManage.data.appointmentList[i].Checked) {
                tempArr.push($scope.vm.groupAppointManage.data.appointmentList[i])
              }
            }
            if (tempArr.length == 0) {
              util.showFade('请选择你要导出的预约！');
              return;
            }
            var sourceData = [];
            var columnNameList = ["预约编号","预约类型","体检中心","体检套餐","预约日期","姓名","身份证号","手机号","性别","婚否","预约状态", "修改时间"];
            tempArr.forEach(function(item, index, array){
              sourceData.push({
                "OrderId":"\t"+item.OrderId,
                "OrderType":item.TypeFormat,
                "DepartName":item.DepartName,
                "GoodsName":item.GoodsName,
                "AppointDate":item.AppointDate,
                "CustomerName":item.CustomerName,
                'CustomerIDCard':"\t"+ item.CustomerIDCard,
                'CustomerMobile': item.CustomerMobile,
                'CustomerGender': item.CustomerGender == 1 ? "男" : "女",
                'CustomerMarried': item.CustomerMarried == 1 ? "已婚" : "未婚",
                "AppointmentState":item.AppointmentState,
                "LastUpdateTime":item.LastUpdateDate
              })
            })
            util.CreateCSV(columnNameList, sourceData);
          },
          //点击tab切换卡获取list
          OnGetList:function(item){
            $scope.vm.groupAppointManage.data.searchParams.State = item;
            $scope.vm.groupAppointManage.OnSearch();
          },
          //初始化加载页面
          OnLoad:function(){
              var param = $scope.vm.groupAppointManage.data.searchParams;
              var url = Base.GetAppointmentList;
              ajaxService.PostMall(url,param,function(result) {
                  var viewModel = new vModel();
                  $scope.vm.groupAppointManage.data.appointmentList = viewModel.convenAppointData(result.AppointmentList);
                  $scope.vm.groupAppointManage.data.appointmentStateList = viewModel.conventToStateData();
                  $scope.pageConfig.totalItems = result.Counts;
              });
          },
          //全选
          OnCheckedAll: function(){
            for(var i=0; i< $scope.vm.groupAppointManage.data.appointmentList.length; i++){
              var item = $scope.vm.groupAppointManage.data.appointmentList[i];
              item.Checked = $scope.vm.groupAppointManage.data.checkedAll; 
            }
          },
          //选择子项
          OnCheckedItem: function(item){
            var self = $scope.vm.groupAppointManage.data.appointmentList,
                length = $scope.vm.groupAppointManage.data.appointmentList.length,
                count = 0;
            for(var i=0; i< length; i++){
              var item = self[i];
              if(item.Checked){  count++; } else { break; }
            }
            if(count && count == length){
              $scope.vm.groupAppointManage.data.checkedAll = self[0].Checked;
            } else{
              $scope.vm.groupAppointManage.data.checkedAll = false;
            }
          },
          //批量操作
          OnChangeAppointmentsModal:function(){
            if($scope.vm.groupAppointManage.SelectedBatchAppointment+"" == 0+""){//取消
              $("#appointmentBatchCancelModal").modal('show');
            }else if($scope.vm.groupAppointManage.SelectedBatchAppointment+"" == 1+""){//通过
              $("#appointmentBatchSuccessModal").modal('show');
            }else if($scope.vm.groupAppointManage.SelectedBatchAppointment+"" == 2+""){//到检
              $("#appointmentBatchFinishModal").modal('show');
            }
            $scope.vm.groupAppointManage.SelectedBatchAppointment = -1;
          },
          ReferSuccessAppointment:function(OrderId) {
            var params= {
              "OrderIds": [OrderId]
            };
            var url = Base.ModifyAppointmentSuccess;
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url, params, function(result){
              if (result.Code == 1 && result.Data){
                $scope.vm.groupAppointManage.OnSearch();
                $("#remarkComfirmSuccess").modal("hide");
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            }, function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          CancelAppointment:function(OrderId) {
            var params= {
              "OrderIds": [OrderId]
            };
            var url = Base.ModifyAppointmentCancel;
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url, params, function(result){
              if (result.Code == 1 && result.Data){
                $scope.vm.groupAppointManage.OnSearch();
                $("#remarkComfirmCancel").modal("hide");
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            }, function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          FinishAppointment:function(OrderId) {
            var params= {
              "OrderIds": [OrderId]
            };
            var url = Base.ModifyAppointmentFinish;
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url, params, function(result){
              if (result.Code == 1 && result.Data){
                $scope.vm.groupAppointManage.OnSearch();
                $("#remarkComfirmFinish").modal("hide");
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            }, function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          //批量过审
          BatchReferSuccessAppointment:function() {
            var tempArr = [];
            for (var i = 0; i < $scope.vm.groupAppointManage.data.appointmentList.length; i++) {
              if ($scope.vm.groupAppointManage.data.appointmentList[i].Checked) {
                tempArr.push($scope.vm.groupAppointManage.data.appointmentList[i].OrderId)
              }
            }
            if (tempArr.length == 0) {
              util.showFade('请选择你要批量操作的预约！');
              return;
            }
            var params= {
              "OrderIds": tempArr
            };
            var url = Base.ModifyAppointmentSuccess;
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url, params, function(result){
              if (result.Code == 1 && result.Data){
                $scope.vm.groupAppointManage.OnSearch();
                $("#remarkComfirmSuccess").modal("hide");
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            }, function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          //批量取消
          BatchCancelAppointment:function(OrderId) {
            var tempArr = [];
            for (var i = 0; i < $scope.vm.groupAppointManage.data.appointmentList.length; i++) {
              if ($scope.vm.groupAppointManage.data.appointmentList[i].Checked) {
                tempArr.push($scope.vm.groupAppointManage.data.appointmentList[i].OrderId)
              }
            }
            if (tempArr.length == 0) {
              util.showFade('请选择你要批量操作的预约！');
              return;
            }
            var params= {
              "OrderIds": tempArr
            };
            var url = Base.ModifyAppointmentCancel;
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url, params, function(result){
              if (result.Code == 1 && result.Data){
                $scope.vm.groupAppointManage.OnSearch();
                $("#remarkComfirmCancel").modal("hide");
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            }, function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          //批量到检
          BatchFinishAppointment:function(OrderId) {
            var tempArr = [];
            for (var i = 0; i < $scope.vm.groupAppointManage.data.appointmentList.length; i++) {
              if ($scope.vm.groupAppointManage.data.appointmentList[i].Checked) {
                tempArr.push($scope.vm.groupAppointManage.data.appointmentList[i].OrderId)
              }
            }
            if (tempArr.length == 0) {
              util.showFade('请选择你要批量操作的预约！');
              return;
            }
            var params= {
              "OrderIds": tempArr
            };
            var url = Base.ModifyAppointmentFinish;
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url, params, function(result){
              if (result.Code == 1 && result.Data){
                $scope.vm.groupAppointManage.OnSearch();
                $("#remarkComfirmFinish").modal("hide");
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            }, function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          ModifyAppointment:function(OrderId,AppointmentDate){
            var params = {
              "OrderId": OrderId,
              "AppointmentDate": AppointmentDate
            }
            var url = Base.ModifyAppointmentDate;
            util.showAjaxLoading();
            util.ajaxMALLPost($http, url,params, function(result){
              if (result.Code == 1 && result.Data){
                $scope.vm.groupAppointManage.OnSearch();
                $("#appointmentModifyDate").modal("hide");
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
            },function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          //获取指定订单的可预约日期
          AppointmentRules: function(item){
            var params = {
              "EnterpriseId": item.EnterpriseId,
              "SupplierCode": item.DepartCode,
              "GoodsId": item.GoodsId
            }
            var url = Base.AppointmentDateRange;
            util.ajaxMALLPost($http,url,params,function(result){
              if(result.Code == 1 && result.Data != null){
                if (result.Data.AppointmentRange.length == 0) {
                  util.showFade("暂无可预约日期");
                }
                $scope.vm.groupAppointManage.data.appointmentRules = []
                result.Data.AppointmentRange.forEach(function(item,index,array){
                  var date  = item.replace(new RegExp('/','gm'),'-');
                  $scope.vm.groupAppointManage.data.appointmentRules.push(date);
                })
                $scope.vm.groupAppointManage.data.appointmentDate = $scope.vm.groupAppointManage.data.appointmentInfo.AppointDate;
                $("#appointmentModifyDate").modal("show");
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
            },function(err){
              util.hideAjaxLoading();
              console.log(err);
            })
          },
          //模块初始化
          Init:function(){
              //加载列表数据
              $scope.vm.groupAppointManage.OnLoad();
          }       
      },

      //模块初始化
      Init: function(){
          //模块通用初始化
          $scope.vm.Common.Init();
          
          //模块初始化
          $scope.vm.groupAppointManage.Init();
          //加载所有的检查机构
          $scope.vm.groupAppointManage.OnLoadAllSupplier();
      }

    }).Init();

  });
  return app;
});
