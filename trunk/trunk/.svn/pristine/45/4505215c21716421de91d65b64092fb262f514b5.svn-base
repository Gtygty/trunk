/* eslint-disable no-undef */
define(['angular', 'jquery', 'sysConfig', 'ajaxfileupload', 'jqueryMD5'], function (angular, $, config, uploadFile) {
  var _self = {};

  //***********Ajax Loading****************
  _self.uniencode = function (text) {
    text = escape(text.toString()).replace(/\+/g, '%2B');
    var matches = text.match(/(%([0-9A-F]{2}))/gi);
    if (matches) {
      for (var matchid = 0; matchid < matches.length; matchid++) {
        var code = matches[matchid].substring(1, 3);
        if (parseInt(code, 16) >= 128) {
          text = text.replace(matches[matchid], '%u00' + code);
        }
      }
    }
    text = text.replace('%25', '%u0025');

    return text;
  };

  _self.showAjaxLoading = function () {
    if ($('#Overlay').length > 0) {
      $('#Overlay').show();
      return;
    }
    var divObj = $('<div id="Overlay"></div>');
    divObj.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'z-index': '9999',
      'opacity': '0.5',
      'width': '100%',
      'height': '100%'
    });
    var imgObj = $('<img src="/img/loading.gif"/>');
    imgObj.css({
      'width': '32px',
      'height': '32px',
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'margin-left': '-16px',
      'margin-top': '-16px'
    });
    divObj.append(imgObj);
    $('body').append(divObj);
  };

  _self.hideAjaxLoading = function () {
    $('#Overlay').hide();
  };

  //***********Ajax Get/Post****************
  _self.ajaxGet = function (http, url, successCallback, errorCallback) {
    url = url.replace(/api\//, '');
    var decodedURL = decodeURIComponent(url);
    // console.log(decodedURL);
    var timespan = appendTimeSpan(decodedURL);
    decodedURL = config.getBaseUrl() + decodedURL + timespan;
    url = config.getBaseUrl() + url + timespan;
    var authString = getBasicAuthHandler(decodedURL);
    http.defaults.headers.common['Authorization'] = authString;
    http.defaults.headers.post['Authorization'] = authString;

    http.get(url)
      .success(function (result) {
        successCallback(result);
      })
      .error(function (err) {
        errorCallback(err);
      });
  };

  _self.ajaxPost = function (http, url, data, successCallback, errorCallback) {
    url = url.replace(/api\//, '');
    url = config.getBaseUrl() + url;
    url += appendTimeSpan(url);
    var authString = getBasicAuthHandler(url, data);
    http.defaults.headers.common['Authorization'] = authString;
    http.defaults.headers.post['Authorization'] = authString;

    http.post(url, data)
      .success(function (result) {
        successCallback(result);
      })
      .error(function (err) {
        errorCallback(err);
      });
  };

  _self.ajaxPut = function (http, url, data, successCallback, errorCallback) {
    var url = config.getBaseUrl() + url;
    url += appendTimeSpan(url);
    var authString = getBasicAuthHandler(url, data);
    http.defaults.headers.common['Authorization'] = authString;
    http.defaults.headers.post['Authorization'] = authString;

    http.put(url, data)
      .success(function (result) {
        successCallback(result);
      })
      .error(function (err) {
        errorCallback(err);
      });
  };

  _self.ajaxDelete = function (http, url, data, successCallback, errorCallback) {
    var url = config.getBaseUrl() + url;
    url += appendTimeSpan(url);
    var authString = getBasicAuthHandler(url, data);
    http.defaults.headers.common['Authorization'] = authString;
    http.defaults.headers.post['Authorization'] = authString;

    http.delete(url, data)
      .success(function (result) {
        successCallback(result);
      })
      .error(function (err) {
        errorCallback(err);
      });
  }

  //掌上体检Post
  _self.ajaxZSTJPost = function (http, url, data, successCallback, errorCallback) {
    // var url = url.replace(/api\//, '');
    var url = config.getBaseZSTJUrl() + url;
    data.timespan= Math.round(new Date().getTime() / 1000); //增加时间戳
    var preSign = {};
    _self.Extend(preSign, data);
    preSign.secret = config.ZSTJAppSecret; //加密串

    var safeStr = unescape(encodeURIComponent(config.ZSTJAppKey + ':' + _self.getZSTJsign(preSign)));
    var btoaCode = btoa(safeStr);
    btoaCode = 'Basic ' + btoaCode;
    authString = getBasicAuthHandler(url, data);
    http.defaults.headers.common['Authorization'] = btoaCode;
    http.defaults.headers.post['Authorization'] = btoaCode;

    http.post(url, data)
    .success(function (result) {
      if(successCallback){
        successCallback(result);
      }
    })
    .error(function (err) {
      if(errorCallback){
        errorCallback(err);
      }
    });
  };

  _self.ajaxZSTJFile = function(url, data, successCallback, errorCallback){
    url = config.getBaseZSTJUrl() + url;
    var ajaxFile = new uploadFile({
      url: url,
      timeout: 50000,
      async: true,
      data: data,
      onloadstart: function () {
        //console.log("开始上传");
      },
      onload: function (data) {
        // console.log(data);
        // console.log(data.name);
        successCallback && successCallback(data);
      },
      onerror: function (er) {
        // console.log(er);
        errorCallback && errorCallback(er);
      },
      onabort: function () {
        //alert("取消上传");
      },
      ontimeout: function () {
        // console.log("上传时间到");
        errorCallback && errorCallback({
          Code: 100,
          Message: '上传已超时,请重试!',
          Data: null
        });
      },
      onloadend: function () {
        // console.log("上传结束");
      },
      onprogress: function (e) {
        console.log(e);
      }
    });
  };

  _self.getZSTJsign = function(preSign){
    var arrayKey = new Array();
    var lowCaseParams = {};
    for(var key in preSign){
      lowCaseKey = key.toLowerCase();
      arrayKey.push(lowCaseKey);
      lowCaseParams[lowCaseKey] = preSign[key];
    }
    arrayKey.sort();  //排序
    var newPreSign = {};
    for(var i in arrayKey){
      var key = arrayKey[i];
      newPreSign[key] = lowCaseParams[key];  //赋值
    }
    newPreSign = JSON.stringify(newPreSign);//转字符串
    newPreSign = newPreSign.toLowerCase();  //转换小写

    var sign = $.md5(newPreSign);  //md5加密
    return sign;
  };

  //商城Post
  _self.ajaxMALLPost = function (http, url, data, successCallback, errorCallback) {
    var url = config.getBaseMALLUrl() + url;
    data.timespan= Math.round(new Date().getTime() / 1000); //增加时间戳
    var preSign = {};
    _self.Extend(preSign, data);
    preSign.secret = config.MALLAppSecret; //加密串

    var safeStr = unescape(encodeURIComponent(config.MALLAppKey + ':' + _self.getMALLSign(preSign)));
    var btoaCode = btoa(safeStr);
    btoaCode = 'Basic ' + btoaCode;
    authString = getBasicAuthHandler(url, data);
    http.defaults.headers.common['Authorization'] = btoaCode;
    http.defaults.headers.post['Authorization'] = btoaCode;

    http.post(url, data)
    .success(function (result) {
      successCallback(result);
    })
    .error(function (err) {
      errorCallback(err);
    });
  };
  _self.ajaxMALLGet = function (http, url, successCallback, errorCallback) {
    url = url.replace(/api\//, '');
    var decodedURL = decodeURIComponent(url);
    // console.log(decodedURL);
    var timespan = appendTimeSpan(decodedURL);
    decodedURL = config.getBaseUrl() + decodedURL + timespan;
    url = config.getBaseUrl() + url + timespan;
    var authString = getBasicAuthHandler(decodedURL);
    http.defaults.headers.common['Authorization'] = authString;
    http.defaults.headers.post['Authorization'] = authString;

    http.get(url)
      .success(function (result) {
        successCallback(result);
      })
      .error(function (err) {
        errorCallback(err);
      });
  };

  _self.ajaxMALLFile = function(url, data, successCallback, errorCallback){
    url = config.getBaseMALLUrl() + url;
    var ajaxFile = new uploadFile({
      url: url,
      timeout: 50000,
      async: true,
      data: data,
      onload: function (data) {
        successCallback && successCallback(data);
      },
      onerror: function (er) {
        errorCallback && errorCallback(er);
      },
      ontimeout: function () {
        errorCallback && errorCallback({
          Code: 100,
          Message: '上传已超时,请重试!',
          Data: null
        });
      }
    });
  };

  _self.getMALLSign = function(preSign){
    var arrayKey = new Array();
    var lowCaseParams = {};
    for(var key in preSign){
      lowCaseKey = key.toLowerCase();
      arrayKey.push(lowCaseKey);
      lowCaseParams[lowCaseKey] = preSign[key];
    }
    arrayKey.sort();  //排序
    var newPreSign = {};
    for(var i in arrayKey){
      var key = arrayKey[i];
      newPreSign[key] = lowCaseParams[key];  //赋值
    }
    newPreSign = JSON.stringify(newPreSign);//转字符串
    newPreSign = newPreSign.toLowerCase();  //转换小写
    var sign = $.md5(newPreSign);  //md5加密
    return sign;
  }

  //微信Post
  _self.ajaxWechatPost = function (http, url, data, successCallback, errorCallback) {

    var url = config.getBaseWechatUrl() + url;
    data.timespan= Math.round(new Date().getTime() / 1000); //增加时间戳
    var preSign = {};
    _self.Extend(preSign, data);
    preSign.secret = config.WechatAppSecret; //加密串

    var safeStr = unescape(encodeURIComponent(config.WechatAppKey + ':' + _self.getWechatSign(preSign)));
    var btoaCode = btoa(safeStr);
    btoaCode = 'BasicAuth ' + btoaCode;
    authString = getBasicAuthHandler(url, data);
    http.defaults.headers.common['Authorization'] = btoaCode;
    http.defaults.headers.post['Authorization'] = btoaCode;

    http.post(url, data)
    .success(function (result) {
      successCallback(result);
    })
    .error(function (err) {
      errorCallback(err);
    });

  };

  _self.getWechatSign = function(preSign){
    var arrayKey = new Array();
    var lowCaseParams = {};
    for(var key in preSign){
      lowCaseKey = key.toLowerCase();
      arrayKey.push(lowCaseKey);
      lowCaseParams[lowCaseKey] = preSign[key];
    }
    arrayKey.sort();  //排序
    var newPreSign = {};
    for(var i in arrayKey){
      var key = arrayKey[i];
      newPreSign[key] = lowCaseParams[key];  //赋值
    }
    newPreSign = JSON.stringify(newPreSign);//转字符串
    newPreSign = newPreSign.toLowerCase();  //转换小写

    var sign = $.md5(newPreSign);  //md5加密
    return sign;
  }

  _self.createRequestToken = function(url){
    url+="|"+config.ZSTJAppSecret;
    if (url.indexOf("#/")>-1){
      url = (url.split("#/")[1]).toLowerCase();
    }
    return $.md5(url);
  };

  //***********操作结束提示******************

  _self.showFade = function (val, xPencent, yPencent) {
    var fadeDiv = $('#showDiv');
    if (fadeDiv.length == 0) {
      fadeDiv = $('<div id=\'showDiv\'></div>');
      $('body').append(fadeDiv);
    }
    if (xPencent == undefined) {
      xPencent = '50%';
    }
    if (yPencent == undefined) {
      yPencent = '50%';
    }
    fadeDiv.html(val);
    fadeDiv.css({
      'z-index': '9999',
      'background': 'rgba(150,227,158,0.8)',
      '-moz-border-radius': '5px',
      '-weikit-border-radius': '5px',
      'border-radius': '5px',
      'color': '#046509',
      'border': '1px solid #76d778',
      'text-align': 'center',
      'padding': '8px 50px',
      // "display": "inline-block",
      'position': 'fixed',
      'top': yPencent,
      'left': xPencent,
      'margin-left': '-125px',
      'display': 'none'
    });
    $('#showDiv').fadeIn(500);
    $('#showDiv').fadeOut(2000);
  };

  _self.Extend = function (source, destination) {
    for (var property in destination) {
      source[property] = destination[property];
    }
    return source;   // 返回扩展后的对象
  };

  _self.randomString = function(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
};

  var appendTimeSpan = function (url) {
    var timespan = Math.round(new Date().getTime() / 1000);
    if (url.indexOf('?') == -1) {
      timespan = '?timespan=' + timespan;
    }
    else {
      timespan = '&timespan=' + timespan;
    }
    return timespan;
  };

  var getHttpAuthSignHandler = function (httpUrl, postData) {
    var preSign = httpUrl;
    if (postData) {
      postData = JSON.stringify(postData);
      preSign += '|' + postData;
    }
    preSign += '|' + config.AppSecret;
    var sign = $.md5(preSign);
    return sign;
  };

  var getBasicAuthHandler = function () {
    var httpUrl = arguments[0];
    var postData = arguments[1];
    var sign = getHttpAuthSignHandler(httpUrl, postData);
    var safeStr = unescape(encodeURIComponent(config.AppKey + ':' + sign));
    var btoaCode = btoa(safeStr);
    btoaCode = 'Basic ' + btoaCode;
    return btoaCode;
  };

  // **************导出CSV******************
  _self.CreateCSV = function(colNameList, dataList){
    var downloadLink = document.createElement('a');
    var context = "";
    var context = colNameList.join(',') + '\n'
    dataList.forEach(function(item, index, array){
      for(var element in item){
        context += (item[element]+"").replace(/\n/g," ")+",";
      }
      context += "\n";
    })
    context = encodeURIComponent(context)
    downloadLink.download = new Date().getTime() + '.csv' // 下载的文件名称
    downloadLink.href = "data:text/csv;charset=utf-8,\ufeff" + context; //加上 \ufeff BOM 头
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }
  // **************导出CSV******************

  return _self;
});
