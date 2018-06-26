define(['Extend', 'common/util', 'sysConfig']
  , function (Extend, util, sysConfig) {
  var ActivePositionModel = {};

  ActivePositionModel.ConvertInfo = function(dataModel){
    var obj = {};
    obj.Id = dataModel.Id;
    obj.Name = dataModel.Name;
    obj.Type = dataModel.Type;
    obj.TypeStr = "";
    if(dataModel.Type == 1){
        obj.TypeStr = "链接";
    }else if(dataModel.Type == 2){
        obj.TypeStr = "原生";
    }
    obj.Location = dataModel.Location;
    obj.Img = dataModel.Img;
    obj.ShareImg = dataModel.ShareImg;
    obj.SubTitle = dataModel.SubTitle;
    obj.ShareUrl = dataModel.ShareUrl;
    obj.Remark = dataModel.Remark;
    obj.StartTime = dataModel.StartTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.EndTime = dataModel.EndTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.CreateDate = dataModel.CreateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.LastUpdateTime = dataModel.LastUpdateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss'); 
    obj.Url = dataModel.Url; 
    obj.ClassNameAndroid = dataModel.ClassNameAndroid; 
    obj.ParamsAndroid = dataModel.ParamsAndroid; 
    obj.ClassNameIOS = dataModel.ClassNameIOS; 
    obj.ParamsIOS = dataModel.ParamsIOS; 
    obj.State = dataModel.State; 
    obj.BannerImg = dataModel.BannerImg; 
    return obj;
  }

  return ActivePositionModel;
})
