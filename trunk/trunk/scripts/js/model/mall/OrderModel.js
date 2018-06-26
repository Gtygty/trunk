/**
 * Created by hzguest3 on 2017/6/9.
 */
define(['Extend', 'common/util', 'sysConfig','common/MallConst']
  , function (Extend, util, sysConfig, mallConst) {
  var OrderModel = {};

  //ORDER START---------------------------------------------------------
  OrderModel.ConvertOrderInfo = function(dataModel){
    var obj = {};
    obj.OrderId = dataModel.OrderId;
    obj.PayId = dataModel.PayId;
    obj.OrderType = convertOrderType(dataModel.OrderType);
    obj.TotalAmount = dataModel.TotalAmount;
    obj.OriginAmount = dataModel.OriginAmount;
    obj.PayAmount = dataModel.PayAmount;
    obj.CouponAmount = dataModel.CouponAmount;
    obj.GoodCount = dataModel.GoodCount;
    obj.State = dataModel.State;
    obj.ChildState = dataModel.ChildState;
    obj.ChildStateFormat = convertOrderState(dataModel.ChildState);
    obj.InvoiceState = convertInvoiceState(dataModel.ChildState);
    obj.CreateDate = dataModel.CreateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.LastUpdateDate = dataModel.LastUpdateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.OverDate = dataModel.OverDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.Mobile = dataModel.Mobile;
    obj.AccountId = dataModel.AccountId;
    obj.GoodsList = OrderModel.ConvertGoodsList(dataModel.GoodsList);
    obj.Coupon = OrderModel.ConvertCouponInfoModel(dataModel.Coupon);
    return obj;
  }

  OrderModel.ConvertCouponInfoModel = function(dataModel){
    if (!dataModel){
      return null;
    }
    var obj = {}
    obj.CustomerCouponId = dataModel.CustomerCouponId;
    return obj;
  }

  OrderModel.ConvertGoodsModel = function(dataModel){
    var obj = {};
    obj.Name = dataModel.Name;
    obj.GoodsId = dataModel.GoodsId;
    obj.ListIconUrl = dataModel.ListIconUrl;
    obj.Price = dataModel.Price;
    obj.OriginPrice = dataModel.OriginPrice;
    obj.Count = dataModel.Count;
    return obj;
  }

  OrderModel.ConvertGoodsList = function(dataList){
    var objList = [];
    dataList.forEach(function(item, index, array){
      objList.push(OrderModel.ConvertGoodsModel(item));
    })
    return objList;
  }

  //订单类型
  convertOrderType = function(orderType){
    var orderTypeText = "未知订单类型";
    mallConst.OrderTypeOption.forEach(function(item, index, array){
      if ( item.Value == orderType && orderType != -1 ){
        orderTypeText = item.Text;
      }
    })
    return orderTypeText;
  }

  //订单状态
  convertOrderState = function(orderState){
    var orderStateText = "未知订单状态";
    mallConst.OrderChildState.forEach(function(item, inde, array){
      if (item.Value == orderState){
        orderStateText = item.Text;
      }
    })
    return orderStateText;
  }

  //发票状态
  convertInvoiceState = function(invoiceValue){
    var invoiceText = "无发票信息";
    mallConst.OrderTicketOption.forEach(function(item, index, array){
      if ( invoiceValue == item.Value && invoiceValue != -1 ){
        invoiceText = item.Text;
      }
    })
    return invoiceText;
  }
  //ORDER END----------------------------------------------------------


  //ORDERTICKET START--------------------------------------------------
  OrderModel.ConvertOrderTicketInfo = function(dataModel){
    var obj = {};
    obj.OrderId = dataModel.OrderId;
    obj.Type = dataModel.Type;
    obj.Title = dataModel.Title;
    obj.Receiver = dataModel.Receiver;
    obj.Mobile = dataModel.Mobile;
    obj.Address = dataModel.Address;
    obj.MailNumber = dataModel.MailNumber;
    obj.CompanyTaxNumber = dataModel.CompanyTaxNumber;
    obj.CompanyBankName = dataModel.CompanyBankName;
    obj.CompanyBankNumber = dataModel.CompanyBankNumber;
    obj.State = dataModel.State;
    obj.InvoiceState = convertInvoiceState(dataModel.State);
    obj.LastUpdateDate = dataModel.LastUpdateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.CreateDate = dataModel.CreateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    return obj;
  }
  //ORDERTICKET END----------------------------------------------------

  //ORDERFLOW START----------------------------------------------------
  OrderModel.ConvertOrderFlowInfo = function(dataModel){
    var obj = {};
    obj.OrderId = dataModel.OrderId;
    obj.Remark = dataModel.Remark;
    obj.ChildState = dataModel.ChildState;
    obj.CreateTime = dataModel.CreateTime.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    return obj;
  }
  //ORDERFLOW END------------------------------------------------------

  return OrderModel;
})
