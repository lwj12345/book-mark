<template>
  <div class="hello">
    <ul id="messages">
      <li class="mes" v-for="(item,index) in messageList" :key='index'>
      <img class="avatar" :src='item.avatar' alt />
        :{{item.mes}}
      </li>
    </ul>
    <div class="input" action="">
        <input v-model="contentText" placeholder="发送的消息" id="m" autocomplete="off" @keyup.enter="sendText" /><el-button @click="sendText">发送</el-button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { mapState, mapActions,mapMutations } from "vuex"
const socket = io('http://127.0.0.1:3000');
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      contentText: '', // input输入的值
      messageList:[],
      obj:''
    }
  },
  computed:{
			...mapState({
				user:state=>state.user
			}),//等同于==>...mapState(['isLogin']);映射 this.isLogin 为 this.$store.state.isLogin
		},
  mounted () {
    var that = this;
    var user = this.$store.state.user;
    var username = user[0].username;
    var avatar = user[0].avatar;
    var productSell = this.$store.state.product;
    var Seller = productSell.user_id;
    var S_avatar = productSell.avatar;
    var S_img = productSell.picname[0]
        let conobj = {
                username: username,
                avatar:avatar,
                toWho:Seller,
                S_avatar:S_avatar,
                S_img:S_img
            }
        socket.emit('con', JSON.stringify(conobj)); 
        socket.on("receiveMessage", function (data) {      
                    var obj = JSON.parse(data);
                    // this.obj = obj
                    console.log(obj)
                    that.messageList.push(obj);
                    console.log(that.messageList)
                }) 
  },
  methods:{
    sendText(){ 
    var user = this.$store.state.user;
    var bugavatar = user[0].avatar; 
    var productSell = this.$store.state.product;
    var user = productSell.user_id;
    console.log(productSell)
    var product_img = productSell.picname[0]
    var usernames = this.$store.state.user[0].username;
    var avatar = this.$store.state.user[0].avatar;
     let obj = {
                    username: usernames,
                    toWho: user,
                    avatar:avatar,
                    mes: this.contentText,
                    productImg:product_img
                }
         socket.emit('chat message', JSON.stringify(obj));
                messages.innerHTML += `
<li style="text-align:right;">${this.contentText}<img class="avatar" src='${avatar}' alt /><li>`;
                this.contentText = ""; 
                // return false;
  
        
    },
   
  },
  created() {
    //一定要移除旧的message监听，否则会出现重复监听的状况
    // socket.removeListener(messages);
    //这是移除所有监听
    // socket.removeAllListeners();
   
  }
}
</script>

  <style>
body {
    font: 13px Helvetica, Arial;
}
.hello{
  width: 60%;
  height: 100vh;
  background: #e8dbdb;
  margin: 0 auto;
  border: 1px solid black;
}
.avatar{
  width: 35px;
  height: 35px;
  border-radius: 15px;
}
.mes{
  text-align: left;
}
.input {
    background: #000;
    padding: 3px;
    position: fixed;
    bottom: 0;
    width: 60%;
}

.input input {
    border: 0;
    padding: 10px;
    width: 80%;
    margin-right: .5%;
}

form button {
    width: 19%;
    background: rgb(130, 224, 255);
    border: none;
    padding: 10px;
}

#messages {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

#messages li {
    padding: 5px 10px;
}
    </style>