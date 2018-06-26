/* eslint-disable no-undef */
define(['Extend', 'common/util','sysConfig'],function(Extend,util,sysConfig){
	var viewModel = function(){
    var self = this,
        format =
        {
            ClearT:function(input){
                var date = input.ClearT();
                    item = date.split(' ');
                return item[0];
            }
        };

    /* 获取二维码 */
    getTwoDimensionCode = {

        getCode:function(AccountId,TalentGroupId){
            var twoDimensionCode = '';
            twoDimensionCode += sysConfig.WebApp.GetURL();
            twoDimensionCode += "/AppPromotion.html#/apppromotion/organization/";
            twoDimensionCode += AccountId;
            twoDimensionCode += "/%7B%22ActivityGroupId%22:"+TalentGroupId+"%7D/";
            twoDimensionCode += Math.round(new Date().getTime() / 1000);
            var Rt = util.createRequestToken(decodeURIComponent(twoDimensionCode));
            twoDimensionCode += "/"+Rt;
            return twoDimensionCode;
        }
    },

    
    self.convertActivityGroupList = function(items){
      var tempData = [];
      for(var i=0; i< items.length; i++){
          var item = items[i];
          tempData.push({
              'ID':   item.ID,
              'GroupName': item.GroupName,
              'ImageUrl': item.ImageUrl,
              'CompanyOwner': item.CompanyOwner,
              'HZOwner': item.HZOwner,
              'IsDelete': item.IsDelete,
              'CompanyMobile': item.CompanyMobile,
              'CreateTime': format.ClearT(item.CreateTime),
              'LastUpdateTime': format.ClearT(item.LastUpdateTime),
              'twoDimensionCode':getTwoDimensionCode.getCode(item.CompanyAccountId,item.ID)
          });
      }
      return tempData;
    };

	};
	return viewModel;
});
