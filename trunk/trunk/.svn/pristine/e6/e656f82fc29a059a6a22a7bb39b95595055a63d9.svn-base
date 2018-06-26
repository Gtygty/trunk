define(['indexApp', 'common/util', 'common/const','common/MallConst', 'model/mall/promoteOrderModel']
  , function (app, util, config, mallConst, promoteOrderModel) {
    app.controller('promoteOrderCtrl', function ($scope, $http, signValid)   {

      var _PromoteOrder,startDateTextBox, endDateTextBox;

      //分页参数
      $scope.pageConfig =  {
        totalItems: 0,
        currentPage: 1,    //当前所在的页
        itemsPerPage: 10,  //每页展示的数据条数
        pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
        perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
        rememberPerPage: 'promoteOrderPage',  //使用LocalStorage记住所选择的条目数的名称
        onChange: function () {
          if ($scope.pageConfig.currentPage != 0 ) {
            _PromoteOrder.GetList();
          }
        }
      }

      //项目请求地址
      var BaseUrl = {
            //提交备注
            ModifyPromoteOrder: "BMSPromoteOrder/ModifyChineseMedicineCallFinish",
            //提交小结
            ModifyPromoteOrderFeedback: "BMSPromoteOrder/ModifyChineseMedicineFeedback",
            //获取订单列表
            GetList:"BMSPromoteOrder/GetChineseMedicalCallInfoList"
      };

      ($scope.vm = {

        PromoteOrder:{
          data:{
              params:{
                "PageNum": 1,
                "Count": 10,
                "OrderId": "",
                "CallMobile": "",
                "PromoteOrderState": -1,
                "StartTime": "",
                "EndTime": ""
              },
              PromoteOrderList:[],
              CurrentId:"",
              SelfDescription:"",
              Remark:"",
              Feedback:"",
              checked:false,
              CurrentState:-1
          },
          //下拉框搜索条件
          PromoteOrderStateList:[ 
                                   {Value: -1,Text:" --全部-- "}
                                  ,{Value: 1000,Text:"待支付"}
                                  ,{Value: 2000,Text:"已付款未联系"}
                                  ,{Value: 3000,Text:"已付款已完成"}
                                ],
          //重设搜索相关参数
          ResetSearchParams :function(){
            _PromoteOrder.data.params  = {
                "PageNum": 1,
                "Count": 10,
                "OrderId": "",
                "CallMobile": "",
                "PromoteOrderState": -1,
                "StartTime": "",
                "EndTime": ""
            }
            startDateTextBox[0].value = "";
            endDateTextBox[0].value = "";
          },
          //导出表格
          ExportCSV:function(){
            var sourceData = [];
            var columnNameList = ["订单号","服务客户手机号","订单时间","支付单号","支付价格","订单状态","服务时间","备注"];
            var ecportList = _PromoteOrder.data.PromoteOrderList;
            ecportList.forEach(function(item, index, array){
                    sourceData.push({
                    'Id':"\t"+item.Id,
                    'CallMobile':item.CallMobile,
                    'CreateTime':item.CreateTime,
                    'PayId':"\t"+item.PayId,
                    'PayAmount':item.PayAmount,
                    'State':item.State==1000?'待支付':(item.State==2000?'已付款未联系':'已付款已完成'),
                    'LastUpdateTime':item.LastUpdateTime,
                    'Remark':item.Remark,
                    'Feedback':item.Feedback
                    })
            })
            if(sourceData.length==0){
                util.showFade("暂无信息可导出！");
                return false;
            }
            util.CreateCSV(columnNameList, sourceData);
          },
          //获取列表
          GetList:function(){
            var url = BaseUrl.GetList;
            var params = _PromoteOrder.data.params;
            var params = {
                "PageNum": $scope.pageConfig.currentPage,
                "Count": $scope.pageConfig.itemsPerPage,
                "OrderId": _PromoteOrder.data.params.OrderId,
                "CallMobile": _PromoteOrder.data.params.CallMobile,
                "PromoteOrderState": _PromoteOrder.data.params.PromoteOrderState,
                "StartTime": startDateTextBox.val(),
                "EndTime": endDateTextBox.val()?endDateTextBox.val()+" 23:59:59":endDateTextBox.val()
            }
            util.showAjaxLoading();
            util.ajaxMALLPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                  _PromoteOrder.data.PromoteOrderList = result.Data;

                _PromoteOrder.data.PromoteOrderList = [];
                $scope.pageConfig.totalItems = result.Data.Counts;
                result.Data.PromoteOrders.forEach(function(item ,idex, array){
                  var orderModel = promoteOrderModel.ConvertOrderInfo(item);
                  _PromoteOrder.data.PromoteOrderList.push((orderModel));
                });

              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },
          //操作详情
          OnOperateDialog(item){
              _PromoteOrder.data.checked = false;
              _PromoteOrder.data.SelfDescription = item.SelfDescription;
              _PromoteOrder.data.Remark = item.Remark;
              _PromoteOrder.data.Feedback = item.Feedback;
              _PromoteOrder.data.CurrentId = item.Id;
              _PromoteOrder.data.CurrentState = item.State;
              if(_PromoteOrder.data.CurrentState == 3000){
                  _PromoteOrder.data.checked = true;
              }
              $('#OperateDialog').modal('show');
          },
          //提交备注
          OnSureRemark(){
              var Remark = _PromoteOrder.data.Remark;
              if(Remark == ""|| Remark == null){
                util.showFade("请填写备注！");
                return false;
              }
              if(Remark.length>200){
                util.showFade("备注字数在200字以内！");
                return false;
              }
              var url = BaseUrl.ModifyPromoteOrder;
              var params = {
                "OrderId": _PromoteOrder.data.CurrentId,
                "Remark": _PromoteOrder.data.Remark
              }
              util.showAjaxLoading();
              util.ajaxMALLPost($http,url,params,function(result){
                if (result.Code == 1 && result.Data){
                   $('#OperateDialog').modal('hide');
                   util.showFade(result.Message);
                   _PromoteOrder.GetList();
                }else {
                  util.showFade(result.Message);
                }
                util.hideAjaxLoading();
              },function(err){
                util.hideAjaxLoading();
                util.showFade(err);
              })
          },
          //提交小结
          OnSureFeedback(){
              var Feedback = _PromoteOrder.data.Feedback;
              if(Feedback == ""|| Feedback == null){
                util.showFade("请填写小结！");
                return false;
              }
              if(Feedback.length>200){
                util.showFade("小结字数在200字以内！");
                return false;
              }
              var url = BaseUrl.ModifyPromoteOrderFeedback;
              var params = {
                "OrderId": _PromoteOrder.data.CurrentId,
                "Feedback": _PromoteOrder.data.Feedback
              }
              util.showAjaxLoading();
              util.ajaxMALLPost($http,url,params,function(result){
                if (result.Code == 1 && result.Data){
                   $('#OperateDialog').modal('hide');
                   util.showFade(result.Message);
                   _PromoteOrder.GetList();
                }else {
                  util.showFade(result.Message);
                }
                util.hideAjaxLoading();
              },function(err){
                util.hideAjaxLoading();
                util.showFade(err);
              })
          },
          Init:function(){
              _PromoteOrder.GetList();
          }
        },
        Init :function(){
          //缓存登录验证
          signValid.ValidAccess("#/promoteOrder");
          //侧边栏样式
          $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
          $('body').css('overflow', 'auto');
          //初始化时间空间
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
          _PromoteOrder = $scope.vm.PromoteOrder;
          _PromoteOrder.Init();
        }

      }).Init();

    });
    return app;
  });
