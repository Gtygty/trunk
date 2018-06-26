/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/Validation', 'model/activityGroupModel', 'service/baseService'], function (app, util, Validation, DataModel) {

  app.factory('activityGroupService', ['ajaxService', function(ajax){
    var URL = {
        /* 医师健康分组 */
        ActivityGroup: {
          Add: 'BMSActivityGroup/AddGroup',
          Modify: 'BMSActivityGroup/ModifyGroup',
          List: 'BMSActivityGroup/GetAllGroup',
          Search: 'BMSActivityGroup/Search',
          GetShortLink:'BMSShortLink/GetShortLink'
        }
    },
    Valid = {
      ActivityGroupAddOrMod: function(param){
          var valid = new Validation();
          valid.add(param.GroupName, 'isNoEmpty', '企业名称不能为空！');
          valid.add(param.GroupName, 'maxLength:40', '企业名称不能大于40个字符！');
          valid.add(param.ImageUrl, 'isNoEmpty', '未上传头像！');
          valid.add(param.CompanyOwner, 'isNoEmpty', '企业负责人不能为空！');
          valid.add(param.CompanyOwner, 'maxLength:20', '企业负责人不能大于20个字符！');
          valid.add(param.CompanyMobile, 'isNoEmpty', '手机号不能为空！');
          valid.add(param.CompanyMobile, 'isMobile');
          valid.add(param.HZOwner, 'isNoEmpty', '好卓对接人不能为空！');
          valid.add(param.HZOwner, 'maxLength:20', '好卓对接人不能大于20个字符！');

          var errorMsg = valid.start();
          if(errorMsg){
             util.showFade(errorMsg);
             return false;
          }
        return true;
      }
    },
    ViewModel = {
      activityGroup: {
          List: function(options){
            var url = URL.ActivityGroup.List,
                param = {},
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostZstj(url, param, function(data){
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
              // console.log(param);

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
        }
    };

    return ViewModel;

  }]);

  return app;
});
