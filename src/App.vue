<template>
  <div id="app">
    <!-- header start -->
    <!-- <header> -->
      <!-- 页面选择 -->
      <!-- <nav class="header-left">
        <span>
          <router-link to="/home" class="router el-icon-s-home">大厅</router-link>
        </span>
        <span>
          <router-link to class="router el-icon-tickets">对战记录</router-link>
        </span>
      </nav> -->
      <!-- 中间栏 -->
      <!-- <nav class="header-center"></nav> -->
      <!-- 登录注册 -->
      <!-- <nav class="header-right"> -->
        <!-- 未登录
        <div v-if="isLogin">
          <span>
            <img src="./assets/head.jpg" alt />
          </span>
          <span>
            <a @click="showLoginDialog=true" class="router">{{userInfo.name}}</a>
          </span>
          <span>
            <a @click="showRegisterDialog=true" to class="router">注销</a>
          </span>
        </div> -->
        <!-- 已登录 -->
        <!-- <div>
          <span>
            <img src="./assets/head.jpg" alt />
          </span>
          <span>
            <a @click="showLoginDialog=true" class="router">登录</a>
          </span>
          <span>
            <a @click="showRegisterDialog=true" to class="router">注册</a>
          </span>
        </div>
      </nav>
    </header> -->
    <!-- header end -->

    <!-- main start -->
    <main>
      <router-view></router-view>
    </main>
    <!-- main end -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    
  }
};
</script>

<style lang="scss">

// header {
//   background-color: #999;
//   height: 30px;
//   min-width: 800px;
//   padding: 10px 50px;
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   span {
//     display: inline-block;
//     font-size: 18px;
//     margin-right: 12px;
//     cursor: pointer;
//     min-width: 80px;
//     vertical-align: middle;
//     img {
//       width: 36px;
//       border-radius: 50%;
//       vertical-align: middle;
//     }
//   }
//   .router {
//     color: #fff;
//     text-decoration: none;
//     font-style: normal;
//   }
// }

main {
  min-width: 800px;
  height: 100%;
}
</style>
