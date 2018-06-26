define([],function(){
	var ComboTagModel = function(){
	// 	var self = this;
	// 	self.ComboType;
	// 	self.Combos;

	// 	self.convertFromComboTagList = function(dataModel){
	// 		self.ComboType = dataModel.ComboType; //1: 性别 2: 类型 3: 价格
    //         self.Combos = convertTagDetail(dataModel.Combos);
	// 	}

    //     convertTagDetail = function(dataModel){
    //         var tagDetails = [];
    //         if (dataModel!=null){
    //             for (var i=0;i<dataModel.length;i++){
    //                 var tagDetailItem = new ComboTagDetailModel();
    //                 tagDetailItem.convertFromDetail(dataModel[i]);
    //                 tagDetails.push(tagDetailItem);
    //             }
    //         }
    //         return tagDetails;
    //     };


    //     ComboTagDetailModel = function(){
    //         var comboTagDetail = this;
    //         comboTagDetail.ID;
    //         comboTagDetail.ComboType;
    //         comboTagDetail.ComboName;

    //         comboTagDetail.convertFromDetail = function(dataModel){
    //             comboTagDetail.ID = dataModel.ID;
    //             comboTagDetail.ComboType = dataModel.ComboType; 
    //             comboTagDetail.ComboName = dataModel.ComboName;
    //         }
    //         return comboTagDetail;
    //     }


	// }

    var comboTagDetail = this;
        comboTagDetail.ID;
        comboTagDetail.ComboType;
        comboTagDetail.ComboName;
        comboTagDetail.Checked = false;

        comboTagDetail.convertFromComboTagList = function(dataModel){
            comboTagDetail.ID = dataModel.ID;
            comboTagDetail.ComboType = dataModel.ComboType; 
            comboTagDetail.ComboName = dataModel.ComboName;
        }
    }

	return ComboTagModel;
})