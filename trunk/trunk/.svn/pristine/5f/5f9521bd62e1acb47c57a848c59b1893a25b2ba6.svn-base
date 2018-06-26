define(['common/const'], function (Const) {
    var serverInfoModel = function () {
        var self = this;
        self.DepartCode;
        self.DeptCodeASSIC;
        self.CreateDateFormat;
        self.ImageSrc;
        self.IsAppOpen;
        self.IsHavePDF;
        self.AppointmentURL;
        self.BannerList;
        self.ImageSrc;
        self.pushLogo;  //地推Logo
        self.pushBg;  //地推背景图


        self.convertFrom = function(dataModel){
            self.DepartCode = dataModel.DepartCode;
            self.DeptCodeASSIC = dataModel.DeptCodeASSIC;
            self.CreateDateFormat = dataModel.CreateDate.ClearT().ConvertToDate().Format("yyyy-MM-dd hh:mm:ss");
            self.IsAppOpen = dataModel.IsAppOpen;
            self.IsHavePDF = dataModel.IsHavePDF;
            self.AppointmentURL = dataModel.AppointmentURL;
            self.BannerList = self.converBannerList(dataModel.BannerList);
            self.ImageSrc = dataModel.ImageSrc;
            //TODO 又拍云基础地址需读配置文件
            // self.pushLogo = 'http://zhangshangtijian.b0.upaiyun.com/default/DepartHtml5Pic/logo_'+ dataModel.DepartCode + '.png';
            // self.pushBg = 'http://zhangshangtijian.b0.upaiyun.com/default/DepartHtml5Pic/bg_'+ dataModel.DepartCode + '.jpg'
            self.pushLogo = Const.ComboConfig.ComboBaseUrl + Const.ComboConfig.DepartHtml5Pic + "logo_" + dataModel.DepartCode + '.png';
            self.pushBg =  Const.ComboConfig.ComboBaseUrl + Const.ComboConfig.DepartHtml5Pic + "bg_" + dataModel.DepartCode + '.jpg'
        }

        self.converBannerList = function(dataList){
            var bannerList = [];
            dataList.forEach(function(value,index,array){
                if (value!=null){
                    var bannerEntity = new bannerModel();
                    bannerEntity.convertFrom(value);
                    bannerList.push(bannerEntity);
                }
            })
            return bannerList;
        }

        var bannerModel = function(){
            var that = this;
            that.BannerName;
            that.ImageUrl;
            that.LinkUrl;

            that.convertFrom = function(dataModel){
                that.BannerName = dataModel.BannerName;
                that.ImageUrl = dataModel.ImageUrl;
                that.LinkUrl = dataModel.LinkUrl;
            }
        }

    }
    return serverInfoModel;
})
