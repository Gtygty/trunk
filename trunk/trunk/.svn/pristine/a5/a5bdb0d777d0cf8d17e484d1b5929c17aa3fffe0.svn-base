define(['Extend'], function (Extend) {
  var ComboListModel = function () {
    var self = this;
    self.ID ;
    self.Name ;
    self.Description ;
    self.Price ;
    self.OldPrice ;
    self.ImageUrl ; 
    self.Status ;//1：上架 0：下架
    self.Index ;
    self.CreateTime ;
    self.ComboDetails ; 
    self.ComboTags ;
    self.Checked = false ;

    self.convertFromComboList = function(dataModel){
      self.ID = dataModel.ID;
      self.Name = dataModel.Name;
      self.Description = dataModel.Description;
      self.Price = dataModel.Price;
      self.OldPrice = (dataModel.OldPrice == 0.00?'':dataModel.OldPrice);
      self.ImageUrl = dataModel.ImageUrl;
      self.Status = dataModel.Status;
      self.Index = dataModel.Index;
      self.CreateTime = dataModel.CreateTime.ClearT().ConvertToDate().Format("yyyy-MM-dd hh:mm:ss");
      self.ComboDetails = convertComboDetails(dataModel.ComboDetails);
      self.ComboTags = convertComboTags(dataModel.ComboTags);
    }

    convertComboDetails = function(dataModel){
        var combodetails = [];
        if (dataModel!=null){
            for (var i =0; i<dataModel.length;i++){
                var comboDetailItem = new ComboDetailItem();
                comboDetailItem.convertFromComboDetail(dataModel[i]);
                combodetails.push(comboDetailItem);
            }
        }
        return combodetails;
    }

    convertComboTags = function(dataModel){
        var comboTags = [];
        if (dataModel!=null){
            for (var i =0; i<dataModel.length;i++){
                var comboTag = new ComboTagItem();
                comboTag.convertFromComboTags(dataModel[i]);
                comboTags.push(comboTag);
            }
        }
        return comboTags;
    }

    var ComboDetailItem = function(){
        var comboDetailItem = this;
        comboDetailItem.ComboInfoID ;
        comboDetailItem.Content ;
        comboDetailItem.Index ;
        comboDetailItem.Name ;
        comboDetailItem.convertFromComboDetail = function(dataModel){
            comboDetailItem.ComboInfoID  = dataModel.ComboInfoID;
            comboDetailItem.Content  = dataModel.Content.trim();
            comboDetailItem.Index  = dataModel.Index;
            comboDetailItem.Name  = dataModel.Name.trim();
        }

        return comboDetailItem;
    }

    var ComboTagItem = function(){
        var comboTagItem = this;
        comboTagItem.ID;
        comboTagItem.ComboType;
        comboTagItem.ComboName;

        comboTagItem.convertFromComboTags = function(dataModel){
            comboTagItem.ID = dataModel.ID;
            comboTagItem.ComboType = dataModel.ComboType;
            comboTagItem.ComboName = dataModel.ComboName;
        }

        return comboTagItem;
    }
  };
  return ComboListModel;
});
