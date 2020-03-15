<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" width="55px" height="55px" alt />
        <span>网络游戏大厅</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏用户信息区 -->
        <div></div>
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
          <!-- 一级菜单 -->
          <el-submenu :index="`${item.id}`" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="`${subItem.id}`"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体区 -->
      <el-main>
        <router-view></router-view>
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
      // 左侧菜单
      menulist: [],
      gameList: []
    };
  },
  created() {
    // this.getGameList();
    this.getMenuList();
  },
  methods: {
    // 退出
    logout() {
      this.$cookies.remove("token");
      this.$router.push("login");
    },
    // 获取菜单
    async getMenuList() {
      // 判断 store 里面有没有
      const { data: res } = await this.$http.get("user/menus");
      if (res.meta.status !== 0) {
        return this.$message.error("获取用户菜单失败");
      }
      this.menulist = res.data; // 需要存入 store
      window.console.log(this.menulist);
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
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
  padding: 0;
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