$(function () {
  // 1. 发请求获取数据，渲染到页面上
  // 1.1  向服务器端发送请求
  $.ajax({
    type: 'get',
    url: BigNew.user_detail,
    // headers: {
    //   'Authorization': localStorage.getItem('token')
    // },
    success: function (res) {
      console.log(res)
      // console.log(typeof res);
      // 1.2 获取到数据之后，将数据渲染到页面上
      if (res.code == 200) {
        // $('#form .username').val(res.data.username)
        // $('#form .nickname').val(res.data.nickname)
        // $('#form .email').val(res.data.email)
        // $('#form .password').val(res.data.password)

        for (var key in res.data) {
          $('#form .' + key).val(res.data[key])
        }
        $('#form .user_pic').attr('src', res.data.userPic)

      }
    }
  })


  // 2. 个人中心页面实现图片预览
  $('#exampleInputFile').on('change', function () {
    // console.dir(this.files[0])
    var file = this.files[0] // 获取待上传的文件
    // URL.createObjectURL会将待上传的文件生成一个可浏览的地址
    var url = URL.createObjectURL(file)

    // 在图片上渲染出来 预览待上传的图片
    $('#form .user_pic').attr('src', url)
  })

  // 3. 更新个人中心数据
  // 3.1 给修改按钮注册事件
  $('#form').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    // 3.2 准备待发送的数据 对DOM对象中的数据进行转换
    var data = new FormData(this) // 将form表单中的待上传数据转换成二进制的形式再进行上传
    // 3.3 发送ajax请求
    $.ajax({
      type: 'post',
      url: BigNew.user_edit,
      // headers: {
      //   'Authorization': localStorage.getItem('token')
      // },
      data: data,
      contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
      processData: false, // 不要转换成字符串
      success: function (res) {
        // 3.4 请求成功后刷新对应的数据
        // console.log(res);
        // console.log(typeof res);
        if (res.code == 200) {
          // 3.4.1 第1种更新父页面的方式
          //  window.parent.window.location.reload(); // 重新刷新页面
          //  parent.window.location.reload(); // 重新刷新页面 会造成整个页面都刷新

          //3.4.2  第2种更新数据的方式
          $.ajax({
            type: 'get',
            // url:'http://localhost:8080/api/v1/admin/user/info',
            url: BigNew.user_info,
            // headers: {
            //   'Authorization': localStorage.getItem('token')
            // },
            success: function (res) {
              // console.log(res);
              // 1.2. 请求回来数据后要渲染到页面
              if (res.code == 200) {
                // 显示登陆的用户名 
                parent.$('.user_info span i').text(res.data.nickname)

                // 显示登陆的头像
                parent.$('.user_info img').attr('src', res.data.userPic)

                // 个人中心的图片也设置一样
                parent.$('.user_center_link img').attr('src', res.data.userPic)
              }
            }
          })
        }
      }
    })
  })
  // 如果发送给服务器端的数据，都是字符串的话，可以使用表单序列化
  // 如果发送给服务器的数据，还有其它格式，比如图片，音频，或视频，这个时候最好是二进制的形式


})