<template>
  <div id="battle-contaioner">
    <div style="width:800px;height:600px;margin:0 auto;">
      <canvas id="mycanvas" width="800" height="600"></canvas>
    </div>
  </div>
</template>

<script>
// import SceneManager from "../js/fight_the_landlords/SceneManager"
import SceneManager from "../js/fight_the_landlords/SceneManager";
import { My, LeftPlayer, RightPlayer } from "../js/fight_the_landlords/Player";

export default {
  data() {
    return {
      userinfo: {}, // 用户信息
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
    //   // 农民
    //   farmer(data){
    //     this.pokerGame.landCard = data[0];
    //     if(data[1]=='left'){
    //       this.pokerGame.left += 3;
    //     }else{
    //       this.pokerGame.right += 3;
    //     }
    //     this.play();  // 需要整合
    //     this.pokerGame.drawFunc();
    //   },
    // 玩家加入游戏
    playerjoin(playerlist) {
      this.setPlayers(playerlist);
      this.sceneManager.setPlayers(this.my, this.leftPlayer, this.rightPlayer);
    },
    // 发牌
    start(req) {
      window.console.log('start',req);
      // 创建三个玩家类
      this.sceneManager.update(req);
      this.sceneManager.sceneNumber = 2;
      this.sceneManager.enter(req.data.sort((a, b) => b.point - a.point));
    },
    // 按钮事件
    isfocus(flag) {
      // this.pokerGame.isfocus = flag;
      this.sceneManager.press = flag;
      this.sceneManager.render();
      // this.pokerGame.drawFunc();
      window.console.log(flag);
    },
    // 更新场景管理器（原来的draw）
    update(req) {
      if (typeof req.data == "number") {
        // 抢地主
        this.sceneManager.update(req);
      } else if(typeof req.data == "string"){
        // this.sceneManager.sc
        // this.pokerGame.changeCardNum( data[0],data[1]);
        // this.pokerGame.drawFunc();
      }
    },
    // 地主决定
    landlord(req) {
      window.console.log('landlord');
      // 先把最后一个人的选择给渲染上去
      this.sceneManager.update(req);
      // 跳转到场景三
      this.sceneManager.sceneNumber = 3;
      this.sceneManager.enter(req);
      // window.console.log(landCard);
      // // 注意一下顺序，特别是地主牌显示
      // this.pokerGame.landCard = landCard;
      // this.play(); // 以后要整合进去
      // // 地主放入地主牌
      // this.pokerGame.insertCard(landCard);
      // this.pokerGame.drawFunc();
      // this.pokerGame.insertCard();
    }
    //   // 接收别人出的牌并打印出来
    //   draw(data) {
    //     // window.console.log(typeof data[0]);
    //     if (typeof data[0] == "number") {
    //       this.pokerGame.robText(data[0], data[1]);
    //     } else {
    //       this.pokerGame.changeCardNum( data[0],data[1]);
    //       this.pokerGame.drawFunc();
    //     }
    //   },
    //   // 清理
    //   clear(data){
    //     window.console.log(data);
    //     // 清桌面
    //     if(data=="card"){
    //       this.pokerGame.clearCard();
    //     }else if(data == "text"){
    //       this.pokerGame.clearText();
    //     }else if(data=="desk"){
    //       this.pokerGame.clearDesk();
    //     }
    //       this.pokerGame.drawFunc();
    //   },
    //   nopass(flag){
    //     this.pokerGame.button[0].reClick(flag);
    //   },
    //   // 胜利
    //   win(data){
    //     alert(data);
    //     this.pokerGame.restart();
    //   },
    //   // 测试用
    //   test(data) {
    //     window.console.log(data);
    //   }
  },
  created() {
    this.getUserInfo(); // 获取用户信息
    this.sendRoom();
  },
  mounted() {
    this.setCanvas();
    this.setPlayerClass(); // 创建玩家类
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
        this.canvas.height / 2 - 100,
        this.canvas.width / 2 - 18,
        (this.canvas.height * 2) / 3
      );
      this.leftPlayer = new LeftPlayer(
        200,
        this.canvas.height / 2 - 150,
        170,
        this.canvas.height / 3
      );
      this.rightPlayer = new RightPlayer(
        this.canvas.width - 300,
        this.canvas.height / 2 - 150,
        this.canvas.width - 250,
        this.canvas.height / 3
      );
    },
    // 设置玩家
    setPlayers(playerlist) {
      playerlist.map((item, index) => {
        if (item.userid == this.userinfo.uid) {
          this.my.userid = item.userid;
          switch (index) {
            case 0:
              this.leftPlayer.userid = playerlist[2]
                ? playerlist[2].userid
                : null;
              this.rightPlayer.userid = playerlist[1]
                ? playerlist[1].userid
                : null;
              break;
            case 1:
              this.leftPlayer.userid = playerlist[0]
                ? playerlist[0].userid
                : null;
              this.rightPlayer.userid = playerlist[2]
                ? playerlist[2].userid
                : null;
              break;
            case 2:
              this.leftPlayer.userid = playerlist[1]
                ? playerlist[1].userid
                : null;
              this.rightPlayer.userid = playerlist[0]
                ? playerlist[0].userid
                : null;
              break;
            default:
              break;
          }
        }
      });
      window.console.log(this.my, this.rightPlayer, this.leftPlayer);
    },
    sendRoom() {
      this.room = this.$route.query;
    },
    // 初始化画布
    setCanvas() {
      this.canvas = document.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      // 创建场景管理器并进入
      this.sceneManager = new SceneManager(this.canvas, this.ctx, this.$socket);
      this.sceneManager.enter();
    },
    play() {
      this.pokerGame.isplay = true;
      this.pokerGame.setBtn();
    },
    // 重新发牌
    replay() {
      this.$socket.emit("onready");
    }
  }
};
</script>

<style lang="scss">
canvas {
  background-color: #ccc;
  margin: 0 auto;
}
</style>