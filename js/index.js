$(function(){
  // 1. 实现主页面的分类数据显示
  // 1.1 发送ajax请求
  $.ajax({
    type:'get',
    url:BigNew.category_list,
    success:function(res){
      // console.log(res);
      // 1.2 使用模板引擎渲染页面
      if(res.code==200){
        // 原始的做法是使用两个模板
        // var htmlStr1 = template('categoryList1',res)
        // $('.menu .level_two').html(htmlStr1)

        // var htmlStr2 = template('categoryList2',res)
        // $('.menu .left_menu').html(htmlStr2)

        // 这是用一个模板的做法
        var htmlStr = template('categoryList',res)
        $('.menu .level_two').html('<li class="up"></li>'+htmlStr)
        $('.menu .left_menu').html(htmlStr)
      }
    }
  })

  // 2. 热点图数据显示
  $.ajax({
    type:'get',
    url:BigNew.hotPic_news,
    success:function(res){
      // console.log(res);
      if(res.code==200){
        var htmlStr = template('hotPicTmp',res)
        $('.main_con .focus_list').html(htmlStr)
      }
    }
  })

  // 3. 最新资讯
  $.ajax({
    type:'get',
    url:BigNew.latest_news,
    success:function(res){
      // console.log(res);
      if(res.code==200){
        var htmlStr = template('latestNewsTmp',res)
        $('.common_news').html(htmlStr)
      }
    }
  })

  // 4. 一周热门排行
  $.ajax({
    type:'get',
    url:BigNew.hotrank_list,
    success:function(res){
      // console.log(res);
      if(res.code==200){
        var htmlStr = template('rankList',res)
        $('.hotrank_list').html(htmlStr)
      }
    }
  })

  // 5. 最新评论
  $.ajax({
    type:'get',
    url:BigNew.latest_comment,
    success:function(res){
      // console.log(res);
      if(res.code==200){
        var htmlStr = template('commentListTmp',res)
        $('.comment_list').html(htmlStr)
      }
    }
  })

  // 6. 焦点关注
  $.ajax({
    type:'get',
    url:BigNew.attention_news,
    success:function(res){
      console.log(res);
      if(res.code==200){
        var htmlStr = template('attentionList',res)
        $('.guanzhu_list').html(htmlStr)
      }
    }
  })

  // 7. 给搜索按钮注册事件，跳转到文章列表页
  // 7.1 给搜索按钮注册事件
  $('.search_btn').on('click',function(){
    // 7.2 获取搜索框的值
    var txtValue = $('.search_txt').val()
    // 7.3 对此值进行判断 
    // if(txtValue.trim()=='')
    if(!txtValue.trim()){
      // 7.4 如果为空，则要提示
      alert('输入内容不能为空，请重新输入')
      return // 阻止代码的向下执行
    }
    
    // 7.5 如果正常的话，则要跳转到列表页 
    
    // 地址栏后面的参数，是可以自己拼写属性名的
    window.location.href = './list.html?search='+txtValue
    $('.search_txt').val('')
  })
})