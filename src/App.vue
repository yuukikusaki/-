<template>
  <div id="app">
    <!-- header start -->
    <header>
      <!-- 页面选择 -->
      <nav class="header-left">
        <span>
          <router-link to="/home" class="router el-icon-s-home">大厅</router-link>
        </span>
        <span>
          <router-link to class="router el-icon-tickets">对战记录</router-link>
        </span>
      </nav>
      <!-- 中间栏 -->
      <nav class="header-center"></nav>
      <!-- 登录注册 -->
      <nav class="header-right">
        <!-- 未登录 -->
        <div v-if="isLogin">
          <span>
            <img src="./assets/head.jpg" alt />
          </span>
          <span>
            <a @click="showLoginDialog=true" class="router">{{userInfo.name}}</a>
          </span>
          <span>
            <a @click="showRegisterDialog=true" to class="router">注销</a>
          </span>
        </div>
        <!-- 已登录 -->
        <div v-else>
          <span>
            <img src="./assets/head.jpg" alt />
          </span>
          <span>
            <a @click="showLoginDialog=true" class="router">登录</a>
          </span>
          <span>
            <a @click="showRegisterDialog=true" to class="router">注册</a>
          </span>
        </div>
      </nav>
    </header>
    <!-- header end -->

    <!-- main start -->
    <main>
      <router-view></router-view>
    </main>
    <!-- main end -->

    <!-- dialog start-->
    <!-- 登录 -->
    <el-dialog title="登录" width="30%" :visible.sync="showLoginDialog">
      <el-form label-width="80px" :model="userLoginInfo" ref="userLoginInfo">
        <el-form-item label="账户" prop="name">
          <el-input v-model="userLoginInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="userLoginInfo.pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showLoginDialog = false;cancel('userLoginInfo')">取消</el-button>
          <el-button type="primary" @click="userLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 注册 -->
    <el-dialog title="注册" width="30%" :visible.sync="showRegisterDialog">
      <el-form
        label-width="80px"
        status-icon
        :model="userRegisterInfo"
        :rules="rules"
        ref="userRegisterInfo"
      >
        <el-form-item label="账户" prop="name">
          <el-input v-model="userRegisterInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="userRegisterInfo.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userRegisterInfo.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showRegisterDialog = false;cancel('userRegisterInfo')">取消</el-button>
          <el-button
            type="primary"
            @click="showRegisterDialog = false;userRegister('userRegisterInfo')"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- dialog end -->
  </div>
</template>

<script>
export default {
  data() {
    // 确认密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userRegisterInfo.checkPass !== "") {
          this.$refs.userRegisterInfo.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userRegisterInfo.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      showLoginDialog: false,
      showRegisterDialog: false,
      isLogin: false, // 是否登录
      userLoginInfo: {
        // 用户登录信息
        name: "",
        pass: ""
      },
      userRegisterInfo: {
        // 用户注册信息
        name: "",
        pass: "",
        checkPass: ""
      },
      userInfo: {},
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 注册
    userRegister(userInfo) {
      // 对特定数据验证，发送注册请求
      this.$refs[userInfo].validate(valid => {
        if (valid) {
          const us = {
            name: this.userRegisterInfo.name,
            pass: this.userRegisterInfo.pass,
          };
          this.$http.post("users/regist", us).then(result => {
            window.console.log(result.body);
            this.showRegisterDialog = false;
          });
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    cancel(userInfo) {
      // 清除 dialog 数据
      this.$refs[userInfo].resetFields();
    },
    // 登录
    userLogin() {
      let info = this.userLoginInfo;
      if (info.name && info.pass) {
        this.$http
          .post("users/login", info, { credentials: true })
          .then(result => {
            window.console.log(result.body);
            if (result.body.status === 0) {
              window.console.log(this.$cookies.get("username"));
              this.userInfo = result.body.message[0];
              this.isLogin = true;
              this.showLoginDialog = false;
            }
          });
      } else {
        alert("账号或密码不能为空！");
      }
    }
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

header {
  background-color: #999;
  height: 30px;
  padding: 10px 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    display: inline-block;
    font-size: 18px;
    margin-right: 12px;
    cursor: pointer;
    min-width: 80px;
    vertical-align: middle;
    img {
      width: 36px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .router {
    color: #fff;
    text-decoration: none;
    font-style: normal;
  }
}

main {
  margin-right: 100px;
}
</style>
