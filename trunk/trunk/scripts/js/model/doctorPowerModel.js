/* eslint-disable no-undef */
define(['Extend', 'common/util', 'sysConfig'], function (Extend, util, sysConfig) {
  var viewModel = function () {
    var self = this,
      format = {
        WeekDesc: function (input) {
          var key = '周',
            result = {
              text: '',
              desc: ''
            };
          if (input) {
            if (input.indexOf(key) != -1) {
              var arr = input.split(key);
              result.text = arr[0] + key;
              result.desc = arr[1];
            }
          }
          return result;
        },
        ScoreHtml: function(sort, input){
          if(sort == 1){
            return '<label class="red">'+ input +'</label>';
          }
          return input;
        },
        AchievementScoreDesc: function (input, input2) {
          if (!input) {
            return '末';
          }
          return input2;
        },
        ClearT: function (input) {
          var date = input.ClearT();
          item = date.split(' ');
          return item[0];
        },
        toDecimal: function (x) {
          var f = parseFloat(x);
          if (isNaN(f)) {
            return;
          }
          f = Math.round(x * 100) / 100;
          return f;
        }
      };

    self.convertLast10Weeks = function (items) {
      var tempData = [];
      if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i],
            weekInfo = format.WeekDesc(item.weekDesc);
          tempData.push({
            text: weekInfo.text,
            value: item.weekCode,
            desc: weekInfo.desc
          });
        }
      }
      return tempData;
    };

    self.convertAvgInfoByWeek = function (items) {
      var tempData = {
        positiveScore: 0,
        diligentScore: 0,
        achievementScore: 0,
        effectiveScore: 0,
        allScore: 0
      };

      if (items && items.length) {
        var item = items[0];
        tempData = {
          positiveScore: format.toDecimal(item.positiveScore),
          diligentScore: format.toDecimal(item.diligentScore),
          achievementScore: format.toDecimal(item.achievementScore),
          effectiveScore: format.toDecimal(item.effectiveScore),
          allScore: format.toDecimal(item.allScore)
        };
      }
      return tempData;
    };

    self.convertDeptDoctorHistoryInfoByWeek = function (items) {
      var tempData = {
        'positiveScore': [],
        'diligentScore': [],
        'achievementScore': [],
        'effectiveScore': [],
        'allScore': [],
        'weekCode': []
      }, index = 0;
      if (items && items.length) {
        for(var i=items.length-1; i >=0; i--){
        // for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData.positiveScore[index] = item.positiveScore;
          tempData.diligentScore[index] = item.diligentScore;
          tempData.achievementScore[index] = item.achievementScore;
          tempData.effectiveScore[index] = item.effectiveScore;
          tempData.allScore[index] = item.allScore;
          tempData.weekCode[index] = item.weekCode;
          index++;
        }
      }

      return tempData;
    };

    self.convertDeptDoctorInfoByWeek = function (items) {
      var tempData = [];
      //console.log(items)
      if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tempData.push({
            doctorId: item.doctorId,
            doctorName: item.doctorName,
            positiveScore: item.positiveScore,
            positiveScoreHtml: format.ScoreHtml(item.positiveScoreSort, item.positiveScore),
            positiveScoreSort: item.positiveScoreSort,
            positiveScoreSortRm: item.positiveScoreSortRm,
            positiveScoreSortRemark: item.positiveScoreSortRemark,
            diligentScore: item.diligentScore,
            diligentScoreHtml: format.ScoreHtml(item.diligentScoreSort, item.diligentScore),
            diligentScoreSort: item.diligentScoreSort,
            diligentScoreSortRm: item.diligentScoreSortRm,
            diligentScoreSortRemark: item.diligentScoreSortRemark,
            achievementScore: item.achievementScore,
            achievementScoreHtml: format.ScoreHtml(item.achievementScoreSort, item.achievementScore),
            achievementScoreDesc: format.AchievementScoreDesc(item.achievementScore, item.achievementScoreSort),
            achievementScoreSort: item.achievementScoreSort,
            achievementScoreSortRm: item.achievementScoreSortRm,
            achievementScoreSortRemark: item.achievementScoreSortRemark,
            effectiveScore: item.effectiveScore,
            effectiveScoreHtml: format.ScoreHtml(item.effectiveScoreSort, item.effectiveScore),
            effectiveScoreSort: item.effectiveScoreSort,
            effectiveScoreSortRm: item.effectiveScoreSortRm,
            effectiveScoreSortRemark: item.effectiveScoreSortRemark,
            allScore: item.allScore,
            allScoreSort: item.allScoreSort,
            allScoreSortRm: item.allScoreSortRm,
            allScoreSortRemark: item.allScoreSortRemark
          });
        }
      }
      //console.log(tempData)
      return tempData;

    };

  };
  return viewModel;
});
