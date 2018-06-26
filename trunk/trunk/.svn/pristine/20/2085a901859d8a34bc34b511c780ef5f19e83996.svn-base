define([], function () {
  var serviceDeptItemModel = function () {
    var self = this;
    self.Name;
    self.Id;
    self.RptDeptKey;
    self.DoctorCount;
    self.Address;
    self.SmsType;
    self.SmsAccount;
    self.SmsPassword;
    self.SmsSign;
    self.SmsShortCode;
    self.PhotoUrl;
    self.IsSelect;
    self.FullName;
    self.ServiceTypeState;
    self.ServiceType;
    self.OperateBy;

    self.convertFrom = function (dataModel) {
      self.Name = dataModel.Name;
      self.Id = dataModel.Id;
    };
    self.convert = function (dataModel) {
      self.Name = dataModel.Name;
      self.Id = dataModel.ID;
      self.RptDeptKey = dataModel.RptDeptKey;
      self.DoctorCount = dataModel.DoctorCount;
      self.Address = dataModel.Address;
      self.SmsType=dataModel.SmsType;
      self.SmsAccount = dataModel.SmsAccount;
      self.SmsPassword = dataModel.SmsPassword;
      self.SmsSign = dataModel.SmsSign;
      self.SmsShortCode = dataModel.SmsShortCode;
      self.PhotoUrl = dataModel.PhotoUrl;
      self.IsSelect = dataModel.ScanIsSelect;
      self.FullName = dataModel.FullName;
      self.ServiceTypeState = dataModel.ServiceType == 1;
      self.ServiceType = dataModel.ServiceType;
      self.OperateBy = dataModel.OperateBy;
    };
    self.convertSearch = function(dataModel) {
      result={};
      result.Name = dataModel.Name;
      result.Id = dataModel.ID;
      result.RptDeptKey = dataModel.RptDeptKey;
      result.DoctorCount = dataModel.DoctorCount;
      result.Address = dataModel.Address;
      result.SmsType=dataModel.SmsType;
      result.SmsAccount = dataModel.SmsAccount;
      result.SmsPassword = dataModel.SmsPassword;
      result.SmsSign = dataModel.SmsSign;
      result.SmsShortCode = dataModel.SmsShortCode;
      result.PhotoUrl = dataModel.PhotoUrl;
      result.IsSelect = dataModel.ScanIsSelect;
      result.FullName = dataModel.FullName;
      result.ServiceTypeState = dataModel.ServiceType  == 1;
      result.ServiceType = dataModel.ServiceType;
      result.OperateBy = dataModel.OperateBy;

      return result;
    };

    self.convertPhysicalExam = function(dataModel1, dataModel2) {
      var tempData = [];
      if(dataModel1 && dataModel1.length){
        for (var i = 0; i < dataModel1.length; i++) {
          var item = dataModel1[i];
          tempData.push({
            ExamTypeID: item.ExamTypeID,
            ExamTypeCode: item.ExamTypeCode,
            ExamTypeName: item.ExamTypeName,
            InstitutionID: item.InstitutionID,
            InstitutionCode: item.InstitutionCode,
            InstitutionName: item.InstitutionName,
            SelectedItem: 1
          });
        }
      }
      if (dataModel2 && dataModel2.length) {
        for (var j = 0; j < dataModel2.length; j++) {
          var item2 = dataModel2[j];
          for (var k = 0; k < tempData.length; k++) {
            var item1 = tempData[k];
            if (item2.ExamtypeId == item1.ExamTypeID) {
              item1.SelectedItem = item2.HzExamtype;
            }
          }
        }
      }
      return tempData;
    };
  };
  return serviceDeptItemModel;
});
