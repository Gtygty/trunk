/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/Validation', 'model/dspPictureManageModel', 'service/baseService'], function (app, util, Validation, DataModel) {

  app.factory('dspPictureManageService', ['ajaxService', function(ajax){

    var URL = {
        /* 医师健康分组 */
        PictureManage: {
         List: 'PushImage/ServiceDeptPushImages?ServiceDeptID={0}&Name={1}',
         Add:'PushImage/AddServiceDeptPushImages',
         Modify:'PushImage/UpdateServiceDeptPushImages',
         Del:'PushImage/DeleteServiceDeptPushImage'
        }
    },
    Valid = {
      // 验证图片不能为空
      pictureManageAddOrMod: function(param){

          if(param.ImageType == 0){
            if(!param.ServiceDeptIds.length){
              util.showFade('服务机构不能为空！');
              return false;
            }
          }
          var images = param.Images;
          if(param.ImageName){
            images = [
              {
                'ImageName': param.ImageName,
                'ImageUrl': param.ImageUrl
              }
            ];
          }

          if(!images || !images.length){
            util.showFade('请选择您要上传的图片！');
            return false;
          }

          if(!images[0].ImageName){
            util.showFade('图片名称不能为空！');
            return false;
          }
          if(images[0].ImageName.length > 40){
            util.showFade('图片名称不能大于40个字符！');
            return false;
          }
          if(!images[0].ImageUrl){
            util.showFade('未上传头像！');
            return false;
          }
        return true;

      }
    },

    ViewModel = {
      pictureManage:{

          List: function(options){
            var url = String.prototype.format(URL.PictureManage.List, 0, ''),
                callback = options.callback,
                dataModel = new DataModel();
            ajax.GetDsp(url, function(data){
                var result = dataModel.convertpictureManageList(data);
                callback && callback(result);
            });
          },

          Add: function(options){

            var url = URL.PictureManage.Add,
                param = {
                  'ServiceDeptIds': options.param.ServiceDeptIds,
                  'Images':[],
                  'ImageType': options.param.ImageType
                },
                callback = options.callback;
                for(var i=0; i<options.param.Images.length; i++){
                    var item = options.param.Images[i];
                    param.Images.push({
                      ImageName: item.ImageName,
                      ImageUrl: item.ImageUrl
                    });
                }
                //  console.log(param);
            if(Valid.pictureManageAddOrMod(param)){

              ajax.PostDsp(url, param, function(data){
                //  console.log(param)
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('添加失败!');
              });
            }
          },


          Modify: function(options){
            var url = URL.PictureManage.Modify,
                param = angular.extend({
                  // 'ServiceDeptIds':[],
                  'ImageUrl':'',
                  'ImageName': '',
                  'ImageGroup':'',
                  'ImageType': 1
                }, options.param),
                callback = options.callback;

            if(Valid.pictureManageAddOrMod(param)){
              ajax.PostDsp(url, param, function(data){
                // console.log(param);
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('修改失败!');
              });
            }
          },


        Delete: function(options){
            var url = URL.PictureManage.Del,
                param = angular.extend({ 'ImageGroup': ''}, options.param),
                callback = options.callback;

            ajax.PostDsp(url, param, function(data){
                if(data)
                  callback && callback(data);
                else
                  util.showFade('删除失败!');
            });
          },
          Search: function(options){
            var param = angular.extend({
                          'Name': '',         // 图片名称
                          'ServiceDeptID': '' // 下拉机构
                        }, options.param),
                url = String.prototype.format(URL.PictureManage.List, param.ServiceDeptID, param.Name),
                callback = options.callback,
                dataModel = new DataModel();
                // console.log(url);

            ajax.GetDsp(url, function(data){
                if(data){
                    var result = dataModel.convertpictureManageList(data);
                    callback && callback(result);
                }
                else util.showFade('搜索失败!');
            });
          }
        }
    };

    return ViewModel;
 }]);

  return app;
});
