$(function(){
  // 1. 判断用户是如何来到当前list.html页面
  // 如果是直接输入的域名后面没有参数，则让用户跳转到index.html，如果有参数则可以访问当前页面
  // 1.1 获取URL地址栏后面的参数
  var params = location.search
  // console.log(params); // '?id=2' 或 '?searchTxt=经济'
  // 1.2 根据URL后面的参数进行判断 
  if(!params){
    // 立即跳转到index.html页面
    window.location.href = './index.html'
    return // 阻止代码的向下执行
  }

  // 1.3 获取URL地址后面的参数值 
  var obj = utils.convertToObj(params.slice(1))
 // {id:2}   {searchTxt:'经济'}
  // 1.4 要根据参数来进行判断 
  if(obj.id){
    // 就说明 是通过id发送请求
    var data = {type: obj.id}
  }else {
    // 就说明 是通过关键词来发送请求
    var data = {key: decodeURI(obj.search)}
  }

  console.log(data);

  // 1.5 向服务器端发送请求
  $.ajax({
    type:'get',
    url: BigNew.artilce_list,
    data:data,
    success:function(res){
      console.log(res);
      if(res.code==200){
        if(!res.data.data.length){
          $('.setfr').html(`<div class="list_title">
              <h3>暂时没有数据</h3>
                 </div>`);
        }else {
          if(obj.id){
            var str = `<div class="list_title">
            <h3>${res.data.data[0].category}</h3>
             </div>`
          }else {
            var str = `<div class="list_title">
            <h3>关键词：${decodeURI(obj.search)}</h3>
             </div>`
          }
          
          var htmlStr = template('articleList',res.data)
          $('.setfr').html(str + htmlStr)
        }
       
      }
    }
  })
})