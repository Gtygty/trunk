/* eslint-disable no-undef */
define(['indexApp'
      , 'common/util'
      , 'common/const'
      , 'model/doctorPowerModel'
      , 'service/baseService'
      , 'service/doctorPowerService'
      , 'highcharts'
      , 'highchartMore']
      , function (app, util, Const, vModel) {
  app.controller('doctorPowerCtrl', ['$scope'
                                   , 'signValid'
                                   , 'doctorPowerService'
                                   , function ($scope, signValid, doctorPowerService) {

    var chart = {
      BindIndex: function (dom, title, xArr, yArr, Color) {
        $(dom).highcharts({
          chart: {
            type: 'bar'
          },
          title: {
            text: title
          },
          color: Color,
          xAxis: {
            categories: xArr,
            title: {
              text: null
            }
          },
          yAxis: {
            min: 0,
            max: 100,
            title: {
              text: '',
              align: 'high'
            },
            labels: {
              overflow: 'justify'
            }
          },
          // tooltip: {
          //   valueSuffix: '%'
          // },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true // 开启数据标签
              },
              enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            }
          },
          // legend: {
          //   layout: 'vertical',
          //   align: 'right',
          //   verticalAlign: 'top',
          //   x: -40,
          //   y: 100,
          //   floating: true,
          //   borderWidth: 1,
          //   backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          //   shadow: true
          // },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          series: [{
            name: title,
            data: yArr,
            color: Color
          }]
        });
      },
      BindTimes: function (dom, xArr, yArr, title, Color) {
        $(dom).highcharts({
          chart: {
            type: 'line'
          },
          title: {
            text: '',
            x: -20
          },
          chart: {
            backgroundColor: '#fff',  // 设置图表背景色为白色
            height: 90,
            width: 220
          },
          xAxis: {
            categories: xArr,
            title: {
              text: null
            },
            tickWidth: 0,             // 设置刻度标签宽度
            lineColor: '#ffffff',     // 设置坐标颜色
            lineWidth: 0,             // 设置坐标宽度
            labels: {
              enabled: false
            }
          },
          tooltip: {
              headerFormat: '<b>周期:</b>{point.x}<br />',
              pointFormat: '<b>{series.name}:</b> {point.y}'
          },
          yAxis: {
            labels: {
              enabled: false
            },
            gridLineWidth: 0,
            title: null,
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          // tooltip: { valueSuffix: '°C' },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: [{
            name: title,
            data: yArr,
            color: Color
          }]
        });
      },
      BindHover: function (data, container, title, type) {
          new Highcharts.Chart({
            chart: {
              renderTo: container,
              polar: true,
              type: 'line'
            },
            title: {
              text: '竞争力分析雷达图',
              x: -40
            }, //center
            xAxis: {
              categories: ['好评指数', '勤奋度', '业绩指数', '工作效率'],
              tickmarkPlacement: 'on',
              lineWidth: 0
            },
            yAxis: {
              title: '',
              gridLineInterpolation: 'polygon',
              lineWidth: 0,
              min: 0
            },
            legend: {
              align: 'right',
              verticalAlign: 'top',
              y: 70,
              layout: 'vertical'
            },
            exporting: {
              enabled: false
            },
            series: [{
                name: ('医生'),
                data: data.y,
                pointPlacement: 'on'
              },
              {
                name: ('平均值'),
                data: data.z,
                pointPlacement: 'on'
              }
            ],
            credits: {
              enabled: false
            } //不显示版权信息
          });

        }
    };

    $scope.vm = {
      IsPopover: false,
      Common: {
        ChartIndex: function (result) {
          var x1Arr = [],
              x2Arr = [],
              x3Arr = [],
              x4Arr = [],
              y1Arr = [],
              y2Arr = [],
              y3Arr = [],
              y4Arr = [],
              index = 0,
              weeks = result.weeks;
              var positiveScores = weeks.sort(function(a, b){
                return a.positiveScoreSort - b.positiveScoreSort;
              });
              for (; index < positiveScores.length; index++) {
                var item = positiveScores[index];
                x1Arr.push(item.doctorName || '/');
                y1Arr.push(item.positiveScore);
              }

              var diligentScores = weeks.sort(function(a, b){
                return a.diligentScoreSort - b.diligentScoreSort;
              });
              index = 0;
              for (; index < diligentScores.length; index++) {
                var item = diligentScores[index];
                x2Arr.push(item.doctorName || '/');
                y2Arr.push(item.diligentScore);
              }

              var achievementScores = weeks.sort(function(a, b){
                return a.achievementScoreSort - b.achievementScoreSort;
              });
              index = 0;
              for (; index < achievementScores.length; index++) {
                var item = achievementScores[index];
                x3Arr.push(item.doctorName || '/');
                y3Arr.push(item.achievementScore);
              }

              var effectiveScores = weeks.sort(function(a, b){
                return a.effectiveScoreSort - b.effectiveScoreSort;
              });
              index = 0;
              for (; index < effectiveScores.length; index++) {
                var item = effectiveScores[index];
                x4Arr.push(item.doctorName || '/');
                y4Arr.push(item.effectiveScore);
              }


          chart.BindIndex('#containerPositive', '好评指数', x1Arr, y1Arr, '#2db7f5');
          chart.BindIndex('#containerDiligent', '勤奋度', x2Arr, y2Arr, '#00cc00');
          chart.BindIndex('#containerAchievement', '业绩指标', x3Arr, y3Arr, '#965ace');
          chart.BindIndex('#containerEffective', '工作效率', x4Arr, y4Arr, '#d0c902');

        },
        ChartTimes: function (item) {
          var xArr = item.data.weekCode,
              y1Arr = item.data.positiveScore || [],
              y2Arr = item.data.diligentScore || [],
              y3Arr = item.data.achievementScore || [],
              y4Arr = item.data.effectiveScore || [];

          //console.log(id)
          chart.BindTimes('#' + item.id + 'Positive', xArr, y1Arr, '好评指数', '#2db7f5');
          chart.BindTimes('#' + item.id + 'Diligent', xArr, y2Arr, '勤奋度', '#00cc00');
          chart.BindTimes('#' + item.id + 'Achievement', xArr, y3Arr, '业绩指标', '#965ace');
          chart.BindTimes('#' + item.id + 'Effective', xArr, y4Arr, '工作效率', '#d0c902');
        },
        Init: function () {
          signValid.ValidAccess('#/doctorPower'); // 缓存登录验证
          /* eslint-disable no-undef */
          $('.nav li:eq(17)').addClass('active').siblings().removeClass('active'); // 侧边栏样式
          $('body').css('overflow', 'auto');
          // $('[data-toggle="popover"]').popover();
        }
      },

      doctorPower: {
        avgData: [],
        List: [],
        // 悬框右边参数
        Current: {
          achievementScore: '',
          allScore: '',
          diligentScore: '',
          effectiveScore: '',
          positiveScore: '',

          achievementSort: '',
          allSort: '',
          diligentSort: '',
          effectiveSort: '',
          positiveSort: '',

          achievementScoreSortRemark: '',
          allScoreSortRemark: '',
          diligentScoreSortRemark: '',
          effectiveScoreSortRemark: '',
          positiveScoreSortRemark: ''

        },
        AvgWeek: [],
        Avg: {
          positiveScore: 0, // 好评指数
          diligentScore: 0, // 勤奋度
          achievementScore: 0, // 业绩指标
          effectiveScore: 0, // 工作效率
          allScore: 0
        },
        // 加入对比的集合
        CompareList: [],
        OnLoadDDLWeeks: function () {
          var self = $scope.vm.doctorPower;
          doctorPowerService.doctorPower.GetLast10Weeks({
            callback: function (datas) {
              // datas.length && (self.Search.selectedWeek = datas[0].value);
              self.Search.DDLWeek = datas;
              self.Search.DDLWeek.unshift({ text: '--请选择--', value: -1 });
            }
          });
        },
        OnLoadDDLDepts: function () {
          var self = $scope.vm.doctorPower;
          doctorPowerService.doctorPower.GetDepts({
            callback: function (datas) {
              // datas.length && (self.Search.selectedDept = datas[0].value);
              self.Search.DDLDept = datas;
              self.Search.DDLDept.unshift({ text: '--请选择--', value: -1 });
            }
          });

        },
        OnMouseOverListItem: function (item) {
          var vm = $scope.vm,
              self = vm.doctorPower;

          vm.IsPopover = true;
          self.Current = item;

          var avgData = self.AvgWeek; //平均值
          var doctorInfo = {
            y: [ item.positiveScore, item.diligentScore, item.achievementScore, item.effectiveScore ], //医生
            z: [ avgData.positiveScore, avgData.diligentScore, avgData.achievementScore, avgData.effectiveScore ] //平均值
          };

          chart.BindHover(doctorInfo, 'container', '竞争力分析', 'line');
        },
        OnMouseOuterListItem: function () {
          $scope.vm.IsPopover = false;
        },
        Search: {
          selectedDept: -1,
          selectedWeek: -1,
          selectedWeekDesc: '',
          DDLDept: [],
          DDLWeek: [],
          OnSearch: function () {
            var common = $scope.vm.Common,
                self = $scope.vm.doctorPower,
                weekCode = self.Search.selectedWeek,
                deptId = self.Search.selectedDept;

              // weekCode = '201706';
              // deptId = 4;
            doctorPowerService.doctorPower.GetDeptDoctorInfoByWeek({
              weekCode: weekCode,
              deptId: deptId,
              callback: function (result) {

                self.List = result.weeks;
                self.AvgWeek = result.avgWeek;
                common.ChartIndex(result);
                self.CompareList = [];
              }
            });
          },
          OnClear: function(){
            var self = $scope.vm.doctorPower;

            self.Search.selectedDept = -1;
            self.Search.selectedWeek = -1;
            self.List = [];
            self.CompareList = [];
          }
        },
        //加入对比
        OnAddCompare: function (item) {
          var self = $scope.vm.doctorPower,
              weekCode = self.Search.selectedWeek,
              id = 'item_' + item.doctorId,
              doctorname = item.doctorName,
              isContain = false;

          // weekCode = '201706';
          for(var i=0; i<self.CompareList.length; i++){
            var currentItem = self.CompareList[i];
            if(currentItem.id == id){
              isContain = true;
              break;
            }
          }
          if(!isContain){
            self.CompareList.push({ id: id, doctorName: doctorname });
            doctorPowerService.doctorPower.GetDoctorHistoryInfoByWeek({
              weekCode: weekCode,
              doctorId: item.doctorId,
              callback: function (result) {
                var item = {
                  id: id,
                  doctorName: doctorname,
                  data: result
                };
                $scope.vm.Common.ChartTimes(item);
              }
            });
          }

        },
        // 删除对比
        OnRemoveCompare: function (item) {
          var self = $scope.vm.doctorPower,
              index = -1;
          for(var i=0; i< self.CompareList.length; i++){
            var current = self.CompareList[i];
            if(item.id == current.id){
              index = i;
              break;
            }
          }
          if(index !== -1){
            self.CompareList.splice(index, 1);
          }
        },
        Init: function () {
          var self = $scope.vm.doctorPower;

          self.OnLoadDDLWeeks();
          self.OnLoadDDLDepts();
        }
      },

      Init: function () {
        var comon = $scope.vm.Common,
          dp = $scope.vm.doctorPower;

        comon.Init();
        dp.Init();
      }
    };

    $scope.vm.Init();

    // 绑定下拉列表边的值
    $scope.$watch('vm.doctorPower.Search.selectedWeek', function (newValue, oldValue, scope) {
      if (newValue) {
        var self = scope.vm.doctorPower,
          index = 0,
          length = self.Search.DDLWeek.length,
          desc = '';
        for (; index < length; index++) {
          if (self.Search.DDLWeek[index].value == newValue) {
            desc = self.Search.DDLWeek[index].desc;
            break;
          }
        }
        self.Search.selectedWeekDesc = desc;
      }
    });

  }]);
  return app;
});
