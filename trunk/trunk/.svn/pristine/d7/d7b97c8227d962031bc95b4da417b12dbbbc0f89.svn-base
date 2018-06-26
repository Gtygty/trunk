/**
 * Created by hzguest3 on 2017/6/22.
 */
define(["Extend", "common/MallConst"]
  , function (Extend, mallConst) {
    var GoodsTypeModel = {};
    GoodsTypeModel.ConvertPayBackModel = function (dataModel) {
      var obj = {};
      obj.Type = dataModel.Type;
      obj.SubType = ConvertFromGoodsTags(dataModel.SubType);
      obj.GoodsTags = ConvertFromGoodsTags(dataModel.GoodsTags);
      obj.MEDesc = dataModel.MEDesc;
      obj.CommonDesc = dataModel.CommonDesc;
      return obj;
    }

    ConvertFromSubType = function (goodsSubType) {
      var dataList = [];
      goodsSubType.forEach(function (item, index, array) {
        dataList.push({
          Id: item.Id,
          SubTypeName: item.SubTypeName
        })
      })
      return dataList;
    }

    ConvertFromGoodsTags = function (goodsTags) {
      var dataList = [];
      goodsTags.forEach(function (item, index, array) {
        dataList.push(item);
      })
      return dataList;
    }

    return GoodsTypeModel;
  });
