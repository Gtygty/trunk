/* eslint-disable no-undef */
define(['indexApp', 'Extend', 'highcharts', 'common/util', 'model/regionStatisticsModel', 'hcexporting', 'hcexportingcsv', 'pikaday', 'service/baseService', 'jQueryUi', 'timePicker'],
  function (app, Extend, highcharts, util, model, exporting, exportCSV, pikaday, signValid) {
      app.controller('regionStatisticsCtrl', function ($scope, $http, signValid) {
          $('body').css('overflow', 'auto');
          signValid.ValidAccess("#/regionStatistics");                       //缓存登录验证
          //侧边栏样式
          $('.nav li:eq(13)').addClass('active').siblings().removeClass('active');

          $scope.vm = {
              organizeTotal: {                                      //机构总计
                  data: [                                         //数据列表
                  ],
                  serviceCollection: [                    //机构列表
                  ],
                  TotalData: [                           //机构集合
                  ],
                  viewDate: {                                  //起始日期
                      startDate: '',
                      endDate: ''
                  },
                  totalOnClickShowDate: function () {                  //2.4.4 日历组件
                      var self = $scope.vm.organizeTotal,
                        endDate = new Date(),
                        startDate = endDate.AddDay(-6);
                      self.viewDate.startDate = startDate.Format("yyyy-MM-dd");
                      self.viewDate.endDate = endDate.Format("yyyy-MM-dd");
                      var startDateTextBox = $('#startDate');
                      var endDateTextBox = $('#endDate');
                      $.timepicker.dateRange(
                        startDateTextBox,
                        endDateTextBox,
                        {
                            changeMonth: true,
                            buttonImageOnly: true,
                            dateFormat: "yy-mm-dd",
                            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                            dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                            minInterval: (1000 * 60 * 60 * 24 * 0), // 0 days
                        }
                      );
                  },
                  chartDate: {                                //1.2图表数据原型
                      'xAxis': [],
                      'RegistCount': []
                  },
                  queryDate: {
                      createChart: function () {                    //2.1 图表
                          var self = $scope.vm.organizeTotal,
                            GetCharts = function () {
                                var chart = new Highcharts.Chart({
                                    chart: {
                                        renderTo: 'containerTotal',
                                        marginTop: 30,
                                        type: 'bar'
                                    },
                                    title: { text: null, x: -20 },//center
                                    legend: {
                                        itemStyle: { fontSize: '18px' }
                                    },
                                    xAxis: {
                                        title: {
                                            text: '地推机构名称',
                                            align: 'high',
                                            offset: 0,
                                            rotation: 0,
                                            y: -10,
                                            x: 0,
                                            // allowDecimals:false,
                                            style: { color: '#7cb5ec', fontSize: '18px' }
                                        },
                                        categories: self.chartDate.xAxis
                                    },
                                    yAxis: [
                                      {
                                          title: { text: '注册量', align: 'high', style: { color: '#7cb5ec', fontSize: '18px' } },
                                          allowDecimals: false
                                      }],
                                    series: [
                                      {
                                          name: '注册量',
                                          data: self.chartDate.RegistCount,            //chartDate
                                          type: 'column',
                                          style: { color: '#7cb5ec', fontSize: '18px' }
                                      }
                                    ],
                                    credits: { enabled: false }//不显示版权信息
                                });
                            };
                          GetCharts();
                      }
                  },
                  OnClickSure: function () {                      //查询显示
                      var self = $scope.vm.organizeTotal;
                      self.viewDate.startDate = $('#startDate').val();
                      self.viewDate.endDate = $('#endDate').val();
                      self.Init();
                  },
                  Init: function () {                             //机构总计初始化
                      var self = $scope.vm.organizeTotal,
                        url = "Regist/ScanServiceDept?start=" + self.viewDate.startDate + "&end=" + self.viewDate.endDate;
                      util.ajaxGet($http, url, function (result) {
                          if (result.state == 1) {
                              self.data = [];
                              var viewModel = new model(),
                                itemCurrent = [];
                              self.chartDate.RegistCount = [];
                              self.chartDate.xAxis = [];
                              self.TotalData = [];
                              var totalCount = [];

                              if (result.Data != null) {
                                  for (var i = 0; i < result.Data.ScanServiceDeptData.length; i++) {
                                      var current = result.Data.ScanServiceDeptData[i],
                                        item = viewModel.convertFromTotal(current);
                                      self.TotalData.push(item);
                                  }
                                  _.extend(itemCurrent, self.TotalData);

                                  function down(x, y) {
                                      return (x.RegistCount < y.RegistCount) ? 1 : -1;
                                  }
                                  itemCurrent.sort(down);
                                  for (var k = 0; k < itemCurrent.length; k++) {
                                      var element = itemCurrent[k];
                                      self.chartDate.xAxis.push(element.name);
                                      self.chartDate.RegistCount.push(element.RegistCount);
                                  }
                                  var headers = result.Data.ScanServiceDeptData,
                               headersLen = headers.length,
                               bodys = result.Data.ScanServiceDeptDateClassifyData,
                               bodysLen = bodys.length;
                                  self.serviceCollection = [];
                                  for (var index = 0; index < headersLen; index++) {
                                      var element = headers[index];
                                      self.serviceCollection.push(element.ServiceDeptName);
                                  }

                                  for (var index = 0; index < bodysLen; index++) {
                                      var element = bodys[index],
                                        tempItem = [],
                                        tempIndex = 0;
                                      for (var key in element) {
                                          if (element.hasOwnProperty(key) && tempIndex < headersLen) {
                                              var tempElement = element[key];
                                              if (tempIndex == 0) {
                                                  tempItem.push({ text: (index + 1), value: element.Date });
                                              }
                                              tempItem.push({ text: (index + 2), value: tempElement });
                                              tempIndex++;
                                          }
                                      }
                                      self.data.push(tempItem);
                                  }

                                  for (var j = 0; j < self.TotalData.length; j++) {
                                      var element = self.TotalData[j];
                                      totalCount.push({ text: (j + 1), value: element.RegistCount });
                                  }
                                  totalCount.unshift({ text: 0, value: '总计' });
                                  self.data.push(totalCount);
                                  self.queryDate.createChart();
                              }


                              $scope.vm.organizeClass.Init();
                          } else { util.showFade(result.message); }
                      }, function (err) { util.showFade(err); });
                  }
              },
              organizeClass: {                                      //各个机构
                  data: [
                    // {
                    //   Date: '2016-01-01',              //日期
                    //   RegistCount: 300,             //注册人数
                    // },
                    // {
                    //   Date: '2016-01-02',              //日期
                    //   RegistCount: 100,             //注册人数
                    // },
                    // {
                    //   Date: '2016-01-03',              //日期
                    //   RegistCount: 200,             //注册人数
                    // },
                    // {
                    //   Date: '2016-01-04',             //日期
                    //   RegistCount: 250,             //注册人数
                    // },
                    // {
                    //   Date: '2016-01-05',             //日期
                    //   RegistCount: 580,             //注册人数
                    // },
                    // {
                    //   Date: '2016-01-01',              //日期
                    //   RegistCount: 300,             //注册人数
                    // },
                    // {
                    //   Date: '2016-01-02',              //日期
                    //   RegistCount: 100,             //注册人数
                    // }
                  ],
                  viewDate: {                                 //日期
                      startDate: '',
                      endDate: ''
                  },
                  totalRegistData: {
                      Date: '',
                      RegistCount: 0
                  },
                  searchBealon: false,
                  openViewCollection: false,
                  chartDate: {                                //1.2图表数据原型
                      'xAxis': [],
                      'Registrations': []
                  },
                  selectCollection: {
                      organizeList: [
                        { 'text': '--请选择机构--', 'value': -1 }
                        // { 'text': '云南鑫湖医院', 'value': 1 },
                        // { 'text': '河南省直三院', 'value': 2 },
                        // { 'text': '广州中西医结合医院', 'value': 3 },
                        // { 'text': '东南大学医院', 'value': 4 },
                        // { 'text': '新乡医院', 'value': 5 }
                      ],
                      selected: -1,
                      selectName: ''
                  },
                  openViewCollectionOnClick: function () {             //展开数据
                      var self = $scope.vm.organizeClass;
                      self.openViewCollection = !self.openViewCollection;
                  },
                  classOnClickShowDate: function () {                  //2.4.4 日历组件
                      var self = $scope.vm.organizeClass,
                        endDate = new Date(),
                        startDate = endDate.AddDay(-6);
                      self.viewDate.startDate = startDate.Format("yyyy-MM-dd");
                      self.viewDate.endDate = endDate.Format("yyyy-MM-dd");
                      var startDateTextBox = $('#startDate2');
                      var endDateTextBox = $('#endDate2');
                      $.timepicker.dateRange(
                        startDateTextBox,
                        endDateTextBox,
                        {
                            changeMonth: true,
                            buttonImageOnly: true,
                            dateFormat: "yy-mm-dd",
                            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                            dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                            minInterval: (1000 * 60 * 60 * 24 * 0), // 0 days
                        }
                      );
                  },
                  queryDate: {                                    //2.0 数据查询列表
                      createChart: function () {                    //2.1 图表
                          var self = $scope.vm.organizeClass,
                            chartDate = self.chartDate,
                            GetCharts = function () {
                                var chart = new Highcharts.Chart({
                                    chart: {
                                        renderTo: 'containerClass'
                                    },
                                    title: { text: self.selectCollection.selectName, x: -20, style: { font: "bold 20px 'Microsoft Yahei'" } },//center
                                    xAxis: {
                                        name: "日期",
                                        categories: chartDate.xAxis,
                                        title: { text: '日期', align: 'high', style: { color: '#7cb5ec', fontSize: '18px' } }
                                    },
                                    yAxis: [
                                      {
                                          title: {
                                              text: '注册量',
                                              align: 'high',
                                              offset: 0,
                                              rotation: 0,
                                              y: -20,
                                              style: { color: '#7cb5ec', fontSize: '18px' }
                                          },
                                          allowDecimals: false
                                      }],
                                    series: [
                                      {
                                          name: '注册量',
                                          data: chartDate.Registrations,
                                          type: 'column',
                                          color: '#7cb5ec'
                                      }
                                    ],
                                    credits: { enabled: false }//不显示版权信息
                                });
                            };
                          GetCharts();
                      }
                  },
                  OnClickSearch: function () {                       //查询按钮
                      var self = $scope.vm.organizeClass;
                      if (self.selectCollection.selected == -1) {
                          util.showFade('请选择机构');
                          return;
                      }
                      for (var k = 0; k < self.selectCollection.organizeList.length; k++) {
                          var item = self.selectCollection.organizeList[k];
                          if (self.selectCollection.selected == item.id) {
                              self.selectCollection.selectName = item.name;
                          }
                      }

                      self.viewDate.startDate = $('#startDate2').val();
                      self.viewDate.endDate = $('#endDate2').val();
                      var url = 'Regist/ScanSingleServiceDept?serviceDeptId=' + self.selectCollection.selected + '&start=' + self.viewDate.startDate + '&end=' + self.viewDate.endDate;
                      util.ajaxGet($http, url, function (result) {
                          if (result.state == 1) {
                              self.data = [];
                              self.totalRegistData = {
                                  Date: '',
                                  RegistCount: 0
                              };
                              var viewModel = new model(),
                                registData = 0;
                              for (var j = 0; j < result.Data.length; j++) {
                                  var current = result.Data[j],
                                    item = viewModel.convertFromClass(current);
                                  registData += item.RegistCount;
                                  self.data.push(item);
                              }
                              self.totalRegistData = {
                                  Date: self.viewDate.startDate + '~' + self.viewDate.endDate,
                                  RegistCount: registData
                              };
                              //self.data.push(self.totalRegistData);
                              self.searchBealon = true;
                              self.chartDate = { 'xAxis': [], 'Registrations': [] };
                              for (var i = 0; i < self.data.length; i++) {
                                  self.chartDate.xAxis.push(self.data[i].Date);
                                  self.chartDate.Registrations.push(self.data[i].RegistCount);
                              }
                              self.queryDate.createChart();
                          } else { util.showFade(result.message); }
                      }, function (err) { util.showFade(err); });
                  },
                  Init: function () {                                    //各机构统计初始化
                      var self = $scope.vm.organizeClass;
                      //self.selectCollection.organizeList=[];
                      self.selectCollection.organizeList = [{ 'name': '--请选择机构--', 'id': -1 }];
                      for (var i = 0; i < $scope.vm.organizeTotal.TotalData.length; i++) {
                          var element = $scope.vm.organizeTotal.TotalData[i];
                          self.selectCollection.organizeList.push(element);
                      }
                      self.classOnClickShowDate();
                  }
              },
              Init: function () {                                     //3.0 初始化
                  $scope.vm.organizeTotal.totalOnClickShowDate();
                  $scope.vm.organizeTotal.Init();
              }
          };
          $scope.vm.Init();
      });
      return app;
  });
