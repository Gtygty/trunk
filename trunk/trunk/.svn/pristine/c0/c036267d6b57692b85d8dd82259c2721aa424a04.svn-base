define(['Extend', 'common/util', 'sysConfig']
  , function (Extend, util, sysConfig, mallConst) {
  var PromoteOrderModel = {};

  PromoteOrderModel.ConvertOrderInfo = function(dataModel){
    var obj = {};
    obj.Id = dataModel.Id;
    obj.RootType = dataModel.RootType;
    obj.AccountId = dataModel.CommonInfo.AccountId;
    obj.PayId = dataModel.CommonInfo.PayId;
    obj.State = dataModel.CommonInfo.State;
    obj.PayAmount = dataModel.CommonInfo.PayAmount;
    obj.CreateTime = dataModel.CommonInfo.CreateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.LastUpdateTime = dataModel.CommonInfo.LastUpdateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.CallMobile = dataModel.Other.CallMobile;
    obj.SelfDescription = dataModel.Other.SelfDescription; 
    obj.Remark = dataModel.Other.Remark; 
    obj.Feedback = dataModel.Other.Feedback; 
    return obj;
  }

  return PromoteOrderModel;
})
