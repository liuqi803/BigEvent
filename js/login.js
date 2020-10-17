$(function () { 
    $('#link_reg').on('click', function () { 
        $('.reg-box').css('display', 'block');
        $('.login-box').css('display', 'none');
     });
     $('#link_login').on('click', function () { 
        $('.login-box').css('display', 'block');
        $('.reg-box').css('display', 'none');
     });
 })