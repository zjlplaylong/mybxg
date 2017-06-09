define(['jquery','template','cookie'],function($,template){
    //实现左侧菜单栏中的下拉菜单的打开和关闭
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
    // 实现推出功能
    $("#logout").click(function() {
        $.ajax({
            type : 'post',
            url : '/api/logout',
            dataType : 'json',
            success : function (){
                location.href = '/login';
            }
        });
    });
    // 获取请求路径
    var pathname = location.pathname;
    // 判断用户是否已经登录 要通过PHPSESSID判断
    if(pathname != '/login' && !$.cookie('PHPSESSID')){
        // 没有登录的情况要清新跳转到登录页面
        location.href = '/login';
    }
    // 获取登录用户的cookie信息
    var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
    if (loginInfo){
        var loginTpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
        var html = template.render(loginTpl,loginInfo);
        $("#loginInfoTpl").html(html);
        // $(".aside .profile").find('img').attr('src', loginInfo.tc_avatar);
        // $(".aside .profile").find('h4').text(loginInfo.tc_name);
    }
});