<template>
  <div class="lobby-container">
    <!-- <h2 style="margin:0">游戏大厅</h2> -->
    <!-- 游戏房间列表 -->
    <div class="game-room">
      <el-card :body-style="{ padding: '0px' }" v-for=" room in roomList" :key="room.rid">
        <div class="game-info">
          <div class="game-img">
            <img :src="gameList[room.gid].img" />
          </div>
          <div class="game-join">
            <div>
              <span>房间人数</span>
              <span>{{room.pNum}}/{{room.limit}}</span>
            </div>
            <div class="bottom clearfix">
              <el-button
                :disabled="room.pNum===room.limit"
                type="primary"
                round
                @click="joinRoom(room,gameList[room.gid].path)"
              >进入房间</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 创建房间 -->
    <el-button type="primary" id="create-room" @click="dialogVisible = true">创建房间</el-button>
    <!-- 弹窗区 -->
    <el-dialog title="创建房间" :visible.sync="dialogVisible" width="350px">
      <!-- <p>游戏名称：{{gameInfo.name}}</p> -->
      <el-form label-width="80px">
        <!-- 选择游戏类型 -->
        <el-form-item label="游戏房间">
          <el-select v-model="newRoom.gid" placeholder="请选择">
            <el-option v-for="item in gameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="crtNewRoom(newRoom.gid)">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, // 是否打开弹窗
      // gameId: null,
      gameList: [], // 游戏列表
      newRoom: {
        // 创建的新房间信息
        rid: null,
        gid: 0,
        rpass: null
      },
      // roomPass: null, // 房间密码
      roomList: [], // 房间列表
      realLength: 0 // 真实房间长度
    };
  },
  sockets: {
    connect() {
      window.console.log("连接成功");
    },
    rooms(roomList) {
      this.flashRooms(roomList);
    }
  },
  created() {
    // this.getGameId();
    this.getGameList(); // 获取游戏列表
    this.getRooms(); // 获取游戏房间
  },
  methods: {
    // 获取游戏id
    // getGameId() {
    //   this.gameId = this.$route.query.id;
    // },
    // 从 store 中获取游戏列表
    getGameList() {
      this.gameList = this.$store.getters.getGameList;
      window.console.log(this.gameList);
    },
    // 获取房间列表
    getRooms() {
      this.$socket.emit("flashroom");
      // 改为 socket 获取列表
      // this.roomList = this.$store.getters.getRoomList;
    },
    // 更新房间列表
    flashRooms(roomList) {
      window.console.log("flash");
      this.realLength = roomList.length;
      this.roomList = roomList.filter(item => item);
      window.console.log(roomList);
    },
    // 创建新房间
    crtNewRoom(gid) {
      this.newRoom.rid = this.realLength;
      window.console.log(this.newRoom);
      // 应该是向服务器发送消息
      this.$socket.emit("crtroom", this.newRoom);
      this.dialogVisible = false;
      this.joinRoom(this.newRoom, this.gameList[gid].path); // 加入房间
    },
    // 加入房间
    joinRoom(room, path) {
      if (room.pNum && room.pNum === room.limit) {
        return;
      }
      this.$socket.emit("joinRoom", {
        index: room.rid, // 房间号
        userid: this.$store.getters.getUserInfo.userid,
        username: this.$store.getters.getUserInfo.username,
        avatar: this.$store.getters.getUserInfo.avatar
      });
      this.$router.push({
        path,
        query: { rid: room.rid }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.lobby-container {
  background-color: rgb(161, 180, 241);
  height: 100%;
}
.game-room {
  // margin-top: 10px;
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
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
// .el-input {
//   width: 70%;
// }
</style>