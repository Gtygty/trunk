define(['Extend'],function(){
	var viewModel = function(){
		var self = this,
            format = {
                ClearT: function(input){
                    if(input) return input.ClearT();
                    return input;
                },
                Date: function(input){
                    if(input) return input.Format("yyyy/MM/dd");
                    return input;
                },
                Gender: function(input){
                    if(input) return input == 0 ? '女' : '男';
                    return '男';
                },
                StarCheck: function(input){
                    var result = [
                        {value:1,name:'starchecksun'},
                        {value:2,name:'starchecksun'},
                        {value:3,name:'starchecksun'},
                        {value:4,name:'starchecksun'},
                        {value:5,name:'starchecksun'}
                    ];
                    for(var i=0;i<result.length;i++){
                        if(result[i].value <= input){
                            result[i].name = 'starchecklight';
                        }
                    };
                    return result;
                }
            };

            self.convertFromDepart = function(dataModel){
                var result = {
                    DepartCode: dataModel.RptDeptKey,
                    Name: dataModel.Name
                };
                return result;
            };

            self.convertFromList = function(dataModel){
                var result = {
                    ID: dataModel.ID,
                    DepartCode: dataModel.DepartCode,
                    Content: decodeURIComponent(dataModel.Content), //emoji ico decode
                    Level: dataModel.Level,
                    Type: dataModel.Type,
                    UserType: dataModel.UserType,
                    UserName: dataModel.UserName,
                    Status: dataModel.Status,
                    CreateDate: dataModel.CreateDate.ClearT().ConvertToDate().Format('yyyy-MM-dd hh:mm:ss'),
                    Checked: false,
                    Name: '',
                    star: format.StarCheck(dataModel.Level)
                };
                return result;
            };
            self.convertFromEdit = function(dataModel){
                var result = {
                    ID: dataModel.ID,
                    UserName: dataModel.UserName,
                    Content: dataModel.Content,
                    CreateDate: format.ClearT(dataModel.CreateDate)
                };
                return result;
            };
            self.convertFromDel = function(dataModel){
                var result = {
                    ID: dataModel.ID
                };
                return result;
            };
	};
	return viewModel;
});

