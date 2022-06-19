<template>
    <div class="myProduct">
        <top-nav></top-nav>
        <el-table
    :data="myproductList"
    border
    style="width: 55%;margin:0 auto">
    <el-table-column
      fixed
      prop="name"
      label="商品名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="120">
    </el-table-column>
    <el-table-column
      prop="descript"
      label="商品描述"
      width="120">
    </el-table-column>
    <el-table-column
      prop="picname"
      label="图片路径"
      width="120">
     <template slot-scope="scope" class="imgbox">
              <img v-for="item in scope.row.picname" :key="item" :src="item" width="40" height="40" class="head_pic"/>
            </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
         <el-button
          @click.native.prevent="deleteRow(scope.$index, myproductList)"
          type="text"
          size="small">
          移除
        </el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import { mapState, mapActions,mapMutations } from "vuex"
import TopNav from '../components/TopNav.vue'
export default {
     components:{TopNav},
    data(){
        return{
            myproductList:[],
        }
    },
    computed: {
    ...mapState(
        {allproduct:'allproduct'}
    )
   },
   created(){
        var user = this.$store.state.user[0].username;
        console.log(user)
        this.myproductList = this.allproduct.filter((item) => item.user_id === user)
    },
    methods:{
         deleteRow(index, rows) {
          //  rows.splice(index)
          //   Message.success('删除成功')   
         this.$axios.get(`/api/deleteBook`,{
           params:{
             id:rows[index].id
           }
         })
        .then(res=>{
          Message.success('删除成功')

        }
        )
        .catch(err=>console.log(err)) 
      }
     
    }
}
</script>