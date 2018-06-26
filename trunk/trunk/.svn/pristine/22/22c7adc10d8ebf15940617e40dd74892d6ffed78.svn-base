define(['indexApp', 'jquery', 'common/util', 'Extend', 'common/const', 'model/bannerAppModel', 'model/serverInfoModel', 'upyunMu'],
  function (app, $, util, Extend, Const, BannerAppModel, ServerInfoModel) {
    app.controller('departInfoCtrl', function ($scope, $http, ajaxService, signValid) {
      signValid.ValidAccess("#/departInfo");                       //缓存登录验证
      //侧边栏样式
      $(".navli:eq(4)").addClass("active").siblings().removeClass("active");
      $('body').css('overflow', 'auto');

      var _ServerListCollention, _ServerDetailCollention;

      var BASE = {
        getDeparts: "BMSDepart/GetDeparts",   //获取机构信息
        departSingle: "BMSDepart/GetDepartSingle", //获取机构详情
        modifyDepart: "BMSDepart/Modify", //变更机构相关信息
        shortLink: "BMSShortLink/GetShortLink", //获取短连接
        wechatQrcode: "depart/getDpQRCodeZSTJ" //微信二维码
      }

      $scope.GLOBALDATA = {
        imgUploadCallBack: null,
        currentBannerIndex: 0,
        uploadImgPath: {
          ReportLogoPath: Const.ComboConfig.reportIconPath,
          PushLogoPath: Const.ComboConfig.DepartHtml5Pic,
          PushBgPath: Const.ComboConfig.DepartHtml5Pic,
          BannerPath: Const.ComboConfig.departbanner
        }
      }

      $scope.vm = {

        WeChatQrcodeUrl:'',

        //机构列表模块
        ServerListCollention: {

          data: {
            serverList: []
          },

          //获取机构列表
          GetServerList: function () {
            util.ajaxZSTJPost($http, BASE.getDeparts, {}, function (result) {
              if (result.Code == 1) {
                _ServerListCollention.data.serverList = [];
                if (result.Data.length > 0) {
                  for (var i = 0; i < result.Data.length; i++) {
                    var serverModel = new BannerAppModel();
                    serverModel.convertFromServerInfo(result.Data[i]);
                    _ServerListCollention.data.serverList.push(serverModel);
                  }
                  _ServerDetailCollention.GetServerDetail(_ServerListCollention.data.serverList[0]);
                }
              }
              else {
                util.showFade(result.Message);
              }
            }, function (error) {
              util.showFade(error);
            });
          },

          Init: function () {
            _ServerListCollention.GetServerList();
          }

        },

        ServerDetailCollection: {

          data: {
            currentServer: null,
            currentServerShortLink: ""
          },

          ShowWeChatQrcode:function() {
            var departInfo = {"departCode":$scope.vm.ServerDetailCollection.data.currentServer.DepartCode,"departName":$scope.vm.ServerDetailCollection.data.currentServer.DeptName,"fromType":1};
            ajaxService.PostWeChat(BASE.wechatQrcode,departInfo,function(result) {
              $scope.vm.WeChatQrcodeUrl = result;
              $('#wechatQrcode').modal('show');
            });
          },

          //获取当前机构详情
          GetServerDetail: function (departInfo) {
            var params = {
              "DepartCode": departInfo.DeptCode
            }
            util.ajaxZSTJPost($http, BASE.departSingle, params, function (result) {
              if (result.Code == 1 && result.Data != null) {
                var serverInfoModel = new ServerInfoModel();
                serverInfoModel.convertFrom(result.Data);
                serverInfoModel.DeptName = departInfo.DeptName;
                _ServerDetailCollention.data.currentServer = serverInfoModel;
              }
              else {
                _ServerDetailCollention.data.currentServer = new ServerInfoModel();
                _ServerDetailCollention.data.currentServer.DepartCode = departInfo.DeptCode;
                _ServerDetailCollention.data.currentServer.DeptName = departInfo.DeptName;
                _ServerDetailCollention.data.currentServer.BannerList = [];
                util.showFade(result.Message);
              }
            }, function (error) {
              util.showFade(error);
            });
            //获取地推短连接
            _ServerDetailCollention.GetShortLink(departInfo.PromotionUrl);
          },

          ModifyServerDetail: function () {
            var checkenable = true;
            var params = {
              "DepartCode": _ServerDetailCollention.data.currentServer.DepartCode,
              "DepartName": _ServerDetailCollention.data.currentServer.DeptName,
              "IsAppOpen": _ServerDetailCollention.data.currentServer.IsAppOpen,
              "ImageSrc": _ServerDetailCollention.data.currentServer.ImageSrc,
              "IsHavePDF": _ServerDetailCollention.data.currentServer.IsHavePDF,
              "AppointmentURL": _ServerDetailCollention.data.currentServer.AppointmentURL,
              "BannerList": _ServerDetailCollention.data.currentServer.BannerList
            }

            if (!params.ImageSrc || !params.BannerList || params.BannerList.length <= 0 ) {
              util.showFade("请先完善机构信息！");
              return;
            }
            params.BannerList.forEach(function (item, index, array) {
              if (!item.ImageUrl || !item.LinkUrl) {
                checkenable = false;
              }
            })
            if (!checkenable) {
              util.showFade("请先完善机构信息！");
              return;
            }

            util.ajaxZSTJPost($http, BASE.modifyDepart, params, function (result) {
              if (result.Code == 1) {
                util.showFade(result.Message);
                _ServerListCollention.data.serverList.forEach(function (item, index, array) {
                  if (item.DeptCode == _ServerDetailCollention.data.currentServer.DepartCode) {
                    item.IsAppOpen = _ServerDetailCollention.data.currentServer.IsAppOpen;
                    if (item.IsAppOpen) {
                      item.ImgUrl = '/img/yuan1.png';
                    } else {
                      item.ImgUrl = '/img/yuan.png';
                    }
                  }
                })
              }
            }, function (error) {
              util.showFade(error);
            });
          },

          //转短连接
          GetShortLink: function (LongLink) {
            var params = {
              ShortLink: LongLink
            };
            util.ajaxZSTJPost($http, BASE.shortLink, params, function (result) {
              if (result.Code == 1) {
                _ServerDetailCollention.data.currentServerShortLink = result.Data;
              }
            }, function (error) {
            });
          },

          OnUpLoadImg: function (input, path, callback, type, imgsize, width, height, fileName) {
            // if (!_ServerDetailCollention.CheckImgParams(input, type, imgsize, width, height)) {
            //   return;
            // }
            var file = input.files[0];
            if (!file) {
              util.showFade('请选择您要上传的图片！');
              return false;
            }
            if (type.IndexOfArray(input.files[0].name.split('.').pop()) < 0) {
              util.showFade("请选择正确格式的图片文件！");
              return false;
            }
            if (imgsize && file.size / 1024 > imgsize) {
              util.showFade("图片大小不能超过" + imgsize + "!");
              return false;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
              var data = e.target.result;
              var image = new Image();
              image.onload = function () {
                if ( this.width > width || this.height > height){
                  util.showFade("图片宽高不能超过" + width + '*' + height);
                  return false;
                }else {
                  util.showAjaxLoading();
                  $scope.GLOBALDATA.imgUploadCallBack = callback;
                  var ext = '.' + input.files[0].name.split('.').pop();
                  var config = {
                    bucket: Const.ComboConfig.bucket,
                    expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                    form_api_secret: Const.ComboConfig.form_api_secret
                  };

                  var instance = new Sand(config);
                  if (!fileName) {
                    fileName = util.randomString(32);
                  }
                  fileName = fileName + ext;
                  instance.upload(path + fileName, "#" + input.id);
                }
              };
              image.src= data;
            };
            reader.readAsDataURL(file);
            // if (file.width > width || file.height > height) {
            //   util.showFade("图片宽高不能超过" + width + '*' + height);
            //   return false;
            // }
            // return true;


          },

          ImgUpLoadCallBack: function (uploadData) {
            _ServerDetailCollention.data.currentServer.ImageSrc = Const.ComboConfig.ComboBaseUrl + uploadData['path'];
            $scope.$apply();
            util.hideAjaxLoading();
          },

          PushLogoCallBack: function (uploadData) {
            _ServerDetailCollention.data.currentServer.pushLogo = Const.ComboConfig.ComboBaseUrl + uploadData['path'] + "?" + parseInt((new Date().getTime() + 3600000) / 1000);
            $scope.$apply();
            util.hideAjaxLoading();
          },

          PushBgCallBack: function (uploadData) {
            _ServerDetailCollention.data.currentServer.pushBg = Const.ComboConfig.ComboBaseUrl + uploadData['path'] + "?" + parseInt((new Date().getTime() + 3600000) / 1000);
            $scope.$apply();
            util.hideAjaxLoading();
          },

          BannerCallBack: function (uploadData) {
            _ServerDetailCollention.data.currentServer.BannerList[$scope.GLOBALDATA.currentBannerIndex].ImageUrl = Const.ComboConfig.ComboBaseUrl + uploadData['path'];
            $scope.$apply();
            util.hideAjaxLoading();
          },

          //BannerList 排序
          BannerListSort: function (index1, index2) {
            _ServerDetailCollention.data.currentServer.BannerList[index1] = _ServerDetailCollention.data.currentServer.BannerList.splice(index2, 1, _ServerDetailCollention.data.currentServer.BannerList[index1])[0];
          },

          Init: function () {
            document.addEventListener('uploaded', function (e) {
              $scope.GLOBALDATA.imgUploadCallBack(e.detail);
            });
          }
        },

        ViewModelInit: function () {
          _ServerListCollention = $scope.vm.ServerListCollention;
          _ServerDetailCollention = $scope.vm.ServerDetailCollection;
          _ServerListCollention.Init();
          _ServerDetailCollention.Init();
        }

      };
      $scope.vm.ViewModelInit();

    });
    return app;
  });
