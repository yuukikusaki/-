<template>
  <div class="account-setting">
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="80px"
      class="user-form"
    >
      <el-form-item label="更换头像" prop="avatar">
        <!-- 头像区 -->
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/images/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item label="用户名:">
        <span>{{userinfo.username}}</span>
      </el-form-item>
      <!-- 个性签名 -->
      <el-form-item label="个性签名:" prop="sign">
        <el-input type="textarea" :rows="2" :placeholder="userinfo.sign" v-model="userForm.sign"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别:">
        <el-radio v-model="userForm.sex" label="1">男</el-radio>
        <el-radio v-model="userForm.sex" label="2">女</el-radio>
        <el-radio v-model="userForm.sex" label="3">保密</el-radio>
      </el-form-item>
      <!-- 生日 -->
      <el-form-item label="生日:">
        <el-date-picker v-model="userForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <!-- 邮箱 -->
      <!-- <el-form-item label="邮箱:"></el-form-item> -->
      <!-- 手机 -->
      <!-- <el-form-item label="手机:"></el-form-item> -->
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 密码 -->
    <el-divider></el-divider>
    <el-form ref="userFormRef" :model="passForm" :rules="passFormRules" label-width="80px">
      <el-form-item label="原密码:" prop="oldpass">
        <el-input placeholder="请输入原密码" v-model="passForm.oldpass" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newpass">
        <el-input placeholder="请输入新密码" v-model="passForm.newpass" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义规则，原密码检测
    const validatePass = (rule, value, callback) => {
      window.console.log(this.userinfo.password);
      if (value !== this.userinfo.password) {
        callback(new Error("原密码错误!"));
      }
    };
    return {
      userinfo: {}, // 用户信息
      imageUrl: "",
      userForm: {}, // 用户表单信息
      userFormRules: {
        sign: [
          { min: 0, max: 80, message: "不能超出80个字符", trigger: "blur" }
        ]
      },
      passForm: {}, // 用户密码表单信息
      passFormRules: {
        // 验证密码是否合法
        oldpass: [{ required: true, validator: validatePass, trigger: "blur" }],
        newpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getUserInfo(); // 获取用户信息
  },
  methods: {
    getUserInfo() {
      this.userinfo = this.$store.getters.getUserInfo;
      window.console.log(this.userinfo);
    },
    // 头像上传成功的情况
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传前检查
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传
    onSubmit() {
      this.$refs.userFormRef.validate(async vaild=>{
          if(!vaild) return;
          const {data:res} = await this.$http.post(
          "user/setting",this.registerForm
        );
        window.console.log(res)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  width: 178px;
  height: 178px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>