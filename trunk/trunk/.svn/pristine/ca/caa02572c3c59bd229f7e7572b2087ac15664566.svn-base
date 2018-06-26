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
                DateTime: function(input){
                    if(input) return input.Format("yyyy/MM/dd HH:mm:ss");
                    return input;
                },
                IsTrusteeship: function(input){
                    if(input) return input ? '是' : '否';
                    return '否';
                },
                JobState: function(input){
                    return input == 0 ? '全职' : '兼职';
                },
                Speciality: function(input){
                  if(input && input.length > 10){
                    return input.substr(0,10) + '...';
                  }
                  return input;
                }
            };

            self.convertFromSearch = function(dataModel){
            };
            self.convertFromAdd = function(dataModel){
            };
            self.convertFromList = function(dataModel){
                var result = {
                    ID: dataModel.ID,
                    UserName: dataModel.UserName,           // 姓名
                    DoctorId: dataModel.DoctorId,           // 健管师ID
                    Speciality: dataModel.Speciality,       // 专长
                    SpecialityDesc: format.Speciality(dataModel.Speciality),       // 专长
                    JobState: dataModel.JobState,           // 职业状态
                    JobStateName: format.JobState(dataModel.JobState),           // 职业状态
                    PisitionName: dataModel.PisitionName,   // 职称名称
                    DeptId: dataModel.DeptId,               // 所属机构ID
                    DeptName: dataModel.DeptName,           // 所属机构名称
                    Account: dataModel.Account,             // 健管师帐号
                    IsTrusteeship: dataModel.IsTrusteeship, // 托管机构状态
                    IsTrusteeshipName: format.IsTrusteeship(dataModel.IsTrusteeship),
                    TrusteeshipCount: dataModel.TrusteeshipCount,     // 托管机构数量
                    CertificateCode: dataModel.CertificateCode,       // 证件号
                    Mobile: dataModel.Mobile,                         // 手机号
                    SuppserDoctorName: dataModel.SuppserDoctorName,   // 上级健管师名称
                    TrusteeshipDepts: dataModel.TrusteeshipDepts      // 托管机构
                };
                return result;
            };
            self.convertFromEdit = function(dataModel){
                var result = {
                    ID: dataModel.ID,
                    UserName: dataModel.UserName,
                    Content: dataModel.Content
                };
                return result;
            };
            self.convertFromDel = function(dataModel){
            };
	};
	return viewModel;
});

