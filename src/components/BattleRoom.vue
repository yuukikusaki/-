<template>
  <div id="battle-contaioner">
    <div style="width:800px;height:600px;margin:0 auto;">
      <el-button @click="play()"
    type="primary">决定地主（临时）</el-button>
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
      roomMode: "",
      Resource: null,
      pokerGame: null // 游戏对象
    };
  },
  sockets: {
    connect() {
      window.console.log("连接成功");
    },
    // 发牌
    deal(pokerList) {
      this.pokerGame.dealCards(pokerList);
    }
  },
  created() {
    this.selectRoom();
    this.setImage();
  },
  mounted() {
    this.setCanvas();
  },
  methods: {
    selectRoom() {
      this.roomMode = this.$route.query;
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
    play(){
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