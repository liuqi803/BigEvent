$(function () {
  $('#link_reg').on('click', function () {
    $('.reg-box').css('display', 'block');
    $('.login-box').css('display', 'none');
  });
  $('#link_login').on('click', function () {
    $('.login-box').css('display', 'block');
    $('.reg-box').css('display', 'none');
  });

  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次输入不一致aaaaa';
      }
    }
  });
  //注册    
  var layer = layui.layer;
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.post("/api/reguser", $(this).serialize(),
      function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！');
        $('#link_login').click();
      },
    );
  })
  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(), 
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })

})