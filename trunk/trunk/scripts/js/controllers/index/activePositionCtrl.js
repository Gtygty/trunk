define(['indexApp', 'common/util', 'common/const', 'model/activePositionModel']
  , function (app, util, Const,activePositionModel) {
    app.controller('activePositionCtrl', function ($scope, $http, signValid)   {

      var _ActivePosition,startDateTextBox, endDateTextBox;

      //项目请求地址
      var BaseUrl = {
          //获取列表信息
          AdsenseList:"BMSAdsense/AdsenseList",
          //添加一条广告位
          AddAdsense: "BMSAdsense/AddAdsense",
          //修改一条广告位
          ModifyAdsense: "BMSAdsense/ModifyAdsense"
      };

      ($scope.vm = {

        ActivePosition:{

          data:{ 
            "Id":0,
            "activeDialog":"",
            params:{
              "Name": null,
              "Type": 1,
              "ShareImg": null,
              "SubTitle": null,
              "ShareUrl": null,
              "Location": -1,
              "Img": null,
              "StartTime": null,
              "EndTime": null,
              "Url": null,
              "ClassNameAndroid": null,
              "ParamsAndroid": null,
              "ClassNameIOS": null,
              "ParamsIOS": null,
              "BannerImg":null
            },
            modifyParams:{
              "Id": 0,
              "ShareImg": null,
              "SubTitle": null,
              "ShareUrl": null,
              "Img": null,
              "StartTime": null,
              "EndTime": null,
              "Remark": null,
              "BannerImg":null
            },
            "Location": 1,
            "ActivePositionLocationList":[],
            "Count":0,
            "Size": { "width":'', "height":'' }
          },

          //活动类型
          TypeList:[ 
             {Value: 1,Text:"链接"}
            ,{Value: 2,Text:"原生"}
          ],

          //活动位类型
          LocationList:[ 
             {Value: -1,Text:" --请选择-- "}
            ,{Value: 1,Text:"活动位1"}
            ,{Value: 2,Text:"活动位2"}
            ,{Value: 3,Text:"活动位3"}
            ,{Value: 4,Text:"活动位4"}
            ,{Value: 6,Text:"活动位5"}
            ,{Value: 5,Text:"首页弹出广告"}
          ],

          //设置状态值
          OnSetLocation(location){
            _ActivePosition.data.Location = location;
          },

          //获取列表
          OnGetList:function(){
            var url = BaseUrl.AdsenseList;
            var params = {
                "Location": _ActivePosition.data.Location
            }
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                _ActivePosition.data.ActivePositionLocationList = [];
                result.Data.forEach(function(item ,idex, array){
                  var model = activePositionModel.ConvertInfo(item);
                  _ActivePosition.data.ActivePositionLocationList.push((model));
                });
                _ActivePosition.data.Count = _ActivePosition.data.ActivePositionLocationList.length;
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },

          //重置参数
          OnResetParams:function(){
              //重置参数
              _ActivePosition.data.params.Name = null;
              _ActivePosition.data.params.Type = 1;
              _ActivePosition.data.params.Location = -1;
              _ActivePosition.data.params.ShareImg = null;
              _ActivePosition.data.params.SubTitle = null;
              _ActivePosition.data.params.ShareUrl = null;
              _ActivePosition.data.params.Img = null;
              _ActivePosition.data.params.StartTime = null;
              _ActivePosition.data.params.EndTime = null;
              _ActivePosition.data.params.Url = null;
              _ActivePosition.data.params.ClassNameAndroid = null;
              _ActivePosition.data.params.ParamsAndroid = null;
              _ActivePosition.data.params.ClassNameIOS = null;
              _ActivePosition.data.params.ParamsIOS = null;
              _ActivePosition.data.params.BannerImg = null;
              $(".chooseOne").show();
              $(".chooseTwo").hide(); 
              //清空fileSelector
              var file = $("#inputAddSrc");
              file.after(file.clone().val(""));
              file.remove();
              //将图片清空
              $('.mb').find('img').attr("src","")
              //清空时间
              $('#startDate').val("");
              $('#endDate').val(""); 
              //清空fileSelector
              var file = $("#inputAddBannerSrc");
              file.after(file.clone().val(""));
              file.remove();
              //将图片清空
              _ActivePosition.Init();
          },

          //添加活动位弹框
          OnOpenAddDialog:function(){
              _ActivePosition.OnResetParams();
              $('#panelAddOrModActivePosition').modal('show');
          },

          //上传图片
          OnUploadImage: function(){
              _ActivePosition.data.activeDialog = "add";
              btnImage = $('#inputAddSrc')[0].files[0],
              width = _ActivePosition.data.Size.width,
              height = _ActivePosition.data.Size.height;

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

              var params = _ActivePosition.data.params;
              if(params.Location == -1){
                util.showFade('请先选择活动类型，根据活动类型上传图片！');
                return false;
              }
              if(params.Location == 1){//活动位一(326x480)
                  if(width != height * 2){
                    util.showFade('图片宽高比为2:1');
                    return;
                  }
              }
              else if(params.Location == 5){
                  if(width>500 || height>760){
                    util.showFade('图片宽高不能超过500*760');
                    return;
                  }
              }
              else {
                  if(width != height){
                    util.showFade('图片宽高比为1:1');
                    return;
                  }
              }

              var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.ActivePositionImages, util.randomString(32), extName),
                  instance = new Sand({
                    bucket: Const.ComboConfig.bucket,
                    expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                    form_api_secret: Const.ComboConfig.form_api_secret
                  });
              util.showAjaxLoading();
              instance.upload(filePath, '#inputAddSrc');
          },

          //上传banner图片
          OnUploadBannerImage:function(){
            _ActivePosition.data.activeDialog = "addBanner";
            btnImage = $('#inputAddBannerSrc')[0].files[0],
            width = _ActivePosition.data.Size.width,
            height = _ActivePosition.data.Size.height;

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
            if(width>750 || height>390){//750*390
              util.showFade('图片宽高不能超过750*390');
              return;
            }

            var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.ActivePositionImages, util.randomString(32), extName),
                instance = new Sand({
                  bucket: Const.ComboConfig.bucket,
                  expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                  form_api_secret: Const.ComboConfig.form_api_secret
                });
            util.showAjaxLoading();
            instance.upload(filePath, '#inputAddBannerSrc');
          },
          //上传分享图片
          OnUploadShareImage:function(){
            _ActivePosition.data.activeDialog = "addShare";
            btnImage = $('#inputAddShareSrc')[0].files[0],
            width = _ActivePosition.data.Size.width,
            height = _ActivePosition.data.Size.height;

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
            if(width != height){
              util.showFade('图片宽高比为1:1');
              return;
            }

            var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.ActivePositionImages, util.randomString(32), extName),
                instance = new Sand({
                  bucket: Const.ComboConfig.bucket,
                  expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                  form_api_secret: Const.ComboConfig.form_api_secret
                });
            util.showAjaxLoading();
            instance.upload(filePath, '#inputAddShareSrc');
          },

          //编辑图片
          OnEditUploadImage:function(){
              _ActivePosition.data.activeDialog = "edit";
              btnImage = $('#inputEditSrc')[0].files[0],
              width = _ActivePosition.data.Size.width,
              height = _ActivePosition.data.Size.height;

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
              var params = _ActivePosition.data.params;
              if(params.Location == -1){
                util.showFade('请先选择活动类型，根据活动类型上传图片！');
                return false;
              }
              if(params.Location == 1){//活动位一(326x480)
                  if(width != height * 2){
                    util.showFade('图片宽高比为2:1');
                    return;
                  }
              }
              else {//420x224
                  if(width != height){
                    util.showFade('图片宽高比为1:1');
                    return;
                  }
              }

              var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.ActivePositionImages, util.randomString(32), extName),
                  instance = new Sand({
                    bucket: Const.ComboConfig.bucket,
                    expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                    form_api_secret: Const.ComboConfig.form_api_secret
                  });
              util.showAjaxLoading();
              instance.upload(filePath, '#inputEditSrc');
          },

          //编辑banner图
          OnEditUploadBannerImage:function(){
            _ActivePosition.data.activeDialog = "editBanner";
            btnImage = $('#inputEditBannerSrc')[0].files[0],
            width = _ActivePosition.data.Size.width,
            height = _ActivePosition.data.Size.height;

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
            if(width>750 || height>390){//750*390
              util.showFade('图片宽高不能超过750*390');
              return;
            }

            var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.ActivePositionImages, util.randomString(32), extName),
                instance = new Sand({
                  bucket: Const.ComboConfig.bucket,
                  expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                  form_api_secret: Const.ComboConfig.form_api_secret
                });
            util.showAjaxLoading();
            instance.upload(filePath, '#inputEditBannerSrc');
          },
          //编辑Share图
          OnEditUploadShareImage:function(){
            _ActivePosition.data.activeDialog = "editShare";
            btnImage = $('#inputEditShareSrc')[0].files[0],
            width = _ActivePosition.data.Size.width,
            height = _ActivePosition.data.Size.height;

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
            if(width != height){
              util.showFade('图片宽高比为1:1');
              return;
            }

            var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.ActivePositionImages, util.randomString(32), extName),
                instance = new Sand({
                  bucket: Const.ComboConfig.bucket,
                  expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                  form_api_secret: Const.ComboConfig.form_api_secret
                });
            util.showAjaxLoading();
            instance.upload(filePath, '#inputEditShareSrc');
          },

          //图片回调地址
          OnAdUploadImageCallBack: function(data){
              _ActivePosition.data.params.Img = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },

          //添加banner图回调地址
          OnAdUploadBannerImageCallBack:function(data){
              _ActivePosition.data.params.BannerImg = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },
          //添加Share图回调地址
          OnAdUploadShareImageCallBack:function(data){
              _ActivePosition.data.params.ShareImg = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },

          //图片回调地址
          OnModifyUploadImageCallBack: function(data){
              _ActivePosition.data.modifyParams.Img = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },
          
          //图片回调地址
          OnModifyUploadBannerImageCallBack: function(data){
              _ActivePosition.data.modifyParams.BannerImg = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },
          //Share图片回调地址
          OnModifyUploadShareImageCallBack: function(data){
              _ActivePosition.data.modifyParams.ShareImg = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },

          //编辑框内容动态编辑
          OnchangeEditDialog(){
              $(".chooseOne").toggle();
              $(".chooseTwo").toggle();
          },

          //时间转换
          OnconvertDateFromString:function(dateString) { 
            if (dateString) { 
                var startDateTemp = dateString.split(" ");   
                var arrStartDate = startDateTemp[0].split("-");   
                var arrStartTime = startDateTemp[1].split(":");  
                var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]); 
                return allStartDate;
            } 
          },

          //添加
          OnAdd:function(){
            var url = BaseUrl.AddAdsense;
            var params = _ActivePosition.data.params;
            params.StartTime = $("#startDate").val();
            params.EndTime = $("#endDate").val();
            if(params.Location == -1){
              util.showFade('请选择活动类型！');
              return false;
            }
            if(!params.Name){
              util.showFade('请填写名称！');
              return false;
            }
            if(!params.SubTitle){
              util.showFade('请填写副标题！');
              return false;
            }
            if(params.Name.length>30){
              util.showFade('名称在30个字符内！');
              return false;
            }
            if(!params.Img){
              util.showFade('必须上传图片！');
              return false;
            }
            if(!params.ShareImg){
              util.showFade('必须上传分享图片！');
              return false;
            }
            // if(!params.BannerImg){
            //   util.showFade('必须上传Banner图片！');
            //   return false;
            // }
            if(!params.StartTime){
              util.showFade('请选择开始时间！');
              return false;
            }
            if(!params.EndTime){
              util.showFade('请选择结束时间！');
              return false;
            }
            if(params.Type == 1){//链接类型，url必传
                if(!params.Url){
                  util.showFade('请填写url！');
                  return false;
                }
                if(params.Url.length>200){
                  util.showFade('url在200个字符内！');
                  return false;
                }
            }else if(params.Type == 2){//原生类型，android和ios值必传
                if(!params.ClassNameAndroid||!params.ParamsAndroid||!params.ClassNameIOS||!params.ParamsIOS){
                  util.showFade('请填写原生类型相关的参数');
                  return false;
                }
                if(params.ClassNameAndroid.length>200||params.ParamsAndroid.length>200||params.ClassNameIOS.length>200||params.ParamsIOS.length>200){
                  util.showFade('android或者ios地址在200个字符内！');
                  return false;
                }
            }
            if(_ActivePosition.OnconvertDateFromString(params.EndTime)
                  <_ActivePosition.OnconvertDateFromString(params.StartTime)){
              util.showFade('开始时间必须小于结束时间！');
              return false;
            }
            var opt = {
              "Name": null,
              "Type": 1,
              "ShareImg": null,
              "SubTitle": null,
              "ShareUrl": null,
              "Location": -1,
              "Img": null,
              "StartTime": null,
              "EndTime": null,
              "Url": null,
              "ClassNameAndroid": null,
              "ParamsAndroid": null,
              "ClassNameIOS": null,
              "ParamsIOS": null,
              "BannerImg": null
            }
            var type = params.Type;
            if(type == 1){//链接
                params.ClassNameAndroid = null;
                params.ParamsAndroid = null;
                params.ClassNameIOS = null;
                params.ParamsIOS = null;
            }else{//原生
                params.Url = null;
            }
            opt.Name = params.Name;
            opt.Type = params.Type;
            opt.ShareImg = params.ShareImg;
            opt.SubTitle = params.SubTitle;
            opt.ShareUrl = params.Url.substr(0,params.Url.length - 13)+'web';//原生地址为/native/native替换为/web
            opt.Location = params.Location;
            opt.Img = params.Img;
            opt.StartTime = params.StartTime;
            opt.EndTime = params.EndTime;
            opt.Url = params.Url;
            opt.ClassNameAndroid = params.ClassNameAndroid;
            opt.ParamsAndroid = params.ParamsAndroid;
            opt.ClassNameIOS = params.ClassNameIOS;
            opt.ParamsIOS = params.ParamsIOS;
            opt.BannerImg = params.Img;
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,opt,function(result){
              if (result.Code == 1 && result.Data != null){
                _ActivePosition.OnGetList();
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
              $('#panelAddOrModActivePosition').modal('hide');
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },

          //编辑
          OnModifyDialog:function(item){
              //清空fileSelector
              var file = $("#inputEditSrc");
              file.after(file.clone().val(""));
              file.remove();
              var file = $("#inputEditBannerSrc");
              file.after(file.clone().val(""));
              file.remove();
              _ActivePosition.data.params.Name = item.Name;
              _ActivePosition.data.params.Type = item.Type;
              _ActivePosition.data.params.ShareImg = item.ShareImg;
              _ActivePosition.data.params.ShareUrl = item.ShareUrl;
              _ActivePosition.data.params.SubTitle = item.SubTitle;
              _ActivePosition.data.params.Location = item.Location;
              _ActivePosition.data.params.Img = item.Img;
              _ActivePosition.data.params.StartTime = item.StartTime;
              _ActivePosition.data.params.EndTime = item.EndTime;
              _ActivePosition.data.params.Url = item.Url;
              _ActivePosition.data.params.ClassNameAndroid = item.ClassNameAndroid;
              _ActivePosition.data.params.ParamsAndroid = item.ParamsAndroid;
              _ActivePosition.data.params.ClassNameIOS = item.ClassNameIOS;
              _ActivePosition.data.params.ParamsIOS = item.ParamsIOS;
              $("#modifyStartDate").val(item.StartTime);
              $("#modifyEndDate").val(item.EndTime);
              _ActivePosition.data.modifyParams.Id = item.Id;
              _ActivePosition.data.modifyParams.Img = item.Img;
              _ActivePosition.data.modifyParams.ShareImg = item.ShareImg;
              _ActivePosition.data.modifyParams.ShareUrl = item.ShareUrl;
              _ActivePosition.data.modifyParams.SubTitle = item.SubTitle;
              _ActivePosition.data.modifyParams.StartTime = null;
              _ActivePosition.data.modifyParams.EndTime = null;
              _ActivePosition.data.modifyParams.Remark = item.Remark;
              _ActivePosition.data.modifyParams.BannerImg = item.Img;
              $('#modifyImg').attr("src",item.Img)
              $('#editBannerImg').attr("src",item.BannerImg)
              if(item.BannerImg == null){
                  $("#editBannerImg").attr("src", "");
              }
              if(item.Type == 1){
                  $(".chooseOne").show();
                  $(".chooseTwo").hide(); 
              }else{
                  $(".chooseOne").hide();
                  $(".chooseTwo").show(); 
              }
              $('#ModActivePosition').modal('show');
          },

          //编辑提交
          OnModify:function(){
            var url = BaseUrl.ModifyAdsense;
            var param = _ActivePosition.data.params;
            var params = _ActivePosition.data.modifyParams;
            params.StartTime = $("#modifyStartDate").val();
            params.EndTime = $("#modifyEndDate").val();
            if(_ActivePosition.OnconvertDateFromString(params.EndTime)
                  <_ActivePosition.OnconvertDateFromString(params.StartTime)){
              util.showFade('开始时间必须小于结束时间！');
              return false;
            }
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                _ActivePosition.OnGetList();
              }else {
                util.showFade(result.Message);
              }
              util.hideAjaxLoading();
              util.showFade(result.Message);
              $('#ModActivePosition').modal('hide');
            },function(err){
              util.hideAjaxLoading();
              util.showFade(err);
            })
          },

          //备注
          OnModifyRemarkDialog: function(item){
              _ActivePosition.data.params = item;
              _ActivePosition.data.modifyParams.Id = item.Id;
              _ActivePosition.data.modifyParams.Img = item.Img;
              _ActivePosition.data.modifyParams.StartTime = item.StartTime;
              _ActivePosition.data.modifyParams.EndTime = item.EndTime;
              _ActivePosition.data.modifyParams.Remark = item.Remark;
              if(item.Type == 1){
                  $(".chooseOne").show();
                  $(".chooseTwo").hide(); 
              }else{
                  $(".chooseOne").hide();
                  $(".chooseTwo").show(); 
              }
              $('#RemarkDialog').modal('show');   
          },

          //添加备注
          OnModifyRemark: function(){
            var url = BaseUrl.ModifyAdsense;
            var param = _ActivePosition.data.params;
            var params = _ActivePosition.data.modifyParams;
            util.showAjaxLoading();
            util.ajaxZSTJPost($http,url,params,function(result){
              if (result.Code == 1 && result.Data != null){
                _ActivePosition.OnGetList();
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

          Init:function(){
              _ActivePosition.OnGetList();
              //初始化编辑框中的添加内容
              $(".chooseOne").show();
              $(".chooseTwo").hide();
              //初始化时间空间
              $('#startDate,#endDate,#modifyStartDate,#modifyEndDate').datetimepicker({
                  timeFormat: "HH:mm:ss",
                  dateFormat: "yy-mm-dd",
                  changeMonth: true,
                  buttonImageOnly: true,
                  monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                  dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
              }); 

              $('#inputAddSrc,#inputEditSrc,#inputAddBannerSrc,#inputEditBannerSrc,#inputAddShareSrc,#inputEditShareSrc').change(function (){   
                  var current = _ActivePosition.data,
                      file = this.files[0],
                      _URL = window.URL || window.webkitURL;
                      img = new Image();
                  img.src = _URL.createObjectURL(file);
                  img.onload = function(){
                      current.Size.width = this.width;
                      current.Size.height = this.height;
                  };
              });

          }

        },

        Init :function(){
          //缓存登录验证
          signValid.ValidAccess("#/activePosition");
          //侧边栏样式
          $(".navli:eq(2)").addClass("active").siblings().removeClass("active");
          $('body').css('overflow', 'auto');

          document.addEventListener('uploaded', function(e){
              if(_ActivePosition.data.activeDialog == 'add'){
                _ActivePosition.OnAdUploadImageCallBack(e.detail);
              }else if(_ActivePosition.data.activeDialog == 'edit'){
                _ActivePosition.OnModifyUploadImageCallBack(e.detail);
              }else if(_ActivePosition.data.activeDialog == 'addBanner'){
                _ActivePosition.OnAdUploadBannerImageCallBack(e.detail);
              }else if(_ActivePosition.data.activeDialog == 'editBanner'){
                _ActivePosition.OnModifyUploadBannerImageCallBack(e.detail);
              }else if(_ActivePosition.data.activeDialog == 'addShare'){
                _ActivePosition.OnAdUploadShareImageCallBack(e.detail);
              }else if(_ActivePosition.data.activeDialog == 'editShare'){
                _ActivePosition.OnModifyUploadShareImageCallBack(e.detail);
              }
          });

          _ActivePosition = $scope.vm.ActivePosition;
          _ActivePosition.Init();
        }

      }).Init();


    });
    return app;
  });
