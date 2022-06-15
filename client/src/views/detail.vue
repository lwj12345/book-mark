<template>
    <div class="detail">
        <top-nav></top-nav>
        <div class="main">
            <div class="left">
                <div class="block">
                    <el-carousel height="300px">
                    <el-carousel-item v-for="item in productDetail.picname" :key="item">
                        <img class="pic" :src="item" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>     
            </div>
        <div class="right">
            <div class="info">
                <p>商品名称：{{productDetail.name}}</p>
                
                <span>作者：{{productDetail.author}}</span>
                <p>出售原因：{{productDetail.descript}}</p>
                <p class="price">定价：￥{{productDetail.price}}</p>
                <div class="avatar">
                     <img class="avatar2" :src='productDetail.avatar' alt />
                <span class="user_id">{{productDetail.user_id}}</span>
                
                </div>
               
            </div>
        <div class="call">
            <el-button @click="callToSell()">联系卖家</el-button>
        </div>
        </div>
        </div>
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import TopNav from '../components/TopNav.vue'
export default {
     components:{TopNav},
    data(){
        return{
            productDetail:{}
        }
    },
    computed:{
        ...mapGetters(['product'])
    },
    created(){
        console.log(this.product)
        this.productDetail = this.product;
    },
    methods:{
        callToSell(){
            this.$router.push("/talk");
        },
    }
}
</script>

<style scoped>
.detail{
    height: 100%;
    /* background: #00b6ff57; */
    margin: 0 auto;
}
.main{
    overflow: hidden;
    width: 50%;
    height: 300px;
    margin: 0 auto;
    /* background: wheat; */
    margin-top: 40px;
}
.avatar {
    width: 185px;
    height: 45px;
    display: inline-block;
    margin-top: 20px;
    position: relative;
}
.user_id{
    position: absolute;
    top: 8px;
    left: 56px;
}
.avatar2{
     width: 45px;
    height: 45px;
    border-radius: 50%;
}

.price{
    /* font-size: 20px;
    color: red; */
}
.picture{
    display: flex;
}
.picname{
    margin-left: 30px;
}
.left{
    width: 37%;
    float: left;
    height: 300px;
}
.right{
    height: 93%;
    text-align: left;
    line-height: 34px;
    margin-left: 30px;
    font-size: 20px;
    color: #7e7e7e;
}

.pic{
    height: 300px;
}
.info{
    height: 90%;
}

</style>