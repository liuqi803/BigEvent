$.ajaxPrefilter(function(options) {
  //拼接url
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
  //为my/添加headers
  if(options.url.indexOf('/my/') !== -1) {
    options.headers = {Authorization: localStorage.getItem('token')  || ''}
  }
  //禁止未登录访问
  options.complete = function(res) {
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html'
    }
  }
})