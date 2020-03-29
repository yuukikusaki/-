<template>
  <div style="margin:20px">
    <!-- 斗地主战绩区 -->
    <div>
      <h2>斗地主战绩</h2>
      <el-table :data="ftlRecordList.slice((ftlPage.currentPage-1)*ftlPage.pageSize,ftlPage.currentPage*ftlPage.pageSize)" border stripe>
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
      ftlRecordList: [], // 斗地主战绩
      ftlPage: {
        currentPage: 1, // 初始页
        pageSize: 5 // 每页页数
      }
    };
  },
  created() {
    this.userid = this.$store.getters.getUserInfo.userid;
    this.getFtlRecord();
  },
  methods: {
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
        this.ftlPage.curr
    },
    // 斗地主页表
    ftlIndex(index){
        index=index+1+(this.ftlPage.currentPage-1)*this.ftlPage.pageSize;
        return index;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>