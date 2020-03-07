<template>
  <div id="battle-contaioner">
    <el-button @click="replay()">重新开始</el-button>
    <div style="width:800px;height:600px;margin:0 auto;">
      <canvas id="mycanvas" width="800" height="600"></canvas>
    </div>
  </div>
</template>

<script>
import PokerGame from "../js/fight_the_landlords/pokerGame";

export default {
  data() {
    return {
      room: null, // 房间信息
      pokerGame: null // 游戏对象
    };
  },
  sockets: {
    // 地主
    landlord(landCard){
      window.console.log(landCard);
      // 注意一下顺序，特别是地主牌显示
      this.pokerGame.landCard = landCard;
      this.play(); // 以后要整合进去
      // 地主放入地主牌
      this.pokerGame.insertCard(landCard);
      this.pokerGame.drawFunc();
      // this.pokerGame.insertCard();
    },
    // 农民
    farmer(data){
      this.pokerGame.landCard = data[0];
      if(data[1]=='left'){
        this.pokerGame.left += 3;
      }else{
        this.pokerGame.right += 3;
      }
      this.play();  // 需要整合
      this.pokerGame.drawFunc();
    },
    // 发牌
    deal(pokerList) {
      this.pokerGame.dealCards(pokerList);
    },
    // 按钮事件
    isfocus(flag) {
      this.pokerGame.isfocus = flag;
      window.console.log(flag);
    },
    // 接收别人出的牌并打印出来
    draw(data) {
      window.console.log(typeof data[0])
      if (typeof data[0] == "number") {
        this.pokerGame.drawScore(data[0], data[1]);
      } else {
        this.pokerGame.changeCardNum( data[0],data[1]);
        this.pokerGame.drawFunc();
      }
    },
    // 测试用
    test(data) {
      window.console.log(data);
    }
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
    setCanvas() {
      this.pokerGame = new PokerGame({
        canvasid: "#mycanvas", // 传入canvas
        that: this // 传入 this，为了button能执行socket
      });
    },
    play() {
      this.pokerGame.isplay = true;
      // this.pokerGame.drawPoker(17, 17, 17);
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