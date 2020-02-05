# App（重写，一开始就进入登录注册）
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
## 个人信息区
1. 展示个人信息

## 游戏房间区
1. 选择房间进入
2. 创建房间按钮悬浮在右下方
3. 跳出`dialog`创建房间

## 创建房间
1. 把创建好的信息发送到服务端
2. 服务端向数据库保存
3. vuex内获取新的房间列表
4. 刷新列表

# BattleRoom
## 游戏流程逻辑（此处事件没指明时全是 socket ）
1. 进入页面时 socket 连接
2. 点击开始/准备按钮后执行准备事件`onready()`
3. 三人全准备后接受发牌事件`deal(pokerList)`，收到自己分到的牌组
4. 系统开始发牌
### 决定地主
5. 发牌结束，开始决定地主,点击分数之后执行`landlord(score)`
6. 把选择的分数显示在canvas上，下一个玩家接收`preChoose(score)`，并发送`landlord(score)`
7. 有人叫三分或者轮完一圈之后决定地主`lord()`（暂定），`isplay`值变为`true`


# vuex store
```js
this.$store.getters.方法名
this.$stroe.commit('方法名',参数)
```
## 游戏列表
## 单个游戏信息
## 房间列表
1. roomList存储房间列表


# 笔记
## 2/2 需要改变的地方
`pokerGame`得改，加载和游戏运行不能放在一个类里面，今天做的完善工作刚好把这两个基本分开了，明天干这个。

## 2/3 pass（不出）按钮，还是这么写一个日程表吧
存在的问题：
  点击开始按钮之后二分的按钮会有响应，应该做个判断，
  或者说开始之后再第一次执行`setBtn()`方法。
<br>
接下去要做的事：
  提示按钮需要完成游戏逻辑，socket功能也先放置，
  下一步应该是出牌按钮事件和其动画。
<br>
需要改善的地方：
  这次已经完善了一下class，并且`pass`按钮也已经改成了`PassBtn`且继承了
  `ButtonEvent`类，把`ButtonEvent`改成`Button`，然后别的按钮也单独拿出来继承。

## 2/4 play（出牌）按钮动作完成
存在的问题：
  暂无
<br>
接下去要做的事：
  数据通过socket发送到服务器，并广播，实现玩家之间的数据交互，
  想一下玩家顺序出牌用循环链表还是队列。游戏逻辑放在最后吧，提示按钮要在更之后了。
<br>
需要改善的地方：
  `startBtn`已改，别的还没有，然后关于卡牌位置设定可以放在描绘的同时进行，
  然后卡牌生成时一些必要的数据需要放进去，大小、花色*。

## 2/5 写后台
暂时把房间类写好了，socket分房间还没有完成
<br>
2/4改善点没变过