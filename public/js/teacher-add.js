define(['jquery','util','template','validate'],function($,util,template){
    // 设置导航选中
    util.setMenu('/teacher/list');
    // 获取参数中tc_id
    var tcId = util.getSearch('tc_id',location.search);
    // 表单处理
    function submitForm(url){
        $("#addTeacherForm").validate({
            sendForm : false,
            eachInvalidField : function(){
                console.log(1);
            },
            eachValidField : function(){
                console.log(2);
            },
            valid : function(){
                // console.log(3);

            },
            description : {
                tcName : {
                    required : '姓名不能为空',
                    valid : '姓名格式正确'
                },
                tcPass : {
                    required : '密码不能为空',
                    pattern : '密码必须为6位数',
                    valid : '密码格式正确'
                },
                tcJoinDate : {
                    required : '入职如期不能为空',
                    valid : '入职如期格式正确'
                }
            }
        });
        // $("#addTeacherBtn").click(function() {
        //     $.ajax({
        //         type : 'post',
        //         url : url,
        //         data : $("#addTeacherForm").serialize(),
        //         dataType : 'json',
        //         success : function(data){
        //             if(data.code == 200){
        //                 location.href = '/teacher/list';
        //             }
        //         }
        //     });
        // });
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