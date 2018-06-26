define(['indexApp',
	    'model/mall/enterpriseAppointmentModel',
	    'common/util',
	    'service/baseService',
	    'bootStrapMultiselect'],function(app,sysModel,util) {
	app.controller('enterpriseAppointmentCtrl',function($http,$scope,signValid,ajaxService){
		signValid.ValidAccess('#/enterpriseAppointment');
		var Base={
			GoodsList: "BMSEnterpriseAppointment/GetGoodsList",//获取未删除的体检中心和商品
			GroupEnterpriseList: "BMSEnterpriseAppointment/GroupEnterpriseList",
			AddGroupEnterprise: "BMSEnterpriseAppointment/AddGroupEnterprise",
			ModifyGroupEnterprise: "BMSEnterpriseAppointment/ModifyGroupEnterprise",
			DeleteGroupEnterprise: "BMSEnterpriseAppointment/DeleteGroupEnterprise",
			ImportEmployeeList: "BMSEnterpriseAppointment/ImportEmployeeList",//导入员工excel,转换格式
	        AddEmployeeList: "BMSEnterpriseAppointment/AddEmployeeList"//添加员工
		};
		var enterpriseAppointmentModel = new sysModel();
    
		($scope.vm ={
			EnterpriseAppointment:{
				Search:{
					"PageNum": 1,
					"Count": 10,
					"Name": "",
					"MinAppointDate": "",
					"MaxAppointDate": ""
				},
				ReportSendType:[
		            {text:'医院自取',value:0 },
		            {text:'统一快递',value:1},
				],
				// 该企业商品信息
				CurrentEnterpriseGoodsInfo:[],//添加商品和（查看，编辑）时的数据格式不同
				//企业商品信息
				GroupEnterpriseList:[],
				//团检企业信息
				GroupAppointmentEnterpriseList:[],
				CurrentGoodsList:[],//商品信息
				AllGoodsList:[],//所有选中的商品信息
				TempAllGoodsList:[],//所有选中的商品信息
				SearchGoodsSupplier:'',//弹框中查询供应商信息
				AddOrModifyGroupEnterpriseInfoCategory:{//OrModify
		          'Id':'',
		          'Name': '',
		          'ConnectName': '',
		          'ConnectMobile': '',
		          'Address': '',
		          'CreateTime':'',
		          'LastUpdatetime':'',
		          'ReportSendType': 0,
		          'ReportSummary': false,
		          'MinAppointDate': '',
		          'MaxAppointDate': '',
		          'WarningText':'',
		          'MECList': [],
		          'MEList':[]
		        },
				ServiceProviderSelectValue:null,
				OnLoad:function() {
					var params = $scope.vm.EnterpriseAppointment.Search;
					ajaxService.PostMall(Base.GroupEnterpriseList,params,function(result){
						$scope.vm.EnterpriseAppointment.GroupAppointmentEnterpriseList = enterpriseAppointmentModel.convertEnterpriseModel(result.EnterpriseList);
						$scope.EnterprisePaginationConf = $scope.vm.EnterpriseAppointment.pageModel;
		                $scope.EnterprisePaginationConf.totalItems = result.Count;
					});
				},
				OnSearch:function() {
					var ag = $scope.vm.EnterpriseAppointment.Search;
			            ag.PageNum = $scope.vm.EnterpriseAppointment.pageModel.currentPage;
			            ag.Count = $scope.vm.EnterpriseAppointment.pageModel.itemsPerPage;
			            if (ag.PageNum == 0) {
			              ag.PageNum = 1;
			            }
			            if ($('#EnterpriseAppointmentStartTime').val()) {
			              ag.MinAppointDate = $('#EnterpriseAppointmentStartTime').val() + ' ' + '00:00:00';
			            }else{
						  ag.MinAppointDate = "";	
						}
			            if ($('#EnterpriseAppointmentEndTime').val()) {
			              ag.MaxAppointDate = $('#EnterpriseAppointmentEndTime').val() + ' ' + '23:59:59';
			            }else{
						  ag.MaxAppointDate = "";	
						}
					var params = angular.extend({
						"PageNum": 1,
						"Count": 10,
						"Name": "",
						"MinAppointDate": "",
						"MaxAppointDate": ""
					},$scope.vm.EnterpriseAppointment.Search);
					ajaxService.PostMall(Base.GroupEnterpriseList,params,function(result) {
						$scope.vm.EnterpriseAppointment.GroupAppointmentEnterpriseList = enterpriseAppointmentModel.convertEnterpriseModel(result.EnterpriseList);
						$scope.EnterprisePaginationConf = $scope.vm.EnterpriseAppointment.pageModel;
		                $scope.EnterprisePaginationConf.totalItems = result.Count;
					});
				},
				OnSearchEnterpriseClick:function(){
					var ag = $scope.vm.EnterpriseAppointment.Search;
			            ag.PageNum = $scope.vm.EnterpriseAppointment.pageModel.currentPage;
			            ag.Count = $scope.vm.EnterpriseAppointment.pageModel.itemsPerPage;
			            if (ag.PageNum == 0) {
			              ag.PageNum = 1;
			            }
			            if ($('#EnterpriseAppointmentStartTime').val()) {
			              ag.MinAppointDate = $('#EnterpriseAppointmentStartTime').val() + ' ' + '00:00:00';
			            }else{
						  ag.MinAppointDate = "";	
						}
			            if ($('#EnterpriseAppointmentEndTime').val()) {
			              ag.MaxAppointDate = $('#EnterpriseAppointmentEndTime').val() + ' ' + '23:59:59';
			            }else{
						  ag.MaxAppointDate = "";	
						}
					var params = angular.extend({
						"PageNum": 1,
						"Count": 10,
						"Name": "",
						"MinAppointDate": "",
						"MaxAppointDate": ""
					},$scope.vm.EnterpriseAppointment.Search);
					ajaxService.PostMall(Base.GroupEnterpriseList,params,function(result) {
						$scope.vm.EnterpriseAppointment.GroupAppointmentEnterpriseList = enterpriseAppointmentModel.convertEnterpriseModel(result.EnterpriseList);
						$scope.EnterprisePaginationConf = $scope.vm.EnterpriseAppointment.pageModel;
		                $scope.EnterprisePaginationConf.totalItems = result.Count;
					});
				},
				ImportEmployeeList:function() {
					var url = Base.ImportEmployeeList,
	                    params = {
	                        file:{
	                            uploadFile: document.getElementById("xlsFile").files[0]
	                        }
	                    };
	                if (!params.file.uploadFile){
	                    util.showFade("请选择需要导入的xls！");
	                	return;
	                }else if (params.file.uploadFile.name.split('.').pop() != "xls"){
	                    util.showFade("请选择正确的xls文件！");
	                	return;
	                }
	                util.ajaxMALLFile(url, params, function(result){
	                    if (result.Code == 1){

	                        //清空fileSelector
	                        var File = $("#xlsFile");
	                        File.after(File.clone().val(""));
	                        File.remove();

	                        //获取数据，添加员工
	                        var tempParams = {'EnterpriseId':"201708080938397242",'EmployeeInfo':result.Data};
	                        ajaxService.PostMall(Base.AddEmployeeList,tempParams,function(result){
	                        });
	                        $scope.$apply();
	                    }
	                    util.showFade(result.Message);
	                }, function (error){
	                    util.showFade(error);
	                });
				},
				//添加团检企业
				ShowAddEnterpriseModelDialog:function(){
					$scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory = {};//企业信息
					$scope.vm.EnterpriseAppointment.CurrentEnterpriseGoodsInfo = [];//商品
					$('#addOrModifyEnterpriseAppointmentCompanyModal').modal('show');
				},
				//编辑团检企业
				ShowModifyEnterpriseModelDialog:function(item) {
					$scope.vm.EnterpriseAppointment.CurrentEnterpriseGoodsInfo = item.MECListFormat;
					var editItem = new Object();
					angular.copy(item,editItem);
					$scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory = editItem;
					$('#addOrModifyEnterpriseAppointmentCompanyModal').modal('show');
				},
				//删除团检企业
				ShowDeleteEnterpriseModelDialog:function(item) {
					$scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory = item;
					$('#deleteEnterpriseAppointmentCompanyModal').modal('show');
				},
				//查看团检企业
				ShowInspectEnterpriseModelDialog:function(item) {
					$scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory = item;
					$scope.vm.EnterpriseAppointment.CurrentEnterpriseGoodsInfo = item.MECListFormat;
					$('#inspectEnterpriseAppointmentCompanyModal').modal('show');
				},
				ShowAddServiceProvider:function() {
					//点击添加的时候获取未删除的体检中心和商品
					$scope.vm.EnterpriseAppointment.InitServiceProviderData();
					$('#addServiceProviderModal').modal('show');
				},
				AddAppointmentServiceProvider:function() {//所有的商品信息TempAllGoodsList//当前新选择的商品,追加的商品
					var currentCheckedGoods = $scope.vm.EnterpriseAppointment.TempAllGoodsList;
					//原先选择的商品,即要add的商品
					var overCheckedGoods = $scope.vm.EnterpriseAppointment.CurrentEnterpriseGoodsInfo;
					for (var i = 0; i < currentCheckedGoods.length; i++) {
						if (overCheckedGoods.length == 0) {
							angular.copy(currentCheckedGoods,overCheckedGoods);
							break;
						}
						var tempCount = 0;
						for (var j = 0; j < overCheckedGoods.length; j++) {
							if (currentCheckedGoods[i].Id != overCheckedGoods[j].Id) {
								tempCount++;
							}
							if (tempCount == overCheckedGoods.length) {
								overCheckedGoods.push(currentCheckedGoods[i]);
							}
						}
					}
					$('#addServiceProviderModal').modal('hide');
				},
				AddAppointmentEnterprise:function() {					
				    var tempModel = $scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory;
					if (tempModel.Name == undefined || tempModel.ConvertMaxAppointDate == null || tempModel.ConvertMinAppointDate == null) {
						util.showFade('必填项不能为空');
							return ;
					}
					var params = enterpriseAppointmentModel.getRequestParams($scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory);					
					$scope.vm.EnterpriseAppointment.RefreshMECList();
					var mecListInfo = $scope.vm.EnterpriseAppointment.AllGoodsList;
					for (var i = 0; i < mecListInfo.length; i++) {
						var mecObj = new Object();
						var mecInfo = mecListInfo[i];
						mecObj["SupplierCode"] = mecInfo.SupplierCode;
						mecObj["SupplierName"] = mecInfo.SupplierName;
						params.MECList.push(mecObj);
					}
					var meListInfo = $scope.vm.EnterpriseAppointment.CurrentEnterpriseGoodsInfo;
					for (var i = 0; i < meListInfo.length; i++) {
						var meObj = new Object();
						var meInfo = meListInfo[i];
						meObj["GoodsId"] = meInfo.Id;
						meObj["GoodsName"] = meInfo.CommonInfo.Name;
						meObj["GroupSalesPrise"] = meInfo.GroupAppointmentPrice;
						meObj["SupplierCode"] = meInfo.SupplierCode;
						params.MEList.push(meObj);
					}
					if (params.MECList.length == 0 || params.MEList.length == 0) {
						util.showFade('必填项不能为空');
							return ;
					}
					ajaxService.PostMall(Base.AddGroupEnterprise,params,function(result) {
						util.showFade('添加成功');
						$scope.vm.EnterpriseAppointment.OnLoad();
						$('#addOrModifyEnterpriseAppointmentCompanyModal').modal('hide');
					});
				},
				ModifyAppointmentEnterprise:function() {
					var item = $scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory;
					var params = {'Id':item.Id,
								  'ConnectName':item.ConnectName,
								  'ConnectMobile':item.ConnectMobile,
								  'Address':item.Address,
								  'ReportSendType':item.ReportSendType,
								  'ReportSummary':item.ReportSummary,
								  'MaxAppointDate':enterpriseAppointmentModel.getRequestDate(item.ConvertMaxAppointDate),
								  'WarningText':item.WarningText
								};
					ajaxService.PostMall(Base.ModifyGroupEnterprise,params,function(result) {
						util.showFade('编辑成功');
						$scope.vm.EnterpriseAppointment.OnLoad();
						$('#addOrModifyEnterpriseAppointmentCompanyModal').modal('hide');
					});
				},
				DeleteAppointmentEnterprise:function() {
					var params = {'Id':$scope.vm.EnterpriseAppointment.AddOrModifyGroupEnterpriseInfoCategory.Id};
					ajaxService.PostMall(Base.DeleteGroupEnterprise,params,function(result) {
						$scope.vm.EnterpriseAppointment.OnLoad();
					});
				},
				//弹框搜索供应商
				OnSearchGoodsSupplier:function(){
					var name = $scope.vm.EnterpriseAppointment.SearchGoodsSupplier;
					var GroupEnterpriseList = $scope.vm.EnterpriseAppointment.GroupEnterpriseList;
					var temp = [];
					if(name==''){
			            ajaxService.PostMall(Base.GoodsList, {}, function(result){
			              	if (result != null){
								var viewModel = new sysModel();
			              		var resultList = viewModel.convertEnterpriseAndGoods(result);
			              		temp = resultList;
								var currentList = $scope.vm.EnterpriseAppointment.CurrentGoodsList;
								for (var m=0; m<temp.length; m++) {
									for (var s= 0; s<currentList.length; s++) {
										if(currentList[s].SupplierCode == temp[m].SupplierCode){
											temp[m].isChecked = true;
											continue;
										}
									}
								}
								$scope.vm.EnterpriseAppointment.GroupEnterpriseList = temp;
			              	}
			            })
					}else{
						for(var i=0;i<GroupEnterpriseList.length;i++){
							if(GroupEnterpriseList[i].SupplierName.indexOf(name)!=-1){
								temp.push(GroupEnterpriseList[i]);
							}
						}
					}
					var currentList = $scope.vm.EnterpriseAppointment.CurrentGoodsList;
					for (var m=0; m<temp.length; m++) {
						for (var s= 0; s<currentList.length; s++) {
							if(currentList[s].SupplierCode == temp[m].SupplierCode){
								temp[m].isChecked = true;
								continue;
							}
						}
					}
					$scope.vm.EnterpriseAppointment.GroupEnterpriseList = temp;
				},
				//更新MECList
				RefreshMECList:function() {
					var ag = $scope.vm.EnterpriseAppointment.CurrentEnterpriseGoodsInfo;
					var mecList = [];//$scope.vm.EnterpriseAppointment.AllGoodsList
					if (ag.length > 0) {
						mecList.push(ag[0]);
						for (var i = 1; i < ag.length; i++) {
							for (var j = 0; j < mecList.length; j++) {
								if(ag[i].SupplierCode != mecList[j].SupplierCode && j == mecList.length - 1) {
									mecList.push(ag[i]);
								}
							}
						}
						$scope.vm.EnterpriseAppointment.AllGoodsList = mecList;
					}else {
						$scope.vm.EnterpriseAppointment.AllGoodsList = [];
					}
				},
				//清楚弹框搜索供应商
				OnClearGoodsSupplier:function(){
					$scope.vm.EnterpriseAppointment.SearchGoodsSupplier = '';
				},
				InitServiceProviderData:function() {
					var viewModel = new sysModel();
		            ajaxService.PostMall(Base.GoodsList, {}, function(result){
		              	if (result != null){
		              		var resultList = viewModel.convertEnterpriseAndGoods(result);
		              		$scope.vm.EnterpriseAppointment.GroupEnterpriseList = resultList;
		              		$scope.vm.EnterpriseAppointment.CurrentGoodsList = [];
		              		$scope.vm.EnterpriseAppointment.AllGoodsList = [];
		              		$scope.vm.EnterpriseAppointment.TempAllGoodsList = [];
		              		$scope.vm.EnterpriseAppointment.SearchGoodsSupplier = '';
		              	}
		            })
				},
				//点击企业获取该企业下的商品信息
				// OnGetGoodsInfo:function(item){
				// 	var viewModel = new sysModel();
				// 	//判断当前item是否在list中
				// 	if($scope.vm.EnterpriseAppointment.CurrentGoodsList.length != 0 ){
				// 		var currentItem = $scope.vm.EnterpriseAppointment.CurrentGoodsList[0];
				// 		if(currentItem.SupplierCode != item.SupplierCode){
				// 			 util.showFade("只能选择一家机构，请先添加再重新选择！");
				// 			 return false;
				// 		}
				// 	}
				// 	var currentItem = $scope.vm.EnterpriseAppointment.GroupEnterpriseList[item.no];
				// 	    currentItem.isChecked = !currentItem.isChecked;
			 //    	$scope.vm.EnterpriseAppointment.CurrentGoodsList
			 //    	= viewModel.conventToGoodsList($scope.vm.EnterpriseAppointment.CurrentGoodsList,currentItem);
			 //    	//删除最右边的商品信息
			 //    	var rightList = $scope.vm.EnterpriseAppointment.AllGoodsList;
			 //    	for (var i=0; i<rightList.length;i++) {
			 //    		if(item.SupplierCode == rightList[i].SupplierCode){
				// 			var list = viewModel.removeData(i,rightList[i],
				// 				$scope.vm.EnterpriseAppointment.AllGoodsList,$scope.vm.EnterpriseAppointment.TempAllGoodsList,1);
				// 			$scope.vm.EnterpriseAppointment.AllGoodsList = list[0];
				// 			$scope.vm.EnterpriseAppointment.TempAllGoodsList = list[1];
			 //	    		}
			 //    	}
				// },

				OnGetGoodsInfo:function(item, index){
					var viewModel = new sysModel();
					//判断当前item是否在list中
					if($scope.vm.EnterpriseAppointment.CurrentGoodsList.length != 0 ){
						var currentItem = $scope.vm.EnterpriseAppointment.CurrentGoodsList[0];
						if(currentItem.SupplierCode != item.SupplierCode){
							 util.showFade("只能选择一家机构，请先添加再重新选择！");
							 return false;
						}
					}
					var currentItem = $scope.vm.EnterpriseAppointment.GroupEnterpriseList[index];
					    currentItem.isChecked = !currentItem.isChecked;
			    	$scope.vm.EnterpriseAppointment.CurrentGoodsList
			    	= viewModel.conventToGoodsList($scope.vm.EnterpriseAppointment.CurrentGoodsList,currentItem);
			    	//删除最右边的商品信息
			    	var rightList = $scope.vm.EnterpriseAppointment.AllGoodsList;
			    	for (var i=0; i<rightList.length;i++) {
			    		if(item.SupplierCode == rightList[i].SupplierCode){
							var list = viewModel.removeData(i,rightList[i],
								$scope.vm.EnterpriseAppointment.AllGoodsList,$scope.vm.EnterpriseAppointment.TempAllGoodsList,1);
							$scope.vm.EnterpriseAppointment.AllGoodsList = list[0];
							$scope.vm.EnterpriseAppointment.TempAllGoodsList = list[1];
			    		}
			    	}
				},

				//点击获取所有的商品信息
				OnGetAllGoodsInfo:function(no,item){
					var  viewModel = new sysModel();
					var currentItem = $scope.vm.EnterpriseAppointment.CurrentGoodsList[no];
					    currentItem.isChecked = !currentItem.isChecked;
					var list = viewModel.conventToAllGoods($scope.vm.EnterpriseAppointment.TempAllGoodsList,item);
					$scope.vm.EnterpriseAppointment.AllGoodsList = list[0];
					$scope.vm.EnterpriseAppointment.TempAllGoodsList = list[1];
				},
				//移除商品信息
				OnRemoveGoodsInfo:function(index,item,type){
					//删除样式
					if(type == 1){//删除父节点,直接删除第二栏中样式
						var currentGoods = $scope.vm.EnterpriseAppointment.CurrentGoodsList,
									  no = -1;
						for(var i=0;i<currentGoods.length;i++){
							if(currentGoods[i].SupplierCode == item.SupplierCode){
								no = i;
								var currentItem = $scope.vm.EnterpriseAppointment.CurrentGoodsList[no];
								if(currentItem.isChecked){
									$scope.vm.EnterpriseAppointment.CurrentGoodsList[no].isChecked = false;
								}
							    no = -1;
							}
						}
					}else if(type == 2){//删除子节点,若是只有一个被删除，则将样式全都删除
						var currentGoods = $scope.vm.EnterpriseAppointment.CurrentGoodsList,
									  no = -1;
						for(var i=0;i<currentGoods.length;i++){
							if(currentGoods[i].Id == item.Id){
								no = i;
							}
						}
						var currentItem = $scope.vm.EnterpriseAppointment.CurrentGoodsList[no];
						    currentItem.isChecked = !currentItem.isChecked;
					}
					var  viewModel = new sysModel();
					var list = viewModel.removeData(index,item,
						$scope.vm.EnterpriseAppointment.AllGoodsList,$scope.vm.EnterpriseAppointment.TempAllGoodsList,type);
					$scope.vm.EnterpriseAppointment.AllGoodsList = list[0];
					$scope.vm.EnterpriseAppointment.TempAllGoodsList = list[1];
				},
				//首次添加商品信息时删除信息
				RemoveFirstAddingGoodsInfo:function(item) {
					var ag = $scope.vm.EnterpriseAppointment.CurrentEnterpriseGoodsInfo;
					for (var i = 0; i < ag.length; i++) {
						if (item.Id == ag[i].Id) {
							ag.remove(ag[i]);
						}
					}
					$scope.vm.EnterpriseAppointment.RefreshMECList();
				},
				//管理员工信息
				OnManagementStaff:function(item){
					//切换路由，跳转元添加员工页面
					 location.href = '#/enterpriseAppointment/' + item.Id;
				},
				pageModel:{
		          totalItems: 0,
		          currentPage: 1,    //当前所在的页
		          itemsPerPage: 10,  //每页展示的数据条数
		          pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
		          perPageOptions: [10, 30, 50, 100, 200,500],    //可选择显示条数的数组
		          rememberPerPage: 'EnterpriseAppointmentPerPage',  //使用LocalStorage记住所选择的条目数的名称
		          onChange: function () {
		            if ($scope.vm.EnterpriseAppointment.pageModel.currentPage != 0 ) {
		              $scope.vm.EnterpriseAppointment.OnSearch();
		            }
		          }
		        }
			},
			Init:function() {
				var startDateTextBox = $('#EnterpriseAppointmentStartTime');
	            var endDateTextBox = $('#EnterpriseAppointmentEndTime');
	            $.timepicker.dateRange(
	              startDateTextBox,
	              endDateTextBox,
	              {
	                  changeMonth:true,
	                  buttonImageOnly:true,
	                  dateFormat:'yy-mm-dd',
	                  monthNamesShort:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	                  dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	                  minInterval: (1000 * 60 * 60 * 24 * 0) // 0 days
	              }
	            );
				$scope.vm.EnterpriseAppointment.OnLoad();
			}
		}).Init();
	});
	return app;
})
