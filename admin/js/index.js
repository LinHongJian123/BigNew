$(function () {
  // 1. 立即向服务器发送请求
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
        $('.user_info span i').text(res.data.nickname)

        // 显示登陆的头像
        $('.user_info img').attr('src', res.data.userPic)

        // 个人中心的图片也设置一样
        $('.user_center_link img').attr('src', res.data.userPic)
      }
    }
  })


  //2. 退出功能
  // 2.1. 给退出按钮注册事件
  $('.logout').on('click', function () {
    // 2.2 退出意味着，要删除本地存储中的token
    localStorage.removeItem('token')
    // 2.3 跳转到登陆页面 
    window.location.href = './login.html'
  })


  // 3. 主页面左侧按钮高亮显示
  // 3.1 给左侧按钮的每一个div注册事件 每个div都有一个共同的类level01
  $('.menu .level01').on('click', function () {
    // 3.2 单击当前的div添加类active  其余的兄弟标签要移除类
    $(this).addClass('active').siblings().removeClass('active')

    // 3.3 当单击文章管理的时候，要实现一个合并与展开的切换
    if($(this).index()==1){ // 文章管理是第二个div，因此可以通过索引来判断
      $('.menu .level02').slideToggle() // 实现切换
      // 3.4 右侧的小三角也要进行一个切换
      $(this).find('b').toggleClass('rotate0')

      // 4.3 只要展开或是合并文章管理，就要让第1个li标签高亮显示
      $('.menu .level02 li:eq(0)').trigger('click')
    }
  })

  // 4. 让文章管理中的li标签被单击的时候，高亮显示
  // 4.1 给每一个li标签注册事件
  $('.menu .level02 li').on('click',function(){
    // 4.2 当前被单击的li标签要添加类active 其余的要移除类active
    $(this).addClass('active').siblings().removeClass('active')
  })
})

