const { connection } = require('../connect/connect')
var url = require('url');
var util = require('util');
const jwt = require('jsonwebtoken');
const secetOrKey = 'book_change';
const multiparty=require('multiparty');
const fs=require('fs');
const path= require('path');
//获取图书信息（详细信息）
exports.getGoods = function (req, res) {
    // console.log('/api/sellShow/mysell')
    let params = url.parse(req.url, true).query;
    // console.log(params,'-----')
    // console.log(typeof(params),'++++++')
    if (JSON.stringify(params) === '{}') {
        // console.log(req.url)
        connection.query('select * from book ORDER BY RAND() LIMIT 14', function (erro, result) {
            res.send(result)
        })
    }
    if (params.bookId != null)
        connection.query('select * from book where book_id=' + params.bookId, function (erro, result) {
            res.send(result)
        })
}
//获取当前登录用户信息
exports.getUser = function(req, res){
    console.log(req.query.account)
    connection.query("select * from user where account=?",[req.query.account],function(erro,results){
        if(results.length>0){
            results[0].avatar='http://127.0.0.1:5000/user/avatar/'+results[0].avatar;
            res.status(200).send(results)
        }else{
            res.status(401).send({msg:'未知错误'})
        }
    })
}

//注册
exports.addUser = function(req,res){
    //获取浏览器端post请求的数据
  const username=req.body.username;
  const account = req.body.account;
  const password = req.body.password;
  //？是占位符，后面[ ]才是内容
  let sql1 = 'insert into user(username,password,account) values(?,?,?)';
  let addbody = [username,password,account];
  connection.query("select * from user where account="+account,function(err, result){
  if(JSON.stringify(result) === '[]'){
      console.log('select * from user where username='+username)
      connection.query(sql1,addbody,(err,result)=>{
        if(err) throw err;
        //如果成功，响应一个对象
        if(result.affectedRows>0){
          res.send({code:200,msg:'注册成功'});
        }
      });
  }else{
      res.send({msg:'该账号已经被注册'});
  }
  })
  
}

//登录
exports.login = function(req,res){
    //获取浏览器端post请求的数据
  const account = req.body.account;
  const password = req.body.password;
  let sql = 'select * from user where account = ?'
  connection.query(sql,account ,function(err, result){
    if(JSON.stringify(result) === '[]'){
      res.json({ status: -1,msg: '你还没有注册'})
    }else{ 
        if (result[0].password == password){
            console.log(result)
            const rule = {account:result[0].account,username:result[0].username,avatar:result[0].avatar}
            //jwt.sign("规则","加密名字","过期时间","箭头函数"),登录成功返回token值
            jwt.sign(rule,secetOrKey,{expiresIn:3600},(err,token)=>{
                if(err) throw err;  
                res.json({
                    success:true, 
                    status:200,
                    msg:'登录成功',
                    token:'Bearer ' + token
                })
            }) 
        }else{
            res.json({ status: -2,msg: '密码错误'})
        }
    }
  })
}

//编辑个人信息
exports.editInfo = function(req,res){
        console.log(req.params.account)
      //将文件上传到指定的文件夹，multipart/form-data主要用来处理表单，uploadDir是Form其中一个参数
      let form=new multiparty.Form({uploadDir:path.join(__dirname,'../image/userAvatar')});
    //   解析包含表单数据的传入节点.js请求。这将导致表单基于传入请求发出事件
      form.parse(req,(err,fileds,files)=>{
          let userData=JSON.parse(fileds.data);
          console.log(userData)         
          console.log(files)   
           // 数据库添加记录,只更换头像，不更换昵称
           if(userData.username == ''){
                //要保存的文件名
                console.log('111111111111111')
            userData.avatar=req.params.account+'.jpg';
            connection.query('UPDATE user SET avatar=? where account=?',
            [userData.avatar,req.params.account],
            (err,result1)=>{
                if(result1){    
                    // 文件重命名                   
                    fs.rename(files.avatar[0].path,`image/userAvatar/${userData.avatar}`,(err)=>{
                        return  err ? console.log(err) :res.status(200).send({msg:'success'  });                           
                    })                    
                    console.log(result1)
                }
            }) 
            //只修改名称，不更换头像
           }
           else if(files.avatar == null){
                console.log('222222222222222')
                // sql = 'update user t1,book t2 set t1.username='曹操',t2.user_id='曹操' where t1.account=222 and t2.user_id='诸葛亮''
                sql = 'update user t1,book t2 set t1.username=?,t2.user_id=? where t1.account=? and t2.user_id=?'
                connection.query(sql,
                [userData.username,userData.username,req.params.account,userData.preusername],
                (err,result1)=>{ 
                    console.log([userData.username,userData.username,req.params.account,userData.preusername])
                    if(result1){
                        res.status(200).send({msg:'success'})
                    }
                }) 
           } 
           else{     
                // 要保存的文件名,两个都更改
            console.log('333333333333333')
            userData.avatar=req.params.account+'.jpg';    
            // 'UPDATE user SET username=? ,avatar=? where account=?'
            sql = 'update user t1,book t2 set t1.username=? ,t1.avatar=?,t2.user_id=? where t1.account=? and t2.user_id=?'  
            connection.query(sql,
            [userData.username,userData.avatar,userData.username,req.params.account,userData.preusername],
            (err,result1)=>{    
                if(result1){    
                    // 文件重命名                   
                    fs.rename(files.avatar[0].path,`image/userAvatar/${userData.avatar}`,(err)=>{
                        return  err ? console.log(err) :res.status(200).send({msg:'success'  });                           
                    })                   
                    console.log(result1)
                }
            }) 
           }
                
      })
}
exports.insertCollect = function(req,res){
    let params = url.parse(req.url, true).query;
    let usernameId = params.usernameId;
    let bookId = params.bookId;
    let sql = 'select * from user_collect where user_id='+usernameId+' and book_id='+bookId;
    let sql2 = 'insert into user_collect(user_id,book_id) values(?,?)'
    let params_data = [usernameId,bookId]
    connection.query(sql,function(err, result){
        if(JSON.stringify(result) === '[]'){
            console.log('插入收藏区',usernameId,bookId)
            connection.query(sql2,params_data,function(err, result2){
                if(err){
                    res.send(err)
                }else{
                    res.send('收藏成功');
                }
            })
            // res.send(false)//没有收藏
        }else{
            console.log('select * from user_collect where user_id='+usernameId+' and book_id='+bookId)
            console.log('已收藏区',usernameId,bookId)
            res.send(true)
        }
    })
}

exports.getCollect = function(req,res){
    let params = url.parse(req.url,true).query;
    let usernameId = params.usernameId;
    let book_data = [];
    let bookId_data = [];
    let sql = 'select * from book where book_id in (select book_id from user_collect where user_id='+usernameId+')';
    connection.query(sql,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}