define(['indexApp',
	    'model/mall/physicalExamEventQuotaModel',
	    'common/util',
	    'service/baseService'],function(app,vModel,util){
	app.controller('physicalExamEventQuotaCtrl',function($scope,ajaxService){
		var BaseUrl = {
			GetCheckIndex:"BMSCheckIndex/GetCheckIndex",//获取指标
			AddCheckIndex:"BMSCheckIndex/AddCheckIndex",//添加指标
			ModifyCheckIndex:"BMSCheckIndex/ModifyCheckIndex",//修改指标
			RemoveCheckIndex:"BMSCheckIndex/RemoveCheckIndex",//删除指标
			GetGroupCheckIndex:"BMSCheckIndex/GetGroupCheckIndex",
		};
		($scope.vm={
			physicalExamEventQuota:{
				EditingItem:{},
				OnSearchParam:{
					PagerIndex:1,
					PagerSize:10,
					Project:'',
					Content:''
				},
				OnAddExamEventQuotaParam:{
			    	Project:'',
			    	Content:'',
			    	Desc:'',
			    	SexType:[],//sting
			    	Tag:'',
			    	Weight:'',
				},
				SexTypes:[
					{value:'男',checked:false},
					{value:'女已婚',checked:false},
					{value:'女未婚',checked:false}
				],
				NormalList:[],//所有指标列表
				RemoveCheckIndexItem:{},
				Total: 0,
				OnSearch: function () {
					var params = {
						'PagerIndex': $scope.vm.physicalExamEventQuota.pageModel.currentPage,
						'PagerSize': $scope.vm.physicalExamEventQuota.pageModel.itemsPerPage,
						'Project': $scope.vm.physicalExamEventQuota.OnSearchParam.Project,
						'Content': $scope.vm.physicalExamEventQuota.OnSearchParam.Content
					};
					ajaxService.PostMall(BaseUrl.GetCheckIndex,params,function (result) {
						var viewModel = new vModel();
						$scope.pageConfig = $scope.vm.physicalExamEventQuota.pageModel;
						$scope.pageConfig.totalItems = result.Total;
						$scope.vm.physicalExamEventQuota.Total = result.Total;
						$scope.vm.physicalExamEventQuota.NormalList = viewModel.convertExamEventQuotaList(result.CheckIndexList);
					});
				},
				GetGroupList: function () {
					ajaxService.PostMall(BaseUrl.GetGroupCheckIndex,{},function (result) {

					});
				},
				ShowAddEventQuotaDialog: function () {
					$scope.vm.physicalExamEventQuota.EditingItem = {};
					$scope.vm.physicalExamEventQuota.SexTypes = [
							{value:'男',checked:false},
							{value:'女已婚',checked:false},
							{value:'女未婚',checked:false}
						];
					$scope.vm.physicalExamEventQuota.OnAddExamEventQuotaParam = {};
					$('#addOrModifyEventQuotaModal').modal('show');
				},
				ShowModifyEventQuotaDialog: function (item) {
					$scope.vm.physicalExamEventQuota.EditingItem = item;
					$scope.vm.physicalExamEventQuota.SexTypes = [
							{value:'男',checked:false},
							{value:'女已婚',checked:false},
							{value:'女未婚',checked:false}
						];
					for (var i = 0; i < item.SexType.length; i++) {
						if (item.SexType[i] == '男') {
							$scope.vm.physicalExamEventQuota.SexTypes[0].checked = true;
						}
						if (item.SexType[i] == '女已婚') {
							$scope.vm.physicalExamEventQuota.SexTypes[1].checked = true;
						}
						if (item.SexType[i] == '女未婚') {
							$scope.vm.physicalExamEventQuota.SexTypes[2].checked = true;
						}
					}
					$scope.vm.physicalExamEventQuota.OnAddExamEventQuotaParam = item;
					$('#addOrModifyEventQuotaModal').modal('show');
				},
				ShowDeleteEventQuotaDialog: function (item) {
					$scope.vm.physicalExamEventQuota.RemoveCheckIndexItem = item;
					$('#deleteEventQuotaModal').modal('show');
				},
				AddEventQuota: function () {
					var sexTypes = $scope.vm.physicalExamEventQuota.SexTypes;
					var addItem = $scope.vm.physicalExamEventQuota.OnAddExamEventQuotaParam;
					var params = {
						Project:addItem.Project,
				    	Content:addItem.Content,
				    	Desc:addItem.Desc,
				    	SexType:[],//string
				    	Tag:addItem.Tag,
				    	Weight:addItem.Weight,
					};
					if (isNaN(params.Weight)) {
						util.showFade('权重必须为数字!');
						return false;
					}
					for (var i = 0; i < sexTypes.length; i++) {
						if (sexTypes[i].checked) {
							params.SexType.push(sexTypes[i].value);
						}
					}
					for (var key in params) {
						if (params.hasOwnProperty(key)) {
							var element = params[key];
							if (!element || element.length == 0) {
								util.showFade('必填项不能为空');
								return;
							}
						}
					}
					ajaxService.PostMall(BaseUrl.AddCheckIndex,params,function (result) {
						$('#addOrModifyEventQuotaModal').modal('hide');
						if (result) {
							util.showFade('添加成功');
							$scope.vm.physicalExamEventQuota.OnSearch();
						}else {
							util.showFade('添加失败');
						}
					});
				},
				ModifyEventQuota: function () {
					var sexTypes = $scope.vm.physicalExamEventQuota.SexTypes;
					var addItem = $scope.vm.physicalExamEventQuota.OnAddExamEventQuotaParam;
					var params = {
						Id:addItem.Id,
						Project:addItem.Project,
				    	Content:addItem.Content,
				    	Desc:addItem.Desc,
				    	SexType:[],//string
				    	Tag:addItem.Tag,
				    	Weight:addItem.Weight,
					};
					if (isNaN(params.Weight)) {
						util.showFade('权重必须为数字!');
						return false;
					}
					for (var i = 0; i < sexTypes.length; i++) {
						if (sexTypes[i].checked) {
							params.SexType.push(sexTypes[i].value);
						}
					}
					for (var key in params) {
						if (params.hasOwnProperty(key)) {
							var element = params[key];
							if (!element || element.length == 0) {
								util.showFade('必填项不能为空');
								return;
							}
						}
					}
					var sexTypes = $scope.vm.physicalExamEventQuota.SexTypes;
					for (var i = 0; i < sexTypes.length; i++) {
						if (sexTypes[i].checked) {
							params.SexType.push(sexTypes[i].value);
						}
					}
					ajaxService.PostMall(BaseUrl.ModifyCheckIndex,params,function (result) {
						$('#addOrModifyEventQuotaModal').modal('hide');
						if (result) {
							util.showFade('编辑成功');
							$scope.vm.physicalExamEventQuota.OnSearch();
						}else {
							util.showFade('编辑失败');
						}
					});
				},
				DeleteEventQuota: function () {
					var removeItem = $scope.vm.physicalExamEventQuota.RemoveCheckIndexItem;
					var params = {Id:removeItem.Id};
					ajaxService.PostMall(BaseUrl.RemoveCheckIndex,params,function (result) {
						$('#deleteEventQuotaModal').modal('hide');
						if (result) {
							util.showFade('删除成功');
							$scope.vm.physicalExamEventQuota.NormalList.remove(removeItem);
						}else {
							util.showFade('删除失败');
						}
					});
				},
				pageModel:{
		          totalItems: 0,
		          currentPage: 1,    //当前所在的页
		          itemsPerPage: 10,  //每页展示的数据条数
		          pagesLength: 9,   //分页条目的长度（如果设置建议设置为奇数）
		          perPageOptions: [10, 30, 50, 100, 200,500],    //可选择显示条数的数组
		          rememberPerPage: 'EnterpriseStaffAppointmentPerPage',  //使用LocalStorage记住所选择的条目数的名称
		          onChange: function () {
		            if ($scope.vm.physicalExamEventQuota.pageModel.currentPage != 0 ) {
		                $scope.vm.physicalExamEventQuota.OnSearch();
		            }
		          }
		       },
			},
			Init: function () {
				$scope.vm.physicalExamEventQuota.OnSearch();
			}
		}).Init();
	});
	return app;
})