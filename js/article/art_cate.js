$(function () {
  var layer = layui.layer
  var form = layui.form
  initArtCateList()

  // 获取文章分类的列表

  // function initArtCateList() {
  //   $.ajax({
  //     type: "get",
  //     url: "/my/article/cates",
  //     success: function (res) {
  //       console.log(res);
  //     }
  //   });
  // }
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res);
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 为添加类别按钮绑定点击事件
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })


  // $('body').on('submit', '#form-add', function (e) { 
  //   e.preventDefault();
  //   $.ajax({
  //     type: "POST",
  //     url: "/my/article/addcates",
  //     data: $(this).serialize(),
  //     success: function (res) {
  //       if(res.status !== 0) {
  //         return layer.msg('添加失败！')
  //       }
  //       layer.msg('添加成功！');
  //       initArtCateList()
  //       layer.close(indexAdd)
  //     }
  //   });
  //  })
  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  //代理添加编辑
  // var indexEdit = null
  // $('tbody').on('click', '.btn-edit', function () {
  //   // 弹出一个修改文章分类信息的层
  //   indexEdit = layer.open({
  //     type: 1,
  //     area: ['500px', '250px'],
  //     title: '修改文章分类',
  //     content: $('#dialog-edit').html()
  //   })
  //   var id = $(this).attr('data-id');
  //   $.ajax({
  //     type: "get",
  //     url: '/my/article/cates/' + id,
  //     success: function (res) {
  //       form.val('form-edit', res.data)
  //     }
  //   });
  // })
  var indexEdit = null;
  $('tbody').on('click', '.btn-edit', function() {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    });
    var id = $(this).attr('data-id')
    $.ajax({
      type: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        if(res.status !== 0) {
          return layer.msg('获取信息失败')
        }
        form.val('form-edit', res.data)
      }
    });
  })
  //代理编辑
  $('body').on('submit', '#form-edit', function(e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if(res.status !== 0) {
          return layer.msg('提交信息失败')
        }
        layer.msg('提交信息成功')
        initArtCateList();
        layer.close(indexEdit)
      }
    });
  })
  // //代理编辑
  // $('body').on('submit', '#form-edit', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     type: "post",
  //     url: "/my/article/updatecate",
  //     data: $(this).serialize(),
  //     success: function (res) {
  //       if(res.status !== 0) {
  //         return layer.msg('编辑失败了！')
  //       }
  //       initArtCateList();
  //       layer.msg('编辑成功！');
  //       layer.close(indexEdit)
  //     }
  //   });
  // })

  //代理添加删除
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败了！')
          }
          layer.msg('删除成功！')
          layer.close(index)
          initArtCateList();
        }
      });
    })
  })

})
