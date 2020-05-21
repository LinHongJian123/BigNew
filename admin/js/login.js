// 1. 写入口函数
$(function () {
  // 2. 给form表单注册submit事件
  $('.login_form').on('submit', function (e) {
    // 3. 阻止默认提交行为
    e.preventDefault()

    // 4. 发送ajax请求
    $.ajax({
      type: 'post',
      // url: 'http://localhost:8080/api/v1/admin/user/login',
      url: BigNew.user_login,
      data: $(this).serialize(),
      beforeSend: function () {
        // 5. 发送请求之前验证用户名或密码是否为空
        var flag = false
        $('.login_form input[name]').each(function (index, ele) {
          if ($.trim($(ele).val()) == '') {
            flag = true
          }
        })
        if (flag) {
          // alert('输入的用户名或密码不能为空')
          $('.modal').modal('show')
          $('.modal-body p').text('输入的用户名或密码不能为空')
          return false// 阻止请求的发送
        }
      },
      success: function (res) {
        $('.modal').modal('show')
        $('.modal-body p').text(res.msg)
        if (res.code == 200) {
          $('.modal').on('hidden.bs.modal', function (e) {
            // 将服务器端响应回来的token字符串，存储到本地存储当中
            localStorage.setItem('token',res.token)
            window.location.href = './index.html'
          })
        }
      }
    })
  })


  //  实现模态框的显示与隐藏
})