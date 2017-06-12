define(['jquery'],function(){
    $.ajax({
        type : 'get',
        url : '/api/teacher/profile',
        dataType : 'json',
        success : function(data){
            console.log(data);
        }
    });
});