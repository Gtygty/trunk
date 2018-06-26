define(["Extend"],function(Extend){

  var messageStatisticModel = function(){
	    var self = this;

		self.convertFrom = function (dataModel) {
		    var result = {
		        Date: '', 				    //      日期
		        SendCount: '',			  //      发送量
		        ClickCount: '',			  //      点击量
		        RegistCount: '',		  //      注册量
			    	ClickRate: '',			  //      点击率
		        RegistrationRate: '',  //      注册率
		    };
		    result.Date = dataModel.Date.ClearT();
        result.Date = result.Date.ConvertToDate();
        result.Date = result.Date.Format("yyyy-MM-dd");
        result.SendCount = dataModel.SendCount;
        result.ClickCount = dataModel.ClickCount;
        result.RegistCount = dataModel.RegistCount;
        result.ClickRate = parseInt(dataModel.ClickRate)+'%';   //.toPercent()
        result.RegistrationRate = parseInt(dataModel.RegistrationRate)+'%';   //.toPercent()
		    return result;
		};


    self.convertFromTotal = function (dataModel) {
		    var result = {
		        SeviceDeptId: '', 				    //      日期
		        ServiceDeptName: '',			  //      发送量
		        SendCount: '',			  //      发送量
		        ClickCount: '',			  //      点击量
		        RegistCount: '',		  //      注册量
			    	ClickRate: '',			  //      点击率
		        RegistrationRate: '',  //      注册率
		    };
		    result.SeviceDeptId = dataModel.SeviceDeptId;
        result.ServiceDeptName = dataModel.ServiceDeptName;
        result.SendCount = dataModel.SendCount;
        result.ClickCount = dataModel.ClickCount;
        result.RegistCount = dataModel.RegistCount;
        result.ClickRate = parseInt(dataModel.ClickRate)+'%';   //.toPercent()
        result.RegistrationRate = parseInt(dataModel.RegistrationRate)+'%';   //.toPercent()
		    return result;
		};

	};
  return messageStatisticModel;
})
