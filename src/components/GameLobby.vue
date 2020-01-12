<template>
  <div>
    <aside class="info-container">个人信息区</aside>
    <main class="lobby-container">
      <!-- gameRoomList -->
      <div class="game-room">
        <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in 2" :key="index">
          <div class="game-info">
            <div class="game-img">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              />
            </div>
            <div class="game-join">
              <span>房间人数</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">进入房间</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// 整体布局
.info-container {
  width: 180px;
  height: 500px;
  position: fixed;
  background-color: #ccc;
}
.lobby-container {
  background-color: skyblue;
  height: 800px;
  margin-left: 180px;
}

// 主体区域
.el-card{
      margin-bottom: 10px;
}
.game-info {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .game-img {
      align-self: center;
      height: 180px;
      width: 180px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
  }
  .game-join {
    align-self: center;
  }
  .el-button {
    padding-bottom: 0;
  }
}
</style>