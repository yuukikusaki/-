<template>
  <div id="battle-contaioner">
    <div style="width:800px;height:600px;margin:0 auto;">
      <el-button @click="play()" type="primary">决定地主（临时）</el-button>
      <canvas id="mycanvas" width="800" height="600"></canvas>
    </div>
  </div>
</template>

<script>
import PokerResource from "../js/fight_the_landlords/pokerResource";
import PokerGame from "../js/fight_the_landlords/pokerGame";

export default {
  data() {
    return {
      room:null, // 房间信息
      Resource: null,
      pokerGame: null // 游戏对象
    };
  },
  sockets: {
    // 发牌
    deal(pokerList) {
      this.pokerGame.dealCards(pokerList);
    },
    isfocus(flag){
      this.pokerGame.isfocus = flag;
      window.console.log(flag)
    },
    // 接收别人出的牌并打印出来
    draw(data){
      this.pokerGame.drawOthers(data[0],data[1]);
    },
    // 测试用
    test(data){
      window.console.log(data);
    } 
  },
  created() {
    this.sendRoom();
    this.setImage();
  },
  mounted() {
    this.setCanvas();
  },
  methods: {
    sendRoom() {
      this.room = this.$route.query;
    },
    setImage() {
      // 设置图片
      const pokerResource = new PokerResource();
      this.Resource = JSON.parse(pokerResource.getResource());
    },
    setCanvas() {
      this.pokerGame = new PokerGame({
        canvasid: "#mycanvas", // 传入canvas
        pokerResource: this.Resource, // 传入资源
        that: this // 传入 this，为了button能执行socket
      });
    },
    play() {
      this.pokerGame.isplay = true;
      this.pokerGame.drawPoker(17);
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