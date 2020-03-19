<template>
  <div id="battle-contaioner">
    <div style="width:800px;height:600px;margin:0 auto;">
      <canvas id="mycanvas" width="800" height="600"></canvas>
    </div>
  </div>
</template>

<script>
// import SceneManager from "../js/fight_the_landlords/SceneManager"
import SceneManager from '../js/fight_the_landlords/SceneManager'

export default {
  data() {
    return {
      room: null, // 房间信息
      canvas:null, // canvas
      ctx:null, // canvas上下文
      sceneManager:null, // 场景管理器
    };
  },
  sockets: {
  //   // 地主
  //   landlord(landCard){
  //     window.console.log(landCard);
  //     // 注意一下顺序，特别是地主牌显示
  //     this.pokerGame.landCard = landCard;
  //     this.play(); // 以后要整合进去
  //     // 地主放入地主牌
  //     this.pokerGame.insertCard(landCard);
  //     this.pokerGame.drawFunc();
  //     // this.pokerGame.insertCard();
  //   },
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
  //   // 发牌
    start(pokerList) {
      window.console.log(pokerList);
      // 创建三个玩家类
      this.sceneManager.sceneNumber = 2;
      this.sceneManager.enter(pokerList.sort((a,b)=>b.point-a.point));
    },
  //   // 按钮事件
  //   isfocus(flag) {
  //     this.pokerGame.isfocus = flag;
  //     this.pokerGame.drawFunc();
  //     window.console.log(flag);
  //   },
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
    this.sendRoom();
  },
  mounted() {
    this.setCanvas();
  },
  methods: {
    sendRoom() {
      this.room = this.$route.query;
    },
    // 初始化画布
    setCanvas() {
      this.canvas = document.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      // 创建场景管理器并进入
      this.sceneManager = new SceneManager(this.canvas,this.ctx,this.$socket);
      this.sceneManager.enter()
},
    play() {
      this.pokerGame.isplay = true;
      this.pokerGame.setBtn();
    },
    // 重新发牌
    replay(){
      this.$socket.emit('onready')
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