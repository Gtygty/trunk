define(['Extend', 'common/util', 'sysConfig']
  , function (Extend, util, sysConfig) {
  var PushManagementModel = {};

  PushManagementModel.ConvertInfo = function(dataModel){
    var obj = {};
    obj.Id = dataModel.Id;
    obj.Title = dataModel.Title;
    obj.Content = dataModel.Content;
    obj.TypeStr = "";
    if(dataModel.Type == 200){
        obj.TypeStr = "报告解读";
    }else if(dataModel.Type == 210){
        obj.TypeStr = "添加报告";
    }else if(dataModel.Type == 220){
        obj.TypeStr = "健康档案";
    }else if(dataModel.Type == 230){
        obj.TypeStr = "自测问卷";
    }else if(dataModel.Type == 240){
        obj.TypeStr = "步步为赢";
    }else if(dataModel.Type == 250){
        obj.TypeStr = "中医专家";
    }
    obj.Type = dataModel.Type;
    obj.State = dataModel.State;
    obj.Remark = dataModel.Remark;
    obj.RegisterStartTime = dataModel.RegisterStartTime==null?null:dataModel.RegisterStartTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.RegisterEndTime = dataModel.RegisterEndTime==null?null:dataModel.RegisterEndTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.ReportStartTime = dataModel.ReportStartTime==null?null:dataModel.ReportStartTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.ReportEndTime = dataModel.ReportEndTime==null?null:dataModel.ReportEndTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.ConsultStartTime = dataModel.ConsultStartTime==null?null:dataModel.ConsultStartTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.ConsultEndTime = dataModel.ConsultEndTime==null?null:dataModel.ConsultEndTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.PushTime = dataModel.PushTime==null?null:dataModel.PushTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.CreateDate = dataModel.CreateDate==null?null:dataModel.CreateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.LastUpdateTime = dataModel.LastUpdateTime==null?null:dataModel.LastUpdateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.pushPeople = "";
    if(obj.RegisterStartTime!=null){
        obj.pushPeople += "注册用户："+obj.RegisterStartTime+"~"+obj.RegisterEndTime;
    }
    if(obj.ReportStartTime!=null){
        obj.pushPeople += "\n\r报告用户："+obj.ReportStartTime+"~"+obj.ReportEndTime;
    }
    if(obj.ConsultStartTime!=null){
        obj.pushPeople += "\n\r咨询用户："+obj.ConsultStartTime+"~"+obj.ConsultEndTime;
    }  
    return obj;
  }

  return PushManagementModel;
})
