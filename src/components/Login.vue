<template>
  <div class="login-container">
    <!-- 登录盒子 -->
    <div class="login-box" v-if="loginBox">
      <!-- 头像区 -->
      <div class="avatar-box">
        <img src="../assets/head.jpg" alt="头像" />
      </div>
      <!-- 登录表单区 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="userFormRules"
        label-width="0px"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 单选框 -->
        <div class="login-choose">
          <el-form-item prop="autologin">
            <el-checkbox v-model="loginForm.autologin" label="下次自动登录"></el-checkbox>
          </el-form-item>
          <!-- 按钮区 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="loginBox=false">跳转注册</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 注册盒子 -->
    <div class="register-box" v-else>
      <!-- 注册表单区 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="userFormRules"
        label-width="80px"
        label-position="left"
        class="register-form"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 再出输入密码 -->
        <el-form-item label="确认密码" prop="checkpass">
          <el-input v-model="registerForm.checkpass" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="loginBox=true">跳转登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义验证规则：两次输入是否一致
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 登录 or 注册
      loginBox: true,
      // 登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
        autologin: false // 是否自动登录
      },
      // 注册表单的数据绑定对象
      registerForm: {
        username: "",
        password: "",
        checkpass: ""
      },
      // 表单验证规则对象
      userFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证两次输入是否一致
        checkpass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "api/login",
          this.loginForm
        );
        if (res.status !== 0) {
          return this.$message.error("登录失败");
        }
        this.$message.success("登录成功");
        if (this.loginForm.autologin) {
          this.$cookies.set("token", res.token, "7d");
        } else {
          this.$cookies.set("token", res.token, 0);
        }
        this.$router.push("/home");
      });
    },
    // 注册
    register() {
      window.console.log(this.$refs.registerFormRef);
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return;
        const {data:res} = await this.$http.post(
          "api/register",this.registerForm
        );
        if(res.status!==0){
          return this.$message.error(res.message);
        }
        this.$message.success(res.message);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  align-items: center;
}
.login-box,
.register-box {
  margin: 0 auto;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  display: flex;
  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

// 登录表单
.login-form {
  align-self: flex-end;
  width: 100%;
  padding: 0 20px;
  .login-choose {
    display: flex;
    justify-content: space-between;
  }
}
// 注册表单
.register-form {
  width: 100%;
  padding: 0 20px;
  align-self: center;
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>