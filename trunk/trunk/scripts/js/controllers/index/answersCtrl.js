/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/const', 'model/answersModel','emoji', 'service/baseService', 'service/answersService'], function (app, util, Const, vModel,emojiUtil,dir) {
  app.controller('answersCtrl', ['$scope', 'signValid', 'answersService', function ($scope, signValid, answersService) {

      ($scope.vm = {
        Common: {
          currentDialog: {
              activeDialog: ''
          },
          Init: function(){
            signValid.ValidAccess('#/answers');                                           // 缓存登录验证
            /* eslint-disable no-undef */
            $('.nav li:eq(16)').addClass('active').siblings().removeClass('active');     // 侧边栏样式
            $('body').css('overflow', 'auto');

            $('#inputAddReportItemSrc').change(function (){         // 获取上传图片尺寸 (医师健康分组)
                var current = $scope.vm.TalentGroup.Current,
                    file = this.files[0],
                    _URL = window.URL || window.webkitURL;
                    img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function(){
                    current.Size.width = this.width;
                    current.Size.height = this.height;
                };
            });

            $('#inputAddDoctorAuthItemSrc').change(function (){     // 获取上传图片尺寸(医师认证)
                var current = $scope.vm.DoctorAuth.Current,
                    file = this.files[0],
                    _URL = window.URL || window.webkitURL;
                    img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function(){
                    current.Size.width = this.width;
                    current.Size.height = this.height;
                };
            });

            $('#inputAddDynamicsItemSrc').change(function (){     // 获取上传图片尺寸(发布动态)
                var current = $scope.vm.DoctorAuth.Current,
                    file = this.files[0],
                    _URL = window.URL || window.webkitURL;
                    img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function(){
                    current.Size.width = this.width;
                    current.Size.height = this.height;
                };
            });

            $('#inputAdImageUrlReportItemSrc').change(function (){        // 获取上传图片尺寸 (医师健康分组)
               var current = $scope.vm.TalentGroup.Current,
                    file = this.files[0],
                    _URL = window.URL || window.webkitURL;
                    img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function(){
                    current.AdSize.width = this.width;
                    current.AdSize.height = this.height;
                };
            });

            document.addEventListener('uploaded', function(e){
              var activeDialog = $scope.vm.Common.currentDialog.activeDialog;
              if(activeDialog == 'TalentGroupOnAddDialog'){
                $scope.vm.TalentGroup.OnUploadImageCallBack(e.detail);
              }else if(activeDialog == 'DoctorAuthOnAddDialog'){
                $scope.vm.DoctorAuth.OnUploadImageCallBack(e.detail);
              }else if(activeDialog == 'DynamicsOnAddDialog'){
                $scope.vm.DoctorAuth.OnUploadDynamicsImageCallBack(e.detail);
              }else if(activeDialog == 'TalentGroupOnAdAddDialog'){
                $scope.vm.TalentGroup.OnAdUploadImageCallBack(e.detail);
              }
            });

          }
        },
        TalentGroup:{
          List: [],
          Current: { ID: 0, 'Name': '', 'Desc': '', 'HeadImageUrl': '','Tags':null,'AdImageUrl':'', 
                          Size: { width:'', height:'' }, AdSize: { width:'', height:'' } },
          CurrentCount: 0, /* 当前组的人数 */
          OnTop: function(item){
              var tg = $scope.vm.TalentGroup;

              answersService.TalentGroup.TopOrBottom({
                param: { 'ID': item.ID, 'ToTop': true },
                callback: function(){
                  tg.OnLoad();
                }
              });
          },
          OnBottom: function(item){
              var tg = $scope.vm.TalentGroup;

              answersService.TalentGroup.TopOrBottom({
                param: { 'ID': item.ID, 'ToTop': false },
                callback: function(){
                  tg.OnLoad();
                }
              });
          },
          OnNext: function(item){
             var tg = $scope.vm.TalentGroup,
                 list = tg.List,
                 index = -1;
             for(var i=0; i< list.length; i++){
               if(item == list[i]){
                 index = i;
                 break;
               }
             }
            var next = list[index+1];
            answersService.TalentGroup.Move({
                param: { 'OglID': item.ID, 'TgtID': next.ID },
                callback: function(){
                  tg.OnLoad();
                }
              });
          },
          OnPrev: function(item){
            var tg = $scope.vm.TalentGroup,
                list = tg.List,
                index = -1;
             for(var i=0; i< list.length; i++){
               if(item == list[i]){
                 index = i;
                 break;
               }
             }
            var prev = list[index-1];
            answersService.TalentGroup.Move({
                param: { 'OglID': item.ID, 'TgtID': prev.ID },
                callback: function(){
                  tg.OnLoad();
                }
              });
          },
          OnLoad: function(){
            answersService.TalentGroup.List({
              callback: function(data){
                $scope.vm.TalentGroup.List = data;
              }
            });
          },
          OnUploadImage: function(){
              var tg = $scope.vm.TalentGroup,
                  cg = $scope.vm.Common.currentDialog,
                  btnImage = $('#inputAddReportItemSrc')[0].files[0],
                  width = tg.Current.Size.width,
                  height = tg.Current.Size.height;
              cg.activeDialog = 'TalentGroupOnAddDialog';

              if(!btnImage){
                util.showFade('请选择您要上传的图片！');
                return;
              }

              var size = btnImage.size / 1024,
                  // ext = {'jpg': true, 'jpeg': true},
                  ext = {},
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
          OnUploadAdImage: function(){
              var tg = $scope.vm.TalentGroup,
                  cg = $scope.vm.Common.currentDialog,
                  btnImage = $('#inputAdImageUrlReportItemSrc')[0].files[0],
                  width = tg.Current.AdSize.width,
                  height = tg.Current.AdSize.height;

              cg.activeDialog = 'TalentGroupOnAdAddDialog';

              if(!btnImage){
                util.showFade('请选择您要上传的图片！');
                return;
              }

              var size = btnImage.size / 1024,
                  // ext = {'jpg': true, 'jpeg': true},
                  ext = {},
                  extName = btnImage.name.split('.').pop();

              if(ext[extName]){
                util.showFade('请选择您要上传的图片！');
                return;
              }
              if(width>750 || height>472){
                util.showFade('图片宽高不能超过750*472');
                return;
              }
              if(size>1024){
                util.showFade('图片大小不能超过1024kb');
                return;
              }
              var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.DoctorHeader, util.randomString(32), extName),
                  instance = new Sand({
                    bucket: Const.ComboConfig.bucket,
                    expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                    form_api_secret: Const.ComboConfig.form_api_secret
                  });
              util.showAjaxLoading();
              instance.upload(filePath, '#inputAdImageUrlReportItemSrc');
          },
          OnUploadImageCallBack: function(data){
              $scope.vm.TalentGroup.Current.HeadImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },
          OnAdUploadImageCallBack: function(data){
              $scope.vm.TalentGroup.Current.AdImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },
          OnAddDialog: function(){
            var tg = $scope.vm.TalentGroup;
            tg.Current = { ID: 0, 'Name': '', 'Desc': '', 'HeadImageUrl': '','Tags':null,'AdImageUrl':''
                              , Size: { width:'', height:'' }, AdSize: { width:'', height:'' }  };
             
             //清空fileSelector
             var talentGroupFile = $("#inputAddReportItemSrc");
             talentGroupFile.after(talentGroupFile.clone().val(""));
             talentGroupFile.remove();
             
             //清空fileSelector
             var adFile = $("#inputAdImageUrlReportItemSrc");
             adFile.after(adFile.clone().val(""));
             adFile.remove();
             //将图片清空
             $('.mb').find('img').attr("src","")

             $scope.vm.Common.Init();

            $('#panelAddOrModTalentGroup').modal('show');
            $scope.vm.Common.currentDialog.activeDialog='TalentGroupOnAddDialog';
          },
          OnAdd: function(){
            var tg = $scope.vm.TalentGroup;
            answersService.TalentGroup.Add({
                param: {
                  'Name': tg.Current.Name,
                  'Desc': tg.Current.Desc,
                  'HeadImageUrl': tg.Current.HeadImageUrl,
                  'Tags':tg.Current.Tags,
                  'AdImageUrl':tg.Current.AdImageUrl
                },
                callback: function(){
                  tg.OnLoad();
                  $('#panelAddOrModTalentGroup').modal('hide');
                }
              });
          },
          OnModifyDialog: function(item){
            var tg = $scope.vm.TalentGroup;
            item.Size = { width:'', height:'' };
            item.AdSize = { width:'', height:'' }
            tg.Current = angular.extend({}, item);     
             //清空fileSelector
             var talentGroupFile = $("#inputAddReportItemSrc");
             talentGroupFile.after(talentGroupFile.clone().val(""));
             talentGroupFile.remove();   

             //清空fileSelector
             var AdFile = $("#inputAdImageUrlReportItemSrc");
             AdFile.after(AdFile.clone().val(""));
             AdFile.remove();
             //将图片清空
            $('#headImageUrl').attr("src",item.HeadImageUrl);
            $('#adImageUrl').attr("src",item.AdImageUrl);

             $scope.vm.Common.Init();

            $('#panelAddOrModTalentGroup').modal('show');
          },
          OnModify: function(){
            var tg = $scope.vm.TalentGroup;
            answersService.TalentGroup.Modify({
                param: {
                  'ID': tg.Current.ID,
                  'Name': tg.Current.Name,
                  'Desc': tg.Current.Desc,
                  'HeadImageUrl': tg.Current.HeadImageUrl,
                  'Tags':tg.Current.Tags,
                  'AdImageUrl':tg.Current.AdImageUrl
                },
                callback: function(){
                  tg.OnLoad();
                  $('#panelAddOrModTalentGroup').modal('hide');
                }
              });
          },
          OnDeleteDialog: function(item){
            var tg = $scope.vm.TalentGroup;
            tg.Current = item;
            answersService.TalentGroup.Count({
              param:{
                GroupID: item.ID
              },
              callback: function(count){
                tg.CurrentCount = count;
                $('#panelDelTalentGroup').modal('show');
              }
            });
          },
          OnDelete: function(){
            var tg = $scope.vm.TalentGroup;

            answersService.TalentGroup.Delete({
                param: {
                  'ID': tg.Current.ID
                },
                callback: function(){
                  tg.OnLoad();
                  $('#panelDelTalentGroup').modal('hide');
                }
              });
          },
          Init: function(){

            $scope.vm.TalentGroup.OnLoad();

          }
        },
        
        // 医师认证
        DoctorAuth:　{
          AllChecked: false,
          BatchState:{
            AccountIDs: [],
            Status: -1,
            Remark: ''
          },
          Search: {
            'Mobile':  '',
            'GroupID': -1,
            'NickName':  '',
            'Title':  '',
            'State': -1
          },
          List: [],
          TalentGroupDDL: [],
          DoctorAuthStateDDL: [
            { text: '请选择', value: -1 },
            { text: '审核中', value: 1 },
            { text: '已通过', value: 2 },
            { text: '被拒绝', value: 3 }
          ],
          Current: { 'AccountId': '', 'Mobile':'','TalentGroupId': -1, 'NickName': '', 'Title': '',
                    'DepartName': '', 'Desc': '', 'Status': -1, 'VerifyImageUrl': '',
                    'LastUpdateTime': '', 'CreateTime': '','twoDimensionCode':'', 'Size': { 'width':'', 'height':'' } },
          OnClickAllChecked: function(){
            var da = $scope.vm.DoctorAuth;

            for(var i=0; i< da.List.length; i++){
              var item = da.List[i];
              item.IsChecked = da.AllChecked;
            }
          },
          // 医师认证中的搜索
          OnSearch: function(){
              var da = $scope.vm.DoctorAuth;
              answersService.DoctorAuth.Search({
                param: da.Search,
                TalentGroupDDLS: da.TalentGroupDDL,
                callback: function(data){
                  da.List = data;
                }
              });
          },
          OnPass: function(item){
            var da = $scope.vm.DoctorAuth;

            answersService.DoctorAuth.SetState({
              param: {
                'AccountIDs':  [ item.AccountId ],
                'Status': 2
              },
              callback: function(){
                util.showFade('审核成功!');
                da.OnLoad();
              }
            });
          },
          OnNoPassDialog: function(item){
            var da = $scope.vm.DoctorAuth;

            angular.extend(da.BatchState, {
              AccountIDs: [ item.AccountId ],
              Status: 3,
              Remark: ''
            });
            $('#panelNoPass').modal('show');
          },
          OnBatchStateDialog: function(Event, state){
              var da = $scope.vm.DoctorAuth,
                  list = da.List,
                  tempData = [];
              for(var i=0; i< list.length; i++){
                  if(list[i].IsChecked) tempData.push(list[i].AccountId);
              }
              if(tempData.length == 0){
                  util.showFade('请选择您要操作的项!');
                  Event.stopPropagation();
                  return;
              }
              angular.extend(da.BatchState, {
                AccountIDs: tempData,
                Status: state
              });
          },
          OnBatchNoPassDialog: function(){
            var da = $scope.vm.DoctorAuth,
                list = da.List,
                tempData = [];
            for(var i=0; i< list.length; i++){
                if(list[i].IsChecked) tempData.push(list[i].AccountId);
            }
            angular.extend(da.BatchState, {
              AccountIDs: tempData,
              Status: 3,
              Remark: ''
            });
            $('#panelNoPass').modal('show');
          },
          OnBatchPass: function(){
            var da = $scope.vm.DoctorAuth;

            answersService.DoctorAuth.SetState({
              param: da.BatchState,
              callback: function(){
                util.showFade('审核成功!');
                da.OnLoad();
              }
            });
          },
          OnBatchNoPass: function(){
            var da = $scope.vm.DoctorAuth;

            if(!da.BatchState.Remark){
              util.showFade('拒绝理由不能为空!');
              return;
            }
            if(da.BatchState.Remark.length > 40){
              util.showFade('拒绝理由不能超过40个字符!');
              return;
            }

            answersService.DoctorAuth.SetState({
              param: da.BatchState,
              callback: function(){
                $('#panelNoPass').modal('hide');
                util.showFade('审核成功!');
                da.OnLoad();
              }
            });
          },
          OnAddDialog: function(){

             $scope.vm.Common.currentDialog.activeDialog = 'DoctorAuthOnAddDialog';
             $scope.vm.DoctorAuth.Current = { 'AccountId': '', 'Mobile':'','TalentGroupId': -1, 'NickName': '', 'Title': '',
                    'DepartName': null, 'Desc': null, 'Status': -1, 'VerifyImageUrl': null,
                    'LastUpdateTime': '', 'CreateTime': '', 'Size': { 'width':'', 'height':'' } };
             
             //清空fileSelector
             var doctorAuthFile = $("#inputAddDoctorAuthItemSrc");
             doctorAuthFile.after(doctorAuthFile.clone().val(""));
             doctorAuthFile.remove();
             //将图片清空
             $('.mb').find('img').attr("src","")

             $scope.vm.Common.Init();

             $('#panelAddOrModDoctorAuth').modal('show');
             //获取医师健康分组
            //  $scope.vm.DoctorAuth.TalentGroupDDL =  $scope.vm.TalentGroup.OnGetTalentGroupList();
          },
          OnAdd: function(){
            var da = $scope.vm.DoctorAuth;
            answersService.DoctorAuth.Add({
                param: {
                  'Mobile': da.Current.Mobile,
                  'TalentGroupId': da.Current.TalentGroupId,
                  'NickName':da.Current.NickName,
                  'Title': da.Current.Title,
                  'DepartName': da.Current.DepartName,
                  'Desc': da.Current.Desc,
                  'VerifyImageUrl':da.Current.VerifyImageUrl
                },
                callback: function(){
                  da.OnLoad();
                  $('#panelAddOrModDoctorAuth').modal('hide');
                }
              });
          },
          OnModDialog: function(item){
             $scope.vm.Common.currentDialog.activeDialog = 'DoctorAuthOnAddDialog';
             $scope.vm.DoctorAuth.Current = {
                    'AccountId': item.AccountId,
                    'Mobile': '',
                    'TalentGroupId': item.TalentGroupId,
                    'NickName': item.NickName,
                    'Title': item.Title,
                    'DepartName': item.DepartName,
                    'Desc': item.Desc,
                    'Status': item.Status,
                    'VerifyImageUrl': item.VerifyImageUrl,
                    'LastUpdateTime': item.LastUpdateTime,
                    'CreateTime': item.CreateTime,
                    'Size': { 'width':'', 'height':'' }
                  };
             
              //清空fileSelector
             var doctorAuthFile = $("#inputAddDoctorAuthItemSrc");
             doctorAuthFile.after(doctorAuthFile.clone().val(""));
             doctorAuthFile.remove();

             $('#panelAddOrModDoctorAuth').modal('show');
          },
          OnModify: function(){
            var da = $scope.vm.DoctorAuth;

            answersService.DoctorAuth.Modify({
                param: {
                  'AccountId': da.Current.AccountId,
                  'TalentGroupId': da.Current.TalentGroupId,
                  'NickName':da.Current.NickName,
                  'Title': da.Current.Title,
                  'DepartName': da.Current.DepartName,
                  'Desc': da.Current.Desc,
                  'VerifyImageUrl':da.Current.VerifyImageUrl
                },
                callback: function(){
                  da.OnLoad();
                  $('#panelAddOrModDoctorAuth').modal('hide');
                }
              });
          },
          OnUploadImage: function(){
              var tg = $scope.vm.DoctorAuth,
                  cg = $scope.vm.Common.currentDialog,
                  btnImage = $('#inputAddDoctorAuthItemSrc')[0].files[0],
                  width = tg.Current.Size.width,
                  height = tg.Current.Size.height;

                  cg.activeDialog = 'DoctorAuthOnAddDialog';

              if(!btnImage){
                util.showFade('请选择您要上传的图片！');
                return;
              }

              var size = btnImage.size / 1024,
                  // ext = {'jpg': true, 'jpeg': true},
                  ext = {},
                  extName = btnImage.name.split('.').pop();

              if(ext[extName]){
                util.showFade('请选择您要上传的图片！');
                return;
              }
              // if(width>120 || height>120){
              //   util.showFade('图片宽高不能超过120*120');
              //   return;
              // }
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
              instance.upload(filePath, '#inputAddDoctorAuthItemSrc');
          },
          OnUploadImageCallBack: function(data){//图像上传回调函数
              $scope.vm.DoctorAuth.Current.VerifyImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },
          OnLoad: function(){
            answersService.DoctorAuth.List({
              TalentGroupDDLS: $scope.vm.DoctorAuth.TalentGroupDDL,
              callback: function(data){
                $scope.vm.DoctorAuth.List = data;
              }
            });
          },
          OnLoadDDLByTalentGroup: function(){  /* 获取所有的医师健康分组列表*/

            answersService.DoctorAuth.GetDDLByTalentGroup({
              'TalentGroupList': $scope.vm.TalentGroup.List,
              'callback':  function(data){
                  $scope.vm.DoctorAuth.TalentGroupDDL = data;
                  $scope.vm.DoctorAuth.OnLoad();
              }
            });
          },
          OnviewTwoDimensionCode: function(item){
            var dg = $scope.vm.DoctorAuth;
            answersService.DoctorAuth.GetCode({
                param: {
                  'AccountId':item.AccountId
                },
                callback: function(data){
                   dg.Current.twoDimensionCode = data;
                }
              });
             $('#viewTwoDimensionCode').modal('show');
          },
          OnGetShortLink: function(){
              var dg = $scope.vm.DoctorAuth;
              answersService.DoctorAuth.GetShortLink({
                param:{
                    'ShortLink': dg.Current.twoDimensionCode
                },
                callback: function(data){
                    dg.Current.twoDimensionCode = data
                }
              });
          },
          AllTags:[],//所有的标签卡
          DynamicsList:[],//动态列表
          ContentLength:2000,//文本框可以输入的字数
          ViewPicture:'',
          CurrentDynamicsOnTopOrDown:'',
          CurrentDynamics: {
              'count':'',
              'NickName': '',
              'VerifyImageUrl': '',
              'Desc':'',
              'TalentAccountId': '',
              'Title': '',
              'Content': '',
              'Images': [],
              'Tags': [],
              'DelId':''
          },
          OnDelDynamicsDilog: function(item){//删除弹框
              $scope.vm.DoctorAuth.CurrentDynamics.DelId = item.Id;
              $scope.vm.DoctorAuth.CurrentDynamics.TalentAccountId = item.TalentAccountId;  
              $('#delDynamics').modal('show');
          },
          OnLoadDynamicsList: function(TalentAccountId){
              //获取动态列表
              answersService.DoctorAuth.ListByAccountID({
                param: {
                    'TalentAccountId': TalentAccountId
                },
                callback: function(data){
                  $scope.vm.DoctorAuth.DynamicsList = data;
                  $scope.vm.DoctorAuth.CurrentDynamics.count = data.length;
                  if(data.length>0&&data[0]!=null){
                    $scope.vm.DoctorAuth.CurrentDynamics.VerifyImageUrl = data[0].ImgUrl;
                  }else{
                    $scope.vm.DoctorAuth.CurrentDynamics.VerifyImageUrl = item.VerifyImageUrl;
                  }
                  $scope.vm.DoctorAuth.CurrentDynamics.Title = '';
                  $scope.vm.DoctorAuth.CurrentDynamics.Content = '';
                  $scope.vm.DoctorAuth.CurrentDynamics.Images = [];
                  $scope.vm.DoctorAuth.CurrentDynamics.Tags = [];
                  $scope.vm.DoctorAuth.ContentLength = 2000;
                  $scope.vm.DoctorAuth.OnGetAllTags();//获取标签卡
                }
              });
          },
          OnGetAllTags: function(){

              answersService.ActiveTag.GetTagList({//获取标签卡
                callback: function(data){
                  $scope.vm.DoctorAuth.AllTags = data;
                }
              });
          },
          OnViewDeatail: function(item){//详情功能start
              $scope.vm.DoctorAuth.CurrentDynamics.TalentAccountId = item.AccountId;//当前用户的id
              $scope.vm.DoctorAuth.CurrentDynamics.NickName = item.NickName;
              // $scope.vm.DoctorAuth.CurrentDynamics.VerifyImageUrl = item.VerifyImageUrl;
              $scope.vm.DoctorAuth.CurrentDynamics.Desc = item.Desc;

              $scope.vm.DoctorAuth.OnLoadDynamicsList($scope.vm.DoctorAuth.CurrentDynamics.TalentAccountId);

              $scope.vm.DoctorAuth.OnGetAllTags();//获取标签卡

             //弹出分享详情动态的弹框
             $('#viewDynamicsDetail').modal('show');
          },
          OnSaveDynamics: function(){//发布动态
            $scope.vm.DoctorAuth.CurrentDynamics.Tags = answersService.DoctorAuth.convertTagsToNeed($scope.vm.DoctorAuth.AllTags);
            var da = $scope.vm.DoctorAuth.CurrentDynamics;
            answersService.DoctorAuth.AddDynamics({
                param: {
                    'TalentAccountId': da.TalentAccountId,
                    'Title': da.Title,
                    'Content': da.Content,
                    'Images': da.Images,
                    'Tags': da.Tags
                },
                callback: function(data){
                    $scope.vm.DoctorAuth.OnLoadDynamicsList(data.TalentAccountId);
                }
              });
          },
          OnDelDynamics: function(){
            answersService.DoctorAuth.OnDelDynamics({
                param: {
                    'ID': $scope.vm.DoctorAuth.CurrentDynamics.DelId
                },
                callback: function(data){
                    $scope.vm.DoctorAuth.OnLoadDynamicsList($scope.vm.DoctorAuth.CurrentDynamics.TalentAccountId);
                }
              });
          },
          OnchangeState: function(item){
             item.isChosen = !item.isChosen;
          },
          OnshowDynamics: function(){//显示发动态的栏目
            //弹出分享详情动态的弹框
             $('#sendDynamics').css('display','block');
          },
          OnhideDynamics:function(){
             $('#sendDynamics').css('display','none');
          },
          OnchangeContent: function(){
                var content = $scope.vm.DoctorAuth.CurrentDynamics.Content;
                    $scope.vm.DoctorAuth.ContentLength = 2000-content.length;
          },
          OnUploadDynamicsImage: function(){
              var tg = $scope.vm.DoctorAuth,
                  cg = $scope.vm.Common.currentDialog,
                  btnImage = $('#inputAddDynamicsItemSrc')[0].files[0],
                  width = tg.Current.Size.width,
                  height = tg.Current.Size.height,
                  Images = $scope.vm.DoctorAuth.CurrentDynamics.Images;
                  if(Images.length>3){
                    util.showFade('最多上传四张图片');
                    //清空fileSelector
                    var DynamicsFile = $("#inputAddDynamicsItemSrc");
                    DynamicsFile.after(DynamicsFile.clone().val(""));
                    DynamicsFile.remove();
                    return;
                  }
                  cg.activeDialog = 'DynamicsOnAddDialog';

              if(!btnImage){
                util.showFade('请选择您要上传的图片！');
                return;
              }

              var size = btnImage.size / 1024,
                  ext = {},
                  extName = btnImage.name.split('.').pop();

              if(ext[extName]){
                util.showFade('请选择您要上传的图片！');
                return;
              }
              if(size>1024){
                util.showFade('图片大小不能超过1024kb');
                return;
              }

              var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.DoctorHeader, util.randomString(32), extName),
                  instance = new Sand({
                    bucket: Const.ComboConfig.bucket,
                    expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                    form_api_secret: Const.ComboConfig.form_api_secret
                  });

              util.showAjaxLoading();
              instance.upload(filePath, '#inputAddDynamicsItemSrc');
          },
          OnUploadDynamicsImageCallBack: function(data){//图像上传回调函数
            var Images = $scope.vm.DoctorAuth.CurrentDynamics.Images;
              Images.push(Const.ComboConfig.ComboBaseUrl + data['path']);

              //清空fileSelector
              var DynamicsFile = $("#inputAddDynamicsItemSrc");
              DynamicsFile.after(DynamicsFile.clone().val(""));
              DynamicsFile.remove();

              $scope.$apply();
              util.hideAjaxLoading();
          }, 
          OnDelImage: function(index,item){//删除上传的图片
              var Images = $scope.vm.DoctorAuth.CurrentDynamics.Images,
                  temp = [];
                  for(var i =0; i<Images.length;i++){
                      if(index!=i){
                        temp.push(Images[i])
                      }
                  }
              $scope.vm.DoctorAuth.CurrentDynamics.Images = temp;
          },
          //上下架操作
          OnUpOrDownDynamtisDilog:function(item){
              $scope.vm.DoctorAuth.CurrentDynamicsOnTopOrDown = item;
              var isTop = item.IsTop;//是否是头条
              if(isTop){
                  $('#downDynamics').modal('show');
              }else{
                  $('#upDynamics').modal('show');
              }
          },
          //上下头条
          OnUpOrDynamics:function(){
              var item = $scope.vm.DoctorAuth.CurrentDynamicsOnTopOrDown;
              var isTop = item.IsTop;//是否是头条
              if(isTop){
                  $('#downDynamics').modal('hide');
              }else{
                  $('#upDynamics').modal('hide');
              }
              answersService.DoctorAuth.OnUpOrDownDynamtisDilog({
                param: {
                    'ID': item.Id,
                    'IsTop': !isTop
                },
                callback: function(data){
                    $scope.vm.DoctorAuth.OnLoadDynamicsList($scope.vm.DoctorAuth.CurrentDynamics.TalentAccountId);
                    util.showFade('操作成功!');
                }
              });
          },
          OnViewImage: function(item){
             $scope.vm.DoctorAuth.ViewPicture = item;
             //显示图片
             $('#viewPicture').modal('show');
          },//详情功能end
          Init: function(){
            // 获取医师健康分组
            $scope.vm.DoctorAuth.OnLoadDDLByTalentGroup();
          }
        },
        ActiveTag: {//活动标签
          List:[],
          Data:{
            name:'', //添加的标签的名称
            modifyName:'',//修改用名称
            item:{
                no:'',
                name:''
            }
          },
          OnAdd: function(){
            var  currentList = $scope.vm.ActiveTag.List;
            if(currentList,$scope.vm.ActiveTag.Data.name.length==0){
                util.showFade('输入不能为空！');
                return false;
            }
            if(currentList,$scope.vm.ActiveTag.Data.name.length>20){
                util.showFade('请输入不要超过20个字符！');
                return false;
            }
            list = answersService.ActiveTag.conventParams(currentList,$scope.vm.ActiveTag.Data.name);
            answersService.ActiveTag.Modify({
                param:{
                        'Tags': list
                      },
                callback: function(){
                  $("#inputName").val('');
                  $scope.vm.ActiveTag.Data.name = '';
                  $scope.vm.ActiveTag.OnLoad();
                }
              });
          },
          OnLoad : function(){
            answersService.ActiveTag.List({
              callback: function(data){
                $scope.vm.ActiveTag.List = data;
              }
            });
          },
          OnOpenModify : function(item){//修改活动标签窗口
             $scope.vm.ActiveTag.Data.item  = item;
             $('#editDynamics').modal('show');
          },
          OnModify: function(){
            var  currentList = $scope.vm.ActiveTag.List,
                 item = $scope.vm.ActiveTag.Data.item,
                 list = answersService.ActiveTag.modifyList(currentList,item);
            if(item.name.length==0){
                util.showFade('输入不能为空！');
                return false;
            }
            if(item.name.length>20){
                util.showFade('请输入不要超过20个字符！');
                return false;
            }
            answersService.ActiveTag.Modify({
                param:{
                        'Tags': list
                      },
                callback: function(){
                  $scope.vm.ActiveTag.OnLoad();
                  $('#editDynamics').modal('hide');
                }
              });
          },
          OnDown: function(item){
              $scope.vm.ActiveTag.Data.item  = item;
              var  currentList = $scope.vm.ActiveTag.List,
                  item = $scope.vm.ActiveTag.Data.item,
                  list = answersService.ActiveTag.modifyDown(currentList,item);
              answersService.ActiveTag.Modify({
                  param:{
                          'Tags': list
                        },
                  callback: function(){
                    $scope.vm.ActiveTag.OnLoad();
                  }
                });
          },
          OnUp: function(item){
              $scope.vm.ActiveTag.Data.item  = item;
              var  currentList = $scope.vm.ActiveTag.List,
                  item = $scope.vm.ActiveTag.Data.item,
                  list = answersService.ActiveTag.modifyUp(currentList,item);
              answersService.ActiveTag.Modify({
                  param:{
                          'Tags': list
                        },
                  callback: function(){
                    $scope.vm.ActiveTag.OnLoad();
                  }
                });
          },
          OnAllUp: function(item){
              $scope.vm.ActiveTag.Data.item  = item;
              var  currentList = $scope.vm.ActiveTag.List,
                  item = $scope.vm.ActiveTag.Data.item,
                  list = answersService.ActiveTag.OnAllUp(currentList,item);
              answersService.ActiveTag.Modify({
                  param:{
                          'Tags': list
                        },
                  callback: function(){
                    $scope.vm.ActiveTag.OnLoad();
                  }
                });
          },
          OnAllDown: function(item){
              $scope.vm.ActiveTag.Data.item  = item;
              var  currentList = $scope.vm.ActiveTag.List,
                  item = $scope.vm.ActiveTag.Data.item,
                  list = answersService.ActiveTag.OnAllDown(currentList,item);
              answersService.ActiveTag.Modify({
                  param:{
                          'Tags': list
                        },
                  callback: function(){
                    $scope.vm.ActiveTag.OnLoad();
                  }
                });
          },
          OnDeleteDialog: function(item){
              $scope.vm.ActiveTag.Data.item  = item;
              $('#delActivityTags').modal('show');
          },
          OnDelete: function(){
              var  currentList = $scope.vm.ActiveTag.List,
                  item = $scope.vm.ActiveTag.Data.item,
                  list = answersService.ActiveTag.OnDelete(currentList,item);
              answersService.ActiveTag.Modify({
                  param:{
                          'Tags': list
                        },
                  callback: function(){
                    $scope.vm.ActiveTag.OnLoad();
                  }
                });
          },
          Init: function(){
            $scope.vm.ActiveTag.OnLoad();
          }
        },
        TalentConsultation:{//问答圈咨询
          AllChecked: false,
          List: [],
          BatchState:{
            SubjectIds: [],
            State: -1,
          },
          Search:{
            'Content': '',
            'StartTime': null,
            'EndTime': null,
            'State': -1,
            'Page': 1,
            'Count': 10
          },
          OnSearch: function(){//点击插件实现数据拉取分页
              var ag = $scope.vm.TalentConsultation.Search;
              ag.Page = $scope.vm.TalentConsultation.pageModel.currentPage;
              ag.Count = $scope.vm.TalentConsultation.pageModel.itemsPerPage;
              if(ag.Page == 0){
                ag.Page = 1;
              }
              if($('#StartTime').val()){
                  ag.StartTime  = $('#StartTime').val()+' '+'00:00:00';
              }
              if($('#EndTime').val()){
                  ag.EndTime  = $('#EndTime').val()+' '+'23:59:59';
              }
              answersService.TalentConsultation.List({
              param: $scope.vm.TalentConsultation.Search,
              callback: function(data,TotalCounts){
                $scope.vm.TalentConsultation.List = data;
                $scope.paginationConf.totalItems = TotalCounts;
                if(TotalCounts==0){
                  $scope.vm.TalentConsultation.pageModel.currentPage = 0;
                }
              }
              });
          },
          OnSearchClick: function(){//点击搜索按钮实现分页
              var ag = $scope.vm.TalentConsultation.Search;
              $scope.vm.TalentConsultation.pageModel.currentPage = 1;
              ag.Page = $scope.vm.TalentConsultation.pageModel.currentPage;
              ag.Count = $scope.vm.TalentConsultation.pageModel.itemsPerPage;
              if(ag.Page == 0){
                ag.Page = 1;
              }
              if($('#StartTime').val()){
                  ag.StartTime  = $('#StartTime').val()+' '+'00:00:00';
              }
              if($('#EndTime').val()){
                  ag.EndTime  = $('#EndTime').val()+' '+'23:59:59';
              }
              answersService.TalentConsultation.List({
              param: $scope.vm.TalentConsultation.Search,
              callback: function(data,TotalCounts){
                $scope.vm.TalentConsultation.List = data;
                $scope.paginationConf.totalItems = TotalCounts;
                if(TotalCounts==0){
                  $scope.vm.TalentConsultation.pageModel.currentPage = 0;
                }
              }
              });
          },
          TalentConsultationDDL: [
            { text: '全部', value: -1 },
            { text: '上架', value: 1 },
            { text: '下架', value: 3 },
          ],
          OnClickAllChecked: function(){
            var da = $scope.vm.TalentConsultation;

            for(var i=0; i< da.List.length; i++){
              var item = da.List[i];
              item.IsChecked = da.AllChecked;
            }
          },
          OnViewTalentConsultation: function(){
             $('#TalentConsultationDetail').modal('show');
            
          },
          OnLoad: function(){
            answersService.TalentConsultation.List({
              param: {
                  'Content': '',
                  'StartTime': null,
                  'EndTime': null,
                  'State': -1,
                  'Page': $scope.vm.TalentConsultation.Search.Page,
                  'Count': $scope.vm.TalentConsultation.Search.Count
              },
              callback: function(data,TotalCounts){
                $scope.vm.TalentConsultation.List = data;
                $scope.paginationConf = $scope.vm.TalentConsultation.pageModel;
                $scope.paginationConf.totalItems = TotalCounts;
              }
            });
          },
          OnUpOrDown: function(item,state){
            var da = $scope.vm.TalentConsultation;

            answersService.TalentConsultation.SetState({
              param: {
                  "SubjectIds": [
                    item.ID
                  ],
                  "State": state
              },
              callback: function(){
                util.showFade('操作成功!');
                $scope.vm.TalentConsultation.OnLoad();
              }
            });
          },
          OnBatchStateDialog: function(Event, State){
              var da = $scope.vm.TalentConsultation,
                  list = da.List,
                  tempData = [];
              for(var i=0; i< list.length; i++){
                  if(list[i].IsChecked) tempData.push(list[i].ID);
              }
              if(tempData.length == 0){
                  util.showFade('请选择您要操作的项!');
                  Event.stopPropagation();
                  return;
              }
              angular.extend(da.BatchState, {
                'SubjectIds': tempData,
                'State': State
              });
          },
          OnBatchStateUpOrDown: function(){
              var da = $scope.vm.TalentConsultation;

              answersService.TalentConsultation.SetState({
                param: {
                    "SubjectIds": da.BatchState.SubjectIds,
                    "State": da.BatchState.State
                },
                callback: function(){
                  util.showFade('操作成功!');
                  angular.extend(da.BatchState, {
                    'SubjectIds': [],
                    'State': -1
                  });
                  da.OnLoad();
                }
              });
          },
          pageModel: {
            currentPage: 1,    //当前所在的页
            itemsPerPage: 10,  //每页展示的数据条数
            pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
            perPageOptions: [10, 20, 30, 40, 50],    //可选择显示条数的数组
            rememberPerPage: 'perPageItems',  //使用LocalStorage记住所选择的条目数的名称
            onChange: function () {
              if($scope.vm.TalentConsultation.pageModel.currentPage != 0){
                $scope.vm.TalentConsultation.OnSearch();
              }
            }
         },
          Init: function(){
             $scope.vm.TalentConsultation.OnLoad();
              var startDateTextBox = $('#StartTime');
              var endDateTextBox = $('#EndTime');
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
        },
        Init: function(){
          var vm = $scope.vm;

          vm.Common.Init();
          vm.TalentGroup.Init();
          vm.DoctorAuth.Init();
          vm.ActiveTag.Init();//活动标签
          vm.TalentConsultation.Init();
        }
      }).Init();

  }]);
  return app;
});
