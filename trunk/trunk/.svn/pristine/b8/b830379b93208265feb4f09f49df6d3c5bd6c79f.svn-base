/* eslint-disable no-undef */
define(['Extend', 'common/util', 'sysConfig'], function (Extend, util, sysConfig) {
  var viewModel = function () {
    var self = this,
      format = {
        GetSubType: function(SubType){
            var tempData = [],
                items = SubType;
            if(items!=null){
              for(var i=0; i< items.length; i++){
                  var item = items[i];
                      tempData.push({
                          'no': i,
                          'Id':items[i].Id,
                          'SubTypeName':items[i].SubTypeName
                      });
              }
            }
            return tempData;
        },
        GetGoodsTags: function(GoodsTags){
            var tempData = [],
                items = GoodsTags;
            if(items!=null){
              for(var i=0; i< items.length; i++){
                  var item = items[i];
                      tempData.push({
                          'no': i,
                          'name':items[i]
                      });
              }
            }
            return tempData;
        },
        GetAllSubType: function(SubType,name){
            var tempData = [],
                items = SubType;
            if(items!=null){
              for(var i=0; i< items.length; i++){
                  var item = items[i];
                      tempData.push({
                          'Id':items[i].Id,
                          'SubTypeName':items[i].SubTypeName
                      });
              }
            }
            if(name){
                tempData.push({
                    'Id':null,
                    'SubTypeName':name
                });
            }
            return tempData;
        },
        GetAllGoodsTags: function(GoodsTags,name){
            var tempData = [],
                items = GoodsTags;
            if(items!=null){
              for(var i=0; i< items.length; i++){
                  var item = items[i];
                      tempData.push(items[i].name);
              }
            }
            if(name){
                tempData.push(name);
            }
            return tempData;
        }
      };

    self.conventData = function(result){

      result.Type = result.Type,
      result.GoodType = result.GoodType,
      result.SubType = format.GetSubType(result.SubType),
      result.GoodsTags = format.GetGoodsTags(result.GoodsTags),
      result.MEDesc = result.MEDesc,
      result.CommonDesc = result.CommonDesc;
      return result;
    };

    self.conventDataToParam = function(param){
      var temp = {
              'GoodType':'',
              'SubType':[],
              'GoodsTags':[],
              'MEDesc':'',
              'CommonDesc':''
          },
          subTypeName = param.subTypeName,
          tempData = param.tempData;
          temp.GoodType = tempData.GoodType;
          temp.SubType = format.GetAllSubType(tempData.SubType,subTypeName);
          temp.GoodsTags = format.GetAllGoodsTags(tempData.GoodsTags,null);
          temp.MEDesc = tempData.MEDesc;
          temp.CommonDesc = tempData.CommonDesc;
          return temp;
    }

    self.conventDataToParamTwo = function(param){
      var temp = {
              'GoodType':'',
              'SubType':[],
              'GoodsTags':[],
              'MEDesc':'',
              'CommonDesc':''
          },
          name = param.name,
          tempData = param.tempData;
          temp.GoodType = tempData.GoodType;
          temp.SubType = format.GetAllSubType(tempData.SubType,null);
          temp.GoodsTags = format.GetAllGoodsTags(tempData.GoodsTags,name);
          temp.MEDesc = tempData.MEDesc;
          temp.CommonDesc = tempData.CommonDesc;
          return temp;
    }

    self.OnMove = function(flag,item,tempData){
          var temp = '',
              no = item.no,
              tempData = tempData;
          if(flag == 1){
              if(tempData!=null){
                  temp = tempData[0];
                  tempData[0] = tempData[no];
                  tempData[no] = temp;
              }
          }
          if(flag == 2){
            var last = tempData.length-1;
            if(tempData!=null){
                temp = tempData[last];
                tempData[last] = tempData[no];
                tempData[no] = temp;
            }
          }
          if(flag == 3){
            var tempList = [];
            if(tempData!=null){
                for(var i=0;i<tempData.length;i++){
                  if(i!=no){
                      tempList.push(tempData[i]);
                  }
                }
            }
            tempData = tempList;
          }
          return tempData;
    }

    self.OnRemoveTag = function(item,tempData){
          var temp = '',
              no = item.no;
          var tempList = [];
          if(tempData!=null){
              for(var i=0;i<tempData.length;i++){
                if(i!=no){
                      tempList.push({
                          'no': i,
                          'name':tempData[i].name
                      });
                }
              }
          }
          tempData = tempList;

          return tempData;
    }

    self.isEisited = function(param){  
        var name = param.subTypeName,
            tempData = param.tempData,
            isEisited = false;
            if(tempData!=null){
                for(var i=0;i<tempData.SubType.length;i++){
                    if(name == tempData.SubType[i].SubTypeName){
                        isEisited = true;
                    }
                }
            }
            return isEisited;
    }

    self.isEisitedTag = function(param){  
        var name = param.name,
            tempData = param.tempData,
            isEisited = false;
            if(tempData!=null){
                for(var i=0;i<tempData.GoodsTags.length;i++){
                    if(name == tempData.GoodsTags[i].name){
                        isEisited = true;
                    }
                }
            }
            return isEisited;
    }

   
  };
  return viewModel;
});
