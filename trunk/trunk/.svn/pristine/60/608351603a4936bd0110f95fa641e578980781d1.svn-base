define(['Extend'], function (Extend) {
  var ComboInfoModel = function () {
    var self = this;
    self.ComboInfoID ;
    self.Name ;
    self.Content ;
    self.Index ;

    self.convertFromComboInfo = function(dataModel){
      self.ComboInfoID = dataModel.ComboInfoID;
      self.Name = dataModel.Name.trim();
      self.Content = dataModel.Content.trim();
      self.Index = dataModel.Index;
    }

  };
  return ComboInfoModel;
});