<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="emial"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userlist.length"
      ></el-pagination>
    </el-card>

    <!-- 发送系统消息 -->
    <el-button type="text" @click="systemMsg = true">发送系统消息</el-button>

    <el-dialog title="系统消息" :visible.sync="systemMsg" width="500px">
      <el-form :model="msgForm">
        <el-form-item label="标题" label-width="60px">
          <el-input v-model="msgForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="60px">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="msgForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="systemMsg = false">取 消</el-button>
        <el-button type="primary" @click="systemMsg = false;sendMsg()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表参数
      queryInfo: {
        query: "",
        pagenum: 1, // 当前页数
        pagesize: 10 // 当前每页显示的数据
      },
      userlist: [], // 用户列表
      systemMsg: false,
      msgForm: {
        title: "",
        content: ""
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //   获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.post("admin/users", {
        parmas: this.queryInfo
      });
      if (res.status !== 0) {
        return this.$message.error(res.message);
      }
      res.users.map(item => (item.state = item.state == 1 ? true : false));
      this.userlist = res.users;
    },

    // 监听pagesize改变
    handleSizeChange(newSize) {
      window.console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },

    // 监听页码值
    handleCurrentChange(newPage) {
      window.console.log(newPage);
      this.queryInfo.pagenum = newPage;
    },

    // 发送系统消息
    async sendMsg() {
      const { data: res } = await this.$http.post("admin/msg", {
        parmas: this.msgForm
      });
      if (res.status !== 0) {
        return this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.msgForm.title = "";
      this.msgForm.content = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>