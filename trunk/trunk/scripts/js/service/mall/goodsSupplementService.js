define(['indexApp', 'common/util', 'model/mall/GoodsSupplementModel', 'service/baseService', 'Extend'], function (app, util, DataModel) {
  app.factory('goodsSupplementService', ['ajaxService', function (ajax) {
    var URL = {
        GoodsType: {
          Add: 'BMSGoods/AddOrModifyGoodsType',
          Search: 'BMSGoods/GoodsTypeDetail'
        }
      },
      Valid = {
        AddSubTypeName: function (params) {
          if (params.subTypeName) {
            dataModel = new DataModel();
            var isEisited = dataModel.isEisited(params);
            if (isEisited) {
              util.showFade('该名称已经存在!');
              return false;
            }
          }
          return true;
        },
        AddTag: function (params) {
          if (params.name) {
            dataModel = new DataModel();
            var isEisited = dataModel.isEisitedTag(params);
            if (isEisited) {
              util.showFade('该名称已经存在!');
              return false;
            }
          }
          return true;
        }
      },
      ViewModel = {
        GoodsType: {
          List: function (options) {
            var url = URL.GoodsType.Search,
              param = angular.extend({
                'RootType': ''
              }, options.params),
              callback = options.callback,
              dataModel = new DataModel();
            ajax.PostMall(url, param, function (data) {
              if (data) {
                var result = dataModel.conventData(data);
                callback && callback(result);
              }
              else {
                callback && callback(null);
              }
            });
          },
          Add: function (options) {
            var url = URL.GoodsType.Add,
              param = angular.extend({
                'subTypeName': '',
                'tempData': ''
              }, options.params),
              callback = options.callback,
              dataModel = new DataModel();
            var paramData = dataModel.conventDataToParam(param);
            if (Valid.AddSubTypeName(param)) {
              ajax.PostMall(url, paramData, function (data) {
                if (data) {
                  var conventData = dataModel.conventData(data);
                  var result = conventData;
                  callback && callback(result);
                }
                else {
                  util.showFade('添加失败')
                }
              });
            }
          },
          AddTag: function (options) {
            var url = URL.GoodsType.Add,
              param = angular.extend({
                'name': '',
                'tempData': ''
              }, options.params),
              callback = options.callback,
              dataModel = new DataModel();
            var paramData = dataModel.conventDataToParamTwo(param);
            if (Valid.AddTag(param)) {
              ajax.PostMall(url, paramData, function (data) {
                if (data) {
                  var result = dataModel.conventData(data);
                  callback && callback(result);
                }
                else {
                  util.showFade('添加失败')
                }
              });
            }
          },
          // ??
          Remove: function(){


          }
        }
      };
    return ViewModel;
  }]);

  return app;
});
