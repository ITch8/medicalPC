var ASKURL = "http://localhost:8360";
var isNull = function (value) {
    value =  value.replace(/(^\s*)|(\s*$)/g, "");
    return (value === "null" || value === null || value === "" || value === "undefined") ? true : false;
}
var mypost = function (url,pdata,success,error,show){
    var url = url || '';
    var pdata = pdata || {};
    var show = show || false;
    $.ajax({
        type: 'post',
        url: ASKURL + url,
        data: pdata,
        success: function (data) {
            console.log('data==='+JSON.stringify(data));
            success(data);
        },error : function (err) {
            error(err);
        }
    });
}
/**
 * 自定义确认框
 * */
var myConfirm = function(title,info,success){

    $.confirm({
        title: title || '提示!',
        content: info || '确定删除吗',
        buttons: {
            是: {
                btnClass: 'btn-blue',
                action: success
            },
            否:{ btnClass: 'btn-warning',
                action: function () {}
            }
        }
    });
}
/**
 * 自定义警告框
 * */
var alert = function(info,success,title){
    $.alert({
        title: title || '提示!',
        content: info ||　'操作完成!',
        buttons:{
            好:success || function () { }
        }
    });
}