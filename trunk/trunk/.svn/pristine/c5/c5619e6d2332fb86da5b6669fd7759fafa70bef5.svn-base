/* eslint-disable no-undef */
define(['Extend', 'common/util', 'sysConfig'], function (Extend, util, sysConfig) {
  var viewModel = function () {
    
    var self = this,

    format = {
        ClearT: function (input) {
          var date = input.ClearT();
          item = date.split(' ');
          return item[0];
        },
        ClearTT: function (input) {
          var date = input.ClearT();
          item = date.split('.');
          return item[0];
        },
        GetState: function(input){
            var str = '';
            if(input == 0){
               str = '未使用';
            }else if(input == 1){
               str = '锁定中';
            }else if(input == 2){
               str = '已使用';
            }else if(input == 3){
               str = '已过期';
            }
            return str;
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
              ProviderId: '',
              SupportIds: [],
              Name: '',
              SalePrice: 0,
              CostPrice: 0,
              OriginPrice: 0,
              BriefDescription: '',
              DetailDescription: '',
              Tags: [],
              ListIconUrl: '',
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
                TypeName: typeObj[item.Type] || '',
                ProviderId: item.ProviderId,
                ProviderName: serviceObj[item.ProviderId] || '',
                SupportIds: item.SupportIds || [],
                Name: item.Name,
                SalePrice: item.SalePrice,
                CostPrice: item.CostPrice,
                OriginPrice: item.OriginPrice,
                BriefDescription: item.BriefDescription,
                DetailDescription: item.DetailDescription,
                Tags: item.Tags,
                ListIconUrl: item.ListIconUrl,
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

    Date.prototype.format = function (format) {
            var args = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var i in args) {
                var n = args[i];
                if (new RegExp("(" + i + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
            }
            return format;
    };

    self.conventToParam = function (orderType,goodsType,param) {
      if(orderType!=null&&orderType.length>0){
        var tempOrder = [];
          for(var i=0;i<orderType.length;i++){
              if(orderType[i].checked){
                  tempOrder.push(orderType[i].value)
              }
          }
          param.OrderTypes = tempOrder;
      }
      if(goodsType!=null&&goodsType.length>0){
        var goodsOrder = [];
          for(var i=0;i<goodsType.length;i++){
              if(goodsType[i].checked){
                  goodsOrder.push(goodsType[i].value)
              }
          }
          param.GoodsType = goodsOrder;
          param.StartDate = param.StartDate.format("yyyy-MM-dd");
          param.EndDate = param.EndDate.format("yyyy-MM-dd");
      }console.log(param)
      return param;
    };

    self.conventData = function(result){
      var tempData = [],
          items = result.CouponList;
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
                tempData.push({
                        'Id': item.Id,
                        'CouponType': item.CouponType,
                        'Enable': item.Enable,
                        'CouponTitle': item.CommonInfo.CouponTitle,
                        'CouponDescription': item.CommonInfo.CouponDescription,
                        'CouponState': item.CommonInfo.CouponState,
                        'Total': item.CommonInfo.Total,
                        'CreateTime': format.ClearT(item.CommonInfo.CreateTime),
                        'StartTime': format.ClearT(item.CommonInfo.StartTime),
                        'EndTime': format.ClearT(item.CommonInfo.EndTime),
                        'Amount': item.Other.Amount,
                        'DueTime': item.Other.DueTime,
                        'OrderPrice': item.Other.OrderPrice,
                        'OrderTypes': item.Other.OrderTypes,
                        'GoodsType': item.Other.GoodsType,
                        'IsChecked': false
                });
        }
      }
      return tempData;
    };

    self.convertReceiveList = function(result){
      var tempData = [],
          items = result.CouponList;
          if(items!=null){
            for(var i=0; i< items.length; i++){
                var item = items[i];
                    tempData.push({
                        'AccountId': item.AccountId,
                        'CouponId': item.CouponId,
                        'StateFormat': item.StateFormat,
                        'CreateDate': format.ClearTT(item.CreateDate),
                        'stateStr': format.GetState(item.StateFormat)
                    });
            }
          }
      return tempData;
    };

    self.convertComsumList = function(result){
      var tempData = [],
          items = result.CouponList;
          if(items!=null){
            for(var i=0; i< items.length; i++){
                var item = items[i];
                    tempData.push({
                        'OrderId': item.OrderId,
                        'CouponId': item.CouponId,
                        'AccountId': item.AccountId,
                        'CreateDate': format.ClearTT(item.CreateDate)
                    });
            }
          }
      return tempData;
    };

   
  };
  return viewModel;
});
