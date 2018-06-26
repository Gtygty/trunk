define([], function() {
    'use strict';
    var vm = function() {
        var self = this;
        self.format = {
            convertPayState: function (input) {
                switch (input) {
                    case 1000 :
                    {return "待支付";}
                    break;
                    case 2000 :
                    {return "已支付";}
                    break;
                    case 3000 :
                    {return "已完成";}
                    break;
                    default: 
                    {return "未知"}
                    break;
                }
            },
            convertGoodsName: function (input) {
                switch (input) {
                    case 1 :
                    {return "中医服务";}
                    break;
                    case 2 :
                    {return "电话报告解读";}
                    break;
                    case 3 :
                    {return "心理咨询";}
                    break;
                    case 4 :
                    {return "专项解读";}
                    break;
                    default: 
                    {return "未知"}
                    break;
                }
            },
            ClearT: function (input) {
                if(!input) return '-';
                var date = input.ClearT(),
                    item = date.split('.');
                return item[0];
            }
        };

        self.convertOrderList = function (input) {
            if (input && input.length > 1) {
                var i;
                var returnArr = [];
                for (i = 0; i < input.length; i++) {
                    var obj = {};
                    obj.orderId = input[i].Id;
                    obj.goodsName = self.format.convertGoodsName(input[i].RootType);
                    obj.mobile = input[i].CommonInfo.ContactMobile;
                    obj.orderTime = self.format.ClearT(input[i].CommonInfo.CreateTime);
                    obj.payId = input[i].CommonInfo.PayId;
                    obj.payAmount = input[i].CommonInfo.PayAmount;
                    obj.payState = self.format.convertPayState(input[i].CommonInfo.State);
                    obj.remark = input[i].CommonInfo.Remark;
                    obj.IsSendRefundMessages = input[i].CommonInfo.IsSendRefundMessages;
                    
                    returnArr.push(obj);
                }
                return returnArr;
            }
        }
    }
    return vm;
});