/**
 * Created by hzguest3 on 2017/6/7.
 */
define(["Extend"], function (Extend) {
  var AppointmentGoodsModel = function () {
    var self = this;
    self.OrderId;
    self.Name;
    self.GoodsId;
    self.ThirdpartGoodsId;
    self.GoodsType;
    self.SupportSupplierID;
    self.ListIconUrl;
    self.Price;
    self.OriginPrice;
    self.Count;
    self.CreateDate;

    self.ConvertFrom = function(dataModel){
      self.Name = dataModel.Name;
      self.OrderId = dataModel.OrderId;
      self.GoodsId = dataModel.GoodsId;
      self.ThirdpartGoodsId = dataModel.ThirdpartGoodsId;
      self.GoodsType = dataModel.GoodsType;
      self.SupportSupplierID = dataModel.SupportSupplierID;
      self.ListIconUrl = dataModel.ListIconUrl;
      self.Price = dataModel.Price;
      self.OriginPrice = dataModel.OriginPrice;
      self.Count = dataModel.Count;;
      self.CreateDate = dataModel.CreateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    }

  };
  return AppointmentGoodsModel;
});
