<template>
  <div class="lobby-container">
    <!-- 游戏列表区 -->
    <aside class="game-list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>游戏列表</span>
        </div>
        <div
          v-for="(item,index) in gameList"
          :key="index++"
          class="text item"
        >
        <span>{{index}}</span>
        <span>{{item.name}}</span>
        <span>{{item.type}}</span>
        </div>
      </el-card>
    </aside>
    <!-- 游戏卡片区 -->
    <router-view></router-view>
    <div class="card-list">
      <div class="game-card" v-for="(item,index) in gameList" :key="index">
        <img :src="item.img" />
        <div class="game-info">
          <span>{{item.name}}</span>
          <el-button type="danger" size="small" @click="$router.push({path:'/lobby',query:{id:item.id}})">进入游戏</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameList: []
    };
  },
  created() {
    this.getGameList();
  },
  methods: {
    getGameList(){
      this.gameList = this.$store.getters.getGameList
    },
    test(){
      this.$http.get('users/test');
    }
  },
};
</script>

<style lang="scss">
.lobby-container {
  display: flex;
}
// 游戏列表区 start
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.game-list {
  width: 400px;
}
.text{
  display: flex;
  justify-content: space-between;
}
// 游戏列表区 end

// 游戏卡片区 start
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