<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" width="55px" height="55px" alt />
        <span>网络游戏大厅</span>
      </div>
      <el-button type="info" @click="back">返回大厅</el-button>
    </el-header>
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏用户信息区 -->
        <div class="userinfo">
          <img width="50px" height="50px" :src="userinfo.avatar" />
          <span style="font-size:18px">{{userinfo.username}}</span>
        </div>
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="`${item.id}`" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="`/${subItem.path}`"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState(`\/${subItem.path}`)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体区 -->
      <el-main>
        <router-view
          :activePath="activePath"
          :sideAvatar="userinfo.avatar"
          @changeActivePath="saveNavState"
          @changeAvatar="changeAvatar"
        ></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {}, // 用户信息
      menulist: [], // 左侧菜单
      iconsObj: {
        "101": "el-icon-user",
        "201": "el-icon-chat-dot-round",
        "301": "el-icon-s-data"
      },
      isCollapse: true, // 是否折叠
      activePath: "", // 被激活的链接地址
      gameList: []
    };
  },
  created() {
    this.getUserInfo();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 返回大厅
    back() {
      this.$router.push("/lobby");
      this.activePath = "";
    },
    // 获取用户信息并存入 store
    async getUserInfo() {
      await this.$store.dispatch("getUserInfo");
      this.userinfo = this.$store.getters.getUserInfo;
      this.getMenuList();
    },
    // 获取菜单
    async getMenuList() {
      // 判断 store 里面有没有
      window.console.log("userinfo", this.userinfo);
      const { data: res } = await this.$http.get(
        `user/menus?userid=${this.userinfo.userid}`
      );
      window.console.log(res);
      if (res.meta.status !== 0) {
        return this.$message.error("获取用户菜单失败");
      }
      this.menulist = res.data; // 需要存入 store
    },
    // 菜单折叠与展开
    toggleCollapse() {
      // 移动端禁止展开
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian)/i
        )
      ) {
        return;
      }
      // if(Navigator.users)
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    // 改变侧边栏头像
    changeAvatar(avatar) {
      this.userinfo.avatar = avatar;
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #082c46;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
    }
  }
}

.el-aside {
  display: flex;
  flex-flow: column;
  background-color: #333744;
  .userinfo {
    margin: 50px 0 20px;
    align-self: center;
    display: flex;
    flex-flow: column;
    text-align: center;
    span {
      margin-top: 10px;
    }
  }
  .el-menu {
    border-right: none;
    span {
      margin-left: 10px;
    }
  }
  .el-button {
    margin-top: 50px;
    align-self: center;
  }
}

// 侧边按钮
.toggle-button {
  background-color: #4a5064;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}

// 主体区
.el-main {
  border: 1px solid #e1e2e5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
  margin: 20px 20px 0;
  padding: 0;
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 50px;
}
.game-card {
  width: 25%;
  margin: 30px 30px;
  padding: 5px;
  img {
    display: inline-block;
    width: 100%;
    height: 200px;
  }
  .game-info {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
  }
}
// 游戏卡片区 end
</style>