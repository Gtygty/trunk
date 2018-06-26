/* eslint-disable no-undef */
define(['indexApp', 'lib/wangEditor/js/wangEditor-upyun'], function (app, uploadInit) {

    var REGEXP = {
        Require:    /.+/,
        Email:      /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        Phone:      /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
        Mobile:     /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
        Url:        /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        Currency:   /^\d+(\.\d+)?$/,
        Number:     /^\d+$/,
        Zip:        /^[1-9]\d{5}$/,
        QQ:         /^[1-9]\d{4,8}$/,
        Integer:    /^[-\+]?\d+$/,
        Double:     /^[-\+]?\d+(\.\d+)?$/,
        English:    /^[A-Za-z]+$/,
        Chinese:    /^[\u0391-\uFFE5]+$/,
        Username:   /^[a-z]\w{3,}$/i,
        UnSafe:     /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,

        Integer:    /^\-?\d*$/,
        Float:      /^\-?\d+(?:[.,]\d+)?$/,
        Datetime:   /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
    };
    /// <summary>验证为整型数字</summary>
    app.directive('integer', function () {
        return {
            require: 'ngModel',//NgModelController
            link: function (scope, ele, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {//$parsers，View到Model的更新
                    if (REGEXP['Integer'].test(viewValue)) {
                        //合格放心肉
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    } else {
                        //私宰肉……
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });
            }
        };
    });
    /// <summary>验证为浮点型数字</summary>
    app.directive('smartFloat', function () {
        return {
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (REGEXP['Float'].test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', '.'));
                    } else {
                        ctrl.$setValidity('float', false);
                        return undefined;
                    }
                });
            }
        };
    });
    /// <summary>验证为安全字符</summary>
    app.directive('unsafe', function () {
        return {
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (REGEXP['UnSafe'].test(viewValue)) {
                        ctrl.$setValidity('unsafe', true);
                        return parseFloat(viewValue);
                    } else {
                        ctrl.$setValidity('unsafe', false);
                        return undefined;
                    }
                });
            }
        };
    });
    /// <summary>验证为时间类型</summary>
    app.directive('datetime', function () {
        return {
            require: 'ngModel',//NgModelController
            link: function (scope, ele, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {//$parsers，View到Model的更新
                    if (REGEXP['Datetime'].test(viewValue)) {
                        ctrl.$setValidity('datetime', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('datetime', false);
                        return undefined;
                    }
                });
            }
        };
    });

    /// <summary>自定义双向绑定</summary>
    app.directive('smarttextarea', function () {
        var link = function (scope, elm, attrs, ctrl) {
            //view=>model数据绑定
            elm.bind('keyup', function () {
                scope.$apply(function () {
                    ctrl.$setViewValue(elm.html());
                });
            });

            //model=>view数据绑定
            ctrl.$render = function () {
                elm.html(ctrl.$viewValue);
            };

            ctrl.$setViewValue(elm.html());
        };
        return {
            template: '<div></div>',
            replace: true,
            require: 'ngModel',
            restrict: 'E',
            link: link
        };
    });

    /// <summary>wangEditor</summary>
    app.directive('contenteditable', function() {
        return {
            restrict: 'A' ,
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                 // 初始化 编辑器内容
                if (!ngModel) {
                    return;
                } // do nothing if no ng-model
                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || '');
                };
                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$apply(readViewText);
                });
                // No need to initialize, AngularJS will initialize the text based on ng-model attribute
                // Write data to the model
                function readViewText() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html === '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
                var menus = [
                    'source',
                    '|',
                    'bold',
                    'underline',
                    // 'italic',
                    // 'strikethrough',
                    // 'eraser',
                    'forecolor',
                    'bgcolor',
                    '|',
                    'quote',
                    'fontfamily',
                    'fontsize',
                    'head',
                    'unorderlist',
                    // 'orderlist',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'link',
                    'unlink',
                    'table',
                    'emotion',
                    // '|',
                    'img',
                    // 'video',
                    // 'location',
                    // 'insertcode',
                    '|',
                    // 'undo',
                    // 'redo',
                    'fullscreen'
                ], editor = new wangEditor(element);

                // 判断是否为禁用状态
                if(attrs.preview && attrs.preview === 'true'){
                  menus = [];
                  editor.disable();
                  return;
                }
                // console.log(uploadInit);
                editor.config.menus = menus;
                editor.config.customUpload = true;  // 设置自定义上传的开关
                editor.config.customUploadInit = uploadInit;  // 配置自定义上传初始化事件，uploadInit方法在上面定义了
                editor.create();
            }
        };
    });

    return app;
});
