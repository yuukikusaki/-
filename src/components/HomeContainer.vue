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
          <img width="50px" height="50px" src="../assets/head.jpg" />
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
        <!-- 退出登录 -->
        <el-button type="danger" @click="logout">退出登录</el-button>
      </el-aside>
      <!-- 右侧内容主体区 -->
      <el-main>
        <router-view :activePath="activePath" @changeActivePath="saveNavState"></router-view>
        <!-- 游戏卡片区 -->
        <!-- <div class="card-list">
            <div class="game-card" v-for="(item,index) in gameList" :key="index">
              <img :src="item.img" />
              <div class="game-info">
                <span>{{item.name}}</span>
                <el-button
                  type="danger"
                  size="small"
                  @click="$router.push({path:'/lobby',query:{id:item.id}})"
                >进入游戏</el-button>
              </div>
            </div>
        </div>-->
      </el-main>
    </el-container>
  </el-container>
  <!-- 游戏列表区 -->
  <!-- <aside class="game-list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>游戏列表</span>
        </div>
        <div v-for="(item,index) in gameList" :key="index++" class="text item">
          <span>{{index}}</span>
          <span>{{item.name}}</span>
          <span>{{item.type}}</span>
        </div>
      </el-card>
  </aside>-->
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
      isCollapse: false, // 是否折叠
      activePath: "", // 被激活的链接地址
      gameList: []
    };
  },
  created() {
    // this.getGameList();
    this.getUserInfo();
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 返回大厅
    back() {
      this.$router.push("/lobby");
      this.activePath = "";
    },
    // 退出登录
    logout() {
      this.$cookies.remove("token");
      this.$router.push("login");
    },
    // 获取用户信息并存入 store
    async getUserInfo() {
      await this.$store.dispatch("getUserInfo");
      this.userinfo = this.$store.getters.getUserInfo;
    },
    // 获取菜单
    async getMenuList() {
      // 判断 store 里面有没有
      const { data: res } = await this.$http.get("user/menus");
      window.console.log(res);
      if (res.meta.status !== 0) {
        return this.$message.error("获取用户菜单失败");
      }
      this.menulist = res.data; // 需要存入 store
      window.console.log(this.menulist);
    },
    // 菜单折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },

    getGameList() {
      this.gameList = this.$store.getters.getGameList;
    },
    test() {
      this.$http.get("users/test");
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
}

// 游戏列表区 start
// .game-list {
//   width: 180px;
//   position: fixed;
//   top: 50%;
//   transform: translateY(-50%);
// }
// .item {
//   margin-bottom: 18px;
// }

// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }
// .text {
//   display: flex;
//   justify-content: space-between;
// }
// 游戏列表区 end

// 游戏卡片区 start
// .game-container {
//   margin-left: 180px;
// }
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