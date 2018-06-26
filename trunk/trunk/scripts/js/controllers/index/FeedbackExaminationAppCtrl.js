define(['indexApp','jquery', 'common/util', 'model/bannerAppModel', 'common/const', 'service/baseService','timePicker'], function (app,$, util, bannerAppModel, Const) {
  app.controller('FeedbackExaminationAppCtrl', function ($scope, $http, signValid) {
    signValid.ValidAccess("#/informationListExamination");                       //缓存登录验证
    //侧边栏样式
    $(".nav li:eq(16)").addClass("active").siblings().removeClass("active");
    $('body').css('overflow', 'auto');
    /***************日期***************/
    var endDate = new Date();
    var startDate = endDate.AddDay(-1);
    $scope.endDate = endDate.Format('yyyy/MM/dd');
    $scope.startDate = startDate.Format('yyyy/MM/dd');

    //***************************日历************************
    var startDateTextBox = $('#startDate');
    var endDateTextBox = $('#endDate');
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

    $scope.vm = {
      data:{
        selected:'',
        selectData:Const.FeedBackData,
        InitData:[],
        searchData:{
          // ServiceDeptName:'',
          // Start:'',
          // End:'',
          // RebackMethod:false
        },
        IsChecked:false,
      },
      SearchFeedBack:function(){        //搜索

        var url = 'FeedBack/GetFeedBack';
        var data = {
          ServiceDeptName:$('#serviceDept').val(),
          Start:$('#startDate').val(),
          End:$('#endDate').val(),
          RebackMethod:$scope.vm.data.selected
        };
        util.ajaxZSTJPost($http,url,data,function(result){
          if(result.Code == 1){
            $scope.vm.data.InitData = [];
            if(result.Data.length>0){
              for(var i = 0;i<result.Data.length;i++){
                  var model = new bannerAppModel();
                  model.convertFromFeedBack(result.Data[i]);
                  model.RebackMethod = model.RebackMethod =='true'? 1 :0;
                  $scope.vm.data.InitData.push(model);
              }
            }else{
              util.showFade('暂无用户反馈信息');
            }
          }else{
            util.showFade(util.Message);
          }
        },function(err){
          util.showFade(err.Message);
        })
      },
      CheckedClick:function(item){      //选择标记
        var url = 'FeedBack/UpdateRebackMethod';
        var checked = item.RebackMethod;
        if(checked == 1){
          checked = true;
        }else{
          checked = false;
        }
        var data = {
          Id:item.ServerId,
          State:checked
        };
        util.ajaxZSTJPost($http,url,data,function(result){
          if(result.Code == 1){
            util.showFade(result.Message);
          }else{
            util.showFade(result.Message);
          }
        },function(err){
          util.showFade(err.Message);
        })
      },
      Init:function(){   //初始化页面
        var url = 'FeedBack/GetFeedBack';
        var start = $scope.startDate;
        var end = $scope.endDate;
        var data = {
          Start: start,
          End: end
        };
         util.ajaxZSTJPost($http,url,data,function(result){
          if(result.Code == 1){
            if(result.Data.length>0){
              for(var i = 0;i<result.Data.length;i++){
                  var model = new bannerAppModel();
                  model.convertFromFeedBack(result.Data[i]);
                  model.RebackMethod = model.RebackMethod == 'true'? 1 :0;
                  $scope.vm.data.InitData.push(model);
              }
            }else{
              util.showFade('暂无用户反馈信息');
            }
          }else{
            util.showFade(util.Message);
          }
        },function(err){
          util.showFade(err.Message);
        })
      }


    }
  $scope.vm.Init();

  });
  return app;
});
