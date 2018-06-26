/* eslint-disable no-undef */
define(['Extend'],function(){
	var viewModel = function(){
		var self = this,
            format = {
                ClearT: function(input){
                    if(input) return input.ClearT();
                    return input;
                },
                Date: function(input){
                    if(input) return input.Format("yyyy/MM/dd");
                    return input;
                },
                DateTime: function(input){
                    if(input) return input.Format("yyyy/MM/dd HH:mm:ss");
                    return input;
                },
                Gender: function(input){
                    if(input) return input == 0 ? '女' : '男';
                    return '男';
                },
                Images: function(input){
                  var tempIds = [],
                      tempNames = [],
                      tempImages = [];

                      for (var key in input) {
                        if (input.hasOwnProperty(key)) {
                          var element = input[key];
                          tempIds.push(key);
                          tempNames.push(element);
                          tempImages.push({
                            m_Item1: key,
                            m_Item2: element
                          });
                        }
                      }
                    return {
                      Ids: tempIds,
                      Names: tempNames,
                      Images: tempImages
                    };
                }
            };

            self.convertFromAdd = function(dataModel){
                var result = {
                    Images: dataModel.Images,
                    ReportItemSrc: dataModel.ReportItemSrc,
                    ReportItemSrcState: dataModel.ReportItemSrcState
                };
                return result;
            };
            self.convertFromList = function(dataModel){
                var images = format.Images(dataModel.Images);
                var result = {
                    Ids: images.Ids,
                    Name: images.Names.join(' '),
                    Images: images.Images,
                    ReportItemSrc: dataModel.ReportItemSrc,
                    ReportItemSrcState: dataModel.ReportItemSrcState
                };
                return result;
            };
            self.convertFromEdit = function(dataModel){
                var result = {
                    Images: dataModel.Images,
                    ReportItemSrc: dataModel.ReportItemSrc,
                    ReportItemSrcState: dataModel.ReportItemSrcState
                };
                return result;
            };
            self.convertFromDel = function(dataModel){
                var result = {
                    ID: dataModel.ID
                };
                return result;
            };


            /************ 改版内容 ************** */
            self.convertIconListFromList = function(item){
                var result = {};
                if(item!=null){
                    result={
                        'Id': item.Id,
                        'Tags':item.Tags,
                        'ReportItemSrc': item.ReportItemSrc,
                        'ReportItemSrcState': item.ReportItemSrcState
                    };
                };
                return result;
            };

            //将name的list转换为name对象list
            self.convertTagList = function(items){
                var result = [];
                if(items!=null&&items.length>0){
                    for(var i=0;i<items.length;i++){
                        var item = items[i];
                        result.push({
                            'no': i,
                            'name':item
                        });
                    }
                };
                return result;
            };

            //将name对象list转换为name的list
            self.convertTagToNameList = function(items){
                var result = [];
                if(items!=null&&items.length>0){
                    for(var i=0;i<items.length;i++){
                        result.push(item[i].name);
                    }
                };
                return result;
            };

	};
	return viewModel;
});

