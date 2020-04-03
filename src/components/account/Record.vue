<template>
  <div style="margin:20px">
    <!-- 猜拳战绩区 -->
    <div>
      <h2>石头剪刀布战绩</h2>
      <el-table
        :data="morraRecordList.slice((morraPage.currentPage-1)*morraPage.pageSize,morraPage.currentPage*morraPage.pageSize)"
        :row-class-name="tableRowClassName"
        border
      >
        <el-table-column type="index" :index="morraIndex"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{scope.row.time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="结果" prop="result"></el-table-column>
        <el-table-column label="选项" prop="choose"></el-table-column>
        <!-- <el-table-column label="角色" prop="role_name"></el-table-column> -->
      </el-table>
      <el-pagination
        background
        @current-change="changeMorraPage"
        layout="prev, pager, next"
        :current-page="morraPage.currentPage"
        :page-size="morraPage.pageSize"
        :total="morraRecordList.length"
      ></el-pagination>
    </div>
    <!-- 斗地主战绩区 -->
    <div>
      <h2>斗地主战绩</h2>
      <el-table
        :data="ftlRecordList.slice((ftlPage.currentPage-1)*ftlPage.pageSize,ftlPage.currentPage*ftlPage.pageSize)"
        border
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" :index="ftlIndex"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{scope.row.time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="结果" prop="result"></el-table-column>
        <el-table-column label="身份" prop="identity"></el-table-column>
        <!-- <el-table-column label="角色" prop="role_name"></el-table-column> -->
      </el-table>
      <el-pagination
        background
        @current-change="changeFtlPage"
        layout="prev, pager, next"
        :current-page="ftlPage.currentPage"
        :page-size="ftlPage.pageSize"
        :total="ftlRecordList.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: null,
      // 猜拳
      morraRecordList: [],
      morraPage: {
        currentPage: 1, // 初始页
        pageSize: 5 // 每页页数
      },
      ftlRecordList: [], // 斗地主战绩
      ftlPage: {
        currentPage: 1, // 初始页
        pageSize: 10 // 每页页数
      }
    };
  },
  created() {
    this.userid = this.$store.getters.getUserInfo.userid;
    this.getMorraRecord();
    this.getFtlRecord();
  },
  methods: {
    // 猜拳 start
    async getMorraRecord() {
      const { data: res } = await this.$http.get(
        `user/morrarecord?userid=${this.userid}`
      );
      if (res.status !== 0) return this.$message.error(res.message);
      this.morraRecordList = res.data;
    },
    // 改变斗地主战绩页数
    changeMorraPage(val) {
      this.morraPage.currentPage = val;
      this.morraPage.curr;
    },
    // 斗地主页表
    morraIndex(index) {
      index =
        index + 1 + (this.morraPage.currentPage - 1) * this.morraPage.pageSize;
      return index;
    },

    // 斗地主 start
    // 获取斗地主战绩
    async getFtlRecord() {
      const { data: res } = await this.$http.get(
        `user/ftlrecord?userid=${this.userid}`
      );
      if (res.status !== 0) return this.$message.error(res.message);
      this.ftlRecordList = res.data;
    },
    // 改变斗地主战绩页数
    changeFtlPage(val) {
      this.ftlPage.currentPage = val;
      this.ftlPage.curr;
    },
    // 斗地主页表
    ftlIndex(index) {
      index =
        index + 1 + (this.ftlPage.currentPage - 1) * this.ftlPage.pageSize;
      return index;
    },
    tableRowClassName({ row }) {
      if (row.result === "胜利") {
        return "success-row";
      } else if (row.result === "失败") {
        return "fail-row";
      } else if (row.result === "平局") {
        return "draw-row";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
}

@import url("../../assets/css/style.scss");
</style>