/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'model/serviceManagedModel', 'service/baseService'], function (app, util, DataModel) {

  app.factory('serviceManagedService', ['ajaxService', function(ajax){
    Valid = {
      ActivityGroupAddOrMod: function(param){
          if(!param.GroupName){
            util.showFade('企业名称不能为空！');
            return false;
          }
          if(param.GroupName.length > 40){
            util.showFade('企业名称不能大于40个字符！');
            return false;
          }
          if(!param.ImageUrl){
            util.showFade('未上传头像！');
            return false;
          }
          if(!param.CompanyOwner){
            util.showFade('企业负责人不能为空！');
            return false;
          }
          if(param.CompanyOwner.length > 20){
            util.showFade('企业负责人不能大于20个字符！');
            return false;
          }
          if(!param.CompanyMobile){
            util.showFade('手机号不能为空！');
            return false;
          }
					if (!/^(13|15|17|18|14)\d{9}$/.test(param.CompanyMobile)) {
						util.showFade('请输入有效的手机号');
						return false;
					}
          if(!param.HZOwner){
            util.showFade('好卓对接人不能为空！');
            return false;
          }
          if(param.HZOwner.length > 20){
            util.showFade('好卓对接人不能大于20个字符！');
            return false;
          }
        return true;
      }
    },
    ViewModel = {
          List: function(options){
            var url = URLS.List,
                param = {},
                callback = options.callback,
                dataModel = new DataModel();
            ajax.ajaxZSTJPost(url, param, function(data){
                var result = dataModel.convertActivityGroupList(data);
                callback && callback(result);
            });
          },
          Add: function(options){
            var url = URL.ActivityGroup.Add,
                param = angular.extend({
                        'GroupName': '',
                        'ImageUrl': '',
                        'CompanyOwner': '',
                        'CompanyMobile': '',
                        'HZOwner': ''
                        }, options.param),
                callback = options.callback;

            if(Valid.ActivityGroupAddOrMod(param)){
              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('添加失败!');
              });
            }
          },
          Modify: function(options){
            var url = URL.ActivityGroup.Modify,
                param = angular.extend({
                        'ID': '',
                        'GroupName': '',
                        'ImageUrl': '',
                        'CompanyOwner': '',
                        'CompanyMobile': '',
                        'HZOwner': ''
                        }, options.param),
                callback = options.callback;

            if(Valid.ActivityGroupAddOrMod(param)){
              console.log(param);
          
              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('修改失败!');
              });
            }
          },
          Search: function(options){
            var url = URL.ActivityGroup.Search,
                param = angular.extend({
                    'GroupName':  '',
                    'CompanyOwner': '',
                    'HZOwner':  '',
                    'StartTime':  '',
                    'EndTime': ''
                  }, options.param),
                callback = options.callback;
                dataModel = new DataModel();

            ajax.PostZstj(url, param, function(data){
                if(data){
                  var result = dataModel.convertActivityGroupList(data);
                  callback && callback(result);
                }else{
                  util.showFade('搜索失败!');
                }
            });
          },
          GetShortLink: function(options){
            var url = URL.ActivityGroup.GetShortLink,
                param = angular.extend({
                        'ShortLink': ''
                        }, options.param),
                callback = options.callback;

              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('转换失败!');
              });
          }
        
    };

    return ViewModel;

  }]);

  return app;
});
