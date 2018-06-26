/* eslint-disable no-undef */
define(['indexApp'
  , 'common/util'
  , 'common/const'
  , 'common/BaseInfoManager'
  , 'model/dspPictureManageModel'
  , 'service/baseService'
  , 'service/dspPictureManageService'
  , 'bootStrapMultiselect']
  , function (app, util, Const, BaseInfoManager, vModel) {
    app.controller('dspPictureManageCtrl', ['$scope'
      , 'signValid'
      , 'deptService'
      , 'dspPictureManageService'
      , function ($scope, signValid, deptService, pmService) {

        var MultiSelect = {
          MultiSetting: {
            selectAllText: '选择全部',
            allSelectedText: '全部选中',
            nSelectedText: '个被选中',
            nonSelectedText: '--全部--',
            buttonWidth: '181px',
            includeSelectAllOption: true,
            onDropdownHidden: function (option, checked, select) { }
          },
          OnLoadDepts: function (id, data) {
            var opts = $.extend(MultiSelect.MultiSetting, {
              onDropdownHidden: function (option, checked, select) {
                var deptIds = $(id).val() || [];
                // if(id == 'SelectAddDeptDDL')
                $scope.vm.pmCollection.Current.ServiceDeptIds = deptIds;
                $scope.$apply();

              }
            });
            $(id).multiselect(opts).multiselect('dataprovider', data);
          },
          SetDepts: function (jId, deptIds) {
            deptIds = deptIds || [];
            if (jId.length) {
              jId.find('option').each(function () {
                var val = $(this).val(),
                    selected = false;
                for (var i = 0; i < deptIds.length; i++) {
                  if (val == deptIds[i]) {
                    selected = true;
                    break;
                  }
                }
                $(this).prop('selected', selected);
              });
              jId.multiselect('refresh');
            }
          },
          Clear: function (jId) {
            if (jId.length) {
              jId.find('option:selected').each(function () {
                $(this).prop('selected', false);
              });
              jId.multiselect('refresh');
            }
          }
        };

        $scope.vm = {

          Common: {
            Depts: [],
            OnLoadDepts: function () {

              deptService.GetDepts(function () {
                var self = $scope.vm.Common,
                  tempData = [{ text: '--全部--', value: '0' }],
                  tempMultData = [],
                  allDepts = BaseInfoManager.DeptInfoManager.GetDeptInfo(),
                  enableDept = allDepts.defaultDeptList,
                  addedDept = allDepts.addedDeptList,
                  length = enableDept.length;
                  // console.log(allDepts)
                for (var i = 0; i < length; i++) {
                  var item = enableDept[i];
                  tempData.push({ text: item.Name, value: item.Id });
                  tempMultData.push({ selected: false, title: item.Name, label: item.Name, value: item.Id });
                  // tempData.push({ text: item.FullName, value: item.Id / RptDeptKey });
                }

                for (var i = 0; i < addedDept.length; i++) {
                  var item = addedDept[i];
                  tempData.push({ text: item.Name, value: item.Id });
                  tempMultData.push({ selected: false, title: item.Name, label: item.Name, value: item.Id });
                  // tempData.push({ text: item.FullName, value: item.Id / RptDeptKey });
                }

                MultiSelect.OnLoadDepts('#SelectAddDeptDDL', tempMultData);
                MultiSelect.OnLoadDepts('#SelectEditDeptDDL', tempMultData);

                self.Depts = tempData;
              });
            },
            Init: function () {
              signValid.ValidAccess('#/dspPictureManage');                                 // 缓存登录验证
              /* eslint-disable no-undef */
              $('.nav li:eq(16)').addClass('active').siblings().removeClass('active');     // 侧边栏样式
              $('body').css('overflow', 'auto');

              $('#inputAddReportItemSrc, #inputEditReportItemSrc').change(function (){     // 获取上传图片尺寸 (医师健康分组)

                  var current = $scope.vm.pmCollection.Current,
                      file = this.files[0],
                      _URL = window.URL || window.webkitURL,
                      img = new Image();
                  img.src = _URL.createObjectURL(file);
                  img.onload = function(){
                      current.Size.width = this.width;
                      current.Size.height = this.height;
                  };
              });

              document.addEventListener('uploaded', function (e) {
                var currentDialog = $scope.vm.pmCollection.currentDialog;
                if (currentDialog == 'addDialog') {
                  $scope.vm.pmCollection.OnAddUploadImageCallBack(e.detail);
                }
                if (currentDialog == 'editDialog') {
                  $scope.vm.pmCollection.OnEditUploadImageCallBack(e.detail);
                }

              });

              $scope.vm.Common.OnLoadDepts();
            }
          },

          pmCollection: {
            List: [],
            currentDialog: '',
            Current: {
              'ImageGroup': ''
              , 'ServiceDepts': '0'
              , 'ServiceDeptIds': []
              , 'ImageType': 1
              , 'Size': { 'width': '', 'height': '' }
              , 'ImageName': ''
              , 'ImageUrl': ''
              , 'Images': []
            },
            // 1.1 初始化加载数据
            OnLoad: function () {
              pmService.pictureManage.List({
                callback: function (data) {
                  $scope.vm.pmCollection.List = data;
                }
              });
            },

            //添加图片加载
            OnUploadAddImage: function () {
              var tg = $scope.vm.pmCollection,
                btnImage = $('#inputAddReportItemSrc')[0].files[0],
                width = tg.Current.Size.width,
                height = tg.Current.Size.height;
              tg.currentDialog = 'addDialog';

              if (!btnImage) {
                util.showFade('请选择您要上传的图片！');
                return;
              }
              var size = btnImage.size / 1024,
                ext = { 'jpg': true, 'jpeg': true, 'png': true, 'gif': true },
                extName = btnImage.name.split('.').pop();

              if (!ext[extName]) {
                util.showFade('图片格式必须为jpg,jpeg,png,gif！');
                return;
              }
              if (width > 120 || height > 120) {
                util.showFade('图片宽高不能超过120*120');
                return;
              }
              if (size > 900) {
                util.showFade('图片大小不能超过900kb');
                return;
              }
              var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.DoctorSendImages, util.randomString(32), extName),
                instance = new Sand({
                  bucket: Const.ComboConfig.bucket,
                  expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                  form_api_secret: Const.ComboConfig.form_api_secret
                });
              util.showAjaxLoading();
              instance.upload(filePath, '#inputAddReportItemSrc');

            },
            //编辑图片加载
            OnUploadEditImage: function () {
              var tg = $scope.vm.pmCollection,
                btnImage = $('#inputEditReportItemSrc')[0].files[0],
                width = tg.Current.Size.width,
                height = tg.Current.Size.height;
              tg.currentDialog = 'editDialog';

              if (!btnImage) {
                util.showFade('请选择您要上传的图片！');
                return;
              }
              var size = btnImage.size / 1024,
                ext = { 'jpg': true, 'jpeg': true, 'png': true, 'gif': true },
                extName = btnImage.name.split('.').pop();

              if (!ext[extName]) {
                util.showFade('图片格式必须为jpg,jpeg,png,gif！');
                return;
              }
              if (width > 120 || height > 120) {
                util.showFade('图片宽高不能超过120*120');
                return;
              }
              if (size > 900) {
                util.showFade('图片大小不能超过900kb');
                return;
              }
              var filePath = String.prototype.format('{0}/{1}.{2}', Const.ComboConfig.DoctorSendImages, util.randomString(32), extName),
                instance = new Sand({
                  bucket: Const.ComboConfig.bucket,
                  expiration: parseInt((new Date().getTime() + 3600000) / 1000),
                  form_api_secret: Const.ComboConfig.form_api_secret
                });
              util.showAjaxLoading();
              instance.upload(filePath, '#inputEditReportItemSrc');
            },

            OnAddUploadImageCallBack: function (data) {
              var Images = $scope.vm.pmCollection.Current.Images;
              Images.push({
                'ImageName': $scope.vm.pmCollection.Current.ImageName,
                'ImageUrl': Const.ComboConfig.ComboBaseUrl + data['path']
              });
              $scope.vm.pmCollection.Current.ImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
            },//结束

            OnEditUploadImageCallBack: function (data) {
              $scope.vm.pmCollection.Current.ImageUrl = Const.ComboConfig.ComboBaseUrl + data['path'];
              $scope.$apply();
              util.hideAjaxLoading();
            },

            //添加
            OnAddDialog: function () {
              var ag = $scope.vm.pmCollection;
              ag.Current = {
                'ImageGroup': '',
                'ServiceDepts': null, 'ServiceDeptIds': [], 'ImageType': 1
                , 'Size': { 'width': '', 'height': '' }, 'Images': []
              };

              ag.Current.Images = [];

              MultiSelect.SetDepts($('#SelectAddDeptDDL'));
              //清空fileSelector
              var talentGroupFile = $('#inputAddReportItemSrc');
              talentGroupFile.after(talentGroupFile.clone().val(''));
              talentGroupFile.remove();

              //将图片清空
              $('.adding').find('img').attr('src', '');
              $('#groupAdd').modal('show');//显示添加弹出框
            },
            //添加中的保存
            OnAdd: function () {
              var ag = $scope.vm.pmCollection;
              // console.log(ag.Current);
              pmService.pictureManage.Add({
                param: {
                  'ServiceDeptIds': ag.Current.ImageType == 2 ? [] : ag.Current.ServiceDeptIds,
                  'Images': ag.Current.Images,
                  'ImageType': ag.Current.ImageType
                },
                callback: function () {
                  ag.OnLoad();
                  $('#groupAdd').modal('hide');
                }
              });
            },
            //判断图片是否为所有的机构所用
            OnClickChangeCurrentState: function (flag) {
              $scope.vm.pmCollection.Current.ImageType = flag;
            },

            // 图片预览
            delPicture: function (item) {
              var tg = $scope.vm.pmCollection;
              tg.Current = item;
              tg.Current.ImageUrl = item.ImageUrl;
            },
            //编辑
            OnModifyDialog: function (item) {
              var ag = $scope.vm.pmCollection;
              item.Size = { width: '', height: '' };

              ag.Current = angular.extend({}, item);

              MultiSelect.SetDepts($('#SelectEditDeptDDL'), item.ServiceDeptIds);
              //清空fileSelector
              var pictureManageFile = $('#inputEditReportItemSrc');
              pictureManageFile.after(pictureManageFile.clone().val(''));
              pictureManageFile.remove();
              $('#groupEdit').modal('show');//显示编辑弹出框
            },
            //编辑中的保存
            OnModify: function () {
              var ag = $scope.vm.pmCollection;
              pmService.pictureManage.Modify({
                param: {
                  'ServiceDeptIds': ag.Current.ImageType == 2 ?[] : ag.Current.ServiceDeptIds,
                  'ImageUrl': ag.Current.ImageUrl,
                  'ImageName': ag.Current.ImageName,
                  'ImageGroup': ag.Current.ImageGroup,
                  'ImageType': ag.Current.ImageType
                },
                callback: function () {
                  ag.OnLoad();
                  $('#groupEdit').modal('hide');
                }
              });
            },//结束

            //删除
            OnDeleteDialog: function (item) {
              var tg = $scope.vm.pmCollection;
              tg.Current = item;
              $('#delPicture').modal('show');
            },
            OnDelete: function () {
              var tg = $scope.vm.pmCollection;
              pmService.pictureManage.Delete({
                param: {
                  'ImageGroup': tg.Current.ImageGroup
                },
                callback: function () {
                  tg.OnLoad();
                  $('#delPicture').modal('hide');
                }
              });
            },

            //搜索
            Search: {
              'Name': '',             // 图片名称
              'ServiceDeptID': '0'    // 下拉机构
            },
            OnSearch: function () {
              var cg = $scope.vm.pmCollection;
              pmService.pictureManage.Search({
                param: {
                  'Name': cg.Search.Name,
                  'ServiceDeptID': cg.Search.ServiceDeptID
                },
                callback: function (data) {
                  cg.List = data;
                }
              });
            }
          },
          Init: function () {
            var comon = $scope.vm.Common,
              pm = $scope.vm.pmCollection;

            comon.Init();
            pm.OnLoad();
          }

        };

        $scope.vm.Init();


      }]);
    return app;
  });
