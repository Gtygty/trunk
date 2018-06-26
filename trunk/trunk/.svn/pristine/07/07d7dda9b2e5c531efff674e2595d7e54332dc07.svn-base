define(['indexApp', 'common/util', 'model/mall/telAppointmentModel']
, function (app, util, telAppointmentModel) {
  app.controller('telAppointmentCtrl', function ($scope, $http, signValid)   {
    
          var _telAppointment,startDateTextBox, endDateTextBox;
    
          //分页参数
          $scope.pageConfig =  {
            totalItems: 0,
            currentPage: 1,    //当前所在的页
            itemsPerPage: 10,  //每页展示的数据条数
            pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
            perPageOptions: [10, 30, 50, 100, 200, 500],    //可选择显示条数的数组
            rememberPerPage: 'telAppointmentPage',  //使用LocalStorage记住所选择的条目数的名称
            onChange: function () {
              if ($scope.pageConfig.currentPage != 0 ) {
                _telAppointment.getList();
              }
            }
          }
          
        //项目请求地址
        var BaseUrl = {
            //获取列表
            GetList:"BMSPhoneAppointment/ContactList",
            //修改备注
            ModifyRemark:"BMSPhoneAppointment/ModifyRemark",
            //修改状态
            ModifyState:"BMSPhoneAppointment/ModifyState"
        };
    
        ($scope.vm = {
    
            telAppointment:{

                data:{
                    params:{
                      "PageNum": 1,
                      "Count": 10,
                      "CustomerName": "",
                      "CustomerPhone": "",
                      "State": -1,
                      "StartTime": "",
                      "EndTime": ""
                    },
                    telAppointmentList:[],
                    Remark:'',
                    Id:-1,
                },
                //重设搜索相关参数
                reSetSearchParams :function(){
                    _telAppointment.data.params.CustomerName = "";
                    _telAppointment.data.params.CustomerPhone = "";
                    _telAppointment.data.params.State = -1;
                    startDateTextBox[0].value = "";
                    endDateTextBox[0].value = "";
                },
                //获取列表
                getList:function(){
                    var url = BaseUrl.GetList;
                    var params = _telAppointment.data.params;
                    var params = {
                        "PageNum": $scope.pageConfig.currentPage==0?1:$scope.pageConfig.currentPage,
                        "Count": $scope.pageConfig.itemsPerPage,
                        "CustomerName": _telAppointment.data.params.CustomerName,
                        "CustomerPhone": _telAppointment.data.params.CustomerPhone,
                        "State": _telAppointment.data.params.State,
                        "StartTime": startDateTextBox.val(),
                        "EndTime": endDateTextBox.val()?endDateTextBox.val()+" 23:59:59":endDateTextBox.val()
                    }
                    util.showAjaxLoading();
                    util.ajaxMALLPost($http,url,params,function(result){
                        if (result.Code == 1 && result.Data != null){
                            _telAppointment.data.telAppointmentList = [];
                            result.Data.List.forEach(function(item ,idex, array){
                              var model = telAppointmentModel.ConvertInfo(item);
                              _telAppointment.data.telAppointmentList.push((model));
                            });
                            $scope.pageConfig.totalItems = result.Data.Counts;
                        }else {
                        util.showFade(result.Message);
                        }
                        util.hideAjaxLoading();
                    },function(err){
                        util.hideAjaxLoading();
                        util.showFade(err);
                    })
                },
                //点击待服务出现待服务弹框
                onServiceAppointment:function(item){
                    _telAppointment.data.Id = item.Id;
                    $("#completeTelAppointmentModal").modal('show');
                },
                //点击弹框
                completeTelAppointment:function(){
                    var url = BaseUrl.ModifyState;
                    var params = {
                        "Id": _telAppointment.data.Id,
                        "State": 1
                    }
                    util.showAjaxLoading();
                    util.ajaxMALLPost($http,url,params,function(result){
                        if (result.Code == 1 && result.Data){
                            _telAppointment.getList();
                        }else {
                            util.showFade(result.Message);
                        }
                        util.hideAjaxLoading();
                    },function(err){
                        util.hideAjaxLoading();
                        util.showFade(err);
                    })
                },
                //备注弹框
                onModifyRemarkDialog:function(item){
                    _telAppointment.data.Id = item.Id;
                    _telAppointment.data.Remark = item.Remark;
                    $("#RemarkDialog").modal('show');
                },
                //保存备注信息
                onModifyRemark:function(){
                    var url = BaseUrl.ModifyRemark;
                    var params = {
                        "Id": _telAppointment.data.Id,
                        "Remark": _telAppointment.data.Remark
                    }
                    util.showAjaxLoading();
                    util.ajaxMALLPost($http,url,params,function(result){
                        if (result.Code == 1 && result.Data){
                            _telAppointment.getList();
                            $("#RemarkDialog").modal('hide');    
                        }else {
                            util.showFade(result.Message);
                        }
                        util.hideAjaxLoading();
                    },function(err){
                        util.hideAjaxLoading();
                        util.showFade(err);
                    })
                },
                init:function(){
                    _telAppointment.getList();
                }
 
            },
            init :function(){
                //缓存登录验证
                signValid.ValidAccess("#/telAppointment");
                //侧边栏样式
                $(".navli:eq(3)").addClass("active").siblings().removeClass("active");
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
                _telAppointment = $scope.vm.telAppointment;
                _telAppointment.init();
            }
    
        }).init();


  });

  return app;

});
