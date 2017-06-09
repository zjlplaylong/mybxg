define(['jquery','template','util','bootstrap'],function($,template,util){

    util.setMenu(location.pathname);

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
            // 点击按钮注销或者启用功能
            enableOrDisable();
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
            return false;
        });
    }
    // 点击按钮注销或者启用功能
    function enableOrDisable(){
        $("#teacherInfo").find('.edable').click(function(){
            var that = this;
            var td = $(this).closest('td');
            var tcId = td.attr('data-id');
            var tcStatus = td.attr('data-status');
            console.log(tcStatus);
            $.ajax({
                type : 'post',
                url : '/api/teacher/handle',
                data : {tc_id : tcId,tc_status : tcStatus},
                dataType : 'json',
                success : function(data){
                    if(data.code == 200){
                        // 当点击的时候，通过后台接口里面的方法进行转换
                        td.attr('data-status',data.result.tc_status);
                        if(data.result.tc_status == 0){
                            $(that).text('注销');
                        }else {
                            $(that).text('启用');
                        }
                    }
                }
            });
        });
    }
});