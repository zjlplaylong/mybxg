define(['jquery'],function($){
    return {
        setMenu : function(pathname){
            $(".aside .navs a").removeClass('active');
            $('.aside .navs a[href="'+pathname+'"]').addClass('active');
        },
        getSearch : function(attr,param){
            // 通过传进去的search参数进行从 ？ 后面开始的截取
            var search = param.substring(1);
            // 对search进行分隔
            var arr = search.split('&');
            var resValue = '';
            arr.forEach(function(element,index){
                var kv = element.split('=');
                if(attr == kv[0]){
                    resValue = kv[1];
                    return;
                }
            });
            return resValue;
        }
    };
});
