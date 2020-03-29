<template>
  <div id="battle-contaioner">
    <!-- <div style="width:800px;height:600px;margin:0 auto;"> -->
    <div class="left">
      <div v-if="leftUserInfo" class="users">
        <img :src="leftUserInfo.avatar" alt />
        <div class="userinfo">
          <span>{{leftUserInfo.username}}</span>
        </div>
      </div>
    </div>
    <canvas id="mycanvas" width="800" height="600"></canvas>
    <div class="right">
      <div v-if="rightUserInfo" class="users">
        <img :src="rightUserInfo.avatar" alt />
        <div class="userinfo">
          <span>{{rightUserInfo.username}}</span>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import SceneManager from "../js/fight_the_landlords/SceneManager";
import { My, LeftPlayer, RightPlayer } from "../js/fight_the_landlords/Player";

export default {
  data() {
    return {
      userinfo: {}, // 用户信息
      leftUserInfo: null,
      rightUserInfo: null,
      my: {},
      leftPlayer: {}, // 左边玩家
      rightPlayer: {}, // 右边玩家
      room: null, // 房间信息
      canvas: null, // canvas
      ctx: null, // canvas上下文
      sceneManager: null // 场景管理器
    };
  },
  sockets: {
    // 玩家加入游戏
    playerjoin(playerlist) {
      window.console.log(playerlist);
      this.setPlayers(playerlist);
      this.sceneManager.setPlayers(this.my, this.leftPlayer, this.rightPlayer);
    },
    // 退出房间
    exit(playerlist) {
      this.setCanvas();
      this.setPlayers(playerlist);
      this.sceneManager.setPlayers(this.my, this.leftPlayer, this.rightPlayer);
    },
    // 发牌
    start(req) {
      // 创建三个玩家类
      this.sceneManager.update(req);
      this.sceneManager.sceneNumber = 2;
      this.sceneManager.enter(req.data.sort((a, b) => b.point - a.point));
    },
    // 更新场景管理器（原来的draw）
    update(req) {
      if (typeof req.data == "number") {
        // 抢地主
        this.sceneManager.update(req);
      } else if (typeof req.data == "object") {
        this.sceneManager.update(req);
        window.console.log(req)
        if (req.data.typeRank == "win") {
          alert(req.winner);
          this.setCanvas();
          this.sceneManager.setPlayers(
            this.my,
            this.leftPlayer,
            this.rightPlayer
          );
        }
      }
    },
    // 地主决定
    landlord(req) {
      // 先把最后一个人的选择给渲染上去
      this.sceneManager.update(req);
      // 跳转到场景三
      this.sceneManager.sceneNumber = 3;
      this.sceneManager.enter(req);
    }
  },
  created() {
    this.getUserInfo(); // 获取用户信息
    // this.sendRoom();
  },
  mounted() {
    this.setCanvas();
    this.setPlayerClass(); // 创建玩家类
    window.addEventListener('beforeunload',e=>this.leaveRoom(e)); // 刷新或销毁的情况下
  },
  beforeDestroy(){
    this.leaveRoom(); // 退出时离开房间
  },
  destroyed() {
    window.removeEventListener('beforeunload',this.leaveRoom);
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.userinfo = this.$store.getters.getUserInfo;
    },
    // 设置玩家类
    setPlayerClass() {
      this.my = new My(
        this.canvas.width / 2,
        this.canvas.height / 2 - 50,
        this.canvas.width / 2 - 18,
        (this.canvas.height * 2) / 3
      );
      this.leftPlayer = new LeftPlayer(
        200,
        this.canvas.height / 2 - 120,
        170,
        this.canvas.height / 3
      );
      this.rightPlayer = new RightPlayer(
        this.canvas.width - 300,
        this.canvas.height / 2 - 120,
        this.canvas.width - 250,
        this.canvas.height / 3
      );
    },
    // 设置玩家
    setPlayers(playerlist) {
      playerlist.map((item, index) => {
        if (!item) {
          return;
        }
        if (item.userid == this.userinfo.userid) {
          this.my.userid = item.userid;
          // this.my.username = item.username;
          switch (index) {
            case 0:
              this.leftUserInfo = playerlist[2];
              this.leftPlayer.userid = playerlist[2]
                ? playerlist[2].userid
                : null;
              this.rightUserInfo = playerlist[1];
              this.rightPlayer.userid = playerlist[1]
                ? playerlist[1].userid
                : null;
              break;
            case 1:
              this.leftUserInfo = playerlist[0];
              this.leftPlayer.userid = playerlist[0]
                ? playerlist[0].userid
                : null;
              this.rightUserInfo = playerlist[2];
              this.rightPlayer.userid = playerlist[2]
                ? playerlist[2].userid
                : null;
              break;
            case 2:
              this.leftUserInfo = playerlist[1];
              this.leftPlayer.userid = playerlist[1]
                ? playerlist[1].userid
                : null;
              this.rightUserInfo = playerlist[0];
              this.rightPlayer.userid = playerlist[0]
                ? playerlist[0].userid
                : null;
              break;
            default:
              break;
          }
        }
      });
    },
    // 初始化画布
    setCanvas() {
      this.canvas = document.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      // 创建场景管理器并进入
      this.sceneManager = new SceneManager(this.canvas, this.ctx, this.$socket);
      this.sceneManager.enter();
    },
    // 离开房间 明天要做的部分
    leaveRoom(e) {
      this.$socket.emit("leave", this.userinfo);
      if(e){
        e.returnValue = "确定要关闭页面吗"
      }
      return;
    },

    // sendRoom() {
    //   this.room = this.$route.query;
    // }
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
    .users{
      margin-top: 100px;
      .userinfo{
        margin-top:8px;
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