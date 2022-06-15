<template>
    <div class="TopNav">
        <div class="nav">
          
             <el-row :gutter="20">
                 <el-col :span="10" class='logo-container'>
                    <span class='title' @click="toHome()">二手图书交易平台</span>
                    <i class="el-icon-notebook-2 el-icon--right"></i>
                </el-col>
                <el-col :span="2" :offset="6" class='logo-container'>
                <div class="put" @click="put()">发布商品</div>
                </el-col>
                <el-col :span='3' class="user">
                <div class="userinfo">
                    <img class="avatar" :src='user[0].avatar' alt />
                        <div class='welcome'>
                            <p class='name comename'>欢迎</p>
                            <p class='name avatarname'>{{user[0].username}}</p>
                        </div>
                        <span class='username'>
                            <el-dropdown
                                    trigger="click"
                                    @command='setDialogInfo'>
                                <span class="el-dropdown-link">
                                    <i class="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command='info'>编辑个人资料</el-dropdown-item>
                                    <el-dropdown-item command='my_product'>我的二手</el-dropdown-item>
                                    <el-dropdown-item command='message'>我的消息</el-dropdown-item>
                                    <el-dropdown-item command='logout'>退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                    </div>
                </el-col>
        </el-row>
        </div>
        
  </div>
</template>
<script>
export default {
    name:'TopNav',
    created(){
    //在页面刷新时将vuex里的信息保存到localStorage里
    // window.addEventListener("beforeunload",()=>{    	
    //     localStorage.setItem("messageStore",JSON.stringify(this.$store.state))})
    // //在页面加载时读取localStorage里的状态信息
    // localStorage.getItem("messageStore") &&this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
},
    computed: {
    user() {
      return this.$store.getters.user;
    }
  },
     methods: {
    setDialogInfo(cmditem) {
      if (!cmditem) {
        console.log("test");
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "info":
          this.edit();
          break;
        case "my_product":
          this.showInfoList();
          break;
        case "message":
          this.message();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    edit(){
      this.$router.push("/editInfo");
    },
    showInfoList() {
      // 个人发布的商品
      this.$router.push("/myProduct");
    },
    message() {
      // 个人发布的商品
      this.$router.push("/message");
    },
    logout() {
      // 清除token
      localStorage.removeItem("token");
      // localStorage.removeItem("messageStore")
      // localStorage.removeItem("userInfo")
      this.$store.dispatch("clearCurrentState");

      // 页面跳转
      this.$router.push("/login");
    },
    put(){
      this.$router.push("/addbook");
    },
    toHome(){
      this.$router.push("/home");
    },
   
  }
}
</script>

<style scoped>
.nav {
  width: 99%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  /* min-width: 400px; */
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.put{
  cursor: pointer;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
.title {
  cursor: pointer;
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
  margin-right: 129px;
}
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.userinfo{
  cursor: pointer;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
