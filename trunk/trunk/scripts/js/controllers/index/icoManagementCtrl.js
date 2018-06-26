/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/const', 'model/icoManagementModel'], function (app, util, Const, vModel) {
  app.controller('icoManagementCtrl', function ($scope, $http, signValid) {
       
    $("#inputEditReportItemSrc").change(function (){                                // 获取上传图片尺寸
        var $$Edit = $scope.vm.icoManagementCollection.Edit,
            file = this.files[0],
            _URL = window.URL || window.webkitURL;
            img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function(){
            $$Edit.ImageSize.imgwidth = this.width;
            $$Edit.ImageSize.imgheight = this.height;            
        }
    })
    $("#inputAddReportItemSrc").change(function (){                                 // 获取上传图片尺寸
        var $$Add = $scope.vm.icoManagementCollection.Add,
            file = this.files[0],
            _URL = window.URL || window.webkitURL;
            img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function(){
            $$Add.ImageSize.imgwidth = this.width;
            $$Add.ImageSize.imgheight = this.height;         
        }
    })

    var BASE = {
        Title: '',
        URLS: {
            Search: 'BMSReportinfo/GetList',
            List: 'BMSReportinfo/GetList',
            Add: 'BMSReportinfo/AddOrModify',
            Edit: 'BMSReportinfo/AddOrModify',
            Del: 'BMSReportinfo/Remove'
        },
        GET: function(url, successCallback){
            util.ajaxGet($http, url, function(result){
                if (result.state == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
            }, BASE.ErrorCallback);
        },
        POST: function(url, param, successCallback){
            util.ajaxPost($http, url, param, function(result){
                if (result.state == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
            }, BASE.ErrorCallback);
        },
        ZPOST: function(url, param, successCallback){
            util.ajaxZSTJPost($http, url, param, function(result){
                if (result.Code == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
            }, BASE.ErrorCallback);
        },
        ErrorCallback: function (error) {
            util.showFade('获取数据失败,请重试!');
        }
    };

    $scope.vm = {
        icoManagementCollection:{

            CurrentData:{
                activeDialog: ''
            },
            OnLoad: function(){

                var $$this = $scope.vm.icoManagementCollection,
                    $$search = $$this.Search,
                    $$list = $$this.List,
                    $$param = $$search.Param,
                    $$vm = new vModel(),
                    $$tempData = [];

                BASE.ZPOST(BASE.URLS.Search, {ReportItemName: ''}, function(result){

                    for(var i=0; i< result.length; i++){
                        var item = result[i],
                        viewModel = $$vm.convertIconListFromList(item);

                        $$tempData.push(viewModel);
                    }
                    $$list.Data = $$tempData;
                });
            },
            Search: {
                Param: {
                  ReportItemName: ''
                },
                OnClick: function(){
                    var $$this = $scope.vm.icoManagementCollection,
                        $$search = $$this.Search,
                        $$list = $$this.List,
                        $$param = $$search.Param,
                        $$vm = new vModel(),
                        $$tempData = [];

                    BASE.ZPOST(BASE.URLS.Search, $$param, function(result){

                      for(var i=0; i< result.length; i++){
                          var item = result[i],
                            viewModel = $$vm.convertIconListFromList(item);

                          $$tempData.push(viewModel);
                      }
                      $$list.Data = $$tempData;
                    });
                },
                Init: function(){
                    var $$this = $scope.vm.icoManagementCollection,
                        $$search = $$this.Search;

                    $$search.OnClick();
                }
            },
            List: {
               Data: []
            },
            Add: {
                CurrentDialog: 'AddDialog',
                IsShowName: true,
                SelectName: '',
                UploadSrc: '',
                Current: {
                  ID:'',
                  Tags: [],
                  ReportItemSrc:'',
                  ReportItemSrcState: false
                },
                ImageSize:{                                 // 添加图片的尺寸
                    imgwidth:'',
                    imgheight:''
                },
                CurrentTagList:[],
                OnOpenDialog: function(){
                    var $$this = $scope.vm.icoManagementCollection.Add;
                    $scope.vm.icoManagementCollection.Add.CurrentTagList = [];
                    $scope.vm.icoManagementCollection.CurrentData.activeDialog = $$this.CurrentDialog;
                    $$this.Current = {
                      ID:'',
                      Tags: [],
                      ReportItemSrc:'http://zhangshangtijian.b0.upaiyun.com/default/reportIcon/UEipCcFSipVBr3SRkT2EJulxTMdBTzco.png',
                      ReportItemSrcState: false
                    };
                    $$this.IsShowName = true;
                    $$this.UploadSrc = '';
                    $$this.SelectName = '';
                },
                OnClickAddName: function(){
                  var $$this = $scope.vm.icoManagementCollection.Add;
                  $$this.IsShowName = false;
                },
                OnClickSaveName: function(){
                  var $$this = $scope.vm.icoManagementCollection.Add,
                      $$selectName = $$this.SelectName,
                      iconModel = new vModel();
                  if($$selectName){
                      $$this.Current.Tags.push($$selectName);
                      $$this.CurrentTagList = iconModel.convertTagList($$this.Current.Tags);
                      $$this.SelectName = '';
                      $$this.IsShowName = true;
                  } else {
                    util.showFade('请录入您要添加的图标名称!');
                  }
                },
                OnClickCancelName: function(){
                  var $$this = $scope.vm.icoManagementCollection.Add;
                      $$this.SelectName = '';
                      $$this.IsShowName = true;
                },
                OnClickRemoveName: function(item){
                  var $$this = $scope.vm.icoManagementCollection.Add,
                      CurrentTagList = $$this.CurrentTagList,
                      tempData = [],
                      iconModel = new vModel();
                  if(CurrentTagList!=null&&CurrentTagList.length>0){
                    for(var i=0; i< CurrentTagList.length; i++){
                        if(item.no != i){
                            tempData.push(CurrentTagList[i].name);
                        }
                    }
                  }
                  $$this.Current.Tags = tempData;
                  $$this.CurrentTagList = iconModel.convertTagList($$this.Current.Tags);
                },
                OnClickChangeCurrentState: function(flag){
                  var $$this = $scope.vm.icoManagementCollection.Add;
                  $$this.Current.ReportItemSrcState = flag;
                },
                OnClickUploadImage: function(){
                  var $$this = $scope.vm.icoManagementCollection,
                      $$current = $$this.Add.Current,
                      $$id = '#inputAddReportItemSrc'
                      Imgwidth = $$this.Add.ImageSize.imgwidth,                           //图片的宽度
                      Imgheight = $$this.Add.ImageSize.imgheight,                         //图片的高度
                      Imgsize = $($$id)[0].files[0].size/1024;                            //图片的大小;
                      // 上传又拍云
                      //   if (!$("#inputEditReportItemSrc")[0].files[0]){

                      if (!$($$id)[0].files[0]){
                        util.showFade('请选择您要上传的图片！');
                        return;
                      }else if ($($$id)[0].files[0].name.split('.').pop() != "png"){
                        util.showFade('请选择正确的图片文件！');
                        return;
                      }else if(Imgwidth>92 || Imgheight>92){
                        util.showFade("图片宽高不能超过92*92");
                        return;
                      }else if(Imgsize>100){
                        util.showFade("图片大小不能超过100kb");
                        return;
                      }
                      util.showAjaxLoading();
                        var ext = '.' + $($$id)[0].files[0].name.split('.').pop();
                        var config = {
                        bucket: Const.ComboConfig.bucket,
                        expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                        form_api_secret: Const.ComboConfig.form_api_secret
                      };

                      var instance = new Sand(config);
                      var fileName = util.randomString(32) + ext;
                      var pathName = Const.ComboConfig.reportIconPath;
                      instance.upload(pathName + fileName, $$id);
                },

                UploadImgCallBack: function (data){        //上传图片回调
                    var $$this = $scope.vm.icoManagementCollection,
                    $$current = $$this.Add.Current;
                    $$current.ReportItemSrc = Const.ComboConfig.ComboBaseUrl + data['path'];

                    //清空fileSelector
                    var File = $("#inputAddReportItemSrc");
                    File.after(File.clone().val(""));
                    File.remove();

                    $scope.$apply();
                    util.hideAjaxLoading();
                },

                OnClick: function(){
                    var $$this = $scope.vm.icoManagementCollection,
                        $$list = $$this.List,
                        $$current = $$this.Add.Current,
                        param = {
                            ID:$$current.Id,
                            Tags:$$current.Tags,
                            ReportItemSrc: $$current.ReportItemSrc,
                            ReportItemSrcState: $$current.ReportItemSrcState
                        };
                    console.log(param)
                    if(!$$current.Tags.length){
                      util.showFade('请录入您要添加的图标名称!');
                    } else {
                      BASE.ZPOST(BASE.URLS.Add, param, function(result){
                          $scope.vm.icoManagementCollection.OnLoad();
                          $scope.vm.icoManagementCollection.Search.Param.ReportItemName = '';
                          $scope.vm.icoManagementCollection.Add.Current.ID = '';
                          $scope.vm.icoManagementCollection.Add.Current.Tags = [];
                          $scope.vm.icoManagementCollection.Add.CurrentTagList = [];
                          $scope.vm.icoManagementCollection.Add.Current.ReportItemSrc = '';
                          $scope.vm.icoManagementCollection.Add.Current.ReportItemSrcState = false;
                          $('#myListAdd').modal('hide');
                      });
                    }
                }
            },
            Edit: {
                CurrentDialog:"EditDialog",
                IsShowName: true,
                SelectName: '',
                UploadSrc: '',
                Current: {
                  ID:'',
                  Tags: [],
                  ReportItemSrc:'',
                  ReportItemSrcState: false
                },
                CurrentTagList:[],
                ImageSize:{                                 // 添加图片的尺寸
                    imgwidth:'',
                    imgheight:''
                },
                OnOpenDialog: function(item){
                    var $$this = $scope.vm.icoManagementCollection.Edit;
                    
                    $scope.vm.icoManagementCollection.CurrentData.activeDialog = $$this.CurrentDialog;
                    $$this.Current = {
                      ID: item.Id,
                      Tags: item.Tags,
                      ReportItemSrc: item.ReportItemSrc,
                      ReportItemSrcState: item.ReportItemSrcState
                    };
                    iconModel = new vModel();
                    $$this.CurrentTagList = iconModel.convertTagList($$this.Current.Tags);

                },
                OnClickAddName: function(){
                  var $$this = $scope.vm.icoManagementCollection.Edit;
                  $$this.IsShowName = false;
                },
                OnClickSaveName: function(){
                  var $$this = $scope.vm.icoManagementCollection.Edit,
                      $$selectName = $$this.SelectName;
                      iconModel = new vModel();
                  if($$selectName){
                      $$this.Current.Tags.push($$selectName);
                      $$this.CurrentTagList = iconModel.convertTagList($$this.Current.Tags);
                      $$this.SelectName = '';
                      $$this.IsShowName = true;
                  } else {
                    util.showFade('请录入您要添加的图标名称!');
                  }
                },
                OnClickCancelName: function(){
                  var $$this = $scope.vm.icoManagementCollection.Edit;
                      $$this.SelectName = '';
                      $$this.IsShowName = true;
                },
                OnClickRemoveName: function(item){
                  var $$this = $scope.vm.icoManagementCollection.Edit,
                      CurrentTagList = $$this.CurrentTagList,
                      tempData = [],
                      iconModel = new vModel();
                  if(CurrentTagList!=null&&CurrentTagList.length>0){
                    for(var i=0; i< CurrentTagList.length; i++){
                        if(item.no != i){
                            tempData.push(CurrentTagList[i].name);
                        }
                    }
                  }
                  $$this.Current.Tags = tempData;
                  $$this.CurrentTagList = iconModel.convertTagList($$this.Current.Tags);
                },
                OnClickChangeCurrentState: function(flag){
                  var $$this = $scope.vm.icoManagementCollection.Edit;
                  $$this.Current.ReportItemSrcState = flag;
                },
                OnClickUploadImage: function(){
                  var $$this = $scope.vm.icoManagementCollection,
                      $$current = $$this.Edit.Current,
                      Imgwidth = $$this.Edit.ImageSize.imgwidth,                           //图片的宽度
                      Imgheight = $$this.Edit.ImageSize.imgheight,                         //图片的高度
                      Imgsize = $('#inputEditReportItemSrc')[0].files[0].size/1024;        //图片的大小
                      if (!$("#inputEditReportItemSrc")[0].files[0]){
                        util.showFade('请选择您要上传的图片！');
                        return;
                      }else if ($("#inputEditReportItemSrc")[0].files[0].name.split('.').pop() != "png"){
                        util.showFade("请选择正确的图片文件！");
                        return;
                      }else if(Imgwidth>92 || Imgheight>92){
                        util.showFade("图片宽高不能超过92*92");
                        return;
                      }else if(Imgsize>100){
                        util.showFade("图片大小不能超过100kb");
                        return;
                      }
                      util.showAjaxLoading();
                        var ext = '.' + $("#inputEditReportItemSrc")[0].files[0].name.split('.').pop();
                        var config = {
                        bucket: Const.ComboConfig.bucket,
                        expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                        form_api_secret: Const.ComboConfig.form_api_secret
                      };
                      var instance = new Sand(config);
                      var fileName = util.randomString(32) + ext;
                      var pathName = Const.ComboConfig.reportIconPath;
                      instance.upload(pathName + fileName,"#inputEditReportItemSrc");
                },

                UploadImgCallBack: function (data){            //上传图片回调
                    var $$this = $scope.vm.icoManagementCollection,
                    $$current = $$this.Edit.Current;
                    $$current.ReportItemSrc = Const.ComboConfig.ComboBaseUrl + data['path'];

                    //清空fileSelector
                    var File = $("#inputEditReportItemSrc");
                    File.after(File.clone().val(""));
                    File.remove();

                    $scope.$apply();
                    util.hideAjaxLoading();
                },
                OnCancelClick: function(){
                    $scope.vm.icoManagementCollection.OnLoad();
                },
                OnClick: function(){
                    var $$this = $scope.vm.icoManagementCollection,
                        $$list = $$this.List,
                        $$current = $$this.Edit.Current,
                        param = {
                            ID:$$current.ID,
                            Tags:$$current.Tags,
                            ReportItemSrc: $$current.ReportItemSrc,
                            ReportItemSrcState: $$current.ReportItemSrcState
                        };
                        console.log($$current)
                        console.log(param)
                    if(!$$current.Tags.length){
                      util.showFade('请录入您要添加的图标名称!');
                    } else if(!$$current.ReportItemSrc){
                      util.showFade('你选择你要上传的图标!');
                    } else {
                      BASE.ZPOST(BASE.URLS.Edit, param, function(result){
                          $scope.vm.icoManagementCollection.OnLoad();
                          $scope.vm.icoManagementCollection.Add.Current.ID = '';
                          $scope.vm.icoManagementCollection.Add.Current.Tags = [];
                          $scope.vm.icoManagementCollection.Add.CurrentTagList = [];
                          $scope.vm.icoManagementCollection.Add.Current.ReportItemSrc = '';
                          $scope.vm.icoManagementCollection.Add.Current.ReportItemSrcState = false;
                          $('#myListEdit').modal('hide');
                      });
                    }
                }
            },
            Del: {
                ID:'',
                OnOpenDialog: function(item){
                    var $$this = $scope.vm.icoManagementCollection.Del;
                    $$this.ID = item.Id;
                },
                OnClick: function(){
                    var $$this = $scope.vm.icoManagementCollection,
                        $$ID = $$this.Del.ID;
                  BASE.ZPOST(BASE.URLS.Del, { ID: $$ID }, function(result){
                    $scope.vm.icoManagementCollection.OnLoad();
                    $('#myListDel').modal('hide');
                  });
                }
            },
            Init: function(){
                var $$this = $scope.vm.icoManagementCollection;
                $$this.Search.Init();
                document.addEventListener('uploaded', function(e){
                    if ($$this.CurrentData.activeDialog==$$this.Add.CurrentDialog){
                        var self = $$this.Add;
                    }else if($$this.CurrentData.activeDialog==$$this.Edit.CurrentDialog){
                        var self = $$this.Edit;
                    }else {
                        return;
                    }
                    self.UploadImgCallBack(e.detail);
                });
            }
        },
        Init: function(){
            var $$this = $scope.vm.icoManagementCollection;
            $$this.Init();

            signValid.ValidAccess('#/icoManagement');                                           // 缓存登录验证
            /* eslint-disable no-undef */
            $('.nav li:eq(18)').addClass('active').siblings().removeClass('active');     // 侧边栏样式
            $('body').css('overflow', 'auto');
        }
    };

    $scope.vm.Init();

  });
  return app;
});


