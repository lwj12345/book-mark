<template>
<div class="addBook">
   <top-nav></top-nav>
    <div class="formBox">
        <!-- :rules="rules" -->
        <el-form :model="ruleForm" id="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="书名" prop="bookname">
             <el-input v-model="ruleForm.bookname"></el-input>
           </el-form-item>
           <el-form-item label="作者" prop="author">
             <el-input v-model="ruleForm.author"></el-input>
           </el-form-item>
           <el-form-item label="价格" prop="price">
             <el-input v-model="ruleForm.price"></el-input>
           </el-form-item>
            <el-form-item label="出售原因" prop="descript">
             <el-input v-model="ruleForm.descript"></el-input>
           </el-form-item>
           <el-form-item label="上传商品图片">
              <el-upload
                class="pic"
                list-type="picture-card"
                action="#"
                ref="upload"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :multiple="true"
                >
            <i class="el-icon-plus"></i>
            </el-upload>
           </el-form-item>
           
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
           <el-form-item>
             <el-button type="primary" @click="submitForm()">立即添加</el-button>
             <el-button @click="resetForm('ruleForm')">重置</el-button>
           </el-form-item>
         </el-form>
    </div>

</div>
  
</template>

<script>
import { Message } from 'element-ui';
import TopNav from '../components/TopNav.vue'
export default {
   components:{TopNav},
    data() {
      return {
        ruleForm: {
          bookname: '',
          author:'',
          descript: '',
          price:'',
        },
        imageUrl:[],
        dialogImageUrl: '',
        dialogVisible: false, 
        rules: {
          bookname: [
            { required: true, message: '请输入书名', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          descript: [
            { required: true, message: '请输入对该商品的描述', trigger: 'blur' }
          ],
          price: [
            //   /^\d{1,6}\.\d{2}$/
            {required: true, pattern:/^\d{1,6}/, message: '价格须为x.xx', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        let userinfo = this.$store.getters.user;
        const pUid = userinfo[0].username
        console.log(pUid)
        const data = {
          bookname:this.ruleForm.bookname,
          author:this.ruleForm.author,
          descript:this.ruleForm.descript,
          price:this.ruleForm.price,
          pUid : pUid
        }
        const fileArray = this.$refs.upload.uploadFiles;
        console.log(fileArray)
        const fd = new FormData();
        for(let i = 0; i < fileArray.length; i++) {
            fd.append('picname', fileArray[i].raw);
        }
        fd.append('data',JSON.stringify(data))
        this.$axios.post('/api/addBook',fd,{headers:{'Content-Type':'multipart/form-data'}})
        .then(res => {
            Message.success('添加成功');
            this.ruleForm = {};
            this.$refs.upload.clearFiles();
        })
},
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 提交图书数据

    }
}
</script>

<style scoped>
.pic{
  text-align: left;
}
#form{
  width: 52%;
    margin: 0 auto;
}
.formBox {
    margin-top: 80px;
}

</style>