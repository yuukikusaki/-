<template>
  <div>
    <aside class="info-container">个人信息区</aside>
    <div class="lobby-container">
      <!-- 游戏房间列表 -->
      <div class="game-room">
        <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in roomList" :key="index">
          <div class="game-info">
            <div class="game-img">
              <img
                :src="gameInfo.img"
              />
            </div>
            <div class="game-join">
              <span>房间人数</span>
              <div class="bottom clearfix">
                <el-button type="primary" round
                @click="$router.push({
                  path:'/battle',
                  query:{gameID:gameInfo.id,roomID:o.roomID}})">进入房间</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- 创建房间 -->
      <el-button type="primary" id="create-room" @click="dialogVisible = true">创建房间</el-button>
      <!-- 弹窗区 -->
      <el-dialog title="创建房间" :visible.sync="dialogVisible" width="30%">
        <p>游戏名称：{{gameInfo.name}}</p>
        <div class="setPass">
          <span>房间密码：</span>
          <el-input placeholder="请输入密码" v-model="roomPass" show-password
          maxlength="6"></el-input>
        </div>
        <!-- 关闭区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createNewRoom()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, // 是否打开弹窗
      gameId: null,
      gameInfo: {}, // 游戏信息
      roomPass: null, // 房间密码
      roomList:[], // 房间列表
    };
  },
  created() {
    this.getGameId();
    this.getGameInfo();
    this.getRoomList();
  },
  methods: {
    // 获取游戏id
    getGameId() {
      this.gameId = this.$route.query.id;
    },
    // 从 store 中获取游戏信息
    getGameInfo() {      
      this.gameInfo = this.$store.getters.getGameList[this.gameId - 1];
      window.console.log(this.gameInfo);
    },
    // 获取游戏列表
    getRoomList(){
      this.roomList = this.$store.getters.getRoomList;
    },
    // 创建新房间
    createNewRoom(){
      let newRoomInfo = {};
      newRoomInfo.roomID = this.roomList.length+1;
      newRoomInfo.roomName = this.gameInfo.name;
      newRoomInfo.roomPass = this.roomPass;
      // 应该是向服务器发送消息
      this.$store.commit('addNewRoom',newRoomInfo);
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
// 整体布局
.info-container {
  width: 180px;
  height: 500px;
  position: fixed;
  top: 20%;
  background-color: #ccc;
}
.lobby-container {
  background-color: skyblue;
  height: 800px;
  margin-left: 180px;
  padding: 0 20px;
}

// 主体区域
.el-card {
  margin-bottom: 10px;
}
.el-button {
  font-size: 16px;
}
.game-info {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .game-img {
    align-self: center;
    height: 180px;
    width: 180px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .game-join {
    align-self: center;
  }
}
// 创建房间
#create-room {
  position: fixed;
  bottom: 20px;
  right: 70px;
}
.el-input{
  width: 70%;
}
</style>