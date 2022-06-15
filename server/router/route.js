const express = require('express')
let route = express.Router()
var url = require('url');
let api = require('../controller/user');
let good = require('../controller/good')
// const {connection} = require('../connect/connect');
// const ct = require('../controller/ct');
// const ad = require('../controller/advice');

route.post('/register',api.addUser)    //注册     
route.post('/login',api.login)  //登录
route.get('/getUser',api.getUser)   //获取用户信息
route.post('/editInfo/:account',api.editInfo)   //编辑用户个人信息

route.post('/addBook',good.addBook) //添加商品
route.get('/getBookInfo',good.getBookInfo) //获取全部商品信息
route.get('/deleteBook',good.deleteBook) //添加商品
 


exports.route = route;