define(['indexApp','jquery', 'common/util', 'common/const','model/bannerAppModel', 'model/ComboListModel', 'model/ComboInfoModel', 'model/ComboTagModel', 'upyunMu', 'service/baseService'],
  function (app,$, util, Const, BannerAppModel, ComboListModel, ComboInfoModel, ComboTagModel) {
    app.controller('bannerExaminationAppCtrl', function ($scope, $http, signValid) {
      signValid.ValidAccess("#/bannerExaminationApp");                       //缓存登录验证
      //侧边栏样式
      $(".nav li:eq(16)").addClass("active").siblings().removeClass("active");
      $('body').css('overflow', 'auto');

      $("#inputDepartIco").change(function(){         // 获取体检中心上传图片的尺寸
          var $$this = $scope.vm.DepartIco,
              file = this.files[0],
              _URL = window.URL || window.webkitURL;
              img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = function(){
              $$this.ImageSize.imgwidth = this.width;
              $$this.ImageSize.imgheight = this.height;
          }
      })

       $("#BannerAddItemSrc").change(function(){
          var file = this.files[0],
              _URL = window.URL || window.webkitURL;
              img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = function(){
             var Banimg = $scope.vm.data.SizesImg;
             Banimg.Banimgadd.imgwidth = this.width;
             Banimg.Banimgadd.imgheight = this.height;
          }
      })

      $("#BannerEditItemSrc").change(function(){
          var file = this.files[0],
              _URL = window.URL || window.webkitURL;
              img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = function(){
             var Banimg = $scope.vm.data.SizesImg;
             Banimg.Banimgedit.imgwidth = this.width;
             Banimg.Banimgedit.imgheight = this.height;
          }
      })

       $("#RecommendLogoSrc").change(function(){
          var file = this.files[0],
              _URL = window.URL || window.webkitURL;
              img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = function(){
             var Recommend = $scope.vm.RecommendURL.data;
             Recommend.RecommendImgLogo.imgwidth = this.width;
             Recommend.RecommendImgLogo.imgheight = this.height;
          }
      })

       $("#RecommendConductSrc").change(function(){
          var file = this.files[0],
              _URL = window.URL || window.webkitURL;
              img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = function(){
             var Recommend = $scope.vm.RecommendURL.data;
             Recommend.RecommendImgConduct.imgwidth = this.width;
             Recommend.RecommendImgConduct.imgheight = this.height;
          }
      })

      // 图片保存 提取私有方法
      var UpImages = (function(){
          var self = '',
              imgwidth = '',
              imgheight = '',
              Type = '';
          return{
              ChangeSelf:function(val){
                  self = val;
              },
              OnClickUploadImage: function(data){
                  if (!$(data.id)[0].files[0]){
                  util.showFade('请选择您要上传的图片！');
                  return;
                  }
                  var Imgsize = $(data.id)[0].files[0].size/1024,
                      item = $(data.id)[0].files[0].name.split('.').pop(),
                      files = true;
                  Type = item;
                  for(var i=0;i<data.type.length;i++){
                      if(item == data.type[i]){
                          files = false;
                      }
                  }
                  if (files){
                  util.showFade('请选择正确的图片文件！');
                  return;
                  }else if(data.SizesImg){
                  util.showFade("图片宽高不能超过"+ data.width + '*' + data.height);
                  return;
                  }

                  // else if(Imgsize > data.size ){
                  // util.showFade("图片大小不能超过" + data.size +"kb");
                  // return;
                  // }


                  var config = {
                      bucket: Const.ComboConfig.bucket,
                      expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                      form_api_secret: Const.ComboConfig.form_api_secret
                  };
                  util.showAjaxLoading();
                  var ext = '.' + $(data.id)[0].files[0].name.split('.').pop();
                  var instance = new Sand(config);
                  var fileName = '/' + data.Depart + ext;
                  var pathName = data.path;
                  instance.upload(pathName + fileName, data.id);
              },
              UploadImgCallBack: function (data){  //上传图片回调
                  self.ImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
                  $scope.$apply();

                  // $("#banner_url").html('<img src="'+Const.ComboConfig.ComboBaseUrl + data['path']+'" alt="" />');
                  util.hideAjaxLoading();
              }
          }
      })()

      $scope.vm = {

        data: {
          switchInfo: true,
          IsHavePDF: false,
          IsAppOpenItem:{},
          BannerListInfo: [],                //Banner列表数据
          serverLists: [],                   //服务机构列表数据
          serverInput: '',
          currClass: '',
          currDeptCode: '',
          deleteBannerData:'',
          currentSelectedTag:"BannerTag",
          currServerClick: {
            DeptCode: '',
            DeptName: '',
            DeptCodeASSIC: '', //int -> string
            IsAppOpen: true,
            IsClick: true,
            IsHavePDF:true
          },                  //当前选中服务机构
          serverCodeDefault: '',                 //默认服务机构
          currBannerId: 0,                  //当前选中的bannerId
          addBannerData: {
            addBannerInfo: {         //添加banner的信息
              BannerName: '',
              ImageUrl: '',
              LinkUrl: '',
              DEPTINFOS: []
            },
            //初始化添加banner数据
            addBannerInfoInit: function () {

              $scope.vm.data.addBannerData.addBannerInfo = {
                //添加banner的信息
                BannerName: '',
                ImageUrl: '',
                LinkUrl: '',
                // IsDelete: true,
                // CreateDate: (new Date()).Format('yyyy/MM/dd'),
                DEPTINFOS: []
              };
            },
          },
          //编辑数据
          editBannerData: {
            editBannerInfo: {
              ID: '',
              BannerName: '',
              ImageUrl: '',
              LinkUrl: '',
              DEPTINFOS: []
            },
            //初始化编辑数据
            Init: function (item) {
              $scope.vm.data.editBannerData.editBannerInfo = {
                ID: item.BannerID,
                BannerName: item.BannerName,
                ImageUrl: item.BannerImageUrl,
                LinkUrl: item.BannerLinkUrl,
                DEPTINFOS: item.BannerDeparts
              };
            }
          },
          SizesImg:{
            Banimgadd:{
              imgwidth:'',
              imgheight:''
            },
            Banimgedit:{
              imgwidth:'',
              imgheight:''
            }
          }
        },

        CurrentTag: 'BannerTag',

        ClickPrev: function (item) {     //预览
          item.IsChecked = !item.IsChecked;
        },

        //掌上体检服务开启开关
        openZSTjClick: function () {
          if ($scope.vm.data.switchInfo) {
                $scope.vm.data.switchInfo = false;
              } else {
                $scope.vm.data.switchInfo = true;
              }
          var url = 'Banner/UpdateDepartInfo';
          var data = {
            DepartCode: $scope.vm.data.currServerClick.DeptCode,
            IsAppOpen: $scope.vm.data.switchInfo
          };
          util.ajaxZSTJPost($http, url, data, function (result) {
            if (result.Code == 1) {
              if ($scope.vm.data.currServerClick.ImgUrl == "/img/yuan1.png") {
                $scope.vm.data.currServerClick.ImgUrl = "/img/yuan.png";
                util.showFade('更新状态成功');
                return;
              }
              else if ($scope.vm.data.currServerClick.ImgUrl == "/img/yuan.png") {
                $scope.vm.data.currServerClick.ImgUrl = "/img/yuan1.png";
                util.showFade('更新状态成功');
                return;
              }
              $scope.vm.ServerBannerClick($scope.vm.data.currServerClick);
            } else {
              if ($scope.vm.data.switchInfo) {
                $scope.vm.data.switchInfo = false;
              } else {
                $scope.vm.data.switchInfo = true;
              }
              util.showFade(result.Message);
            }
          }, function (error) {
            util.showFade(error);
          });
        },

        //是否可看pdf
        openZSTJPdf: function(){
          if (!$scope.vm.data.IsHavePDF||$scope.vm.data.IsHavePDF == null) {
            $scope.vm.data.IsHavePDF = true;
          } else {
            $scope.vm.data.IsHavePDF = false;
          }
          var url = 'BMSMecinfo/ChangePDFStatus';
          var data = {
            DepartCode: $scope.vm.data.currServerClick.DeptCode,
            HavePDF: $scope.vm.data.IsHavePDF
          };
          util.ajaxZSTJPost($http, url, data, function (result) {
            if (result.Code == 1) {
              //  $scope.vm.data.IsHavePDF = !result.data;
              // $scope.vm.data.currentSelectedTag.InitDepartSingle();
               util.showFade(result.Message);
            } else {
              if ($scope.vm.data.IsHavePDF) {
                $scope.vm.data.IsHavePDF = false;
              } else {
                $scope.vm.data.IsHavePDF = true;
              }
              util.showFade(result.Message);
            }
          }, function (error) {
            util.showFade(error);
          });
        },

        //初始化数据
        Init: function () {
          $scope.vm.GetServerList();

          var _this = $scope.vm;
          document.addEventListener('uploaded', function(e){
            if (_this.data.currentSelectedTag == _this.ComboInfo.CurrentTag){
              var self = _this.ComboInfo;
            }else if (_this.data.currentSelectedTag == _this.DepartIco.CurrentTag) {
              var self = _this.DepartIco;
            }else if(_this.data.currentSelectedTag == 'BannerTag'){
              var self = UpImages;
            }else if(_this.data.currentSelectedTag == 'RecommendURL'){
              var self = UpImages;
            }else{
              return;
            }
            self.UploadImgCallBack(e.detail);
          });
        },

        //获取左侧服务机构
        GetServerList: function () {
          var url = 'Banner/GetDeparts';
          var data = {};
          util.ajaxZSTJPost($http, url, data, function (result) {
            if (result.Code == 1) {
              $scope.vm.data.serverLists = [];
              if (result.Data.length > 0) {
                for (var i = 0; i < result.Data.length; i++) {
                  //左侧服务机构数据
                  var serverModel = new BannerAppModel();
                  serverModel.convertFromServers(result.Data[i]);
                  $scope.vm.data.serverLists.push(serverModel);
                }
                $scope.vm.data.switchInfo = $scope.vm.data.serverLists[0].IsAppOpen;
                $scope.vm.data.serverCodeDefault = $scope.vm.data.serverLists[0].DeptCode;//默认展示第一个服务机构
                $scope.vm.GetServerBanners($scope.vm.data.serverLists[0].DeptCode);
                $scope.vm.data.currDeptCode = $scope.vm.data.serverLists[0].DeptCode;
                $scope.vm.data.currServerClick = $scope.vm.data.serverLists[0];
                $scope.vm.data.currServerClick.DeptName = $scope.vm.data.currServerClick.DeptName;
                $scope.vm.getShortPromotionLink($scope.vm.data.serverLists[0]);
                $scope.vm.MedicalCenter.Init()
              }
            }
          }, function (error) {
            util.showFade(error);
          });
        },
        //获取服务机构对应的banner图列表信息
        GetServerBanners: function (itemDeptCode) {
          var url = 'Banner/GetBannerInfos?DeptCode=' + itemDeptCode;
          var data = {};
          util.ajaxZSTJPost($http, url, data, function (result) {
            $scope.vm.data.BannerListInfo = [];
            if (result.Code == 1) {
              $scope.vm.data.currDeptCode = itemDeptCode;
              for (var i = 0; i < result.Data.length; i++) {
                var model = new BannerAppModel();
                model.convertFromBanner(result.Data[i]);
                model.IsChecked = false;
                $scope.vm.data.BannerListInfo.push(model);

                //排序图标判断第一个和最后一个
                if (i == 0) {
                  $scope.vm.data.BannerListInfo[i].OrderTop = false;
                }
                if (i == result.Data.length - 1) {
                  $scope.vm.data.BannerListInfo[i].OrderDown = false;
                }
              }
              for (var i = 0; i < result.Data.length; i++) {
                $scope.vm.data.BannerListInfo[i].DownOneId = $scope.vm.data.BannerListInfo[i].BannerRelationID;
                if (i != 0) {
                  $scope.vm.data.BannerListInfo[i].TopOneId = $scope.vm.data.BannerListInfo[i].BannerRelationID;
                  $scope.vm.data.BannerListInfo[i].TopTwoId = $scope.vm.data.BannerListInfo[i - 1].BannerRelationID;
                }

                if (i < result.Data.length - 1) {
                  $scope.vm.data.BannerListInfo[i].DownTwoId = $scope.vm.data.BannerListInfo[i + 1].BannerRelationID;
                }

              }
            }
          }, function (error) {
            util.showFade(error);
          });
        },
        //Banner向下排序
        OrderDown: function (item) {
          var url = 'Banner/BannerSort?IndexOneID=' + item.DownOneId + '&IndexTwoID=' + item.DownTwoId;
          var data = {};
          util.ajaxZSTJPost($http, url, data, function (result) {
            if (result.Data && result.Code == 1) {
              $scope.vm.GetServerBanners($scope.vm.data.currDeptCode);
              util.showFade(result.Message);
            }

          }, function (error) {
            util.showFade(error);
          });

        },
        //Banner向上排序
        OrderTop: function (item) {
          var url = 'Banner/BannerSort?IndexOneID=' + item.TopOneId + '&IndexTwoID=' + item.TopTwoId;
          var data = {};
          util.ajaxZSTJPost($http, url, data, function (result) {
            if (result.Data && result.Code == 1) {
              $scope.vm.GetServerBanners($scope.vm.data.currDeptCode);
              util.showFade(result.Message);
            }
          }, function (error) {
            util.showFade(error);
          });

        },
        //点击服务机构获取是否开启掌上服务
        ServerBannerClick: function (item) {
          $scope.vm.data.IsAppOpenItem = item;
          if (item.IsAppOpen == null) {
            $scope.vm.data.switchInfo = true;
          }
          if (item.ImgUrl == '/img/yuan1.png') {
            $scope.vm.data.switchInfo = true;
          } else if(item.ImgUrl == '/img/yuan.png'){
            $scope.vm.data.switchInfo = false;
          }
          $scope.vm.GetServerBanners(item.DeptCode);
          $scope.vm.data.currServerClick = {};
          $scope.vm.data.currServerClick = item;
          $scope.vm.data.currServerClick.DeptName = $scope.vm.data.currServerClick.DeptName;
          // $(".nav-banner li:eq(0)").addClass("active").siblings().removeClass("active");
          // $(".deptTabs div.tab-pane:eq(0)").addClass("active").siblings().removeClass("active");
          // $scope.vm.OnClickBanner();
          // $scope.vm.ComboInfo.Init();
          $scope.vm.MedicalCenter.Init();
          // $scope.vm.AppointmentURL.Init();
          var lis = $('#banner_nav li')                             // 2017/2/9 修改页面刷新请求
          lis.attr('class','');
          lis.eq(1).attr('class','active')
          var banner_Tabs = $('.banner_Tabs');
          banner_Tabs.attr('class','tab-pane banner_Tabs');
          banner_Tabs.eq(1).attr('class','tab-pane banner_Tabs active')
          $scope.vm.getShortPromotionLink(item);
        },
        //转短连接
        getShortPromotionLink: function(deptItem){
          if(deptItem.ShortLink){
            return;
          }
          var url = 'BMSShortLink/GetShortLink';
          var params = {
            ShortLink:deptItem.PromotionUrl
          };
          util.ajaxZSTJPost($http, url, params, function (result) {
            if (result.Code == 1) {
              deptItem.ShortLink = result.Data;
            }
          }, function (error) {
          });
        },
        //添加按钮
        AddBannerBtn: function () {
          $scope.vm.data.addBannerData.addBannerInfoInit();
          for (var i = 0; i < $scope.vm.data.serverLists.length; i++) {
            $scope.vm.data.serverLists[i].IsClick = false;
          }
        },
        //添加banner
        AddBannerSubmit: function () {
          $scope.vm.data.addBannerData.addBannerInfo.DEPTINFOS = [];
          var url = 'Banner/AddBanner';
          for (var i = 0; i < $scope.vm.data.serverLists.length; i++) {
            if ($scope.vm.data.serverLists[i].IsClick) {
              $scope.vm.data.addBannerData.addBannerInfo.DEPTINFOS.push
                ({ DeptCode: $scope.vm.data.serverLists[i].DeptCode });
            }
          }
          //文本框验证
          if (!$scope.vm.data.addBannerData.addBannerInfo.BannerName) {
            util.showFade('名称不能为空');
            return false;
          }
          if (!$scope.vm.data.addBannerData.addBannerInfo.ImageUrl
            || !/^(http|https):\/\/.*\.(jpg|JPG|jpeg|JPEG|png|PNG|bmp|BMP|gif|GIF|svg|SVG)$/.test($scope.vm.data.addBannerData.addBannerInfo.ImageUrl)) {
            util.showFade('请输入有效的图片链接');
            return false;
          }
          if (!$scope.vm.data.addBannerData.addBannerInfo.LinkUrl) {
            util.showFade('图文介绍链接不能为空');
            return false;
          }
          if ($scope.vm.data.addBannerData.addBannerInfo.DEPTINFOS.length == 0) {
            util.showFade('至少选择一个服务机构');
            return false;
          }
          var data =$scope.vm.data.addBannerData.addBannerInfo;
          util.ajaxZSTJPost($http, url, data, function (result) {
            if (result.Code == 1 && result.Data) {
              util.showFade(result.Message);
              $scope.vm.GetServerBanners($scope.vm.data.currDeptCode);
              $("#addBannerColse").click();
            }
          }, function (error) {
            util.showFade(error);
          });
        },
        //选中下拉框机构列表
        ServerOptionsClick: function (item) {
          if (item.IsClick == false) {
            item.IsClick = true;
          } else {
            item.IsClick = false;
          }
        },
        //编辑banner
        editBannerBtn: function (item) {
          for (var i = 0; i < $scope.vm.data.serverLists.length; i++) {
            $scope.vm.data.serverLists[i].IsClick = false;
          }
          for (var i = 0; i < item.BannerDeparts.length; i++) {
            for (var j = 0; j < $scope.vm.data.serverLists.length; j++) {
              if (item.BannerDeparts[i].DeptName == $scope.vm.data.serverLists[j].DeptName) {
                $scope.vm.data.serverLists[j].IsClick = true;
              }
            }
          }
          $scope.vm.data.editBannerData.Init(item);
        },
        //编辑banner保存
        editBannerSubmit: function () {
          $scope.vm.data.editBannerData.editBannerInfo.DEPTINFOS = [];
          for (var i = 0; i < $scope.vm.data.serverLists.length; i++) {
            if ($scope.vm.data.serverLists[i].IsClick) {
              $scope.vm.data.editBannerData.editBannerInfo.DEPTINFOS.push(
                {
                  DeptCode: $scope.vm.data.serverLists[i].DeptCode,
                  DeptName: $scope.vm.data.serverLists[i].DeptName
                });
            }
          }
          if (!$scope.vm.data.editBannerData.editBannerInfo.BannerName) {
            util.showFade('名称不能为空');
            return false;
          }
          if (!$scope.vm.data.editBannerData.editBannerInfo.ImageUrl
          || !/^(http|https):\/\/.*\.(jpg|JPG|jpeg|JPEG|png|PNG|bmp|BMP|gif|GIF|svg|SVG)$/.test($scope.vm.data.editBannerData.editBannerInfo.ImageUrl)) {
            util.showFade('图链接不能为空');
            return false;
          }
          if (!$scope.vm.data.editBannerData.editBannerInfo.LinkUrl) {
            util.showFade('介绍图链接不能为空');
            return false;
          }
          if ($scope.vm.data.editBannerData.editBannerInfo.DEPTINFOS.length == 0) {
            util.showFade('至少选择一个服务机构');
            return false;
          }
          var url = 'Banner/UpdateBanner';
          var data = $scope.vm.data.editBannerData.editBannerInfo;
          util.ajaxZSTJPost($http, url, data, function (result) {
              util.showFade(result.Message);
            if (result.Code == 1 && result.Data) {
              $scope.vm.GetServerBanners($scope.vm.data.currDeptCode);
              $("#editBannerColse").click();
            }
          }, function (error) {
            util.showFade(error);
          });
        },
        //删除按钮
        deleteBannerBtn: function (item) {
          $scope.vm.currBannerId = item.BannerID;

          if(item.BannerDeparts.length == 1){
            $scope.vm.data.deleteBannerData = '当前Banner在本机构使用，确定删除当前Banner吗';
          }else{
             $scope.vm.data.deleteBannerData = '当前Banner在多家机构使用，确定删除当前Banner吗?';
          }
        },
        //删除banner确定
        deleteBannerSubmit: function () {
          var url = 'Banner/DeleteBanner?bannerId=' + $scope.vm.currBannerId;
          var data = {};
          util.ajaxZSTJPost($http, url, data, function (result) {
            if (result.Code == 1) {
              util.showFade('删除成功');
              // $scope.vm.GetServerList();
              $scope.vm.GetServerBanners($scope.vm.data.currDeptCode);
            }
          }, function () {

          });
        },

        // // 2016/12/30 增加板块
        OnClickBanner: function () {                     // 点击banner图加载
          var currentTag = $scope.vm.data.currentSelectedTag,
          self = $scope.vm;

          $scope.vm.data.currentSelectedTag = self.CurrentTag;
          // $scope.vm.GetServerList();
        },
        OnClickBanimgadd:function(){                     // banner图添加上传图片
            var $$this = $scope.vm.data.addBannerData.addBannerInfo,
                self = $scope.vm.data.SizesImg.Banimgadd,
                Dept = $scope.vm.data.currServerClick.DeptCode,
                data = {
                    id: '#BannerAddItemSrc',
                    width: 780,
                    height: 500,
                    SizesImg: false,
                    size: 200,
                    type: ['png'],
                    path: Const.ComboConfig.departbanner,
                    Depart: util.randomString(10)+ '_' +Dept
                };
            if(self.imgwidth > data.width || self.imgheight > data.height){
                data.SizesImg = true;
            }
            UpImages.ChangeSelf($$this);
            UpImages.OnClickUploadImage(data);
        },
        OnClickBanimgedit:function(){                    // banner图编辑上传图片
            var $$this = $scope.vm.data.editBannerData.editBannerInfo,
                self = $scope.vm.data.SizesImg.Banimgedit,
                Dept = $scope.vm.data.currServerClick.DeptCode,
                data = {
                    id: '#BannerEditItemSrc',
                    width: 780,
                    height: 500,
                    SizesImg: false,
                    size: 200,
                    type: ['png'],
                    path: Const.ComboConfig.departbanner,
                    Depart: util.randomString(10) + '_' + Dept
                };
            if(self.imgwidth > data.width || self.imgheight > data.height){
                data.SizesImg = true;
            }
            UpImages.ChangeSelf($$this);
            UpImages.OnClickUploadImage(data);
        },


        // 体检中心 板块内容
        MedicalCenter:{
          CurrentTag:"MedicalCenter",
          data:{
            // ID: 0,                                       // 编号
            DepartCode:'',                               // 机构编号
            MECName:'',                                  // 体检中心名称
            MECAddress:'',                               // 体检中心地址
            AppointmentPhone:'',                         // 体检中心电话
            AppointmentTime:''                           // 预约时间
          },
          MedicalData: function () {    // 请求体检中心信息
            var Depart = $scope.vm.data.currServerClick.DeptCode,  // 获取当前选中机构编号
                url = 'BMSMecinfo/GetMEC',
                self =  $scope.vm.MedicalCenter,
                data = {
                    DepartCode:Depart
                };
            // var mian = JSON.stringify(data);
            //     console.log(mian);
            util.ajaxZSTJPost($http, url, data, function (result) {
                // console.log('-----------保存体检中心信息-----------');
                // console.log(result.Data);
                if (result.Code == 1 && result.Data) {
                     var item = result.Data;
                     self.data = {
                         ID: item.ID,
                         DepartCode: item.DepartCode,
                         MECName: item.MECName,
                         MECAddress: item.MECAddress,
                         AppointmentPhone: item.AppointmentPhone,
                         AppointmentTime: item.AppointmentTime
                     };
                     // console.log(self.data)
                }else {
                    self.data={
                      ID: 0,                                       // 编号
                      DepartCode:'',                               // 机构编号
                      MECName:'',                                  // 体检中心名称
                      MECAddress:'',                               // 体检中心地址
                      AppointmentPhone:'',                         // 体检中心电话
                      AppointmentTime:''                           // 预约时间
                    };
                }
            }, function (error) {
                util.showFade('请求失败');
            });
          },
          DecideMedical: function () {   // 判断填写的体检中心信息
            var self = $scope.vm.MedicalCenter.data;
            if(self.MECName == ''){
                util.showFade('机构名称不能为空');
                return;
            }else if(self.MECName.length > 25){
                util.showFade('机构名称输入有误，请重新输入');
                return;
            }else if(self.MECAddress == ''){
                util.showFade('机构地址不能为空');
                return;
            }else if(self.MECAddress.length > 100){
                util.showFade('机构地址输入有误，请重新输入');
                return;
            }else if(self.AppointmentTime == ''){
                util.showFade('预约时间不能为空');
                return;
            }else if(self.AppointmentTime.length > 100){
                util.showFade('预约时间输入有误，请重新输入');
                return;
            }else if(self.AppointmentPhone == ''){
                util.showFade('电话不能为空');
                return;
            }else if(self.AppointmentPhone.length < 5 || self.AppointmentPhone.length > 20){
                util.showFade('电话输入有误，请重新输入');
                return;
            }
            $('#SaveMedicalModel').modal('show');
          },
          OnSaveImange:function(){
            var $$this = $scope.vm.DepartIco,
                imageSrc = $$this.ImageLink,
                departCode = $scope.vm.data.currServerClick.DeptCode,
                url = 'BMSMecinfo/AddOrModifyDepartImage',
                data = {
                  DepartCode: departCode,
                  ImageSrc: imageSrc
                };
                //console.log(imageSrc);

            util.ajaxZSTJPost($http, url, data, function (result) {
                    // console.log(result.Data)
                    if (result.Code == 1) {
                      if(result.Data){
                         util.showFade('添加成功！');
                      } else {
                        util.showFade(result.Message);
                      }
                    } else {
                      util.showFade(result.Message);
                    }
                }, function (error) {
                    util.showFade('请求失败');
              });
          },
          OnSaveMedical: function () {   // 保存体检中心信息
            var url = 'BMSMecinfo/AddOrModifyMEC',
                self = $scope.vm.MedicalCenter,
                params = {
                  DepartCode: $scope.vm.data.currServerClick.DeptCode,
                  AppointmentTime: self.data.AppointmentTime,
                  AppointmentPhone: self.data.AppointmentPhone,
                  MECAddress: self.data.MECAddress,
                  MECName: self.data.MECName
                };
            util.ajaxZSTJPost($http, url, params, function (result){
                // console.log('-----------保存体检中心信息-----------')
                // console.log(result.Data);
                if (result.Code == 1) {
                  self.data = result.Data;
                  //util.showFade('保存成功');
                  self.OnSaveImange();
                  // console.log(self.data);
                }else {
                  util.showFade(result.Message);
                 }
            }, function (error) {
                util.showFade('保存失败');
            });
          },
          Init: function () {
            var Depart = $scope.vm.data.currServerClick.DeptCode,
                currentTag = $scope.vm.data.currentSelectedTag,
                self = $scope.vm.MedicalCenter,
                $$self = $scope.vm.DepartIco;
            self.data.DepartCode = Depart;

            $scope.vm.MedicalCenter.MedicalData();
            //$scope.vm.data.currentSelectedTag = self.CurrentTag;

            $scope.vm.data.currentSelectedTag = $$self.CurrentTag;
            $$self.InitDepartSingle();
          }
        },

        // 套餐信息 板块内容
        ComboInfo:{
          CurrentTag:"ComboInfo",
          // ComboList:[],
          ComboList:{
            OnSaleList:[],
            OutOfSaleList:[]
          },
          TagList:[],
          DepartCode:'',
          SearchName:'',
          SelectAll : false,
          selectAll : function(isSaleList){//1:刷新上架列表，0：刷新未上架列表，-1：刷新全部
            if (isSaleList == 1||isSaleList == -1){
              for(var i=0;i<this.ComboList.OnSaleList.length;i++){
                if(this.SelectAll==true){
                    this.ComboList.OnSaleList[i].Checked=true;
                }else {
                    this.ComboList.OnSaleList[i].Checked=false;
                }
              }
            }
           if (isSaleList == 0||isSaleList == -1){
            for(var i=0;i<this.ComboList.OutOfSaleList.length;i++){
                if(this.SelectAll==true){
                    this.ComboList.OutOfSaleList[i].Checked=true;
                }else {
                    this.ComboList.OutOfSaleList[i].Checked=false;
                }
              }
           }
          },
          clearAll : function(){
            this.SelectAll = false;
            this.selectAll(-1);
          },
          ComboParams: {
            ID:0,
            DepartCode:'',
            Name:'',
            Price:'',
            OldPrice:'',
            Description:'',
            ImageUrl:Const.ComboConfig.ComboDefaultPicUrl,
            ComboDetails:[],
            ComboTags:[]
          },

          state: false,                                   //控制套餐跳转

          GetComboTagList:function(){                     //获取标签列表
            var self = $scope.vm.ComboInfo,
            url = "BMSCombotag/GetList",
            params= {};
            util.ajaxZSTJPost($http, url, params, function (result){
              self.TagList=[];
              if (result.Code == 1 && result.Data != null){
                for (var i=0;i<result.Data.length;i++){
                  if (result.Data[i].Combos!=null){
                    for (var j = 0; j<result.Data[i].Combos.length;j++){
                      var comboTagItem = new ComboTagModel();
                      comboTagItem.convertFromComboTagList(result.Data[i].Combos[j]);
                      self.TagList.push(comboTagItem);
                    }
                  }
                }
              }
            }, function (error){
              util.showFade(error);
            });
          },

          tagOnClick:function(item){                      //选择标签
            item.Checked=!item.Checked;
          },

          checkTagIsSelected:function(){                  //验证标签是否被选中
            var tagList = $scope.vm.ComboInfo.TagList;
            var selectedTags = $scope.vm.ComboInfo.ComboParams.ComboTags;
            for (var j=0;j<tagList.length;j++){
              tagList[j].Checked = false;
              for (var i=0;i<selectedTags.length;i++){
                if (selectedTags[i].ID == tagList[j].ID){
                  tagList[j].Checked = true;
                }
              }
            }
          },

          GetList:function (searchName){                  //获取所有套餐
            var self = $scope.vm.ComboInfo,
            url = 'BMSComboinfo/GetList',
            params = {
                DepartCode: self.DepartCode,
                Name:searchName
                // Name:self.SearchName
            };
            util.ajaxZSTJPost($http, url, params, function (result){
              self.ComboList={
                OnSaleList:[],
                OutOfSaleList:[]
              };
              if (result.Code == 1 && result.Data != null){
                  for (var i=0;i<result.Data.length;i++){
                      var comboItem = new ComboListModel();
                      comboItem.convertFromComboList(result.Data[i]);
                      if (comboItem.Status==1){//上架套餐
                        self.ComboList.OnSaleList.push(comboItem);
                      }else if (comboItem.Status==0){//未上架套餐
                        self.ComboList.OutOfSaleList.push(comboItem);
                      }
                      // self.ComboList.push(comboItem);
                  }
                  // util.showFade(result.Message);
                  self.clearAll();
              }
            }, function (error){
              util.showFade(error);
            });
          },

          SearchList:function(e){                         //输入框回车事件
            var keycode = window.event?e.keyCode:e.which,
            self = $scope.vm.ComboInfo;
            if(keycode==13){
               self.GetList(self.SearchName);
            }
          },

          ResetComboParams:function(comboParams){         //重置添加套餐参数
            if (comboParams!=null){
              angular.copy(comboParams, $scope.vm.ComboInfo.ComboParams);
            }else {
              $scope.vm.ComboInfo.ComboParams = {
                ID:0,
                Name:'',
                Price:'',
                OldPrice:'',
                Description:'',
                ImageUrl:Const.ComboConfig.ComboDefaultPicUrl,
                DepartCode:'',
                ComboDetails:[],
                ComboTags:[]
              };
            }
            this.checkTagIsSelected();
            //清空fileSelector
            var excelFile = $("#excelFile");
            var file = $("#file");
            file.after(file.clone().val(""));
            excelFile.after(excelFile.clone().val(""));
            file.remove();
            excelFile.remove();

            $("#AddpackageModel").modal("show");
          },

          UploadImg:function(){                           //上传图片至服务器
            if (!$("#file")[0].files[0]){
              util.showFade('请选择您要上传的图片！');
              return;
            }else if ($("#file")[0].files[0].name.split('.').pop() != "jpg" &&
                      $("#file")[0].files[0].name.split('.').pop() != "jpeg" &&
                      $("#file")[0].files[0].name.split('.').pop() != "png"
            ){
              util.showFade("请选择正确的图片文件！");
              return;
            }
            util.showAjaxLoading();
            var ext = '.' + $("#file")[0].files[0].name.split('.').pop();
            var config = {
              bucket: Const.ComboConfig.bucket,
              expiration: parseInt((new Date().getTime() + 3600000) / 1000),
              form_api_secret: Const.ComboConfig.form_api_secret
            };

            var instance = new Sand(config);
            var fileName = util.randomString(32) + ext;
            var pathName = Const.ComboConfig.comboPicPath;
            // var pathName = Const.ComboConfig.defaultPath + (new Date()).Format("yyyyMMdd")+"/";

            instance.upload(pathName + fileName);
            // instance.upload("/default/ComboDefault" + ext);
          },

          UploadImgCallBack: function (data){            //上传图片回调
              $scope.vm.ComboInfo.ComboParams.ImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
          },

          OnClickExportExcel: function(){                 //获取表格模板
            location.href = Const.ComboConfig.ExportExcelUrl;
          },

          OnClickImportExcel: function(){                 //上传表格
            var self = $scope.vm.ComboInfo,
                url = 'BMSComboinfo/ImportXlsTemplate',
                params = {
                  file:{
                    test: document.getElementById("excelFile").files[0]
                  }
                };
            if (!params.file.test){
              util.showFade("请选择需要导入的表格！");
              return;
            }else if (params.file.test.name.split('.').pop() != "xls"){
               util.showFade("请选择正确的表格文件！");
               return;
            }
            util.ajaxZSTJFile(url, params, function(result){
            if (result.Code == 1 && result.Data!=null){
              self.ComboParams.ComboDetails = [];
              for (var i=0;i<result.Data.length;i++){
                  var comboInfoItem = new ComboInfoModel();
                  comboInfoItem.convertFromComboInfo(result.Data[i]);
                  self.ComboParams.ComboDetails.push(comboInfoItem);
                }
                $scope.$apply();
              }
              util.showFade(result.Message);
            }, function (error){
              util.showFade(error);
            });
          },

          AddOrModify:function (){                        //添加体检套餐
            var self = $scope.vm.ComboInfo,
            url = 'BMSComboinfo/AddOrModify',
            params = self.ComboParams;
            if (params.Name == ""||
                params.Price==""){
              util.showFade("请先完成套餐相关信息！");
              return;
            }
            // if (params.Price.Trim().isnotValidate()||
            //     params.OldPrice.Trim().isnotValidate()){
            //   util.showFade("请输入正确的价格！");
            //   return;
            // }
            if (params.Price.Trim().isnotValidate()){
              util.showFade("请输入正确的价格！");
              return;
            }
            if (params.OldPrice.Trim()!="" && params.OldPrice.Trim().isnotValidate()){
              util.showFade("请输入正确的价格！");
              return;
            }
            if (!params.ComboDetails||params.ComboDetails.length<=0){
              util.showFade("请通过模板表格上传相应的体检套餐项目！");
              return;
            }
            params.Price = params.Price.Trim();
            params.OldPrice = params.OldPrice.Trim();
            params.DepartCode = $scope.vm.data.currDeptCode;
            params.ComboTags=[];
            for(var i=0; i<self.TagList.length; i++){
              if (self.TagList[i].Checked){
                params.ComboTags.push(angular.copy(self.TagList[i]));
              }
            }
            util.ajaxZSTJPost($http, url, params, function (result){
                if (result.Code == 1){
                  for (var i = 0;i<self.TagList.length;i++){
                    self.TagList[i].Checked = false;
                  }
                  var comboItem = new ComboListModel();
                  comboItem.convertFromComboList(result.Data);
                  for(var i=0;i<self.ComboList.OutOfSaleList.length;i++){
                    if (self.ComboList.OutOfSaleList[i].ID==comboItem.ID){
                      break;
                    }
                  }
                  self.ComboList.OutOfSaleList.splice(i,1,comboItem);
                  self.clearAll();
                    // self.ComboList.OutOfSaleList.push(comboItem);
                  $("#AddpackageModel").modal("hide");
                }else {
                  util.showFade(result.Message);
                }
            }, function (error){
                util.showFade(error);
            });
          },

          RemoveCombo:function(selectedID){               //删除体检套餐
            var self = $scope.vm.ComboInfo,
            url = 'BMSComboinfo/Remove',
            params = {ComboInfoIDs:[]};
            if(selectedID){
              params.ComboInfoIDs.push(selectedID);
            }else {
              params.ComboInfoIDs = self.checkSelectedCombo();
            }
            if(params.ComboInfoIDs.length == 0){
              util.showFade("请至少选择一个套餐");
              return;
            }
            util.ajaxZSTJPost($http, url, params, function (result){
              if (result.Code == 1){
                for (var i=0;i<params.ComboInfoIDs.length;i++){
                  for(var j=0;j<self.ComboList.OutOfSaleList.length;j++){
                    if(params.ComboInfoIDs[i] == self.ComboList.OutOfSaleList[j].ID){
                      self.ComboList.OutOfSaleList.remove(self.ComboList.OutOfSaleList[j]);
                    }
                  }
                }
                self.clearAll();
                util.showFade(result.Message);
              }
            }, function (error){
                util.showFade(error);
            });
          },

          PutAway:function(){                             //上架体检套餐
            var self = $scope.vm.ComboInfo,
            url = 'BMSComboinfo/Putaway',
            params = {ComboInfoIDs:[]};
            params.ComboInfoIDs = self.checkSelectedCombo();
            if(params.ComboInfoIDs.length == 0){
              util.showFade("请至少选择一个套餐");
              return;
            }
            util.ajaxZSTJPost($http, url, params, function (result){
              if (result.Code == 1){
              self.GetList("");
              // for (var i=0;i<params.ComboInfoIDs.length;i++){
              //     for(var j=0;j<self.ComboList.OutOfSaleList.length;j++){
              //       if(params.ComboInfoIDs[i] == self.ComboList.OutOfSaleList[j].ID){
              //         self.ComboList.OutOfSaleList[j].Status = 1;
              //         self.ComboList.OnSaleList.push(self.ComboList.OutOfSaleList[j]);
              //         self.ComboList.OutOfSaleList.remove(self.ComboList.OutOfSaleList[j]);
              //       }
              //     }
              //   }
              // self.clearAll();
              // util.showFade(result.Message);

              }
            }, function (error){
                util.showFade(error);
            });
          },

          Soldout:function(){                             //下架体检套餐
            var self = $scope.vm.ComboInfo,
            url = 'BMSComboinfo/Soldout',
            params = {ComboInfoIDs:[]};
            params.ComboInfoIDs = self.checkSelectedCombo();
            if(params.ComboInfoIDs.length == 0){
              util.showFade("请至少选择一个套餐");
              return;
            }
            util.ajaxZSTJPost($http, url, params, function (result){
                if (result.Code == 1){
                  self.GetList("");
                  // for (var i=0;i<params.ComboInfoIDs.length;i++){
                  //   for(var j=0;j<self.ComboList.OnSaleList.length;j++){
                  //     if(params.ComboInfoIDs[i] == self.ComboList.OnSaleList[j].ID){
                  //       self.ComboList.OnSaleList[j].Status = 0;
                  //       self.ComboList.OutOfSaleList.push(self.ComboList.OnSaleList[j]);
                  //       self.ComboList.OnSaleList.remove(self.ComboList.OnSaleList[j]);
                  //     }
                  //   }
                  // }
                  // self.clearAll();
                  // util.showFade(result.Message);
                }
            }, function (error){
                util.showFade(error);
            });
          },

          Sort:function(firstItem, secondItem, index){    //排序
            // console.log($scope.vm.ComboInfo.ComboList);
            var self = $scope.vm.ComboInfo,
            url = 'BMSComboinfo/ComboinfoSort',
            params = {
              IndexOneID:firstItem.ID,
              IndexTwoID:secondItem.ID
            };
            util.ajaxZSTJPost($http, url, params, function (result){
              if (result.Code == 1 && result.Data == true){
                // var firstIndex = firstItem.Index;
                // firstItem.Index = secondItem.Index;
                // secondItem.Index = firstIndex;
                // util.showFade(result.Message);
                self.GetList("");
              }
            }, function (error){
                util.showFade(error);
            });
          },

          SortToTopOrBottom:function(ID, Tag){            //排序至顶部或者底部
            var self = $scope.vm.ComboInfo,
            url = 'BMSComboinfo/ComboinfoSortTopOrBottom',
            params = {
              ComboinfoID:ID,
              tag:Tag
            };
            util.ajaxZSTJPost($http, url, params, function (result){
              if (result.Code == 1 && result.Data == true){
                  // util.showFade(result.Message);
                  self.GetList("");
              }
            }, function (error){
                util.showFade(error);
            });
          },

          checkSelectedCombo:function(){                  //返回选中的套餐ID
            var self = $scope.vm.ComboInfo;
            var selectCombos = [];
            for (var i=0; i<self.ComboList.OnSaleList.length;i++){
              if (self.ComboList.OnSaleList[i].Checked){
                selectCombos.push(self.ComboList.OnSaleList[i].ID);
              }
            }
            for (var j=0; j<self.ComboList.OutOfSaleList.length;j++){
              if (self.ComboList.OutOfSaleList[j].Checked){
                selectCombos.push(self.ComboList.OutOfSaleList[j].ID);
              }
            }
            return selectCombos;
          },

          Init:function (){
            var Depart = $scope.vm.data.currServerClick.DeptCode,
                currentTag = $scope.vm.data.currentSelectedTag,
                self = $scope.vm.ComboInfo;
            self.DepartCode = Depart;
            self.state = true;
            self.SelectAll = false;
            self.GetList("");
            self.GetComboTagList();
            $scope.vm.data.currentSelectedTag = self.CurrentTag;

            // document.addEventListener('uploaded', function(e){
            //   self.UploadImgCallBack(e.detail);
            // });
          }
        },

        // 挂号预约 板块内容
        AppointmentURL:{
           CurrentTag:"AppointmentURL",
           data:{
              ID:'',
              AppointmentURL:''
           },
           Appointment:function () {  // 请求挂号预约信息
              var Depart = $scope.vm.data.currServerClick.DeptCode,  // 获取当前选中机构编号
                  url = 'BMSMecinfo/GetMECAppointmentURL',
                  self = $scope.vm.AppointmentURL,
                  data = {
                     DepartCode:Depart
                  };
              // console.log(data)
              util.ajaxZSTJPost($http, url, data, function (result) {
                    // console.log(result.Data)
                    if (result.Code == 1) {
                      self.data = [];
                      if(result.Data){
                        self.data = result.Data;
                      }
                    }
                }, function (error) {
                    util.showFade('请求失败');
              });
           },
           OnSaveAppointment:function () {  // 保存挂号预约信息
              var url = 'BMSMecinfo/AddOrModifyMECAppointmentURL',
                  self = $scope.vm.AppointmentURL.data,
                  Depart = $scope.vm.data.currServerClick.DeptCode,
                  data = {
                     AppointmentURL: self.AppointmentURL,
                     DepartCode: Depart
                  };
              // console.log(self.AppointmentURL)
              // if(self.AppointmentURL == ''){
              //     util.showFade('地址不能为空');
              //     return;
              // }
              util.ajaxZSTJPost($http, url, data, function (result) {
                  // console.log(result.Data)
                  if (result.Code == 1) {
                    self.data = result.Data;
                    util.showFade('保存成功');
                  }
              }, function (error) {
                  util.showFade('保存失败');
              });
           },
           Init:function () {
             var currentTag = $scope.vm.data.currentSelectedTag,
             self = $scope.vm.AppointmentURL;
             $scope.vm.AppointmentURL.Appointment();
            $scope.vm.data.currentSelectedTag = self.CurrentTag;
           }
        },

        // 地推图片 板块内容
        RecommendURL:{
            data:{
                RecommendImgLogo:{
                  ImageUrl:'',
                  imgwidth:'',
                  imgheight:'',
                  AImageUrl:''
                },
                RecommendImgConduct:{
                  ImageUrl:'',
                  imgwidth:'',
                  imgheight:'',
                  AImageUrl:''
                },
                Recitems:{
                  id:'',
                  width: '',
                  height: '',
                  size: 200,
                  SizesImg: false,
                  type: [],
                  path: Const.ComboConfig.DepartHtml5Pic,
                  Depart: '',
                }
            },
            OnClickRecLogo:function(){                                 // 上传医院logo 图标
               var $$this = $scope.vm.RecommendURL.data.RecommendImgLogo,
                   self = $scope.vm.RecommendURL.data,
                   dept = $scope.vm.data.currServerClick.DeptCode;
               self.Recitems.id = '#RecommendLogoSrc';
               self.Recitems.Depart = '/logo_' + dept;
               self.Recitems.width = '600';
               self.Recitems.height = '180';
               self.Recitems.type = ['png'];
               if($$this.imgwidth > self.Recitems.width || $$this.imgheight > self.Recitems.height){
                   self.Recitems.SizesImg = true;
               }
               UpImages.ChangeSelf($$this);
               UpImages.OnClickUploadImage(self.Recitems);
            },
            OnClickRecCon:function(){                                  // 上传医院宣传 图标
               var $$this = $scope.vm.RecommendURL.data.RecommendImgConduct,
                   self = $scope.vm.RecommendURL.data,
                   dept = $scope.vm.data.currServerClick.DeptCode;
               self.Recitems.id = '#RecommendConductSrc';
               self.Recitems.Depart = '/bg_' + dept;
               self.Recitems.width = '800';
               self.Recitems.height = '600';
               self.Recitems.type = ['jpg'];
               if($$this.imgwidth > self.Recitems.width || $$this.imgheight > self.Recitems.height){
                   self.Recitems.SizesImg = true;
               }
               UpImages.ChangeSelf($$this);
               UpImages.OnClickUploadImage(self.Recitems);
            },
            Init:function(){
               var  $$this = $scope.vm.RecommendURL.data,
                    dept = $scope.vm.data.currServerClick.DeptCode,
                    urlLogo = 'http://zhangshangtijian.b0.upaiyun.com/default/DepartHtml5Pic/logo_'+ dept + '.png',
                    selfLogo = $$this.RecommendImgLogo,
                    urlCon = 'http://zhangshangtijian.b0.upaiyun.com/default/DepartHtml5Pic/bg_'+ dept + '.jpg',
                    selfCon = $$this.RecommendImgConduct;
               selfLogo.AImageUrl = urlLogo;
               selfCon.AImageUrl = urlCon;
               $scope.vm.data.currentSelectedTag = 'RecommendURL';
            }

            // Judgeimg:function(url,val,id){                               // 判断图片是否存在
            //    var ImgObj=new Image();
            //    ImgObj.src= url;
            //    console.log(ImgObj.complete);
            //    ImgObj.onload=function(){
            //         if(ImgObj.width > 0 && ImgObj.height > 0){
            //            val.ImageUrl = url;

            //         }
            //    }
            // },
            // Init:function(){
            //    var  $$this = $scope.vm.RecommendURL.data,
            //         dept = $scope.vm.data.currServerClick.DeptCode,
            //         urlLogo = 'http://zhangshangtijian.b0.upaiyun.com/default/DepartHtml5Pic/logo_'+ dept + '.png',
            //         selfLogo = $$this.RecommendImgLogo,
            //         urlCon = 'http://zhangshangtijian.b0.upaiyun.com/default/DepartHtml5Pic/bg_'+ dept + '.jpg',
            //         selfCon = $$this.RecommendImgConduct;
            //    $scope.vm.RecommendURL.Judgeimg(urlLogo,selfLogo,'#banner_url_logo');
            //    $scope.vm.RecommendURL.Judgeimg(urlCon,selfCon,'#banner_url_bg');
            //    $scope.vm.data.currentSelectedTag = 'RecommendURL';
            // }
        },

        // 上传机构图标
        DepartIco:{
          CurrentTag: 'DepartIco',
          ImageSrc: '',
          ImageLink: 'http://zhangshangtijian.b0.upaiyun.com/default/deptIcon/MyxA46tzXnUD4Qbk1N8tqHdOYV2ZoI7g.png',
          ImageSize:{
              imgwidth:'',
              imgheight:''
          },
          OnClickByUpload: function(){
            if (!$("#inputDepartIco")[0].files[0]){
              util.showFade('请选择您要上传的图片！');
              return;
            }

            var $$this = $scope.vm.DepartIco,
                Imgwidth = $$this.ImageSize.imgwidth,                           //图片的宽度
                Imgheight = $$this.ImageSize.imgheight,                         //图片的高度
                Imgsize = $("#inputDepartIco")[0].files[0].size/1024;           //图片的大小

            if ($("#inputDepartIco")[0].files[0].name.split('.').pop() != "jpg" &&
                      $("#inputDepartIco")[0].files[0].name.split('.').pop() != "jpeg" &&
                      $("#inputDepartIco")[0].files[0].name.split('.').pop() != "png"
            ){
              util.showFade("请选择正确的图片文件！");
              return;
            }else if(Imgwidth>120 || Imgheight>120){
              util.showFade("图片宽高不能超过120*120");
              return;
            }else if(Imgsize>100){
              util.showFade("图片大小不能超过100kb");
              return;
            }
            util.showAjaxLoading();
            var ext = '.' + $("#inputDepartIco")[0].files[0].name.split('.').pop();
            var config = {
              bucket: Const.ComboConfig.bucket,
              expiration: parseInt((new Date().getTime() + 3600000) / 1000),
              form_api_secret: Const.ComboConfig.form_api_secret
            };

            var instance = new Sand(config);
            var fileName = util.randomString(32) + ext;
            var pathName = Const.ComboConfig.deptIconPath;
            // var pathName = Const.ComboConfig.defaultPath + (new Date()).Format("yyyyMMdd")+"/";

            instance.upload(pathName + fileName,"#inputDepartIco");
            // instance.upload("/default/ComboDefault" + ext);
          },

          UploadImgCallBack: function (uploadData){            //上传图片回调
            var $$this = $scope.vm.DepartIco;
            $$this.ImageLink = Const.ComboConfig.ComboBaseUrl + uploadData['path'];
            $scope.$apply();
            util.hideAjaxLoading();
          },
          InitDepartSingle: function(){
            var $$this = $scope.vm.DepartIco,
                url = 'BMSMecinfo/GetDepartSingle',
                data = {
                  DepartCode: $scope.vm.data.currServerClick.DeptCode
                };
            util.ajaxZSTJPost($http, url, data, function (result) {

                    if (result.Code == 1 && result.Data!=null) {
                      if(result.Data){
                        $$this.ImageLink = result.Data.ImageSrc;
                        if(result.Data.IsHavePDF == null){
                           $scope.vm.data.IsHavePDF = false;
                        }else{
                           $scope.vm.data.IsHavePDF = result.Data.IsHavePDF;
                        }
                      } else {
                           util.showFade(result.Message);
                      }
                    } else {
                        $scope.vm.data.IsHavePDF = false;
                        util.showFade(result.Message);
                    }
                }, function (error) {
                    util.showFade('请求失败');
              });
          },
          Init: function(){
            // var $$self = $scope.vm.DepartIco;
            // $scope.vm.data.currentSelectedTag = $$self.CurrentTag;

            // $$self.InitDepartSingle();
          }
        }
      };
      $scope.vm.Init();



    });
    return app;
  });
