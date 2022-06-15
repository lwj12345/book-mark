<template>
    <div id="message">
        <!-- 主要思路，分为左右两个框 -->
        <div id="buyer">
            <div class="topic">聊天消息</div>
            <div class="user" @click="triggerPersonal(item,index)"  v-for="(item,index) in userList" :key="index" :class="{active:index===nowIndex}">
               <span class="username">{{item.username}}</span>
                 <img class="avatar" :src='item.avatar' alt />
                 <img class="S_img" :src='item.S_img' alt />
            </div>
        </div>
        <div id="messagelist" v-for="(items,index) in userList" :key="index.avatar" v-show="nowIndex===index">  
            <div class="header im-title">{{title}}</div> 
            <ul id="messages" >
                <li class="mes" v-for="(item,index) in messageList" :key='index.id' v-show='item.username === items.username  '>
                <img class="avatar2" :src='item.avatar' alt />
                    :{{item.mes}}
                </li>
                <li style="text-align:right;" v-for="(item3,index) in msg" :key='index' v-show='item3.toWho === items.username'>
                {{item3.mes}}
                <img class="avatar2" :src='item3.avatar' alt />
                 </li>
            </ul>
            <div class="input" action="">
                <input v-model="contentText" placeholder="发送的消息" id="m" autocomplete="off" @keyup.enter="sendText" />
                <el-button @click="sendText()">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { mapState, mapActions,mapMutations } from "vuex"
const socket = io('http://127.0.0.1:3000');
export default {
     data () {
    return {
      curUer:'',
      nowIndex:0,
      title:'',
      userList:[],
      obj:'',
      contentText:'',
      info:'',
      messageList:[],
      msg:[]
    }
  },
     mounted () {
       var  that = this;
    var user = this.$store.state.user;
    var username = user[0].username;
    that.curUer = username
    var avatar = user[0].avatar;
        let conobj = {
                username: username,
                avatar:avatar,
            }
        socket.emit('con', JSON.stringify(conobj));
        socket.on('online',function(data){
            var obj = JSON.parse(data);
            that.userList = obj.filter(item =>{return item.toWho == username})
        console.log(that.userList)
        })
        
     socket.on("receiveMessage", function (data) {      
                    var obj = JSON.parse(data);
                    // this.obj = obj
                    console.log(obj)
                    that.messageList.push(obj);
                    console.log(that.messageList)
                }) 
    // socket.on("returnmsg",function(data){
    //     var obj2 = JSON.parse(data);
    //     console.log(obj2)
    // })
  },
  methods:{
      triggerPersonal(item,index){
          console.log(item)
          this.nowIndex = index;
          this.title = item.username;
          this.info = item;
          console.log(this.info)
      },
       sendText(){ 
           //这里给发送的人应该是选中的对象
            var buyer = this.info.username
            var usernames = this.info.toWho
            var avatar = this.info.S_avatar
            let obj = {
                            username: usernames,
                            toWho: buyer,
                            avatar:avatar,
                            mes: this.contentText,
                        }
         socket.emit('chat message', JSON.stringify(obj));
//                 messages.innerHTML += `
// <li style="text-align:right;color:blue;">${this.contentText}<img class="avatar" src='${avatar}' alt /></li>`;
                this.msg.push(obj)
                console.log(this.msg)
                this.contentText = ""; 
    },
  }
}
</script>

<style scoped>
.user{
    position: relative;
    height: 10%;
    border-bottom: 1px solid #669d99;
    background: #f0eaea;
    cursor: pointer;
}
.active{
    color:red;
}
.avatar{
   width: 50px;
    height: 50px;
    float: left;
    border-radius: 26px;
    margin-left: 37px;
    margin-top: 9px;
}
.S_img{
    width: 50px;
    height: 50px;
       
    margin-left: 37px;
    margin-top: 9px;
}
.topic{
    height: 8%;
    line-height: 58px;
    font-size: 26px;
    border-bottom: 1px solid #31362e;
}
#buyer{
    width: 30%;
    height: 100vh;
    float: left;
    /* border-right: 1px solid black;    */
   background-color: whitesmoke;
}
.avatar2{
    width: 35px;
    height: 35px;
    border-radius: 15px;
}
.header{
    height: 76px;
    background: #c9c9c9;
    font-size: 28px;
    text-align: left;
    line-height: 76px;
    padding-left: 30px; 
}
.input {
    background: #e3d3d3;
    padding: 3px;
    position: fixed;
    bottom: 0;
    width: 70%;
}

.input input {
    border: 0;
    padding: 10px;
    width: 75%;
    margin-right: .5%;
}

form button {
    width: 19%;
    background: rgb(130, 224, 255);
    border: none;
    padding: 10px;
}
.mes{
        text-align: left;
    }
#messagelist{
    width: 70%;
    float: right;
    background-color: #d4d4da;
    height: 100vh;
}
.username{
    position: absolute;
    left: 100px;
    top: 10px;
    font-size: 18px;
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