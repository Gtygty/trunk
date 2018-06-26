/* eslint-disable no-undef */
define(['indexApp', 'common/util', 'common/const', 'common/BaseInfoManager', 'model/serviceManagementModel', 'model/serviceDeptItemModel','Extend'], function (app, util, config, BaseManager, vModel, serviceDeptItemModel) {
  app.controller('serviceManagementCtrl', function ($scope, $http, signValid) {

    var BASE = {
      Title: '',
      URLS: {
        Search: 'ServiceDept/TrusteeshipDepts?DeptId={0}&name={1}',
        List: 'ServiceDept/TrusteeshipDepts?DeptId={0}&name={1}',
        Edit: 'ServiceDept/TrusteeshipDeptsAdd',
        DeptList: 'ServiceDept/GetServiceDeptInfoSearch?name='
      },
      GET: function (url, successCallback) {
        util.ajaxGet($http, url, function (result) {
          if (result.state == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
        }, BASE.ErrorCallback);
      },
      POST: function (url, param, successCallback) {
        util.ajaxPost($http, url, param, function (result) {
          if (result.state == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
        }, BASE.ErrorCallback);
      },
      ZPOST: function (url, param, successCallback) {
        util.ajaxZSTJPost($http, url, param, function (result) {
          if (result.Code == 1 && result.Data != null) { successCallback && successCallback(result.Data); } else { util.showFade(result.message); }
        }, BASE.ErrorCallback);
      },
      ErrorCallback: function (error) {
        util.showFade(error);
      }
    };


    $scope.vm = {

      deptCollection:{
        Data: [],
        height: 0,
        scrollheight: 0,
        currentName: [],
        Current: {
          Id: 0,
          DeptKey: '',
          Name: ''
        },

        //点击左侧栏机构
        OnClick: function(item){
          var $$this = $scope.vm.deptCollection,
              $$list = $scope.vm.serviceManagementCollection.List;
          $$this.Current = item;
          // console.log( $$this.Current)
          for(var i=0; i < $$this.Data.length; i++){
            var $$item = $$this.Data[i];
            $$item.SelectedState = (item == $$item) ? 'glyphicon-folder-open' : 'glyphicon-folder-close';
          }
          $$list.Init(); 
        },

        InitDept: function(result){
            var $$this = $scope.vm.deptCollection,
                $$service = $scope.vm.serviceManagementCollection,
                $$list = $scope.vm.serviceManagementCollection.List;
                $$data = [];
            for(var i=0; i < result.length; i++){
                result[i].SelectedState = 'glyphicon-folder-close';
                $$data.push(result[i]);
                
                // $$this. OnClickname(result[i]);
                //  $$list.Init();        
            }

            // 左侧所有机构
            $$this.Data = $$data;
            // 滚动轴自适应
            $$this.height = $(window).height(); 
            var width= $('#sidebar-menu').css('height');
            $$this.scrollheight ={height: $$this.height- 50 - 101 + 'px'};
            
            if($$data.length) {
              $$this.Data[0].SelectedState = 'glyphicon-folder-open';
              $$this.Current = $$this.Data[0];
              $$list.Init();
            }
        },
         //初始化左侧服务机构列表
        Init: function(){

          var $$this = $scope.vm.deptCollection;
              $$list = $scope.vm.serviceManagementCollection.List;
          
          BASE.GET(BASE.URLS.DeptList, function(result){
                var serviceDeptLists = [];
                var model = new serviceDeptItemModel();
                for (var i = 0; i < result.length; i++) {
                  var item = result[i];
                  var d = model.convertSearch(item);
                  serviceDeptLists.push(d);
                }
                $$this.InitDept(serviceDeptLists);
               
                // console.log(serviceDeptLists);
            });

        },

      },
      ////
      serviceManagementCollection: {
        Search: {
          CurrentItem:'',//当前弹框的item
          Current: '',
          //按监管师姓名搜索
          OnClick: function () {
            var $$this = $scope.vm.serviceManagementCollection,
                $$dept = $scope.vm.deptCollection,
                $$list = $$this.List;
            if(!$$dept.Current.Id){
                util.showFade('请选择左侧你要查看的部分!');
            }else{
              $$list.Init();
            }
          },
          Init: function () {
            // search init logic
          }
        },

        //
        List: {
          Data: [],
          Roles: {
             Name:[{ id:-1 , name:'--请选择--' }], 
             selectItem: -1
          },  
          tempNameList:{
             Name:[], 
             selectItem: -1
          },
          UserName:"",

        //右侧列表更新
        Init: function () {
              
            var $$this = $scope.vm.serviceManagementCollection,
                $$list = $$this.List,
                $$search = $$this.Search,
                $$dept = $scope.vm.deptCollection,
                $$url = String.prototype.format(BASE.URLS.List, $$dept.Current.Id, $$search.Current),
                $$vm = new vModel(),
                $$tempData = [];

            BASE.GET($$url, function (result) {
                $$list.Roles.Name = [{ id:-1 , name:'--请选择--' }];
                $$list.Roles.selectItem = -1;
              for (var i = 0; i < result.length; i++) {
                var item = result[i],
                  viewModel = $$vm.convertFromList(item);
                  $$tempData.push(viewModel);
                   $$list.Roles.Name.push(
                   {
                     id: $$tempData[i].DoctorId,
                     name:$$tempData[i].UserName
                   });
              }   
              $$list.Data = $$tempData;
              // console.log($$list.Data);
              $$list.tempNameList.Name = [];
              for(var i=0 ;i<$$list.Roles.Name.length;i++){
                $$list.tempNameList.Name.push($$list.Roles.Name[i])
              }
               console.log($$list.tempNameList );
            });
          }
        },
        // 详情
        Detail: {
          Current: {
            ID: 0,
            UserName: 0,
            Content: '',
            TrusteeshipDepts: []
          },
          // AllUserName:[],

          OnOpenDialog: function (item) {
            var $$this = $scope.vm.serviceManagementCollection.Detail;
            $$this.Current = item;
          }
        },
        // 修改
        Edit: {
          
          Current: {
            DoctorId: 0,
            DeptId: 0,
            UserName: '',
            TrusteeshipDepts: [],
            IsTrusteeship: ''
          },
          IsTrusteeship: false,
          deptState: [
            { text: '未托管', value: false},
            { text: '已托管', value: true }
          ],

         // 修改中的搜索（按所有机构搜索）
         Search: {
             param: '',
             Data: [],
             NullData : [],
             SelectedData: [],
             Current: [],
             CurrentData: [],
             CurrentSelectedData:[],
             // result 为所有服务机构，selectResult为右侧数据，既当前选中的数据，item为当前监管师的机构托管状态
             ConvertDeptData: function(result, selectResult, currentItem){
               if(result && result.length){
                 var $$this = $scope.vm.serviceManagementCollection,
                     $$search = $$this.Edit.Search,
                     $$tempData = [],
                     $$tempSelectedData = [];

                 for(var i=0; i< result.length; i++){
                   var item = result[i],
                       isSelected = false; // (左侧)
                   // 当前用户所在机构不添加到相关列表中
                   if(currentItem.DeptId == item.Id) continue;
                   for(var j=0; j< selectResult.length; j++){
                     if(item.Id == selectResult[j].Id){
                       isSelected = true; // (右侧)
                       break;
                     }
                   }
                   if(isSelected){
                    //  右边数据
                     $$tempSelectedData.push({
                          Checked: false,
                          Id: item.Id,
                          Name: item.Name
                        });
                   }else{
                    //  左边数据
                     $$tempData.push({
                          Checked: false,
                          Id: item.Id,
                          Name: item.Name
                        });
                   }
                 }
                 $$search.Data = $$tempData;
                 $$search.SelectedData = $$tempSelectedData;
                //  console.log(  $$search.Data);
               }
             },
             OnClick: function(){
               var $$this = $scope.vm.serviceManagementCollection,
                   $$editCurrent = $$this.Edit.Current,
                   $$search = $$this.Edit.Search,
                   $$dept = $scope.vm.deptCollection,
                   //把param：''字符串转换为小写
                   $$param = $$search.param.toLowerCase(),
                   $$tempData = [];//左边数据
                   // $$dept.Data为所有服务机构
                    for(var i=0; i< $$dept.Data.length; i++){
                      var $$isSelected = false;

                      //  $$search.SelectedData：右侧数据，选中的数据
                      for(var j=0; j< $$search.SelectedData.length; j++){
                        if($$dept.Data[i].Id == $$search.SelectedData[j].Id){
                          $$isSelected = true;
                          break;
                        }
                      }
                      if($$editCurrent.DeptId == $$dept.Data[i].Id) continue;
                      
                      if(!$$this.Edit.IsTrusteeship)
                      {
                            if(!$$isSelected){
                              var item = $$dept.Data[i];
                              // 如果查询框中有数据
                              if($$search.param){
                                //  模糊查询，只要input框中输入的param字符串中有一个人字符和机构名相同，则为查到数据
                                  if(item.Name.toLowerCase().indexOf($$param) != -1){
                                    $$tempData.push({
                                      Checked: false,
                                      Id: item.Id,
                                      Name: item.Name
                                    });
                                  }
                              } 
                              // 如果查询框中没有数据
                              else{
                                  $$tempData.push({
                                    Checked: false,
                                    Id: item.Id,
                                    Name: item.Name
                                  });
                              }
                            }
                       }else{
                             if($$isSelected){
                               for(var j=0; j< $$search.SelectedData.length; j++){
                                   var item =  $$search.SelectedData[j];
                                      if(item.Checked){
                                          $$search.OnDeptClick(item);
                                      }
                                    if($$search.param){
                                //  模糊查询，只要input框中输入的param字符串中有一个人字符和机构名相同，则为查到数据
                                    if(item.Name.toLowerCase().indexOf($$param) != -1){
                                       $$search.OnDeptClick(item);
                                    }
                                 } 
                               } 
                            // $$search.Data = $$tempData;   
                            }else{
                              var item = $$dept.Data[i];
                                $$tempData.push({
                                  Checked: false,
                                  Id: item.Id,
                                  Name: item.Name
                                });
                            }
                       }
                    }
                $$search.Data = $$tempData;
                // console.log(  $$search.Data);
             },

            // 按托管机构查询
             OnSearch: function(){
               var $$this = $scope.vm.serviceManagementCollection,
                   $$list = $scope.vm.serviceManagementCollection.List
                   $$editCurrent = $$this.Edit.Current,
                   $$search = $$this.Edit.Search,
                   $$dept = $scope.vm.deptCollection,
                   $$Current = [],
                   $$tempData = [],//左边数据
                   $$Name= [];
                    if($$list.Roles.selectItem == -1){
                        util.showFade("没有选择要查询的健管师！");
                    }     
                    for(var i=0; i< $$list.Data.length; i++){
                      var $$isSelected = false;
                      //  DoctorId= $$this.List.Roles.selectItem,
                        for(var j=0; j< $$search.SelectedData.length; j++){
                          if($$list.Data[i].DeptId== $$search.SelectedData[j].Id){
                            $$isSelected = true;
                            break;
                          }
                        };
                        if(!$$isSelected){
                          var list = $$list.Data[i]
                           var item = $$list.Data[i].TrusteeshipDepts;
                          //  console.log(item);
                            if($$list.Roles.selectItem == list.DoctorId){
                              for(var j=0;j<item.length;j++){
                                
                                $$tempData.push({
                                    Checked: false,
                                    Id: item[j].DeptId,
                                    Name: item[j].DeptName
                                  });
                                
                              }
                            }               
                        }           
                      }
                $$search.CurrentData = $$tempData;
                //  $$search.CurrentData = $$search.CurrentData.concat($$tempData);
                // console.log(  $$search.CurrentData);
             },
            OnDeptClick: function(item){
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search,
                   $$isContain = false;
                  item.Checked = !item.Checked;
                for(var i=0; i< $$search.Current.length; i++){
                  var $$current = $$search.Current[i];
                  if($$current != item){
                    $$isContain = true;
                    break;
                  }
                }
                if(!$$isContain) $$search.Current.push(item);
             },

             //按已托管机构查询---右移
             OnLeft: function(){
              //  debugger
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search,
                   flag = 0,
                   $$tempData = [],
                   $$tempSelectedData = [];//右边数据
                   
                   for(var i=0; i< $$search.CurrentData.length; i++){
                      var $$current = $$search.CurrentData[i];
                      if($$list.Roles.selectItem != -1){
                      if($$current.Checked){
                        // if($$current.Name != $$search.SelectedData.Name)
                        if($$search.SelectedData.length !=0){
                        for(var j=0; j<$$search.SelectedData.length; j++){
                            
                          if($$current.Name != $$search.SelectedData[j].Name){
                            console.log($$search.SelectedData[j].Name);
                              flag = 0;
                            // break;
                          }else{
                             util.showFade('该机构名已存在!');
                                 flag = 1;
                                $$tempData.push({
                                    Checked: false,
                                    Id: $$current.Id,
                                    Name: $$current.Name
                                });
                                // $$search.SelectedData.length ==0;
                                break;
                          }
                        }
                        if(flag != 1){
                          $$tempSelectedData.push({
                              Checked: false,
                              Id: $$current.Id,
                              Name: $$current.Name
                          }); 
                        }
                      }else{
                         $$tempSelectedData.push({
                                  Checked: false,
                                  Id: $$current.Id,
                                  Name: $$current.Name
                              });     
                      }
                    }else{
                      //  util.showFade('没有选择要托管的机构!');
                       $$tempData.push({
                            Checked: false,
                            Id: $$current.Id,
                            Name: $$current.Name
                        });
                    }
                  }else{
                        $$tempData.push({
                            Checked: false,
                            Id: $$current.Id,
                            Name: $$current.Name
                          });
                      }
                    }
                   $$search.CurrentData = $$tempData;
                   $$search.SelectedData = $$search.SelectedData.concat($$tempSelectedData);
                  //  $$search.Data = $$search.Data.concat( $$search.SelectedData);
                   $$search.Current = [];
             },
             // 左移
             
            //  全部右移
             OnLeftAll: function(){
              //  debugger
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search,
                   flag = 0,
                   $$tempData = [],
                   $$tempSelectedData = [];
                  for(var i=0; i< $$search.CurrentData.length; i++){
                    var $$current = $$search.CurrentData[i];
                    if($$search.SelectedData.length != 0){
                    for(var j=0; j< $$search.SelectedData.length; j++){
                          if($$current.Name != $$search.SelectedData[j].Name){
                            flag = 0;
                          }else{
                            //  util.showFade('该机构名已存在!');
                                $$tempData.push({
                                    Checked: false,
                                    Id: $$current.Id,
                                    Name: $$current.Name
                                });
                                flag = 1;
                              break;
                          }
                     }
                     if(flag != 1){
                        $$tempSelectedData.push({
                              Checked: false,
                              Id: $$current.Id,
                              Name: $$current.Name
                        });     
                     }
                    }else{
                      $$tempSelectedData.push({
                          Checked: false,
                          Id: $$current.Id,
                          Name: $$current.Name
                      });     
                    }
                  }
                  $$search.CurrentData =  $$tempData;
                  $$search.SelectedData = $$search.SelectedData.concat($$tempSelectedData);
                  $$search.Current = [];
             },
           

  // 按所以机构查询
             OnRightClick: function(){
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search,
                   $$tempData = [],
                   $$tempSelectedData = [];
                   for(var i=0; i< $$search.SelectedData.length; i++){
                      var $$current = $$search.SelectedData[i];
                      if($$current.Checked){
                        $$tempData.push({
                            Checked: false,
                            Id: $$current.Id,
                            Name: $$current.Name
                          });
                      }else{
                        $$tempSelectedData.push({
                            Checked: false,
                            Id: $$current.Id,
                            Name: $$current.Name
                          });
                      }
                    }
                   $$search.Data = $$search.Data.concat($$tempData);
                   $$search.SelectedData = $$tempSelectedData;//右边
                   $$search.Current = [];

             },
             //  左边的数据移到右边
             OnLeftClick: function(){
              //  debugger
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search,
                   $$tempData = [],
                   $$tempSelectedData = [];//右边数据
                   for(var i=0; i< $$search.Data.length; i++){
                      var $$current = $$search.Data[i];
                      if($$current.Checked){
                        $$tempSelectedData.push({
                            Checked: false,
                            Id: $$current.Id,
                            Name: $$current.Name
                          });
                      }else{
                        $$tempData.push({
                            Checked: false,
                            Id: $$current.Id,
                            Name: $$current.Name
                          });
                      }
                    }
                   $$search.Data = $$tempData;
                   $$search.SelectedData = $$search.SelectedData.concat($$tempSelectedData);
                   $$search.Current = [];     
             },
             OnLeftAllClick: function(){
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search,
                   $$tempData = [];
                  for(var i=0; i< $$search.Data.length; i++){
                    var $$current = $$search.Data[i];
                    $$tempData.push({
                      Checked: false,
                      Id: $$current.Id,
                      Name: $$current.Name
                    });
                  }
                  $$search.Data = [];
                  $$search.SelectedData = $$search.SelectedData.concat($$tempData);
                  $$search.Current = [];
             },
             OnRightAllClick: function(){
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search,
                   $$tempData = [];
                  for(var i=0; i< $$search.SelectedData.length; i++){
                    var $$current = $$search.SelectedData[i];
                    $$tempData.push({
                      Checked: false,
                      Id: $$current.Id,
                      Name: $$current.Name
                    });
                  }
                  $$search.Data = $$search.Data.concat($$tempData);
                  $$search.SelectedData = [];
                  $$search.Current = [];
             },

             Clear: function(item){
               var $$list = $scope.vm.serviceManagementCollection.List;
               $$list.Roles.Name = [];
              for(var i=0 ;i<$$list.tempNameList.Name.length;i++){
                $$list.Roles.Name.push($$list.tempNameList.Name[i])
              }
              //  debugger
                for (var j = 1; j < $$list.Roles.Name.length; j++) {
                  if($$list.Roles.Name[j].id == item.DoctorId){ 
                     $$list.Roles.Name.splice(j,1);
                     break;
                  }
                } 
             },
             getDepart: function(){
                   var item = $scope.vm.serviceManagementCollection.Search.CurrentItem;
                   $scope.vm.deptCollection.Init();
             },
           
           
             Init: function(){
               var $$this = $scope.vm.serviceManagementCollection,
                   $$search = $$this.Edit.Search;
             }
          },

        
  
         //修改弹出框
          OnOpenDialog: function (item) {
            // debugger
            $scope.vm.serviceManagementCollection.Edit.Search.CurrentData = [];  
            $scope.vm.serviceManagementCollection.Search.CurrentItem = item;
            // debugger
            var $$this = $scope.vm.serviceManagementCollection,
                $$list = $scope.vm.serviceManagementCollection.List,
                $$dept = $scope.vm.deptCollection,
                $$edit = $$this.Edit,
                $$search = $$edit.Search,
                $$tempData = {
                  DoctorId: item.DoctorId,
                  UserName: item.UserName,
                  DeptId: item.DeptId,
                  TrusteeshipDepts: []
                };
              //  $$search.OnSearch();
  
            for (var i = 0; i < item.TrusteeshipDepts.length; i++) {
                var $$current = item.TrusteeshipDepts[i];
                $$tempData.TrusteeshipDepts.push({
                  Checked: false,
                  Id: $$current.DeptId,
                  Name: $$current.DeptName
                });
             };

            $$edit.Current = $$tempData;
            $$search.param = '';
            $$search.ConvertDeptData($$dept.Data, $$tempData.TrusteeshipDepts, item); // 初始化编辑框的查询内容
            
            console.log($scope.vm.serviceManagementCollection.List.tempNameList.Name);
            // $scope.vm.serviceManagementCollection.List.tempNameList = $scope.vm.serviceManagementCollection.List.Roles;
            // $scope.vm.serviceManagementCollection.List.Init();
            $$search.Clear(item);
            // console.log($scope.vm.serviceManagementCollection.List.Roles.Name);
          },
          //修改
          OnClick: function () {
          // debugger
            var $$this = $scope.vm.serviceManagementCollection,
                $$edit = $$this.Edit,
                $$search = $$edit.Search,
                $$list = $$this.List,
                $$current = $$edit.Current,
                $$param = {
                  doctorId: $$current.DoctorId,
                  DeptIds: []
                },
                $$TrusteeshipDepts = [],
              //  新增
                $$CurrentLeft =  $$search.CurrentData,
                $$leftDoctor = {
                  doctorId: $$list.Roles.selectItem,
                  DeptIds: []
                };
                // 保存
              for(var i = 0; i < $$search.SelectedData.length; i++) {
                var item = $$search.SelectedData[i];
                $$param.DeptIds.push(item.Id);
                $$TrusteeshipDepts.push({
                  DeptId: item.Id,
                  DeptName: item.Name,
                });
              }
              
             // 新增
              // for (var i = 0; i < $$search.CurrentData.length; i++) {
              //   var item = $$search.CurrentData[i];
              //   $$leftDoctor.DeptIds.push(item.Id);
              // }

            BASE.POST(BASE.URLS.Edit, $$param, function (result) {
              if(result){
                for (var i = 0; i < $$list.Data.length; i++) {
                  var item2 = $$list.Data[i];
                  if(item2.DeptId == $$current.DeptId && item2.DoctorId == $$current.DoctorId){
                    item2.TrusteeshipCount = $$TrusteeshipDepts.length;
                    item2.IsTrusteeshipName = $$TrusteeshipDepts.length > 0 ? '是' : '否';
                    
                    item2.TrusteeshipDepts = $$TrusteeshipDepts;
                    break;
                  }
                }
                //  BASE.POST(BASE.URLS.Edit,$$leftDoctor, function (result) {
                //       // $$leftDoctor.doctorId = "";
                //       // $$leftDoctor.DeptIds = [];
                //       $scope.vm.Init();
                //   });

                // 修改成功
                $('#myListEdit').modal('hide');
              }
              $scope.vm.Init();
            });
          }
        },
        Init: function () {
          // var $$this = $scope.vm.serviceManagementCollection;
          // $$this.List.Init();
        }
      },
      Init: function () {
        var $$dept = $scope.vm.deptCollection;

        $$dept.Init();

        signValid.ValidAccess('#/serviceManagement');                                           // 缓存登录验证
        /* eslint-disable no-undef */
        $('.nav li:eq(0)').addClass('active').siblings().removeClass('active');     // 侧边栏样式
        $('body').css('overflow', 'auto');
      }
    };

    $scope.vm.Init();
    // $scope.vm.Init.Clear(item);

  });
  return app;
});


