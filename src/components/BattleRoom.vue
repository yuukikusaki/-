<template>
  <div id="battle-contaioner">
    <div style="width:800px;height:600px;margin:0 auto;">
      <el-button @click="play()" type="primary">决定地主（临时）</el-button>
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
      this.play();
      this.pokerGame.drawLandCard(landCard);
      this.pokerGame.insertCard();
    },
    // 农民
    farmer(landCard){
      window.console.log(`farmer${landCard}`);
      this.play();
      this.pokerGame.drawLandCard(landCard);
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
        this.pokerGame.changeCardNum(data[0], data[1]);
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
      this.pokerGame.drawPoker(17, 17, 17);
      this.pokerGame.setBtn();
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