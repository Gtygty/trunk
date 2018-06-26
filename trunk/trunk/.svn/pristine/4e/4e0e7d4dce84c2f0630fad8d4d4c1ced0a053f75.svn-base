/* eslint-disable no-undef */
define(['Extend', 'common/util','sysConfig'],function(Extend,util,sysConfig){
	var viewModel = function(){
    var self = this,
        format =
        {
            ClearT:function(input){
                if(!input) return '-';
                var date = input.ClearT();
                    item = date.split(' ');
                return item[0];
            }
        };

    /* 1.1 获取集合（医师健康分组） */
    self.convertTalentGroupList = function(items){
      var tempData = [];
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
            tempData.push({
                'ID':   item.ID,
                'Name': item.Name,
                'Desc': item.Desc,
                // 'IsDelete': item.IsDelete,
                'HeadImageUrl': item.HeadImageUrl,
                'LastUpdateTime': format.ClearT(item.LastUpdateTime),
                'CreateDate': format.ClearT(item.CreateDate),
                'Tags':item.Tags,
                'AdImageUrl':item.AdImageUrl
            });
        }
      }
      return tempData;
    };

    /* 2.1 获取集合（医师认证） */
    self.convertTalentList = function(items, ddls){
      var tempData = [],
          TalentGroupObjs = {};
          for(var j=0; j< ddls.length; j++){
              var tItem = ddls[j];
              if(tItem.value !== -1){
                TalentGroupObjs['Id' + tItem.value] = tItem.text;
              }
          }
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
            tempData.push({
                'AccountId': item.AccountId,
                'TalentGroupId': item.TalentGroupId,
                'TalentGroupName': TalentGroupObjs['Id'+item.TalentGroupId],
                'NickName': item.NickName,
                'Title': item.Title,
                'DepartName': item.DepartName,
                'Desc': item.Desc,
                'VerifyImageUrl': item.VerifyImageUrl,
                'Status': item.Status,
                'LastUpdateTime': format.ClearT(item.LastUpdateTime),
                'CreateTime': format.ClearT(item.CreateTime),
                'IsChecked': false
            });
        }
      }
      return tempData;
    };

    /* 获取达人的动态 */
    self.convertDynamicsList = function(items){
      var tempData = [];
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
            if(!item.IsDelete){
                tempData.push({
                        'Id': item.Id,
                        'TalentAccountId': item.TalentAccountId,
                        'NikeName': item.NikeName,
                        'ImgUrl': item.ImgUrl,
                        'Title': item.Title,
                        'Content': item.Content,
                        'Images': item.Images,
                        'Tags': item.Tags,
                        'FavoriteAccountIds':item.FavoriteAccountIds,
                        'ViewCount': item.ViewCount,
                        'IsDelete': item.IsDelete,
                        // 'CreateTime': format.ClearT(item.CreateTime)
                        'CreateTime': formatTime.timeFormat(item.CreateTime),
                        'FavoriteAccountNumbers':item.FavoriteAccountIds.length,
                        'IsTop':item.IsTop
                });
            }
        }
      }
      return tempData;
    };

    //获取系统时间-----------------
    Date.prototype.format = function(format) {
        var o ={
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format))format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o){if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));}
        return format;
    }

    formatTime =
    {
        timeFormat:function(createTime){
            var createTimeArr = createTime.ClearT().split("-");
            var now = new Date().format("yyyy-MM-dd hh:mm:ss");
            var dateArray = now.split("-");
            if(dateArray[2].split(" ")[0]==createTimeArr[2].split(" ")[0]){
                return createTimeArr[2].split(" ")[1].split(":")[0]+":"+createTimeArr[2].split(" ")[1].split(":")[1];
            }else{
                return createTimeArr[0] + "-" + createTimeArr[1] + "-" + createTimeArr[2].split(".")[0].split(":")[0]+":"+createTimeArr[2].split(".")[0].split(":")[1];
            }
        }
    };

    /* 2.1 获取集合（医师认证中的医师健康分组下拉列表集合） */
    self.convertGroupList = function(items){
      var tempData = [{ 'value': -1, 'text': '请选择' }];
        for(var i=0; i< items.length; i++){
            var item = items[i];
            tempData.push({
              'value':   item.ID,
              'text': item.Name
            });
        }
      return tempData;
    };


    /* 获取二维码 */
    self.GetCode = function(AccountId){
        var twoDimensionCode = '';
        twoDimensionCode += sysConfig.WebApp.GetURL();
        twoDimensionCode += "/TalentInfo.html#/talent/talentInfo/";
        twoDimensionCode += AccountId;
        twoDimensionCode += "/%7B%22requestID%22:%22"+AccountId+"%22%7D/";
        twoDimensionCode += Math.round(new Date().getTime() / 1000);
        var Rt = util.createRequestToken(decodeURIComponent(twoDimensionCode));
        twoDimensionCode += "/"+Rt;
        return twoDimensionCode;
    };

    /* 获取活动标签 */
    self.convertTagList = function(data){
      var tempData = [];
      if(data!=null){
        for(var i = 0; i<data.length; i++ ){
            tempData.push({
                'no': i,
                'name': data[i]
            });
        }
      }
      return tempData;
    };

    /* 获取活动标签 */
    self.convertDoctorAuthTagList = function(data){
      var tempData = [];
      if(data!=null){
        for(var i = 0; i<data.length; i++ ){
            tempData.push({
                'no': i,
                'name': data[i],
                'isChosen':false
            });
        }
      }
      return tempData;
    };

    /* 获取活动标签 （发布动态）*/
    self.convertTagsToNeed = function(data){
      var tempData = [];
      if(data!=null){
        for(var i = 0; i<data.length; i++ ){
            if(data[i].isChosen){
                tempData.push(data[i].name);
            }
        }
      }
      return tempData;
    };

    /* 活动标签的转型 */
    self.conventParams = function(data,name){
      var tempData = [];
      if(data!=null){
        for(var i = 0; i<data.length; i++ ){
            tempData.push(data[i].name);
        }
        tempData.push('#'+name+'#')
      }
      return tempData;
    };

    /* 编辑活动标签名称 */
    self.modifyList = function(data,item){
      var tempData = [];
      if(data!=null){
        for(var i = 0; i<data.length; i++ ){
            if(i == item.no){
                data[i].name = item.name;
            }
            tempData.push(data[i].name);
        }
      }
      return tempData;
    };

    self.move = function(data,item,flag){
        var list =  data,
            otherNo = 0,
            no = item.no,
            temp = '',
            tempData = [];
        if(flag == 'down'){
            otherNo = item.no+1;
            temp = data[no].name;
            data[no].name = data[otherNo].name;
            data[otherNo].name = temp;
            list = data;
        }
        if(flag == 'up'){
            otherNo = item.no-1;
            temp = data[no].name;
            data[no].name = data[otherNo].name;
            data[otherNo].name = temp;
            list = data;
        }
        if(flag == 'allUp'){
            tempData = [];
            tempData.push(list[no]);
            for(var i = 0; i<list.length; i++ ){
                if(i != no){
                    tempData.push(list[i]);
                }
            }
            list = tempData;
        }
        if(flag == 'allDown'){
            tempData = [];
            for(var i = 0; i<list.length; i++ ){
                if(i != no){
                    tempData.push(list[i]);
                }
            }
            tempData.push(list[no]);
            list = tempData;
        }

        return list;
    };

    /* 后移动 */
    self.modifyDown = function(data,item){
      var tempData = [];
      if(data!=null){
        var list = this.move(data,item,'down');
        for(var i = 0; i<list.length; i++ ){
            tempData.push(list[i].name);
        }
      }
      return tempData;
    };

    /* 前移动 */
    self.modifyUp = function(data,item){
      var tempData = [];
      if(data!=null){
        var list = this.move(data,item,'up');
        for(var i = 0; i<list.length; i++ ){
            tempData.push(list[i].name);
        }
      }
      return tempData;
    };

    self.OnAllUp = function(data,item){
      var tempData = [];
      if(data!=null){
        var list = this.move(data,item,'allUp');
        for(var i = 0; i<list.length; i++ ){
            tempData.push(list[i].name);
        }
      }
      return tempData;
    };

    self.OnAllDown = function(data,item){
      var tempData = [];
      if(data!=null){
        var list = this.move(data,item,'allDown');
        for(var i = 0; i<list.length; i++ ){
            tempData.push(list[i].name);
        }
      }
      return tempData;
    };

    self.OnDelete = function(data,item){
      var tempData = [];
      if(data!=null){
        for(var i = 0; i<data.length; i++ ){
            if(item.no!=i){
                tempData.push(data[i].name);
            }
        }
      }
      return tempData;
    };

    /* 问答圈咨询 */
    self.convertConsultationList = function(items){
      var tempData = [];
      if(items!=null){
        for(var i=0; i< items.length; i++){
            var item = items[i];
                tempData.push({   
                    'ID': item.ID,
                    'QAccountId': item.QAccountId,
                    'NickName': item.NickName,
                    'RealName': item.RealName,
                    'HeaderImageUrl': item.HeaderImageUrl,
                    'Content': item.Content,
                    'State': item.State,
                    'IsReply': item.IsReply,
                    'CreateTime': format.ClearT(item.CreateTime),
                    'IsChecked':false,
                    'AdImageUrl':item.AdImageUrl
                });
        }
      }
      return tempData;
    };

	};
	return viewModel;
});
