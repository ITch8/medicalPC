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