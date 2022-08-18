// 注意，每次发起请求 $.get()、$.post()、$.ajax() 之前，会先调用.ajaxPrefilter() 这个函数

// 这个函数中，可以拿到我们给ajax提供的配置资源

$.ajaxPrefilter(function(option) {
    console.log(option.url);
})


// $.ajaxPrefilter((option) => {
//     // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
//     option.url = `http://www.liulongbin.top:3007` + option.url;
//   });