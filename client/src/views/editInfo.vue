<template>
<div class="addBook">
  <top-nav></top-nav>
    <div class="formBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="输入新昵称" prop="bookname">
             <el-input v-model="ruleForm.username"></el-input>
           </el-form-item>
           <div class="edit_avatar">
             <span class="font">更换新头像</span>
             <input type="file" accept="image/*" ref="file">
           </div>
           <el-form-item>
             <el-button type="primary" @click="submitForm('ruleForm')">立即更改</el-button>
             <el-button @click="ToHome()">返回主页</el-button>
           </el-form-item>
         </el-form>
    </div>

</div>
  
</template>

<script>
import { Message } from 'element-ui';
import TopNav from '../components/TopNav.vue'

// import qs from 'qs'
export default {
   components:{TopNav},
    data() {
      return {
        ruleForm: {
          username: '',
          preusername:''
        },
        rules: {
          username: [
            { required: true, message: '请输入新名称', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$refs.file.files[0]==undefined ? Message.warning('还未上传图片'): this.sendAllData(); 
            this.sendAllData();           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ToHome() {
         this.$router.push("/home");
      },
      // 提交数据
      sendAllData(){
        let userinfo = this.$store.getters.user;
        this.ruleForm.preusername = userinfo[0].username;
        let formData1=new FormData();
        formData1.append('data',JSON.stringify(this.ruleForm));
        formData1.append('avatar',this.$refs.file.files[0]);
        console.log(this.ruleForm)
        // 参数不应该这么传，这样传过去的话后端只能接收到userinfo[0].username 
        this.$axios.post(`/api/editInfo/${userinfo[0].account}`,formData1,{headers:{'Content-Type':'multipart/form-data'}})
        .then(res=>
            this.$axios.get(`/api/getUser?account=${userinfo[0].account}`).then((res,req)=>{
                console.log(res.data) 
                this.$store.dispatch("setUser", res.data);
                location.reload() 
            }), 
        Message.success('更改成功')
        )
        .catch(err=>console.log(err)) 
      },
    }
}
</script>

<style scoped>
.addStudent{
    position: relative;
}
.edit_avatar{
    height: 99px;
    margin-top: 30px;
    text-align: left;
}
.font{
  font-size: 14px;
    color: #606266;
    padding-right: 28px;
    margin-left: 17px;
}
.formBox{
    margin-top: 80px;
    width: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

}

</style>