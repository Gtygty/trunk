/* eslint-disable no-undef */
define(['Extend', 'common/util', 'sysConfig'], function (Extend, util, sysConfig) {
  var viewModel = function () {
    var self = this,
      format = {
        ClearT: function (input) {
          for (var j = 0; j < input.length; j++) {
            return input[j];
          }
        },
        TypeName: function (type) {
          if (type < 0) {
            return '全部服务商'
          } else if (type == 0) {
            return '体检中心'
          } else if (type == 1) {
            return '供应商'
          }
        },
        changename: function (provincecode, Provinceitem) {
          for (var j = 0; j < Provinceitem.length; j++) {
            if (Provinceitem[j].ID == provincecode) {
              return Provinceitem[j].Name;
            }
          }
        },
        cityname: function (provincecode, citycode, Cityitem) {
          var result = '';
          for (var k = 0; k < Cityitem.length; k++) {
            if (Cityitem[k].ParentID == provincecode && Cityitem[k].ID == citycode) {
              result = Cityitem[k].Name;
              break;
            }
          }
          return result;
        }
      };
    self.convertFrom = function (items) {
      if (items) {
        var tempData2 = {
          'Id': items.Id,
          'SupplierName': items.BaseInfo.SupplierName,
          'SupplierCode': items.BaseInfo.SupplierCode,
          'SupplierTags': format.ClearT(items.BaseInfo.SupplierTags),
          'ContactName': items.BaseInfo.ContactName,
          'ContactPhone': items.BaseInfo.ContactPhone,
          'ContactMail': items.BaseInfo.ContactMail,
          'Province': items.BaseInfo.Province,
          'City': items.BaseInfo.City,
          'Address': items.BaseInfo.Address,
          'Province': items.BaseInfo.Province,
          'Weight': items.BaseInfo.Weight,
          'MECLevel': items.Other.MECLevel,
          'WorkTime': items.Other.WorkTime,
          'Route': items.Other.Route,
          'ParkingLot': items.Other.ParkingLot,
          'Lng': items.Other.Lng,
          'Lat': items.Other.Lat,
          'HasWIFI': items.Other.MECInfo.HasWIFI,
          'MECLogoImg': items.Other.MECInfo.MECLogoImg,
          'MECBgImg': items.Other.MECInfo.MECBgImg,
          'MECAuthorImg': items.Other.MECInfo.MECAuthorImg,
          'MECDesc': items.Other.MECInfo.MECDesc,
          'MinBookRange': items.Other.MinBookRange,
          'MaxBookRange': items.Other.MaxBookRange
        };

      }

      return tempData2;
    };
    self.convertProvinceData = function (items) {
      var tempData6 = [];
      if (items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData6.push({
            'ID': item.ID,
            'Name': item.Name
          });
        }
      }
      return tempData6

    }
    self.convertCityData = function (items) {
      var tempData7 = [];
      if (items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData7.push({
            'ParentID': item.ParentID,
            'ID': item.ID,
            'Name': item.Name
          });
        }
      }
      return tempData7

    }
    self.convertActivityGroupList = function (items, Provinceitem, Cityitem) {
      //console.log(Provinceitem);
      // console.log(Cityitem)

      var tempData = [];
      if (items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData.push({
            'Id': item.Id,
            'Type': format.TypeName(item.Type),
            'SupplierName': item.BaseInfo.SupplierName,
            'SupplierCode': item.BaseInfo.SupplierCode,
            'ContactName': item.BaseInfo.ContactName,
            'ContactPhone': item.BaseInfo.ContactPhone,
            'Address': item.BaseInfo.Address,
            'Province': format.changename(item.BaseInfo.Province, Provinceitem),
            'City': format.cityname(item.BaseInfo.Province, item.BaseInfo.City, Cityitem)
          });
        }
      }

      return tempData;
    };
    self.convert = function (items) {
      var tempData3 = [];
      if (items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData3.push({
            'value': item.DeptCode,
            'text': item.DeptName
          });
        }
      }
      return tempData3
    };
    self.convertProvice = function (dataModel) {
      self.ID = dataModel.ID;
      self.Name = dataModel.Name;

    }
    self.convertCity = function (dataModel) {
      self.ID = dataModel.ID;
      self.Name = dataModel.Name;
      self.ParentID = dataModel.ParentID;
    }
    //服务商标签
    self.convertTagDll = function (items) {
      var tempData4 = [];
      if (items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData4.push({
            'value': item,
            'text': item
          });
        }
      }
      return tempData4
    }
  };
  return viewModel;
});
