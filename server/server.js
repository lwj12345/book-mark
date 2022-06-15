const express = require('express');
const {route} = require('./router/route');
const bodyParser = require('body-parser')
const expressJWT=require('express-jwt');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http,{ cors: true });
var cors = require('cors');
const path=require('path');
app.use(cors({}));
//bodyParser它用于解析客户端请求的body中的内容,
//内部使用JSON编码处理,url编码处理以及对于文件的上传处理。
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// token秘钥
const secretkey='book_change';
app.use(expressJWT({secret:secretkey,algorithms:['HS256']}).unless({path:[/^\/api\/login/,/^\/user\/avatar/,/^\/goods\/picname/,/^\/api\/register/]}))

// token错误处理中间件
app.use((err,req,res,next)=>{
     if(err.name=='UnauthorizedError'){ 
         res.send({status:401,msg:'token已过期,请重新登录'})
     }else{
         res.send({status:500,msg:'未知错误'})
     } 
 })
// 设置跨域 cors跨域
app.all("*",function(req,res,next){
   //设置允许跨域的域名，*代表允许任意域名跨域
   res.header("Access-Control-Allow-Origin","*");
   //允许的header类型
   res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Accept,Content-type");
   res.header("Access-Control-Allow-Credentials",true);
   //跨域允许的请求方式
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("Content-Type","application/json;charset=utf-8")
   if (req.method.toLowerCase() == 'options')
     res.sendStatus(200);  //让options尝试请求快速结束
   else
     next();
 });
app.use('/api',route)

http.listen(3000, function () {
   console.log('listening on http://127.0.0.1:3000')
})
var users = {}; // 保存所有用户的键值对集合
var userslist = []
var messageList = []
io.on('connection', function (socket) {
   console.log('user conneted')  
   socket.emit('success', '连接到服务器')
    socket.on('con', function (msg) {   
        console.log('msg',msg) 
        var obj = JSON.parse(msg) // 获取连接的用户信息
        users[obj.username] = socket.id; // 将当前用户名和对应的链接id进行保存
        userslist.push(obj)
        userslist = userslist.filter((value,index,array)=>{
            //根据⾃⼰的条件进⾏过滤
            return array.findIndex(item=>item.username === value.username && item.toWho === value.toWho) === index
            })
        console.log('有新的链接,最新用户集合为：', users)
        console.log('userlist',userslist)
        io.emit('online',JSON.stringify(userslist))
    })
    // 接收客户端发来的数据
    socket.on('chat message', function (msg) {   
      //客户端发来的数据是字符串的形式，需要将它们转换成对象再进行处理
        var obj = JSON.parse(msg) // 获取连接的用户信息
        console.log('obj:', obj)
            // messageList.push(obj)
            // io.emit('receiveMessage', JSON.stringify(obj));
            io.to(users[obj.toWho]).emit('receiveMessage', JSON.stringify(obj)); // 通过id将信息转发给指定的对象
            // io.emit('returnmsg', JSON.stringify(messageList))
        // }
    })
    // 如果是断开socket请求，就会触发下面的代码
    socket.on('disconnect', () => {
        io.emit('quit', socket.id)
    })
})

app.get('/',(request, response) => {
   /*在浏览器发送 http://127.0.0.1:24000 的请求，客户端定义了监听'message'的socket，所以可以接收消息，即使客户端有代码 
       io.on('message',(data) => {
           console.log(data);
       });
   */
   io.emit('message','服务端向客户端推送消息...');
   response.writeHead(200, {"Content-type": "text/plain"});
   response.end();
});

// 响应头像图片
app.get('/user/avatar/:avatar',(req,res)=>{
    res.sendFile(path.join(__dirname,'/image/userAvatar/'+req.params.avatar))
 })

//响应商品图片
app.get('/goods/picname/:picname',(req,res)=>{
    res.sendFile(path.join(__dirname,'/image/bookpic/'+req.params.picname))
 })

 const port = process.env.PORT || 5000;
 app.listen(port, ()=>{
     console.log(`Server running port ${port}`)
 })

