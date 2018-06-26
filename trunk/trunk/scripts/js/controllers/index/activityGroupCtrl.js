/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/const', 'model/activityGroupModel','emoji', 'service/baseService', 'service/activityGroupService', 'timePicker'], function (app, util, Const, vModel,emojiUtil,dir) {
  app.controller('activityGroupCtrl', ['$scope', 'signValid', 'activityGroupService', function ($scope, signValid, activityGroupService) {

    ($scope.vm = {
      Common: {

        currentDialog:{
          activeDialog: ''
        },

        Init: function(){
          signValid.ValidAccess('#/activityGroup');                                    // 缓存登录验证
          /* eslint-disable no-undef */
          $('.nav li:eq(16)').addClass('active').siblings().removeClass('active');     // 侧边栏样式
          $('body').css('overflow', 'auto');

          $('#inputAddReportItemSrc').change(function (){         // 获取上传图片尺寸 (医师健康分组)
            var current = $scope.vm.activityGroup.Current,
              file = this.files[0],
              _URL = window.URL || window.webkitURL,
              img = new Image();
            img.src = _URL.createObjectURL(file);
            img.onload = function(){
              current.Size.width = this.width;
              current.Size.height = this.height;
            };
          });

          document.addEventListener('uploaded', function(e){
            $scope.vm.activityGroup.OnUploadImageCallBack(e.detail);
          });

        }
      },


      activityGroup:{
        List: [],
        Current: { ID: 0, 'GroupName': '', 'ImageUrl': '', 'CompanyOwner': '',
          'CompanyMobile':'','HZOwner':'' ,'LastUpdateTime':'','twoDimensionCode':'',
          Size: { width:'', height:'' } },
        CurrentCount: 0, /* 当前组的人数 */
        //初始化加载数据
        OnLoad: function(){
          activityGroupService.activityGroup.List({
            callback: function(data){
              $scope.vm.activityGroup.List = data;
            }
          });
          $scope.vm.activityGroup.InitDate();
        },
        InitDate: function(){
          var startDateTextBox = $('#startSelfDate');
          var endDateTextBox = $('#endSelfDate');
          $.timepicker.dateRange(
            startDateTextBox,
            endDateTextBox,
            {
              changeMonth: true,
              buttonImageOnly: true,
              dateFormat: 'yy-mm-dd',
              monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
              dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
              minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
            }
          );
        },
        OnUploadImage: function(){
          var tg = $scope.vm.activityGroup,
            btnImage = $('#inputAddReportItemSrc')[0].files[0],
            width = tg.Current.Size.width,
            height = tg.Current.Size.height;

          if(!btnImage){
            util.showFade('请选择您要上传的图片！');
            return;
          }

          var size = btnImage.size / 1024,
            ext = {'jpg': true, 'jpeg': true},
            extName = btnImage.name.split('.').pop();

          if(ext[extName]){
            util.showFade('请选择您要上传的图片！');
            return;
          }
          if(width>120 || height>120){
            util.showFade('图片宽高不能超过120*120');
            return;
          }
          if(size>100){
            util.showFade('图片大小不能超过100kb');
            return;
          }

          var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.DoctorHeader, util.randomString(32), extName),
            instance = new Sand({
              bucket: Const.ComboConfig.bucket,
              expiration: parseInt((new Date().getTime() + 3600000) / 1000),
              form_api_secret: Const.ComboConfig.form_api_secret
            });
          util.showAjaxLoading();
          instance.upload(filePath, '#inputAddReportItemSrc');
        },
        OnUploadImageCallBack: function(data){
          $scope.vm.activityGroup.Current.ImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
          $scope.$apply();
          util.hideAjaxLoading();
        },

        //添加
        OnAddDialog: function(){
          var ag = $scope.vm.activityGroup;
          ag.Current = { ID: 0, 'GroupName': '', 'ImageUrl': '', 'CompanyOwner': '',
            'CompanyMobile':'','HZOwner':'' ,'LastUpdateTime':'',
            Size: { width:'', height:'' } };
          //清空fileSelector
          var activityGroupFile = $("#inputAddReportItemSrc");
          activityGroupFile.after(activityGroupFile.clone().val(""));
          activityGroupFile.remove();
          //将图片清空
          $('.mb').find('img').attr("src","")

          $scope.vm.Common.Init();

          $('#myListAdd').modal('show');
        },
        OnAdd: function(){
          var ag = $scope.vm.activityGroup;

          activityGroupService.activityGroup.Add({
            param: {
              'GroupName': ag.Current.GroupName,
              'ImageUrl': ag.Current.ImageUrl,
              'CompanyOwner': ag.Current.CompanyOwner,
              'CompanyMobile': ag.Current.CompanyMobile,
              'HZOwner': ag.Current.HZOwner
            },
            callback: function(){
              ag.OnLoad();
              $('#myListAdd').modal('hide');
            }
          });
        },
        OnModifyDialog: function(item){
          var ag = $scope.vm.activityGroup;
          item.Size = { width:'', height:'' };
          ag.Current = angular.extend({}, item);

          //清空fileSelector
          var activityGroupFile = $("#inputAddReportItemSrc");
          activityGroupFile.after(activityGroupFile.clone().val(""));
          activityGroupFile.remove();

          $('#myListAdd').modal('show');
        },
        OnGetShortLink: function(index,item){
          var ag = $scope.vm.activityGroup;
          item.Size = { width:'', height:'' };
          ag.Current = angular.extend({}, item);
          activityGroupService.activityGroup.GetShortLink({
            param:{
              'ShortLink': ag.Current.twoDimensionCode
            },
            callback: function(data){
              $scope.vm.activityGroup.List[index].twoDimensionCode = data
            }
          });
        },
        OnModify: function(){
          var ag = $scope.vm.activityGroup;
          activityGroupService.activityGroup.Modify({
            param: {
              'ID': ag.Current.ID,
              'GroupName': ag.Current.GroupName,
              'ImageUrl': ag.Current.ImageUrl,
              'CompanyOwner': ag.Current.CompanyOwner,
              'CompanyMobile': ag.Current.CompanyMobile,
              'HZOwner': ag.Current.HZOwner
            },
            callback: function(){
              ag.OnLoad();
              $('#myListAdd').modal('hide');
            }
          });
        },
        Search: {
          'GroupName':  '',
          'CompanyOwner': '',
          'HZOwner':  '',
          'startSelfDate':  '',
          'endSelfDate': ''
        },
        OnSearch: function(){

          var ag = $scope.vm.activityGroup.Search;

          if($('#startSelfDate').val()){
            ag.startSelfDate  = $('#startSelfDate').val()+' '+'00:00:00';
          }
          if($('#endSelfDate').val()){
            ag.endSelfDate  = $('#endSelfDate').val()+' '+'23:59:59';
          }
          activityGroupService.activityGroup.Search({

            param:{
              'GroupName':  ag.GroupName,
              'CompanyOwner': ag.CompanyOwner,
              'HZOwner':  ag.HZOwner,
              'StartTime':  ag.startSelfDate,
              'EndTime': ag.endSelfDate
            },
            callback: function(data){
              $scope.vm.activityGroup.List = data;
            }
          });
        },

        Init: function(){

          $scope.vm.activityGroup.OnLoad();

        }
      },

      Init: function(){
        var comon = $scope.vm.Common,
          ag = $scope.vm.activityGroup;

        comon.Init();
        ag.Init();
      }
    }).Init();

  }]);
  return app;
});
