const { connection } = require('../connect/connect')
var url = require('url');
var util = require('util');
const multiparty=require('multiparty');
const fs=require('fs');
const path= require('path');
exports.addBook = function(req,res){
    //将文件上传到指定的文件夹，multipart/form-data主要用来处理表单，uploadDir是Form其中一个参数
    let form=new multiparty.Form({uploadDir:path.join(__dirname,'../image/bookpic')});
    //解析包含表单数据的传入节点.js请求。这将导致表单基于传入请求发出事件
    form.parse(req,(err,fileds,files)=>{ 
        let userData=JSON.parse(fileds.data);
        console.log(files)  
        const img = []
        for(let i = 0; i < files.picname.length;i++){
            console.log(i)
            const name = files.picname[i].originalFilename;
            bookName = name.substring(name.length - 9);
            img.push('/'+bookName)
        }
        console.log(img)
            // 要保存的文件名
        userData.picname = img.join(',')
        console.log(userData.picname)
        let sql = 'insert into book (name,price,descript ,user_id,author,picname) values (?,?,?,?,?,?)'   
          connection.query(sql,
          [userData.bookname,userData.price,userData.descript,userData.pUid,userData.author,userData.picname],
          (err,result1)=>{
              if(result1){    
                  for(let i = 0; i < files.picname.length; i++){
                    // 文件重命名          
                    const name = files.picname[i].originalFilename;
                    bookName = name.substring(name.length - 9);
                    fs.rename(files.picname[i].path,`image/bookpic/${bookName}`,(err)=>{
                    return  err ? console.log(err) : console.log('success')                     
                })  
                  }                  
                  res.status(200).send({msg:'success'});
              } 
          })  
    })
} 
 
exports.getBookInfo = function(req,res){
    let sql = 'SELECT a.*, b.avatar FROM book a ,user b where a.user_id = b.username'
    connection.query(sql,(req,results)=>{
        if(results.length>0){ 
            results.forEach(item => {
                item.avatar='http://127.0.0.1:5000/user/avatar/'+item.avatar;
               item.picname = item.picname.split('/').join('http://127.0.0.1:5000/goods/picname/')
            });
            res.status(200).send({data:results})
        }else{
            res.status(401).send({msg:'未知错误'})
        }
    })
}

exports.deleteBook = function(req,res){
    let sql = 'delete from book where id = ?'
    connection.query(sql, [req.query.id], (err, results)=>{
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({msg:'删除成功'})
    })
}