/**
 * Created by hzguest3 on 2017/6/6.
 */
define(['indexApp', 'common/util', 'common/const', 'common/MallConst', 'model/mall/AppointmentModel', 'model/mall/AppointmentGoodsModel', 'model/mall/AppointmentStateModel']
  , function (app, util, config, MallConst, AppointmentModel, AppointmentGoodsModel, AppointmentStateModel) {
  app.controller('appointmentCtrl', function ($scope, $http, signValid) {

    var _AppointmentCollection,
      startDateTextBox, endDateTextBox;

    //分页参数
    $scope.pageConfig =  {
        totalItems: 0,
        currentPage: 1,    //当前所在的页
        itemsPerPage: 10,  //每页展示的数据条数
        pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
        perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
        rememberPerPage: 'AppointmentPerPage',  //使用LocalStorage记住所选择的条目数的名称
        onChange: function () {
        if ($scope.pageConfig.currentPage != 0 ) {
          _AppointmentCollection.GetList();
        }
      }
    }

    var BaseUrl = {
      GetList : "BMSAppointment/SearchAppointmentList",
      ReferSuccessAppointment : "BMSAppointment/ModifyAppointmentSuccess",
      FinishAppointment : "BMSAppointment/ModifyAppointmentFinish",
      CancelAppointment : "BMSAppointment/ModifyAppointmentCancel",
      OrderDetail : "BMSOrder/OrderGoods",
      MECSupplierDetail : "BMSSupplier/MECSupplierDetail",
      AppointmentRules : "BMSAppointment/GetAppointmentRules",
      ModifyDate : "BMSAppointment/ModifyAppointmentDate",
      ThirdPartAppointment: "BMSAppointment/CheckThirdPartAppointment"
    };

    ($scope.vm = {

     AppointmentCollection:{

        data:{
          searchParams : {
            OrderId : "",
            DeptName : "",
            State : -1
          },
          appointmentInfo: {},
          appointmentList : [],
          appointmentGoodsList: [],

          appointmentRemark:"",
          appointmentDate:"",
          appointmentRules:[]
          // ,OnlineAppointmentDepts:MallConst.OnlineAppointmentDepts
        },

        //设置搜索预约状态
        SetSearchState :function(State){
          _AppointmentCollection.data.searchParams.State = State;
          $scope.pageConfig.currentPage = 1;
        },

        //设置搜索相关参数
        ResetSearchParams :function(){
          _AppointmentCollection.data.searchParams  = {
            OrderId : "",
            DeptName : "",
            State : _AppointmentCollection.data.searchParams.State
          }
          startDateTextBox[0].value = "";
          endDateTextBox[0].value = "";
        },

        //搜索预约列表
        GetList:function(){
          var params = {
            "PageNum": $scope.pageConfig.currentPage,
            "Count": $scope.pageConfig.itemsPerPage,
            "OrderId": _AppointmentCollection.data.searchParams.OrderId,
            "DeptName": _AppointmentCollection.data.searchParams.DeptName,
            "StartTime": startDateTextBox.val(),
            "EndTime": endDateTextBox.val()?endDateTextBox.val()+" 23:59:59":endDateTextBox.val(),
            "State": _AppointmentCollection.data.searchParams.State
          };
          var url = BaseUrl.GetList;
          util.showAjaxLoading();
          util.ajaxMALLPost($http, url, params, function(result){
            if (result.Code == 1 && result.Data != null && result.Data.AppointmentList != null){
              $scope.pageConfig.totalItems = result.Data.Count;
              _AppointmentCollection.data.appointmentList = [];
              result.Data.AppointmentList.forEach(function(item, index, array){
                var appointmentModel = new AppointmentModel();
                appointmentModel.ConvertFrom(item);
                _AppointmentCollection.data.appointmentList.push(appointmentModel);
              });

            }else{
              util.showFade(result.Message);
            }
            util.hideAjaxLoading();
          }, function(err){
            util.hideAjaxLoading();
            console.log(err);
          })
        },

        //审核通过
        ReferSuccessAppointment:function(OrderId, Remark){
          // if(!Remark){
          //   util.showFade("请先填写备注");
          //   return;
          // }
          var params= {
            "OrderId": OrderId,
            "Remark": Remark
          };
          var url = BaseUrl.ReferSuccessAppointment;
          util.showAjaxLoading();
          util.ajaxMALLPost($http, url, params, function(result){
            if (result.Code == 1 && result.Data){
              _AppointmentCollection.RefreshList(result.Data, OrderId);
              $("#remarkComfirmSuccess").modal("hide");
            }
            util.hideAjaxLoading();
            util.showFade(result.Message);
          }, function(err){
            util.hideAjaxLoading();
            console.log(err);
          })
        },

        //预约到检
        FinishAppointment:function(OrderId, Remark){
          // if(!Remark){
          //   util.showFade("请先填写备注");
          //   return;
          // }
          var params= {
            "OrderId": OrderId,
            "Remark": Remark
          };
          var url = BaseUrl.FinishAppointment;
          util.showAjaxLoading();
          util.ajaxMALLPost($http, url, params, function(result){
            if (result.Code == 1 && result.Data){
              _AppointmentCollection.RefreshList(result.Data, OrderId);
              $("#remarkComfirmFinish").modal("hide");
            }
            util.hideAjaxLoading();
            util.showFade(result.Message);
          }, function(err){
            util.hideAjaxLoading();
            console.log(err);
          })
        },

        //取消预约
        CancelAppointment:function(OrderId, Remark){
           // if(!Remark){
          //   util.showFade("请先填写备注");
          //   return;
          // }
          var params= {
            "OrderId": OrderId,
            "Remark": Remark
          };
          var url = BaseUrl.CancelAppointment;
          util.showAjaxLoading();
          util.ajaxMALLPost($http, url, params, function(result){
            if (result.Code == 1 && result.Data){
              _AppointmentCollection.RefreshList(result.Data, OrderId);
              $("#remarkComfirmCancel").modal("hide");
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
          var url = BaseUrl.ModifyDate;
          util.showAjaxLoading();
          util.ajaxMALLPost($http, url,params, function(result){
            if (result.Code == 1 && result.Data){
              _AppointmentCollection.RefreshList(result.Data, OrderId);
              $("#appointmentModifyDate").modal("hide");
            }
            util.hideAjaxLoading();
            util.showFade(result.Message);
          },function(err){
            util.hideAjaxLoading();
            console.log(err);
          })
        },

        //查询第三方机构到检状态
        CheckThirdPartAppointment:function(OrderId){
          var params = {
            "OrderId" : OrderId
          }
          var url = BaseUrl.ThirdPartAppointment;
          util.ajaxMALLPost($http, url, params, function(result){
            var entity = new AppointmentStateModel();
            entity.ConvertFrom(result.Data);
            util.showFade(entity.AppointmentState);
          },function(err){
            util.hideAjaxLoading();
            console.log(err);
          })
        },

        RefreshList: function (appointmentItem, OrderId) {
         var appointmentModel = new AppointmentModel();
         appointmentModel.ConvertFrom(appointmentItem);
         _AppointmentCollection.data.appointmentList.forEach(function (item, index, array) {
           if (item.OrderId == OrderId) {
             if (_AppointmentCollection.data.searchParams.State != -1) {
               array.remove(item);
             } else {
               array.splice(index, 1, appointmentModel);
             }
           }
         });
        },

        //获取指定订单的可预约日期
        AppointmentRules: function(OrderId){
          var params = {
            "OrderId": OrderId
          }
          var url = BaseUrl.AppointmentRules;
          util.ajaxMALLPost($http,url,params,function(result){
            if(result.Code == 1 && result.Data != null){
              _AppointmentCollection.data.appointmentRules = []
              result.Data.DateRange.forEach(function(item,index,array){
                var date  = item.replace(new RegExp('/','gm'),'-');
                _AppointmentCollection.data.appointmentRules.push(item);
              })
              _AppointmentCollection.data.appointmentDate = _AppointmentCollection.data.appointmentInfo.AppointDate;
              $("#appointmentModifyDate").modal("show");
            }else {
              util.showFade(result.Message);
            }
            util.hideAjaxLoading();
          },function(err){
            util.hideAjaxLoading();
          })
        },

       //获取订单商品列表
        OrderGoodsList:function(OrderId){
          var params = {
            "OrderId": OrderId
          };
          var url = BaseUrl.OrderDetail;
          util.showAjaxLoading();
          util.ajaxMALLPost($http,url,params,function(result){
            if (result.Code == 1 && result.Data != null){
              var allPrice=0,allNum=0;
              _AppointmentCollection.data.appointmentGoodsList = [];
              _AppointmentCollection.data.allprice =0;
              result.Data.forEach(function(item, index, array){
                var appointmentGoodsModel = new AppointmentGoodsModel();
                appointmentGoodsModel.ConvertFrom(item);
                _AppointmentCollection.data.appointmentGoodsList.push(appointmentGoodsModel);

                allPrice += item.Price*item.Count;
                allNum += item.Count;
              });
              _AppointmentCollection.data.allprice =allPrice.toFixed(2);
              _AppointmentCollection.data.allNum =allNum;

              $("#goodsDetail").modal("show");
            }else {
              util.showFade(result.Message);
            }
            util.hideAjaxLoading();
          },function(err){
            util.hideAjaxLoading();
          });

        },

        MECSupplierDetail:function(SupplierCode){
          var params = {
            "ID": SupplierCode
          };
          var url = BaseUrl.MECSupplierDetail;
          util.showAjaxLoading();
          util.ajaxMALLPost($http,utl,params,function(result){
            if(result.Code == 1 && result.Data != null){
            }else {
              util.showFade(result.Message);
            }
            util.hideAjaxLoading();
          },function(err){
            util.hideAjaxLoading();
            console.log(err);
          })
        },

        ExportCSV: function () {
          var sourceData = [];
          var columnNameList = ["订单编号","预约日期","预约状态","客户姓名","客户手机号","客户AccountID",
            "客户身份证","客户性别","客户婚姻状况","客户与购买人关系","预约机构名称","预约机构ID","商品名称","创建时间","最后修改时间","备注"];
          _AppointmentCollection.data.appointmentList.forEach(function(item, index, array){
          sourceData.push({
            "OrderId":item.OrderId+"\t",
            "AppointDate":item.AppointDate,
            "StateFormat":item.StateFormat,
            "CustomerName":item.CustomerName,
            "CustomerMobile":item.CustomerMobile,
            "AccountId":item.AccountId,
            "CustomerIDCard":item.CustomerIDCard+"\t",
            "CustomerGender":item.CustomerGender,
            "CustomerMarried":item.CustomerMarried,
            "CustomerRelation":item.Relation,
            "DepartName":item.DepartName,
            "DepartCode":item.DepartCode,
            "GoodsName":item.GoodsName,
            "CreateTime":item.CreateTime,
            "LastUpdateDate":item.LastUpdateDate,
            "Remark":item.Remark
          })
         })
         util.CreateCSV(columnNameList, sourceData);
        },

        Init:function(){
          _AppointmentCollection.GetList();
        }

      },

      Init :function(){
        //缓存登录验证
        signValid.ValidAccess("#/mallAppointment");
        //侧边栏样式
        $(".navli:eq(5)").addClass("active").siblings().removeClass("active");
        $('body').css('overflow', 'auto');

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
        _AppointmentCollection = $scope.vm.AppointmentCollection;
        _AppointmentCollection.Init();
      }

    }).Init();
  });
  return app;
});
