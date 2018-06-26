/* eslint-disable no-undef */
define(['Extend', 'common/util', 'sysConfig'], function (Extend, util, sysConfig) {
  var viewModel = function () {
    var self = this,
      format = {
        ClearT: function (input) {
          var date = input.ClearT();
          item = date.split('.');
          return item[0];
        },
        KeyValue: function(input){
          var result = {};
          for(var i=0; i< input.length; i++){
            var item = input[i];
            result[item.value] = item.text;
          }
          return result;
        },
        StateName: function(input){
          return input ? '上架' : '下架';
        },
        GrossMargin: function(SalePrice, CostPrice){
          if(SalePrice && SalePrice > 0 && CostPrice > 0)
          {
            var price = (SalePrice - CostPrice) / SalePrice;
            return price.toFixed(2);
          }
          return 0;
        },
        List: {
          CommonInfo: function (item, serviceObj, typeObj) {
            var result = {
              Type: '',
              ThirdpartGoodsId: '',
              SupplierCode: '',
              SupportIds: [],
              Name: '',
              AppshowName: '',//APP展示名称(2.5.0)
              SalePrice: 0,
              CostPrice: 0,
              OriginPrice: 0,
              BriefDescription: '',
              DetailDescription: '',
              Tags: [],
              // ListIconUrl: '',
              BannerUrls: [],
              State: 0,
              OrderIndex: 0,
              LastUpdateTime: '',
              CreateTime: ''
            };
            if (item) {
              result = {
                GrossMargin: format.GrossMargin(item.SalePrice, item.CostPrice),
                Type: item.Type,
                ThirdpartGoodsId: item.ThirdpartGoodsId,
                TypeName: typeObj[item.Type] || '',
                // SupplierCode: item.SupplierCode,
                SupplierCode: item.SupplierCode,
                ProviderName: serviceObj[item.SupplierCode] || '',
                SupportIds: item.SupportIds || [],
                Name: item.Name,
                AppshowName: item.AppshowName,
                SalePrice: item.SalePrice,
                CostPrice: item.CostPrice,
                OriginPrice: item.OriginPrice,
                BriefDescription: item.BriefDescription,
                DetailDescription: item.DetailDescription,
                CheckIndexDescription: item.CheckIndexDescription,//商品指标html详情
                CheckIndexList: item.CheckIndexList,        //商品指标列表
                Tags: item.Tags,
                // ListIconUrl: item.ListIconUrl,
                BannerUrls: item.BannerUrls || [],
                State: item.State,
                StateName: format.StateName(item.State),
                OrderIndex: item.OrderIndex,
                LastUpdateTime: format.ClearT(item.LastUpdateTime),
                CreateTime: format.ClearT(item.CreateTime)
              };
            }
            return result;
          }
        }
      };

    self.convertServiceDDL = function(items){
      var tempData = [];
      if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData.push({
            value: item.SupplierCode,
            text: item.SupplierName
          });
        }
      }
      return tempData;
    };

    self.convertTypeAndTagDDL = function(items){
      var tempData = [], tempTag = [];

      if (items) {
        if(items.SubType && items.SubType.length){
          for (var i = 0; i < items.SubType.length; i++) {
            var item = items.SubType[i];
            tempData.push({
              value: item.Id,
              text: item.SubTypeName
            });
          }
        }
        if(items.GoodsTags && items.GoodsTags.length){
          for(var j=0; j < items.GoodsTags.length; j++){
            var item = items.GoodsTags[j];
            tempTag.push({
              value: item,
              text: item
            });
          }
        }
      }
      return {
        Type: tempData,
        Tag: tempTag
      };
    };

    // 获取商品列表 (2.4.0)
    self.convertGoodsList = function (items, ServiceDDL, TypeDDL) {
      var result = { Count: 0, Goods: [] }
        , tempData = []
        , serviceObj = format.KeyValue(ServiceDDL)
        , typeObj = format.KeyValue(TypeDDL);

      if (items && items.Counts > 0) {

        for (var i = 0; i < items.Goods.length; i++) {
          var item = items.Goods[i];
          if (item.RootType != 3) {
            tempData.push({
              Id: item.Id,
              RootType: item.RootType,
              Checked: false,
              CommonInfo: format.List.CommonInfo(item.CommonInfo, serviceObj, typeObj)
            });
          }
        }

        result.Count = items.Counts;
        result.Goods = tempData;
      }
      return result;
    };

    //获取商品指标库
    self.convertGroupQuotaList = function (items) {
      var tempData = [];
      if (items!=null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
              tempData.push({
                  'GroupName':item.GroupName,
                  'CheckIndexList':item.CheckIndexList
          })
        }
      }
      return tempData;
    },

    // 获取指定商品 (2.5.0)
    self.convertGoodsSingle = function (item, ServiceDDL, TypeDDL) {
       var serviceObj = format.KeyValue(ServiceDDL)
         , typeObj = format.KeyValue(TypeDDL);

       var result = {
          Id: item.Id,
          RootType: item.RootType,
          Checked: false,
          CommonInfo: format.List.CommonInfo(item.CommonInfo, serviceObj, typeObj),
          CrowdTypes: item.Other ? (item.Other.Crowds || []) : [],
          Other: item.Other,
          IncreaseList: item.Other.IncreaseList
       };
       return result;
    };

  };
  return viewModel;
});
