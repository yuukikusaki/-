<template>
  <div class="account-home" style="margin:20px">
    <!-- 用户介绍区 -->
    <el-row style="height:160px" class="home-info">
      <!-- 头像 -->
      <el-col :span="3">
        <img :src="userinfo.avatar" alt class="avatar" />
      </el-col>
      <!-- 左边基础信息区 -->
      <el-col class="base-msg" :span="4">
        <!-- 顶部信息 -->
        <div class="top-msg">
          <span class="name-msg" :class="{admin:isAdmin}">{{userinfo.username}}</span>
          <span class="role-admin-msg" v-if="isAdmin">{{userinfo.role_name}}</span>
          <span class="role-msg" v-else>{{userinfo.role_name}}</span>
        </div>
        <!-- 底部 -->
        <div class="bottom-msg">
          <div class="item-uid">
            <span style="background-color:rgba(41, 226, 226, 0.72);padding:2px 4px;">UID</span>
            <span style="margin-left:8px">{{userinfo.userid}}</span>
          </div>
        </div>
      </el-col>
      <!-- 右边经验条 -->
      <el-col class="level-msg" :span="13">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="70" status="warning"></el-progress>
        <span>lv1</span>
      </el-col>
      <!-- 跳转战绩和修改信息 -->
      <el-col class="jump" :span="4">
        <el-button type="primary" @click="jump('/account/record')">查看战绩</el-button>
        <el-button type="info" @click="jump('/account/setting')">修改资料</el-button>
      </el-col>
    </el-row>
    <!-- 游玩信息区 -->
    <div style="height:300px" class="game-info">
      <h1>这里放个人游戏情报</h1>
      <h1>等战绩做好了再加</h1>
      <h1>经验条那种也是</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activePath"],
  data() {
    return {
      userinfo: {}, // 用户信息
      isAdmin: false //  是否是管理员
    };
  },
  mounted() {
    this.getUserInfo(); // 获取用户信息
  },
  methods: {
    getUserInfo() {
      this.userinfo = this.$store.getters.getUserInfo;
      if (/管理员/.test(this.userinfo.role_name)) {
        this.isAdmin = true;
      }
      window.console.log(this.userinfo);
    },
    // 跳转
    jump(path) {
      this.$router.push(path);
      this.$emit("changeActivePath", path);
    }
  }
};
</script>

<style lang="scss" scoped>
// 顶部信息区
.home-info {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e9ef;
  margin-bottom: 30px;
  padding-bottom: 10px;
  // 头像
  .avatar {
    width: 100px;
    height: 100px;
  }
  .base-msg {
    display: flex;
    flex-flow: column;
  }
  // 顶部信息区
  .top-msg {
    // 名字
    .name-msg {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #222;
    }
    .admin {
      color: #fb7299;
    }
    // 级别
    .role-msg {
      border: 1px solid #99a2aa;
      color: #99a2aa;
      font-size: 12px;
      border-radius: 4px;
      padding: 2px 4px;
    }
    .role-admin-msg {
      border: 1px solid #fb7299;
      background-color: #fb7299;
      color: #fff;
      font-size: 12px;
      border-radius: 4px;
      padding: 2px 4px;
    }
  }
  // 底部信息区
  .bottom-msg {
    margin-top: 8px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    // id
    .userid-msg {
      margin-right: 8px;
      font-size: 14px;
    }
  }
  // 经验条区
  .level-msg {
    display: flex;
    .el-progress {
      flex: 9;
    }
    span {
      flex: 1;
      margin-left: 8px;
      align-self: center;
    }
  }
  // 跳转区
  .jump {
    display: flex;
    flex-flow: column;
    align-items: center;
    .el-button {
      margin-bottom: 8px;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
</style>