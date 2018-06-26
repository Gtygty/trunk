/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'model/answersModel', 'service/baseService'], function (app, util, DataModel) {

  app.factory('answersService', ['ajaxService', function(ajax){
    var URL = {
        /* 医师健康分组 */
        TalentGroup: {
          Add: 'BMSTalent/AddTalentGroup',
          Modify: 'BMSTalent/ModifyTalentGroup',
          Delete: 'BMSTalent/DeleteTalentGroup',
          List: 'BMSTalent/GetTalentGroupList',
          Move: 'BMSTalent/MoveTalentGroup',
          TopOrBottom: 'BMSTalent/MoveToTopOrBottom',
          Count: 'BMSTalent/GetTalentsCount'
        },
        /* 医师认证 */
        DoctorAuth: {
          Add: 'BMSTalent/AddTalent',
          Modify: 'BMSTalent/ModifyTalentInfo',
          SetState: 'BMSTalent/SetStatePassed', // Status 1:审核中 2:已审核 3:被拒绝
          List: 'BMSTalent/GetTalentList',
          Search:'BMSTalent/SearchTalentList',
          GetShortLink:'BMSShortLink/GetShortLink',
          AddArticle:'BMSTalent/AddArticle', //添加动态
          ListByAccountID:'BMSTalent/ListByAccountID',//获取当前用户的动态
          RemoveArticle: 'BMSTalent/RemoveArticle',//删除一条动态
          ToggleTopArticle: 'BMSTalent/ToggleTopArticle'
        },
        /* 活动标签 */
        ActiveTag: {
          List: 'BMSTalent/GetArticleTags',
          Modify: 'BMSTalent/UpdateArticleTags'
        },
        TalentConsultation:{//问答圈咨询
          List:'BMSTalent/SubjectList',
          SetState:'BMSTalent/SetSubjectState'

        }
    },
    Valid = {
      TalentGroupAddOrMod: function(param){
          if(!param.HeadImageUrl){
            util.showFade('认证头像必须上传！');
            return false;
          }
          if(!param.Name){
            util.showFade('医师名称不能为空！');
            return false;
          }
          if(param.Name.length > 20){
            util.showFade('医师名称不能大于20个字符！');
            return false;
          }
          if(!param.Desc){
            util.showFade('医师简介不能为空！');
            return false;
          }
          if(param.Desc.length > 40){
            util.showFade('医师简介不能大于40个字符！');
            return false;
          }
          if(!param.AdImageUrl){
            util.showFade('Banner图必须上传！');
            return false;
          }

          return true;
      },
      Mobile: function(mobile){
        	if (!/^(13|15|17|18|14)\d{9}$/.test(mobile)) {
						util.showFade('请输入有效的手机号');
						return false;
					}
        return true;
      },
      TalentAddOrMod: function(param){
          if(!param.AccountId){
            if(!param.Mobile){
              util.showFade('手机号不能为空！');
              return false;
            }
            if (!Valid.Mobile(param.Mobile)) {
              return false;
            }
          }

          if(!param.NickName){
            util.showFade('昵称不能为空！');
            return false;
          }
          if(param.NickName.length > 10){
            util.showFade('昵称不能大于10个字符！');
            return false;
          }
          if(param.TalentGroupId == -1){
            util.showFade('医师健康分组必选！');
            return false;
          }
          if(!param.Title){
            util.showFade('职称不能为空！');
            return false;
          }
          if(param.Title.length > 20){
            util.showFade('职称不能大于10个字符！');
            return false;
          }
          if(param.DepartName){
            if(param.DepartName.length > 20){
              util.showFade('所属医院不能大于20个字符！');
              return false;
            }
          }
          if(param.Desc){
            if(param.Desc.length > 40){
              util.showFade('专长介绍不能大于40个字符！');
              return false;
            }
          }

          return true;
      },
      AddDynamics: function(param){
          if(!param.Content){
            util.showFade('内容不能为空！');
            return false;
          }
          if(param.Content.length < 10){
            util.showFade('最少输入10个字符！');
            return false;
          }
          if(param.Content.length > 2000){
            util.showFade('内容不能大于2000个字符！');
            return false;
          }
          if(param.Tags.length>3){
            util.showFade('最多选择三个标签！');
            return false;
          }
          return true;
      }
    },
    ViewModel = {
      TalentGroup: {
          Add: function(options){
            var url = URL.TalentGroup.Add,
                param = angular.extend({
                          'Name': '',
                          'Desc': '',
                          'HeadImageUrl': '',
                          'Tags':'',
                          'AdImageUrl':''
                        }, options.param),
                callback = options.callback;

            if(Valid.TalentGroupAddOrMod(param)){
              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('添加失败!');
              });
            }
          },
          Modify: function(options){
            var url = URL.TalentGroup.Modify,
                param = angular.extend({
                          'ID': 0,
                          'Name': '',
                          'Desc': '',
                          'HeadImageUrl': '',
                          'Tags':'',
                          'AdImageUrl':''
                        }, options.param),
                callback = options.callback;

            if(Valid.TalentGroupAddOrMod(param)){
              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('修改失败!');
              });
            }
          },
          Delete: function(options){
            var url = URL.TalentGroup.Delete,
                param = angular.extend({ 'ID': 0 }, options.param),
                callback = options.callback;

            ajax.PostZstj(url, param, function(data){
                if(data)
                  callback && callback(data);
                else
                  util.showFade('删除失败!');
            });
          },
          List: function(options){
            var url = URL.TalentGroup.List,
                param = {},
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostZstj(url, param, function(data){
                var result = dataModel.convertTalentGroupList(data);
                callback && callback(result);
            });
          },
          Move: function(options){
            var url = URL.TalentGroup.Move,
                param = angular.extend({
                  'OglID': 0,
                  'TgtID': 0
                }, options.param),
                callback = options.callback;
            ajax.PostZstj(url, param, function(data){
                if(data)
                  callback && callback();
                else
                  util.showFade('移动失败!');
            });
          },
          TopOrBottom: function(options){
            var url = URL.TalentGroup.TopOrBottom,
                param = angular.extend({
                  'ID': 0,
                  'ToTop': true
                }, options.param),
                callback = options.callback;
            ajax.PostZstj(url, param, function(data){
                if(data)
                  callback && callback();
                else
                  util.showFade('移动失败!');
            });
          },
          Count: function(options){
            var url = URL.TalentGroup.Count,
                param = angular.extend({
                  'GroupID': 0
                }, options.param),
                callback = options.callback;
            ajax.PostZstj(url, param, function(data){
                if(data)
                  callback && callback(data.Count);
                else
                  util.showFade('获取当前组的人数失败!');
            });
          }
      },
      // 医师认证
      DoctorAuth:{
          Add: function(options){
            var url = URL.DoctorAuth.Add,
                param = angular.extend({
                        'Mobile':  '',
                        'TalentGroupId':  '',
                        'NickName':  '',
                        'Title':  '',
                        'DepartName':  '',
                        'Desc':  '',
                        'VerifyImageUrl': ''
                      }, options.param),
                callback = options.callback;
            if(Valid.TalentAddOrMod(param)){

              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('添加达人失败!');
              });
            }
          },
          Modify: function(options){
            var url = URL.DoctorAuth.Modify,
                param = angular.extend({
                        'AccountId':  '',
                        'TalentGroupId':  '',
                        'NickName':  '',
                        'Title':  '',
                        'DepartName':  '',
                        'Desc':  '',
                        'VerifyImageUrl': ''
                      }, options.param),
                callback = options.callback;

            if(Valid.TalentAddOrMod(param)){
              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('更新达人失败!');
              });
            }
          },
          SetState: function(options){
            var url = URL.DoctorAuth.SetState,
                param = angular.extend({
                        'AccountIDs':  [],
                        'Status': 0,
                        'Remark': ''
                      }, options.param),
                callback = options.callback;

            ajax.PostZstj(url, param, function(data){

                if(data)
                  callback && callback(data);
                else
                  util.showFade('更新达人状态失败!');
            });
          }, // Status 1:审核中 2:已审核 3:被拒绝
          List: function(options){
            var url = URL.DoctorAuth.List,
                param = {},
                ddls = options.TalentGroupDDLS,
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostZstj(url, param, function(data){
                var result = dataModel.convertTalentList(data, ddls);
                callback && callback(result);
            });
          },
          // 搜索
          Search: function(options){
            var url = URL.DoctorAuth.Search,
                param = angular.extend({
                        'Mobile':  '',
                        'GroupID': -1,
                        'NickName':  '',
                        'Title':  '',
                        'State': -1
                      }, options.param),
                ddls = options.TalentGroupDDLS,
                callback = options.callback,
                dataModel = new DataModel(),
                isValidMobile = true;

            if(param.Mobile){
              isValidMobile = Valid.Mobile(param.Mobile);
            }
            if(isValidMobile){
               ajax.PostZstj(url, param, function(data){
                  var result = dataModel.convertTalentList(data, ddls);
                  callback && callback(result);
              });
            }
          },
          GetDDLByTalentGroup: function (options) {
              var opts = angular.extend({
                          'TalentGroupList':  [],
                          'callback':  angular.noop
                        }, options),
                  dataModel = new DataModel();
              if(opts.TalentGroupList.length == 0){
                  ViewModel.TalentGroup.List({
                    callback: function (data) {
                      if(opts.callback){
                        var result = dataModel.convertGroupList(data);
                        opts.callback(result);
                      }
                    }
                  });
              } else {
                  if(opts.callback){
                    var result = dataModel.convertGroupList(opts.TalentGroupList);
                    opts.callback(result);
                  }
              }

          },
          GetCode: function(options){
              param = angular.extend({
                  'AccountId':'',
                  'TalentGroupId':''
              }, options.param),
              callback = options.callback;
              dataModel = new DataModel();
              if(options.callback){
                var result = dataModel.GetCode(param.AccountId);
                options.callback(result);
              }
          },
          GetShortLink: function(options){
            var url = URL.DoctorAuth.GetShortLink,
                param = angular.extend({
                        'ShortLink': ''
                        }, options.param),
                callback = options.callback;

              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('转换失败!');
              });
          },
          convertTagsToNeed : function(data){
             var dataModel = new DataModel();
             return dataModel.convertTagsToNeed(data);
          },
          AddDynamics :function(options){
            var url = URL.DoctorAuth.AddArticle,
                param = angular.extend( {
                      'TalentAccountId': '',
                      'Title': '',
                      'Content': '',
                      'Images': [],
                      'Tags': []
                }, options.param),
                callback = options.callback;
            if(Valid.AddDynamics(param)){
              ajax.PostZstj(url, param, function(data){
                  if(data){
                    callback && callback(data);
                  }
                  else
                    util.showFade('添加动态失败!');
              });
            }
          },
          ListByAccountID: function(options){
            var url = URL.DoctorAuth.ListByAccountID,
                param = angular.extend( {
                      'TalentAccountId': ''
                }, options.param),
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostZstj(url, param, function(data){
                var result = dataModel.convertDynamicsList(data);
                callback && callback(result);
            });
          },
          OnDelDynamics: function(options){
            var url = URL.DoctorAuth.RemoveArticle,
                param = angular.extend( {
                      'ID': ''
                }, options.param),
                callback = options.callback;
            ajax.PostZstj(url, param, function(data){
                callback && callback(data);
            });
          },
          OnUpOrDownDynamtisDilog :function(options){
            var url = URL.DoctorAuth.ToggleTopArticle,
                param = angular.extend({
                    'ID': '',
                    'IsTop': ''
                }, options.param),
            callback = options.callback;
            ajax.PostZstj(url, param, function(data){
                if(data){
                  callback && callback(data);
                }
                else
                  util.showFade('操作失败!');
            });
          },
      },
      ActiveTag:{
          List: function(options){
            var url = URL.ActiveTag.List,
                param = {},
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostZstj(url, param, function(data){
                var result = dataModel.convertTagList(data);
                callback && callback(result);
            });
          },
          GetTagList: function(options){
            var url = URL.ActiveTag.List,
                param = {},
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostZstj(url, param, function(data){
                var result = dataModel.convertDoctorAuthTagList(data);
                callback && callback(result);
            });
          },
          Modify: function(options){
            var url = URL.ActiveTag.Modify,
                param = angular.extend({
                        'Tags':  ''
                      }, options.param),
                callback = options.callback;

              ajax.PostZstj(url, param, function(data){
                  if(data)
                    callback && callback(data);
                  else
                    util.showFade('更新失败!');
              });
          },
          conventParams:function(data,name){//添加
             var dataModel = new DataModel();
             return dataModel.conventParams(data,name);
          },
          modifyList: function(data,item){//修改名称
             var dataModel = new DataModel();
             return dataModel.modifyList(data,item);
          },
          modifyDown: function(data,item){//后移
             var dataModel = new DataModel();
             return dataModel.modifyDown(data,item);
          },
          modifyUp: function(data,item){//前移
             var dataModel = new DataModel();
             return dataModel.modifyUp(data,item);
          },
          OnAllUp: function(data,item){//前移
             var dataModel = new DataModel();
             return dataModel.OnAllUp(data,item);
          },
          OnAllDown: function(data,item){//后移
             var dataModel = new DataModel();
             return dataModel.OnAllDown(data,item);
          },
          OnDelete: function(data,item){
             var dataModel = new DataModel();
             return dataModel.OnDelete(data,item);
          }
      },
      TalentConsultation:{
          List: function(options){
            var url = URL.TalentConsultation.List,
                param = angular.extend({
                            'Content': '',
                            'StartTime': null,
                            'EndTime': null,
                            'State': -1,
                            'Page': 1,
                            'Count': 10
                          }, options.param),
                callback = options.callback,
                dataModel = new DataModel();
            ajax.PostZstj(url, param, function(data){
                var result = dataModel.convertConsultationList(data.SubjectList);
                callback && callback(result,data.TotalCounts);
            });
          },
          SetState:function(options){
            var url = URL.TalentConsultation.SetState,
                param = angular.extend({
                              "SubjectIds": [],
                              "State": -1
                          }, options.param),
                callback = options.callback;
            ajax.PostZstj(url, param, function(data){
                callback && callback();
            });
          }
      }
    };

    return ViewModel;

  }]);

  return app;
});
