$(function() {
    // 注册链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //  登录链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从layui中获取表单属性
    var form = layui.form
        // 从layui中获取layer属性（弹窗）
        // var layer = layui.layer

    form.verify({
        // 自定义一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        //    定义两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参value拿到的是再次确认密码的值
            // 还需要拿到密码的值
            // 然后进行两次密码等于的判断
            // 如果验证失败，就return 一个验证失败的消息
            const pwd = $('.reg-box [name="password"]').val()
            if (pwd !== value) {
                return ('两次密码不一致')
            }
        }
    })

    // 为注册模块的表单添加提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        const data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return console.log(res.message);
                // return layer.msg(res.message)
            }
            console.log('注册成功，请登录');
            // layer.msg('注册成功')

            // 模拟人为的点击登录按钮
            $('#link_login').click()
        })

    })

    // 为登录页面绑定点击事件
    $('#form_login').submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('登录失败')
                        // return console.log(res.message)
                }
                layer.msg('登录成功')
                    // console.log('登录成功');

                // 将登录成功之后得到的token值存到localStorage里面,这个值是到时候去登陆查看需要权限的页面时用的
                // console.log(res.token);  //拿到Bearer值
                localStorage.setItem('token', res.token)

                // 跳转到主页面
                // location.href = '../index.html'

            }
        })
    })
})