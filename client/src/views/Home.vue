<template>
    <div class="index">
      <top-nav></top-nav>
      <div class="seacher">
          <input class="text" v-model="keyword" placeholder="输入你要查找的商品" autofocus type="text"><button class="button"><span>搜索</span></button>
      </div>
      <div class="goods">
        <div class="content"  v-for="(item) in meslist" :key="item.id" @click="selectProduct(item)">
          <img class="pic" :src="item.picname[0]" alt="">
          <div class="info">
            <p>{{item.name}}</p>
            <p>作者：{{item.author}}</p>
            <p style="color:rgb(253, 69, 87)">￥{{item.price}}</p>
          </div>
          <div class="user">
            <img class="avatar" :src='item.avatar' alt />
            <span>{{item.user_id}}</span>
          </div>
        </div>
      </div>    
    </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import {mapMutations} from 'vuex'
export default {
    name:'index',
    components:{TopNav},
      data(){
    return {
      messageList: [],
      pic:[],
      keyword:''
    }
  },
     created() {
    this.getAllproduct()
  },
  computed:{
    "meslist"(){
      if(this.keyword==""){
     return this.messageList;
      }else{
        return this.messageList.filter(item=>{
      return item.name.match(this.keyword)
      console.log(item)
        })
      }
    }
  },
  methods:{
      getAllproduct(){
           this.$axios("/api/getBookInfo")
            .then(product =>{
              if(!product){
              }
                // console.log(product)
                this.messageList = product.data.data
                for(let i = 0;i < this.messageList.length;i++){
                  const aa = this.messageList[i].picname.split(',')
                  this.messageList[i].picname = aa
                }
                this.$store.dispatch("getAllproduct", this.messageList) 
            })
            .catch(err => console.log(err))
      },
      selectProduct(item){
        this.$router.push({path:'detail'})
        this.get_product(item)
      },
      ...mapMutations({get_product:'get_product'}),
       putTomain(){
      this.$router.push("/index");
    }
  }
}

</script>
<style scoped>
.index{
   
    height: 100vh;
}
.el-header{
    padding: 0;
}
.goods{
  width: 90%;
  display: flex;
  background:#ecf5ff;
  flex-wrap: wrap;
    justify-content: center;
    margin-left: 5%;
}
.content{
  width: 200px;
    background: #f8f6f6;
    margin: 30px;
    border: 1px solid #d7dee7;
}
.pic{
  width: 90%;
  height: 70%;
}
.seacher{
  width: 40%;
    background: red;
    margin: 0 auto;
    height:38px;
    margin-top: 30px;
}
.text{
  height: 27px;
  width:88%;
  outline: none;
}
.button{
  background: red;
    border: none; 
    font-size: 21px;
    width: 59px;
    color: white;
}
.info{
  color:rgb(110, 119, 170)
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
}
.user{
width: 70%;
}
</style>