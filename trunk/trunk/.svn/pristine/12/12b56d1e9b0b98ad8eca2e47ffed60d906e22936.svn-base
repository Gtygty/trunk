define(['Extend', 'common/util']
, function (Extend, util) {

    var telAppointmentModel = {};
    
    telAppointmentModel.ConvertInfo = function(dataModel){
        var obj = {};
        obj.AMapCityCode = dataModel.AMapCityCode;
        obj.AMapCityName = dataModel.AMapCityName;
        obj.AMapProvinceCode = dataModel.AMapProvinceCode;
        obj.AMapProvinceName = dataModel.AMapProvinceName;
        obj.AccountId = dataModel.AccountId;
        obj.CreateTime = dataModel.CreateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
        obj.CustomerName = dataModel.CustomerName;
        obj.CustomerPhone = dataModel.CustomerPhone;
        obj.Id = dataModel.Id;
        obj.LastUpdateTime = dataModel.LastUpdateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
        obj.Remark = dataModel.Remark;
        obj.State = dataModel.State;
        return obj;
    }
    
    return telAppointmentModel;

});
