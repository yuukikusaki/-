<template>
  <!-- 系统消息 -->
  <div class="system-msg">
    <el-row v-for="(o, index) in msg" :key="index">
      <el-card :body-style="{ padding: '24px 16px' }">
        <div>
          <div>
            <span class="title">{{o.title}}</span>
            <time class="time">{{ o.time | dateFormat}}</time>
          </div>
          <article>{{o.content}}</article>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: [],
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    // 获取系统消息
    async getMsg() {
      const { data: res } = await this.$http.get("api/system");
      if (res.status !== 0) {
        return this.$message.error(res.message);
      }
      this.msg = res.msg;
    }
  }
};
</script>

<style lang="scss" scoped>
.system-msg {
  padding: 10px;
}
.el-card {
  margin-bottom: 10px;
  .title {
    color: #333;
    font-weight: 700;
  }
  .time {
    color: #999;
    font-size: 12px;
    line-height: 22px;
    margin: 0 10px;
  }
  article {
    color: #666;
    padding-left: 8px;
  }
}
</style>