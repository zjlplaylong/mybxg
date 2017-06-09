requirejs.config({
    //设置模块加载的基准路径
    baseUrl : '/public/assets',
    //给模块路径起一个别名
    paths : {
        jquery : 'jquery/jquery.min',
        bootstrap : 'bootstrap/js/bootstrap.min',
        cookie : 'jquery-cookie/jquery.cookie',
        common : '../js/common',
        template : 'artTemplate/template-web',
        login : '../js/login',
        util : '../js/util',
        index : '../js/index',
        tealist : '../js/teacher-list'
    },
    // 兼容非标准模块
    shim : {
        bootstrap : {
            deps : ['jquery']
        }
    }
});