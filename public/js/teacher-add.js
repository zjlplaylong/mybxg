define(['jquery','util','template'],function($,util,template){
    // 设置导航选中
    util.setMenu('/teacher/list');
    // 获取参数中tc_id
    var tcId = util.getSearch('tc_id',location.search);
    // 表单处理
    function submitForm(url){
        $("#addTeacherBtn").click(function() {
            $.ajax({
                type : 'post',
                url : url,
                data : $("#addTeacherForm").serialize(),
                dataType : 'json',
                success : function(data){
                    if(data.code == 200){
                        location.href = '/teacher/list';
                    }
                }
            });
        });
    }
    // $("#addTeacherBtn").click(function() {
    //     console.log(1);
    //     $.ajax({
    //         type : 'post',
    //         url : '/api/teacher/add',
    //         data : $("#addTeacherForm").serialize(),
    //         dataType : 'json',
    //         success : function(data){
    //             if(data.code == 200){
    //                 location.href = '/teacher/list';
    //             }
    //         }
    //     });
    // });
    // 获取参数中tc_id
    // var tcId = util.getSearch('tc_id',location.search);

    if(tcId){
        //编辑讲师
        $.ajax({
            type : 'get',
            url : '/api/teacher/edit',
            data : {tc_id : tcId},
            success : function(data){
                $("#navFlag").html('讲师编辑');
                data.result.operateFlag = '编辑';
                var html = template("teacherFormTpl",data.result);
                $("#teacherFormInfo").html(html);
                submitForm('/api/teacher/update');
            }
        });
    }else {
        // 添加讲师
        $("#navFlag").html('讲师添加');
        var html = template("teacherFormTpl",{operateFlag : '添加',tc_gender : '1'});
        $("#teacherFormInfo").html(html);
        submitForm('/api/teacher/add');
    }
});