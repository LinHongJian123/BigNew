/* 沙箱模式 */
(function(w){
  var baseURL = 'http://localhost:8080/api/v1'
  var BigNew = {
      baseURL:baseURL,//基地址
      category_list:      baseURL + '/index/category',//文章分类列表
      latest_news:        baseURL + '/index/latest', // 最新资讯
      hotPic_news:        baseURL + '/index/hotpic', // 热点图新闻
      hotrank_list:       baseURL + '/index/rank', // 一周文章热门排行
      latest_comment:     baseURL + '/index/latest_comment',// 最新评论
      attention_news:     baseURL + '/index/attention', // 焦点关注
      artilce_list:       baseURL + '/index/search', // 文章列表页
      article_detail:     baseURL + '/index/article', // 文章详情页面
      post_comment:       baseURL + '/index/post_comment', // 发表评论
      comment_list:       baseURL + '/index/get_comment' // 评论列表
  };

  //暴露接口
  w.BigNew = BigNew;
})(window);