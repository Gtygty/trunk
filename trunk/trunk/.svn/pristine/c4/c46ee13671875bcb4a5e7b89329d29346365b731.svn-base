define([], function () {
  var messageDeptListModel = function () {
    var self = this;
    self.Id;
    self.Name;
    self.DeptKey;
    self.IsSendSms;
    self.IsSendSmsEnabled;
    self.convertFrom = function (dataModel) {
      self.Id = dataModel.Id;
      self.Name = dataModel.Name;
      self.DeptKey = dataModel.RptDeptKey;
      self.IsSendSms = dataModel.IsSendSms;
      self.IsSendSmsEnabled = dataModel.IsSendSmsEnabled;
    };
    self.converSearch = function(dataModel){
      result={}
      result.Id = dataModel.Id;
      result.Name = dataModel.Name;
      result.DeptKey = dataModel.RptDeptKey;
      result.IsSendSms = dataModel.IsSendSms;
      result.IsSendSmsEnabled = dataModel.IsSendSmsEnabled;
      return result
    }
  };
  return messageDeptListModel;
});
