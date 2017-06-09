define(['jquery','template','bootstrap'],function($,template){
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function(data){
            // 解析并渲染页面
            var html = template('teacherInfoTpl',{list:data.result});
            $('#teacherInfo').html(html);
            // 查看教师信息功能
            previewTeacher();
        }
    });
    function previewTeacher (){
        // 点击查看教师信息事件
        $("#teacherInfo").find('.preview').click(function(){
            var tcId = $(this).closest('td').attr('data-id');
            $.ajax({
                type : 'get',
                url : '/api/teacher/view',
                data : {tc_id : tcId},
                dataType : 'json',
                success : function(data){
                    data.result.tc_hometown = data.result.tc_hometown.split('|').join(' ');
                    var html = template('teacherModalInfoTpl',data.result);
                    $("#teacherModalInfo").html(html);
                    $("#teacherModal").modal();
                }
            });
        });
    }
});