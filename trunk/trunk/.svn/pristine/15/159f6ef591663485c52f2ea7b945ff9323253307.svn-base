/* eslint-disable no-undef */
define(['Extend'], function () {

  // 配置
  var SETTINGS = {
    ISNOEMPTY: '参数不能为空',
    ISSELECTNOEMPTY: '参数不能为空',
    MINLENGTH: '参数长度不能小于{0}个字符',
    MAXLENGTH: '参数长度不能大于{0}个字符',
    ISMOBILE: '请填写正确的手机号',
    INTEGER: '请填写正确的数字',
    NOLESSTHAN: '请填写不小于的数字'
  };

  // 策略对象
  var VerifiPolicy = {
    // 判断是否为空
    isNoEmpty: function(value, errorMsg){
      errorMsg = errorMsg || SETTINGS.ISNOEMPTY;
      if(value == undefined || value == null || value == '' ){
        return errorMsg;
      }
    },
    // 判断下拉列表是否为空
    isSelectNoEmpty: function(value, errorMsg){
      errorMsg = errorMsg || SETTINGS.ISNOEMPTY;
      if(value == undefined || value == null || value == '' || value == -1 ){
        return errorMsg;
      }
    },
    // 判断最小长度
    minLength: function(value, length, errorMsg){
      errorMsg = errorMsg || SETTINGS.MINLENGTH.Format(length);
      if(value && value.length < length){
        return errorMsg;
      }
    },
    // 判断最大长度
    maxLength: function(value, length, errorMsg){
      errorMsg = errorMsg || SETTINGS.MAXLENGTH.Format(length);
      if(value && value.length > length){
        return errorMsg;
      }
    },
    // 判断是否为手机号
    isMobile: function(value, errorMsg){
      errorMsg = errorMsg || SETTINGS.ISMOBILE;
      if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(value)){
        return errorMsg;
      }
    },
    // 判断是否为数字
    integer: function(value, errorMsg){
      errorMsg = errorMsg || SETTINGS.INTEGER;
      if(!/^\-?\d*$/.test(value)){
        return errorMsg;
      }
    },
    // 判断数字集的大小
    noLessThan: function(array, errorMsg){
      errorMsg = errorMsg || SETTINGS.INTEGER;
      if(array && array.length && (array[0] >= array[1])){
        return errorMsg;
      }
    }
  };

  // 构造函数
  var Validation = function(verifiPolicy){
    // 保存策略对象
    this.strategies = verifiPolicy || VerifiPolicy;
    // 验证缓存
    this.validationFns = [];
  };

  // add 方法
  Validation.prototype.add = function(obj, rule, errorMsg){
    var ary = rule.split(':');
    var arg = [];
    var self = this;
    this.validationFns.push(function(){
      arg = [];               // 重置参数
      var ruleName = ary[0];  // 策略对象方法名
      // var isArray = Object.prototype.toString.call(obj) === '[object Array]';
      // 组装参数
      arg.push(obj);
      if(ary[1]){
        arg.push(ary[1]);
      }
      arg.push(errorMsg);

      // 调用策略函数
      return self.strategies[ruleName].apply(null, arg);
    });
  };

  // 开始验证
  Validation.prototype.start = function(){
    for(var i=0; i <this.validationFns.length; i++){
      var msg = this.validationFns[i]();
      if(msg){
        return msg;
      }
    }
  };

  return Validation;
});

