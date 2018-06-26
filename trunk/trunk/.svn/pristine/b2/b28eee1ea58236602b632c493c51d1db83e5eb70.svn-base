define(['Extend', 'common/util'], function (Extend, util) {
	  var currentObj={};
    currentObj.ConvertSelectItem=function(dataModel){
      var obj={};
      obj.value=dataModel.DeptCode;
      obj.text=dataModel.DeptName;
      return obj;
    }
    currentObj.convertProvice = function (dataModel) {
        var obj={};
      	obj.ID = dataModel.ID;
      	obj.Name = dataModel.Name;
      	return obj;
    }
    currentObj.convertCity = function (dataModel) {
      	var obj={};
      	obj.ID = dataModel.ID;
      	obj.Name = dataModel.Name;
      	obj.ParentID = dataModel.ParentID;
      	return obj;
    }
    currentObj.convertAmpProvice = function (dataModel) {
        var obj={};
      	// obj.ID = parseInt(dataModel.ID);
      	obj.ID = dataModel.ID+"";
        obj.Name = dataModel.Name;
      	return obj;
    }
    currentObj.convertAmpCity = function (dataModel) {
      	var obj={};
      	// obj.ID = parseInt(dataModel.ID);
      	obj.ID = dataModel.ID+"";
      	obj.Name = dataModel.Name;
      	// obj.ParentID = parseInt(dataModel.ParentID);
      	obj.ParentID = dataModel.ParentID+"";
      	return obj;
    }
    currentObj.convertSearchResultItem=function(dataModel){
    	var obj={};
    	obj.Type="体检中心";
    	obj.SupplierName=dataModel.BaseInfo.SupplierName;
    	obj.SupplierCode=dataModel.BaseInfo.SupplierCode;
    	obj.ContactName=dataModel.BaseInfo.ContactName;
    	obj.ContactPhone=dataModel.BaseInfo.ContactPhone;
    	return obj;
    }
    currentObj.convertSupplierDetail=function(dataModel){
      var obj={};
      obj.Id=dataModel.Id;
      obj.Type=dataModel.Type;
      obj.BaseInfo={};
      obj.BaseInfo.SupplierName=dataModel.BaseInfo.SupplierName;
      obj.BaseInfo.SupplierCode=dataModel.BaseInfo.SupplierCode;
      obj.BaseInfo.SupplierTags=dataModel.BaseInfo.SupplierTags;
      obj.BaseInfo.ContactName=dataModel.BaseInfo.ContactName;
      obj.BaseInfo.ContactPhone=dataModel.BaseInfo.ContactPhone;
      obj.BaseInfo.ContactMail=dataModel.BaseInfo.ContactMail;
      obj.BaseInfo.Address=dataModel.BaseInfo.Address;
      obj.BaseInfo.Province=dataModel.BaseInfo.Province;
      obj.BaseInfo.City=dataModel.BaseInfo.City;
      obj.BaseInfo.AMapProvince=dataModel.BaseInfo.AMapProvince;
      obj.BaseInfo.AMapCity=dataModel.BaseInfo.AMapCity;
      obj.BaseInfo.State=dataModel.BaseInfo.State;
      obj.BaseInfo.Weight=dataModel.BaseInfo.Weight;
      obj.BaseInfo.GroupAppointLimit=dataModel.BaseInfo.GroupAppointLimit;
      obj.Other={};
      obj.Other.MECLevel=dataModel.Other.MECLevel;
      obj.Other.WorkTime=dataModel.Other.WorkTime;
      obj.Other.Route=dataModel.Other.Route;
      obj.Other.ParkingLot=dataModel.Other.ParkingLot;
      obj.Other.MinBookRange=dataModel.Other.MinBookRange;
      obj.Other.MaxBookRange=dataModel.Other.MaxBookRange;
      obj.Other.WorkDateList=dataModel.Other.WorkDateList;
      var lngLat=dataModel.Other.LngLat.split(";");
      if(lngLat.length==2){
        obj.Other.Longitude=lngLat[0];
        obj.Other.Latitude=lngLat[1];
      }
      obj.Other.MECInfo={};
      obj.Other.MECInfo.HasWIFI=dataModel.Other.MECInfo.HasWIFI;
      obj.Other.MECInfo.MECLogoImg=dataModel.Other.MECInfo.MECLogoImg;
      obj.Other.MECInfo.MECBgImg=dataModel.Other.MECInfo.MECBgImg;
      obj.Other.MECInfo.MECAuthorImg=dataModel.Other.MECInfo.MECAuthorImg;
      obj.Other.MECInfo.MECDesc=dataModel.Other.MECInfo.MECDesc;
      return obj;
    }

	return currentObj;
});
