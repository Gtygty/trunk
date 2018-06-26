define(['sysConfig', 'common/util'], function (config,util) {
  var bannerAppModel = function (dataModel) {
    var self = this;
    self.value;
    self.text;
    //机构信息
    self.DeptCode;
    self.DeptName;
    self.IsAppOpen;
    self.DeptCodeASSIC;
    self.PromotionUrl;
    self.ShortLink;
    //Banner信息
    self.BannerDeparts;
    self.BannerName;
    self.BannerCreateDate;
    self.BannerID;
    self.BannerImageUrl;
    self.BannerLinkUrl;
    self.IsClick;
    self.ServerInput;
    self.ImgUrl;
    self.OrderTop;
    self.OrderDown;
    self.DownOneId;
    self.DownTwoId;
    self.TopOneId;
    self.TopTwoId;
    self.BannerRelationID;
    //机构文本信息
    self.Id;
    self.Type;
    self.LinkUrl;
    self.Description;
    self.CreateDate;
    //机构详细文本信息
    self.SimpleContent;
    self.clickClass;
    //意见反馈信息
    self.ServerId,
    self.DepartName,
    self.RealName,
    self.Mobile,
    self.FeedBackContent,
    self.CreateDate,
    self.RebackMethod,
 

    self.convertFromServers = function (dataModel) {   //机构Model
      self.DeptCode = dataModel.DeptCode;
      self.DeptName = dataModel.DeptName;
      self.IsAppOpen = dataModel.IsAppOpen;
      self.DeptCodeASSIC = dataModel.DeptCodeASSIC;
      self.PromotionUrl = getPromotionUrl(dataModel);
      self.clickClass =false;
      self.ImgUrl = '/img/yuan1.png';
      if (self.IsAppOpen) {
        self.ImgUrl = '/img/yuan1.png';
      } else {
        self.ImgUrl = '/img/yuan.png';
      }
      self.IsClick = true;
      if (dataModel.IsAppOpen || dataModel.IsAppOpen == null) {
        self.IsClick = true;
      }
      else {
        self.IsClick = false;
      }
    };

    self.convertFromServerInfo = function (dataModel) {   //机构Model
      self.DeptCode = dataModel.DeptCode;
      self.DeptName = dataModel.DeptName;
      self.IsAppOpen = dataModel.IsAppOpen;
      // self.DeptCodeASSIC = dataModel.DeptCodeASSIC;
      self.PromotionUrl = getPromotionUrl(dataModel);
      self.clickClass =false;
      self.ImgUrl = '/img/yuan1.png';
      if (self.IsAppOpen) {
        self.ImgUrl = '/img/yuan1.png';
      } else {
        self.ImgUrl = '/img/yuan.png';
      }
      self.IsClick = true;
      if (dataModel.IsAppOpen || dataModel.IsAppOpen == null) {
        self.IsClick = true;
      }
      else {
        self.IsClick = false;
      }
    };


    self.convertFromBanner = function (dataModel) {   //BannerModel
      self.BannerDeparts = dataModel.BannerDeparts;
      self.BannerName = dataModel.BannerName;
      self.BannerCreateDate = dataModel.CreateDate.split('T')[0];
      self.BannerID = dataModel.ID;
      self.BannerImageUrl = dataModel.ImageUrl;
      self.BannerLinkUrl = dataModel.LinkUrl;
      self.OrderTop = true,
      self.OrderDown = true,
      self.BannerRelationID = dataModel.BannerRelationID,
      self.DownOneId = '',
      self.DownTwoId = '',
      self.TopOneId = '',
      self.TopTwoId = '',
      self.ServerInput = '';
      for (var i = 0; i < self.BannerDeparts.length; i++) {
        self.ServerInput += self.BannerDeparts[i].DeptName + ',';
      }
    };
    self.convertFromSimpleContent = function (dataModel) {
      self.Id = dataModel.id;
      self.Type = dataModel.Type;
      self.LinkUrl = config.SimpleContentLinkPreForamt + dataModel.id;
      self.Description = dataModel.Description;
      self.CreateDate = dataModel.CreateDate;
    };
    self.convertFromSimpleContentDetail = function (dataModel) {
      self.Id = dataModel.id;
      self.Type = dataModel.Type;
      self.Description = dataModel.Description;
      self.SimpleContent = dataModel.SimpleContent;
      self.CreateDate = dataModel.CreateDate;
    };
    self.convertFromFeedBack = function(dataModel){
      self.ServerId = dataModel.Id;
      self.DepartName = dataModel.DepartName;
      self.RealName = dataModel.RealName;
      self.Mobile = dataModel.Mobile;
      self.FeedBackContent = dataModel.FeedBackContent;
      self.CreateDate = dataModel.CreateDate.ClearT().ConvertToDate().Format("yyyy-MM-dd hh:mm:ss");
      self.RebackMethod = dataModel.RebackMethod.toLowerCase();
    }

    var getPromotionUrl = function(){
      var regionUrl = config.autoSend.GetURL() + "/promotion/" + self.DeptCode + "/" + self.DeptName;
      return config.autoSend.GetURL() + "/promotion/" + self.DeptCode + "/" + encodeURIComponent(self.DeptName)+"/"+util.createRequestToken(regionUrl);
    }
  };
  return bannerAppModel;
});

