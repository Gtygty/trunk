/**
 * Created by hzguest3 on 2017/6/9.
 */
define(["Extend","common/MallConst"]
  ,function (Extend, mallConst) {
  var PaybackModel={};
  PaybackModel.ConvertPayBackModel = function(dataModel){
    var obj = {};
    obj.OrderId = dataModel.OrderId;
    obj.PayId = dataModel.PayId;
    obj.Amount = dataModel.Amount;
    obj.LastUpdateDate = dataModel.LastUpdateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.CreateDate = dataModel.CreateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss');
    obj.State = dataModel.State;
    obj.StateFormat = convertOrderState(dataModel.State);
    obj.Remark = dataModel.Remark;
    obj.Selected = false;
    return obj;
  }

    //订单状态
  var convertOrderState = function(orderState){
    var orderStateText = "未知订单状态";
    mallConst.OrderChildState.forEach(function(item, inde, array){
      if (item.Value == orderState){
        orderStateText = item.Text;
      }
    })
    return orderStateText;
  }

  return PaybackModel;
});
