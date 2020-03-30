<template>
  <div id="battle-contaioner">
    <!-- 左边是我 -->
    <div class="left">
      <div v-if="myUserInfo" class="users">
        <img :src="myUserInfo.avatar" alt />
        <div class="userinfo">
          <span>{{myUserInfo.username}}</span>
        </div>
      </div>
      <el-button v-if="isready" type="danger" @click="onready()" :disabled="isstart">取消</el-button>
      <el-button v-else type="success" @click="onready()">准备</el-button>
    </div>
    <!-- 中间 canvas -->
    <canvas id="mycanvas" width="800" height="600"></canvas>
    <!-- 右边对手 -->
    <div class="right">
      <div v-if="rightUserInfo" class="users">
        <img :src="rightUserInfo.avatar" alt />
        <div class="userinfo">
          <span>{{rightUserInfo.username}}</span>
        </div>
      </div>
      <span>{{rightReady}}</span>
    </div>
  </div>
</template>

<script>
import SceneManager from "../../js/morra/SceneManager";

export default {
  data() {
    return {
      myUserInfo: {}, // 左边边玩家，我自己
      rightUserInfo: {}, // 右边，对手
      isready: false, // 是否准备
      rightReady:"未准备", // 右边是否准备
      isstart:false, // 是否开始 
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.setCanvas();
    window.addEventListener("beforeunload", e => this.leaveRoom(e)); // 刷新或销毁的情况下
  },
  beforeDestroy() {
    this.leaveRoom(); // 退出时离开房间
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.leaveRoom);
  },
  methods: {
    // 获取自己的信息
    getUserInfo() {
      this.myUserInfo = this.$store.getters.getUserInfo;
    },
    // 设置 canvas
    setCanvas() {
      this.canvas = document.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.sceneManager = new SceneManager(this.canvas, this.ctx, this.$socket);
      this.sceneManager.enter();
    },
    // 初始化玩家信息
    setPlayers(playerlist) {
      playerlist.map(item => {
        if (item.userid === this.myUserInfo.userid) {
          this.myUserInfo = item;
        } else {
          this.rightUserInfo = item;
        }
      });
    },
    // 准备按钮
    onready() {
      this.$socket.emit("onready");
    },
    // 离开房间
    leaveRoom(e) {
      this.$socket.emit("leave", this.userinfo);
      if (e) {
        e.returnValue = "确定要关闭页面吗";
      }
      return;
    }
  },
  sockets: {
    // 玩家加入游戏
    playerjoin(playerlist) {
      //  设置对手
      window.console.log(playerlist);
      this.setPlayers(playerlist);
      //   this.sceneManager.setPlayers();
    },
    // 准备
    ready(readyID) {
      window.console.log(readyID);
      if (readyID === this.myUserInfo.userid) {
        this.isready = !this.isready;
      }else if(readyID === this.rightUserInfo.userid){
        this.rightReady=this.rightReady === "准备"?"未准备":"准备"
      }
    },
    // 开始游戏
    start(){
      window.console.log("start");
      this.isstart = true;
      this.sceneManager.sceneNumber = 2;
      this.sceneManager.enter();
    }
  }
};
</script>

<style lang="scss" scoped>
#battle-contaioner {
  display: flex;
  .left,
  .right {
    width: 50px;
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    align-items: center;
    .users {
      margin-top: 100px;
      .userinfo {
        margin-top: 8px;
        display: flex;
        justify-content: center;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
  img {
    width: 120px;
    height: 120px;
  }
}
canvas {
  background-color: #ccc;
  margin: 0 auto;
}
</style>