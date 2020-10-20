$(function() {
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
        // 关闭 confirm 询问框
        layer.close(index)
      })
    })

})
//获取用户信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        headers: {Authorization: localStorage.getItem('token') || ''},
        success: function (res) {
            // console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    });
}
//渲染头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎 &nbsp;'+ name);
    if(user.user_pic) {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    } else {
        var word = name[0].toUpperCase();
        $('.text-avatar').html(word).show();
        $('.layui-nav-img').hide();
    }
}