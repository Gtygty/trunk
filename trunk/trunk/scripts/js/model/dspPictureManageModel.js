/* eslint-disable no-undef */
define(['Extend', 'common/util','sysConfig'],function(Extend, util, sysConfig){
	var viewModel = function(){
    var self = this,
        format =
        {
            ClearT:function(input){
                var date = input.ClearT();
                    item = date.split(' ');
                return item[0];
            }
        };

    /* 2.1 获取集合 */
    self.convertpictureManageList = function(items){
      var tempData = [];
      for(var i=0; i< items.length; i++){
          var item = items[i];
          tempData.push({
           'ImageName': item.ImageName,
           'ImageUrl': item.ImageUrl,
           'ServiceDeptIds': item.ServiceDepts,
           'ImageType': item.ImageType,
           'ImageGroup': item.ImageGroup,
          });
      }
      return tempData;
    };


    // /* 2.1 获取集合（医师认证中的医师健康分组下拉列表集合） */
    // self.convertGroupList = function(items){
    //   var tempData = [{ 'value': -1, 'text': '请选择下拉机构' }];
    //     for(var i=0; i< items.length; i++){
    //         var item = items[i];
    //         tempData.push({
    //           'value':   item.ServiceDepts,
    //           'text': item.ImageType
    //         });
    //     }
    //   return tempData;
    // };


	};
	return viewModel;
});
