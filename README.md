# App
### 注册
1. 在 dialog 内判断输入内容
2. 按下注册键执行方法，先利用 `validate` 和 `prop` 判断给定的数据是否填入
3. true的情况下调用注册API

### 登录
1. 把账号密码发送到服务器
2. 收到返回结果,设置cookie、关闭dialog、信息栏改变
3. 登录的时候先判断发送cookie
4. `oncreate`的时候先判断有没有`token`，有则发送请求


# HomeContainer
## 游戏列表区
1. 可以增加每个游戏的房间数或游玩总人数

## 游戏卡片区
1. 每张卡片显示图片、名字、和进入按钮
2. 按下进入游戏按钮跳转到对应游戏大厅

# GameLobby


# vuex store