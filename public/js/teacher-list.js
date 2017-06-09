define(['jquery','template','bootstrap'],function($,template){
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function(data){
            var html = template('teacherInfoTpl',{list:data.result});
            $('#teacherInfo').html(html);
        }
    });
});