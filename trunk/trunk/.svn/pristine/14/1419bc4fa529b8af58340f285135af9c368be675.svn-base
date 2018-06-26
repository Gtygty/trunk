define(['Extend','common/util','sysConfig'],function(Extend,util,sysConfig){
  var viewModel = function () {
	var self = this,
	    format = 
	    {
	    	ClearT:function(input) {
	    		if (!input) return '-';
	    		var date = input.ClearT();
  	    		item = date.split('.');
	    		return item[0];
	    	}
	    };

// QuotaStore
  	self.convertQuotaStoreList = function (items) {
  		var tempData = [];
  		if (items!=null) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];

  				    tempData.push({
  				    	'Id':item.Id,
  				    	'Type':item.Type,
  				    	'Name':item.Name,
  				    	'Description':item.Description,
  				    	'Clinic':item.Clinic,
  				    	'Suggestion':item.Suggestion,
  				    	'CreateDate':item.CreateDate,
  				    	'LastUpdateTime':format.ClearT(item.LastUpdateTime)
  				    });
  			}
  		}
  		return tempData;
  	};



// DiseaseStore
  	self.convertDiseaseStoreList = function (items) {
  		var tempData = [];
  		if (items!=null) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];

  				    tempData.push({
  				    	'Id':item.Id,
  				    	'Type':item.Type,
  				    	'Name':item.Name,
  				    	'Description':item.Description,
  				    	'Clinic':item.Clinic,//临床意义
  				    	'Suggestion':item.Suggestion,//医生建议
  				    	'Illness':item.Illness,//病因或危险因素
  				    	'RecipeLife':item.RecipeLife,//生活处方
  				    	'RecipeFood':item.RecipeFood,//饮食处方
  				    	'RecipeSport':item.RecipeSport,//运动处方
  				    	'Risk':item.Risk,//风险及并发症
  				    	'prognosis':item.prognosis,//预后
  				    	'CreateDate':item.CreateDate,
  				    	'LastUpdateTime':format.ClearT(item.LastUpdateTime)
  				    });
  			}
  		}
  		return tempData;
  	};

  };

  return viewModel;
});