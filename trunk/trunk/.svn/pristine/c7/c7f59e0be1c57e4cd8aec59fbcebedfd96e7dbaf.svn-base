define([],function () {
    
    var goodsAddItemModel = {};

    goodsAddItemModel.ConvertInfo = function(dataModel,supplierObjects){
        var obj = {};
        obj.Id = dataModel.Id;
        obj.SupplierCode = dataModel.SupplierCode;
        obj.AMapProvinceCode = dataModel.AMapProvinceCode;
        obj.Name = dataModel.Name;
        obj.Description = dataModel.Description;
        obj.SalePrice = dataModel.SalePrice;
        obj.OriginPrice = dataModel.OriginPrice;
        obj.OrderIndex = dataModel.OrderIndex;
        obj.CrowdTypes = dataModel.CrowdTypes;
        obj.SupplierName = supplierObjects[dataModel.SupplierCode] || '';
        obj.ThirdDepartGoodsId = dataModel.ThirdDepartGoodsId;
        return obj;
    }

    goodsAddItemModel.ConvertIncreaseList = function (dataModel) {
        var obj = {};
        obj.CrowdTypes = dataModel.CrowdTypes;
        obj.Description = dataModel.Description;
        obj.Id = dataModel.Id;
        obj.Name = dataModel.Name;
        obj.OrderIndex = dataModel.OrderIndex;
        obj.OriginPrice = dataModel.OriginPrice;
        obj.SalePrice = dataModel.SalePrice;
        obj.SupplierCode = dataModel.SupplierCode;
        obj.ThirdDepartGoodsId = dataModel.ThirdDepartGoodsId;
        return obj;
    }
    
    return goodsAddItemModel;

})