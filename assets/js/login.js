$(function(){ 
    //点击去注册账号 
    $('#link_reg').on('click',function(){  
        //显示登录表单，隐藏注册表单
        $('.login-box').hide() 
        $('.reg-box').show() 
    })  

    $('#link_login').on('click',function(){  
        //显示注册表单，隐藏登录表单
        $('.login-box').show() 
        $('.reg-box').hide() 
    })   

// 获取 layui中 form对象 
  var form =layui.form   
  var layer =layui.layer //导入弹出层模块
  //添加表达的自定义规则
  form.verify({  
      //自定义一个叫pwd 校验规则
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,         
      //校验二次密码是不是一致的规则 
      repwd: function(value){  
         // value :表单值  item.:表单的dom对象  
         // 获取密码的value
          var pwd = $('.reg-box [name=password]').val()  
          if(pwd !== value){ 
              return '两次密码不一致'
          }
      }
  })
  
  //注册用户 
  $('#form_reg').on('submit',function(e){ 
      e.preventDefault() 
      //发起ajax post请求 
      var data ={ 
          username:$('#form_reg [name=username]').val(), 
          password:$('#form_reg [name=password]').val()
      } 
    $.post('/api/reguser',data,function(res){ 
        console.log(res) 
        if(res.status !=0){ 
            return layer.msg(res.message)
        } 
        layer.msg('注册成功，请登录') 
        //模拟人的点击行为 
        $('#link_login').click();
    })
  })
}) 
 
//监听登录表单的提交事件   token 就是访问服务器的 身份证 就是唯一标识 必须在本地有 token 的字符串就可以了 
  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) { 
        // layer.msg 弹出层   layer里面的功能
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中 
        //将服务器 返回的 用户 唯一标识，保存在本地
        localStorage.setItem('token', res.token) 
        
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })


