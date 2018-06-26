/* eslint-disable no-undef */
define(['Extend', 'common/util','sysConfig'],function(Extend,util,sysConfig){
	var viewModel = function(){
    var self = this,
        format =
        {
            ClearT:function(input){
                if(!input) return '-';
                var date = input.ClearT();
                    item = date.split('.');
                return item[0];
            }
        };

    /* pdf版本信息 */
    self.convertVersionList = function(items){
      var tempData = [];
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
                tempData.push({   
                        'VersionCode': item.VersionCode,
                        'VersionName': item.VersionName,
                        'OSType': item.OSType,
                        'Status': item.Status,
                        'Message': item.Message,
                        'DownLink': item.DownLink,
                        'APKDownLink': item.APKDownLink
                });
        }
      }
      return tempData;
    };

    self.convertExceptionLogList = function(items){
      var tempData = [];
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
                tempData.push({   
                        'Tag': item.Tag,
                        'ExceptionType': item.ExceptionType,
                        'Message': item.Message,
                        'StackTrace': item.StackTrace,
                        'RequestTime': format.ClearT(item.RequestTime),
                        'AppendInfo': item.AppendInfo
                });
        }
      }
      return tempData;
    };  

    self.convertCommonLogList = function(items){
      var tempData = [];
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
                tempData.push({   
                        'Id': item.Id,
                        'Tag': item.Tag,
                        'Type': item.Type,
                        'RequestTime': format.ClearT(item.RequestTime),
                        'AppendInfo': item.AppendInfo
                });
        }
      }
      return tempData;
    };

    self.convertAliPayLogList = function(items) {
      var tempData = [];
      if (items!=null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
              tempData.push({
                        'RequestData':item.RequestData,
                        'RequestTime':format.ClearT(item.RequestTime),
                        'ResponseData':item.ResponseData
              });
        }
      }
      return tempData;
    };

    self.convertMallCommonExpectionLogList = function(items) {
      var tempData = [];
      if (items!=null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
              tempData.push({
                        'AppendInfo':item.AppendInfo,
                        'RequestTime':format.ClearT(item.RequestTime),
                        'Tag':item.Tag,
                        'Type':item.Type
              });
        }
      }
      return tempData;
    };  

    self.convertMallExpectionLogList = function(items) {
      var tempData = [];
      if (items!=null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
              tempData.push({
                        'AppendInfo':item.AppendInfo,
                        'RequestTime':format.ClearT(item.RequestTime),
                        'StackTrace':item.StackTrace,
                        'Tag':item.Tag,
                        'ExceptionType': item.ExceptionType,
                        'Message': item.Message
              });
        }
      }
      return tempData;
    };  

    self.convertMallLogList = function(items) {
      var tempData = [];
      if (items!=null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
              tempData.push({
                        'Type':item.Type,
                        'Url': item.Url,
                        'RequestTime':format.ClearT(item.RequestTime),
                        'RequestData':item.RequestData,
                        'ResponseResult':item.ResponseResult,
                        'IsSuccess':item.IsSuccess,
                        'Url':item.Url
              });
        }
      }
      return tempData;
    };   

    self.convertZSTJLogList = function(items) {
      var tempData = [];
      if (items!=null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
              tempData.push({
                        'Type':item.Type,
                        'Url': item.Url,
                        'RequestTime':format.ClearT(item.RequestTime),
                        'RequestData':item.RequestData,
                        'ResponseResult':item.ResponseResult,
                        'IsSuccess':item.IsSuccess,
                        'Url':item.Url
              });
        }
      }
      return tempData;
    };

    self.convertWeChatLogList = function(items) {
      var tempData = [];
      if (items!=null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
              tempData.push({
                        'Type':item.Type,
                        'Url': item.Url,
                        'RequestTime':format.ClearT(item.RequestTime),
                        'RequestData':item.RequestData,
                        'ResponseResult':item.ResponseResult,
                        'IsSuccess':item.IsSuccess,
                        'Url':item.Url
              });
        }
      }
      return tempData;
    };

	};
	return viewModel;
});
