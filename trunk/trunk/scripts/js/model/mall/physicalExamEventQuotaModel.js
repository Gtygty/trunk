define([],function () {
	var physicalExamEventQuotaModel = function () {

    this.convertExamEventQuotaList = function(items){
      var tempData = [];
  		if (items!=null) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];
  				    tempData.push({
	                'Id':item.Id,
			    	'Project':item.Project,
			    	'Content':item.Content,
			    	'Desc':item.Desc,
			    	'SexType':item.SexType,
			    	'Tag':item.Tag,
			    	'Weight':item.Weight
	  			})
	  		}
  		}
  		return tempData;
    }

    this.convertExamEventQuotaGroupList = function(items){
      var tempData = [];
  		if (items!=null) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];
  				    tempData.push({
	                'Id':item.Id,
			    	'Project':item.Project,
			    	'Content':item.Content,
			    	'Desc':item.Desc,
			    	'SexType':item.SexType,
			    	'Tag':item.Tag,
			    	'Weight':item.Weight
	  			})
	  		}
  		}
  		return tempData;
    }

  };
  return physicalExamEventQuotaModel;
})