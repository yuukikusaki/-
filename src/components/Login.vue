<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区 -->
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="头像" />
      </div>
      <!-- 登录表单区 -->
      <el-form label-width="0px" class="login-form">
        <!-- 用户名 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  align-items: center;
}
.login-box {
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

.login-form{
    align-self: flex-end;
    width: 100%;
    padding: 0 20px;
}

.btns{
    display: flex;
    justify-content: flex-end;
}
</style>