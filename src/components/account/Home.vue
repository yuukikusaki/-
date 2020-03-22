<template>
  <div class="account-home">
    <!-- 用户介绍区 -->
    <div style="height:300px" class="home-info">
      <!-- 头像 -->
      <img src="../../assets/head.jpg" alt class="avatar" />
      <!-- 个人信息区 -->
      <div class="msg">
        <div class="top-msg">
          <span class="name-msg">{{userinfo.username}}</span>
          <span class="role-msg"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {}
    };
  },
  created() {
    this.getUserInfo(); // 获取用户信息
  },
  methods: {
    getUserInfo() {
      this.userinfo = this.$store.getters.getUserInfo;
      window.console.log(this.userinfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.account-home {
  padding: 20px;
}
.home-info {
  display: flex;
  .msg {
    margin-left: 15px;
  }
  .name-msg {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #fb7299;
  }
}
.avatar {
  width: 100px;
  height: 100px;
}
</style>