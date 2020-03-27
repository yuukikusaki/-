<template>
  <div class="account-setting">
    <h2>修改头像</h2>
    <!-- 头像区 -->
    <el-upload
      class="avatar-uploader"
      style="margin-left:30px;"
      :http-request="uploadAvatar"
      action="fakeaction"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img :src="avatarUrl" class="avatar" />
    </el-upload>

    <!-- 基础信息 -->
    <el-divider></el-divider>
    <h2>基础信息</h2>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="80px"
      class="user-form"
    >
      <!-- 用户名 -->
      <el-form-item label="用户名:">
        <span>{{userForm.username}}</span>
      </el-form-item>
      <!-- 个性签名 -->
      <el-form-item label="个性签名:" prop="sign">
        <el-input type="textarea" :rows="2" placeholder="设置您的签名- ( ゜- ゜)つロ" v-model="userForm.sign"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别:">
        <el-radio v-model="userForm.sex" label="男"></el-radio>
        <el-radio v-model="userForm.sex" label="女"></el-radio>
        <el-radio v-model="userForm.sex" label="保密"></el-radio>
      </el-form-item>
      <!-- 生日 -->
      <el-form-item label="生日:">
        <el-date-picker
          v-model="userForm.birthday"
          type="date"
          :placeholder="userForm.birthday?userForm.birthday:'选择日期'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
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
    <h2>修改密码</h2>
    <el-form ref="passFormRef" :model="passForm" :rules="passFormRules" label-width="80px">
      <el-form-item label="原密码:" prop="oldpass">
        <el-input placeholder="请输入原密码" v-model="passForm.oldpass" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newpass">
        <el-input placeholder="请输入新密码" v-model="passForm.newpass" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePass">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义规则，原密码检测
    const validateOldPass = (rule, value, callback) => {
      window.console.log(this.userForm.oldpass);
      if (value == null) {
        callback(new Error("请输入原密码!"));
      } else if (value !== this.userForm.oldpass) {
        callback(new Error("原密码错误!"));
      } else {
        callback();
      }
    };
    // 自定义规则，新密码检测
    const validateNewPass = (rule, value, callback) => {
      if (value == null) {
        callback(new Error("请输入新密码!"));
      } else if (value === this.userForm.oldpass) {
        callback(new Error("不能和原密码一样!"));
      } else {
        callback();
      }
    };
    return {
      avatarUrl: "",
      userForm: {}, // 用户表单信息
      userFormRules: {
        sign: [
          { min: 0, max: 80, message: "不能超出80个字符", trigger: "blur" }
        ]
      },
      passForm: {}, // 用户密码表单信息
      passFormRules: {
        // 验证密码是否合法
        oldpass: [
          {
            required: true,
            validator: validateOldPass,
            trigger: "blur"
          }
        ],
        newpass: [
          { required: true, validator: validateNewPass, trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserInfo(); // 获取用户信息
  },
  methods: {
    // 获取信息
    getUserInfo() {
      const userinfo = this.$store.getters.getUserInfo;
      this.userForm = {
        userid: userinfo.userid,
        username: userinfo.username,
        oldpass: userinfo.password,
        sex: userinfo.sex,
        birthday: userinfo.birthday.split("T")[0],
        // emial:this.userinfo.emial,
        // mobile:this.userinfo.mobile,
        sign: userinfo.sign
      };
      this.avatarUrl = userinfo.avatar;
      this.passForm = {
        userid: userinfo.userid,
        oldpass: null,
        newpass: null
      };
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
    // 上传头像
    async uploadAvatar(paramas) {
      const form = new FormData();
      form.append("avatar", paramas.file);
      form.append("userid", this.userForm.userid);
      const { data: res } = await this.$http.post("user/avatar", form, {
        headers: {
          "Content-type": "mulipart/form-data",
        }
      });
      window.console.log('res',res);
      if (res.status !== 0) return this.$message.error(res.message);
      this.$message.success(res.message);
      await this.$store.dispatch("getUserInfo");
      this.getUserInfo();
      this.$emit("changeAvatar",this.avatarUrl);
      // 刷新页面？
      // this.$router.go(0);
    },
    // 上传
    onSubmit() {
      this.$refs.userFormRef.validate(async vaild => {
        if (!vaild) return;
        const { data: res } = await this.$http.post(
          "user/setting",
          this.userForm
        );
        if (res.status !== 0) return this.$message.error(res.message);
        this.$message.success(res.message);
        await this.$store.dispatch("getUserInfo");
        this.getUserInfo();
        // this.$router.go(0);
      });
    },
    // 修改密码
    changePass() {
      this.$refs.passFormRef.validate(async vaild => {
        if (!vaild) return;
        const { data: res } = await this.$http.post(
          "user/changepass",
          this.passForm
        );
        if (res.status !== 0) return this.$message.error(res.message);
        this.$message.success(res.message);
        await this.$store.dispatch("getUserInfo");
        this.getUserInfo();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>