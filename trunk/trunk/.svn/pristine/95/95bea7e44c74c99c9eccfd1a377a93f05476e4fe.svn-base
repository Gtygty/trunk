/* eslint-disable no-undef */
define(['indexApp', 'common/BaseInfoManager', 'common/util'], function (app, BaseManager, util) {

  app.factory('signValid', function () {
    var viewModel = {
      ValidAccess: function (actionName) {                             //验证权限登录
        var data = BaseManager.MenuInfoManager.GetMenuInfo(),
          isPass = true;

        if (actionName != '#/message' || actionName != '"#/consultStatistic"' || actionName != '"#/messageStatistic"') {
          BaseManager.DeptInfoManager.Clear();
        }
        for (var index = 0; index < data.length; index++) {
          var element = data[index];
          for (var y = 0; y < element.children.length; y++) {
            var element2 = element.children[y];
            if (!element2.checked && actionName === element2.action) {
              isPass = false;
              break;
            }
          }
        }
        if (!isPass) {
          window.location.href = '#/default';
        }
      },
      Init: function () { }
    };
    return viewModel;
  });

  app.factory('deptService', function ($http) {
    var viewModel = {
      GetDepts: function (callback) {                             // 获取所有机构
        if(!BaseManager.DeptInfoManager.Exist()){
          util.ajaxGet($http, 'ServiceDept/GetAllServiceDepts', function(result){
            if (result.state == 1) {
              BaseManager.DeptInfoManager.SetDeptInfo(result.Data, [callback]);
            } else {
              console.log('初始化机构失败!');
            }
          }, function(error){ console.log(error); });
        }
      },
      Init: function () { }
    };
    return viewModel;
  });

  app.factory('ajaxService', function($http){
     var viewModel = {
      GetDsp: function(url, callback){
        util.ajaxGet($http, url, function(result){
          if (result.state == 1)
            callback && callback(result.Data);
          else
            util.showFade(result.message);
        }, function(error){
            /* eslint-disable no-undef,no-console */
            console.log(error);
        });
      },
      PostDsp: function(url, data, callback){
        util.ajaxPost($http, url, data, function (result) {
          if (result.state == 1)
            callback && callback(result.Data);
          else
            util.showFade(result.message);
        }, function(error){
            /* eslint-disable no-undef,no-console */
            console.log(error);
        });
      },
      GetZstj: function(url, callback){
        util.showAjaxLoading();
        util.ajaxZSTJGet($http, url, function(result){
          if (result.Code == 1)
            callback && callback(result.Data);
          else
            util.showFade(result.Message);
          util.hideAjaxLoading();
        }, function(error){
            /* eslint-disable no-undef,no-console */
            console.log(error);
            util.hideAjaxLoading();
        });
      },
      PostZstj: function(url, data, callback){
        util.showAjaxLoading();
        util.ajaxZSTJPost($http, url, data, function (result) {
          if (result.Code == 1)
            callback && callback(result.Data);
          else
            util.showFade(result.Message);
          util.hideAjaxLoading();
        }, function(error){
            /* eslint-disable no-undef,no-console */
            console.log(error);
            util.hideAjaxLoading();
        });
      },
      PostMall: function(url, data, callback){
        util.showAjaxLoading();
        util.ajaxMALLPost($http, url, data, function (result) {
          if (result.Code == 1)
            callback && callback(result.Data);
          else
            util.showFade(result.Message);
          util.hideAjaxLoading();
        }, function(error){
            /* eslint-disable no-undef,no-console */
            console.log(error);
            util.hideAjaxLoading();
        });
      },
      PostWeChat:function(url, data, callback) {
        util.showAjaxLoading();
        util.ajaxWechatPost($http, url, data, function (result) {
          if (result.code == 1) {
            callback && callback(result.data);
          }else {
            util.showFade(result.message);
          }
          util.hideAjaxLoading();
        }, function(error) {
            console.log(error);
            util.hideAjaxLoading();
        });
      },
      Init: function () { }
    };
    return viewModel;
  });
  return app;
});

