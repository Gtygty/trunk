'use strict';

define([], function () {
  var viewModel = function () {
    var self = this;
    self.convertFromTotal = function (dataModel) {
      var result = {
        id: 0,       //       (id)
        name: '',			//      （服务机构）
        RegistCount: '', //   （注册量）
      };
      result.id = dataModel.ServiceDeptId;
      result.name = dataModel.ServiceDeptName;
      result.RegistCount = dataModel.RegistCount;
      return result;
    };
    self.convertFromClass = function (dataModel) {
      var result = {
        Date: '',       //       (日期)
        RegistCount: '', //   （注册量）
      };
      result.Date = dataModel.Date.split('T')[0];
      result.RegistCount = dataModel.RegistCount;
      return result;
    };
  };
  return viewModel;
});
