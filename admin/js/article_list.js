$(function () {
  // 1. 发送ajax请求获取文章所有的分类 
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      // console.log(res);
      var htmlStr = template('categoryList', res)
      $('#selCategory').html(htmlStr)
    }
  })



  // 封装了一个根据不同条件来查询数据的函数
  function getDataByParams(myPage, callback) {
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: {
        key: $('#key').val(),
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: myPage,
        perpage: 7
      },
      success: function (res) {
        console.log(res)
        if (res.code == 200) {
          // 2.2 渲染数据
          var htmlStr = template('articleList', res.data)
          $('tbody').html(htmlStr)

          // 2.4  根据服务器响应回来的数据来判断是否显示控件
          if (res.data.totalPage == 0 && myPage == 1) {
            $('#pagination-demo').hide().next().show()
          } else if (res.data.totalPage != 0 && callback != null) {
            // 就说明是有数据响应回来的，应该要显示分页控件
            $('#pagination-demo').show().next().hide()
            // 2.3 实现函数的调用
            callback(res)
            // pagination(res)
          } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
            currentPage -= 1  // 针对于最后一页而言的 
            // 重绘控件页码
            // 更新分页控件的总页码 
            // 1. 第1个参数是一个事件 当页码值发生变化时就会触发
            // 2. 第2个参数是 要变化的新的总页码值
            // 3. 第3个参数 是当前页码值
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
          }

        }
      }
    })
  }
  // 2. 显示文章数据
  // 2.1 一跳转到当前这个页面就要发送ajax请求
  getDataByParams(1, pagination)

  // 3. 分页功能的函数
  var currentPage = 1
  function pagination(res, visiblePages) {
    $('#pagination-demo').twbsPagination({
      totalPages: res.data.totalPage, // 总页数
      visiblePages: visiblePages || 7, // 可见最大上限页码值
      first: '首页',
      last: '最后一页',
      next: '下一页',
      prev: '上一页',
      initiateStartPageClick: false, // 不要默认点击 
      onPageClick: function (event, page) {
        //  console.log(event,page);
        // page是当前页码
        currentPage = page // 当默认页改成被单击后的页码
        // 调用方法，实现当前页码的数据渲染
        getDataByParams(page, null)
      }
    })
  }

  // 4. 给筛选按钮注册事件 根据新条件渲染页面
  // 4.1 给筛选按钮注册事件
  $('#btnSearch').on('click', function (e) {
    // 4.2 阻止默认的请求行为
    e.preventDefault()

    // 4.3 发送请求获取数据

    getDataByParams(1, function (res) {
      // 更新分页控件的总页码
      $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
    })

  })

  // 5. 删除数据
  // 5.1 给模态框注册事件,要找到事件源头，进而找到删除按钮上的id
  var articleId
  $('#myModal').on('show.bs.modal', function (e) {
    // console.log(e.relatedTarget );
    articleId = $(e.relatedTarget).data('id')
  })
  // 5.2 给模态框上的确定按钮注册事件
  $('#myModal .btn-sure').on('click', function () {
    // 5.3 发送ajax请求 
    $.ajax({
      type: 'post',
      url: BigNew.article_delete,
      data: {
        id: articleId
      },
      success: function (res) {
        // 5.4 请求成功后要隐藏模态框 
        $('#myModal').modal('hide')
        // 5.5 刷新当前页面
        getDataByParams(currentPage, null)
      }
    })
  })

  // 6. 给发表文章按钮注册事件
  // 6.1 给发布文章注册事件
  $('#release_btn').on('click',function(){
    // 6.2  修改父页面中的按钮状态
    parent.$('.menu .level02>li:eq(1)').click()
  })
})

/**
 * 1. 当前项目不要纠结于某一行代码
 * 2. 要听完整的思路
 */