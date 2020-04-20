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



# 斗地主
## 游戏流程逻辑（此处事件没指明时全是 socket ）
1. 进入页面时 socket 连接
2. 点击开始/准备按钮后执行准备事件`onready()`
3. 三人全准备后接受发牌事件`deal(pokerList)`，收到自己分到的牌组
4. 系统开始发牌
### 决定地主
1. 执行发牌方法时第一个玩家有全部（四个按钮）选项，其他二人无
2. 根据第一个玩家的选择确定其他两个玩家的按钮量，如第一个玩家选了`1分`,则第二个玩家显示`不出`、`2分`、`3分`三个，另外两人无按钮
3. 当有人选择`3分`时，直接确定地主，轮完一圈（后台判断，需要回到第一个，这个判断也可以用在出牌确定谁最大上面）选最大的当地主，全不出，分数为`0`的情况下，玩家1为地主。
<!-- 下面的估计全改 -->
5. 发牌结束，开始决定地主,点击分数之后执行`landlord(score)`
6. 把选择的分数显示在canvas上，下一个玩家接收`preChoose(score)`，并发送`landlord(score)`
7. 有人叫三分或者轮完一圈之后决定地主`lord()`（暂定），`isplay`值变为`true`

### 牌型判断
+ 单牌（single）、对子（pair）、三张（triplet）、炸弹（boom）
+ 三带一（twa)、三带二（twp）、飞机带单（sota）、飞机带对（sotp）
+ 顺子（straight）、连对（sop）、三连对（sot）
+ 王炸（rocket）、四带二单（fbta）、四带二对（fptp）

##### 一人17张，地主20，顺子最多12
    1：单牌
    2：对子、王炸
    3：三张
    4：三带一、炸弹
    5：顺子、三带二
---
    顺子（单，双，三） 飞机（单、对）
    6：顺子、连对、三连对、四带二
    7：顺子
    8：顺子、连对、飞机带单、四带二对
    9：顺子、三连对
    10：顺子、连对、飞机带对（减-4 %3==0）
    11：顺子、飞机带单
    12：顺子、连对、三连对
    13：无
    14：连对、飞机带单（减-2 %3==0）
    15：三连对
    16：连对、飞机带对
    17：飞机带单

```js
    {
        一次:
        二次:
        三次:
        四次:
    }
    function 判断连续(){
        if(arr[0]-arr[arr.length-1]==arr.length-1){
            return 连续
        }
    }
    大于 5 时
    2. 一个方法判断顺子
    3. 重复两次的有 m 个
    if(j==0&&k==0){
        判断连续
        return 顺子
    }else if(j*2==len){
        判断连续(m)
        return 连对
    }else if(k*3==len){
        判断连续(n)
        return 三连对
    }else {
        if(k==0 || 判断连续(k)==false){
            错误
        }
        if(2*i+k*3==len){
            return 飞机带单
        }
        else if(2*j+k*3==len){
            return 飞机带双
        }else{
            return 错误
        }
    }
```


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

## 2/6(实际是2/7了)
把图片位置改了一下，后台房间问题已经解决了，争取明天可以回来做客户端

## 2/7 创建房间的方面修改了一下
配合后台分房间操作，把加入房间放到了 GL.vue 里面，点击创建房间按钮会自动生成并进入<br>
存在的问题：
  1. 后台的稳定性不是很好，出了bug直接就断开连接了
  2. 用户退出房间以后别的用户的房间列表不会消失

接下去要做的事：
  1. 先修改列表bug
  2. 出牌和不出都改成`next()`，这样统一一点
  3. 出牌时别的玩家的画面做好

需要改善的地方：
  1. 后台的稳定性，不然调试很麻烦
  2. 一些命名吧，今天改了一点，`roomID => rid`，尽量简短一点，看起来舒服
  3. 画个流程表（也方便命名），现在程序有点乱，有点理不清了

## 2/8 出牌有关的动画都做好了
存在的问题：
  1. 后台稳定性和列表bug还是没改（这个现在懒得改）
  2. 出牌按钮没有制域（解决方法看改善栏 1.）

接下去要做的事：
  1. 改成`next()`
  2. 做表，先统一命名
  3. 地主牌显示

需要改善的地方:
  1. 点击事件按钮部分（就这部分）之前加个flag，默认是false，由后台判断，轮到玩家时发送消息把false改成true，点击出牌和不出之后改成true
  2. <strong>少玩玩地平线！！！~~不可能的~~</strong>

## 2/9 next改了
命名表在写了，pass、play、score全改成next了，别的延续昨天~~地平线的奖杯数也是~~<br>
新bug：从主页面进去时无法显示房间列表，需要在这时候获取一次

## 2/10 修改加入房间的逻辑
这边逻辑应该是最终版了，之后最多改一些数据类型，大的方向不会变了<br>
昨天的新bug在修改逻辑之后也解决了<br>
接下来优先地主牌显示和按钮制御

## 2/11 按钮制御完成
存在的问题：
  1. 别的玩家的牌数现在用的是自己的，需要改成对应的玩家，后台每次`执行next`时都带上卡牌数量
  2. 卡牌画面会出现同时有两个玩家卡牌显示的情况

接下去要做的事
  1. 修改bug
  2. 抢地主和地主牌动画

需要改善的地方
  1. 后台加一些if判断，比如判断房间是否存在之类的
  2. 老样子，一些命名
  3. 文件资源写法可以改善了

## 2/13 解决卡牌数变化，抢地主动画效果 50%
存在的问题：
  1. 点击自己的卡牌的时候别人出的牌会消失

接下去要做的事：
  同上

需要改善的地方
  1. 方法的归类，现在太多了，有点乱
  2. 文件资源写法

## 2/14 修改了资源文件的写法

## 2/15 获取地主牌
存在的问题：
  1. 卡牌画面会出现同时有两个玩家卡牌显示的情况

接下去要做的事
  1. 修改bug
  2. 完成抢地主
  3. ~~快点白了地平线~~

需要改善的地方
  1. 老样子，一些命名

## 2/16 （实质17）
存在的问题：
  同上

接下去要做的事：
1. 需要创建一个专门的绘图方法，把别的方法统一放入里面，方便调整
2. 把卡牌队列生成单独做一个方法，地主牌加进来的时候放在`pokerList`中并重新生成一次`deck`

需要改善的地方：
  1. 卡牌花色排序

## 2/18
写了一下`drawFunc`架构，等脑子清醒一点再写

## 2/20 `drawFunc`架构好了
鸽了一天，少打打游戏，该考虑找工作了
存在的问题：
  1. 有出牌展示时点击卡牌会重新刷新界面导致展示的卡牌消失

接下去要做的事：
  1. 完善好`drawFunc`方法，出牌之后的一轮设为常驻（用sava?）
  2. 抢地主

需要改善的地方：
  1. 卡牌花色排序，把卡牌多增加`point`和`color`属性~~（这其实是问题吧）~~

## 2/22 bug修复完成，顺便T台是真的好看，~~没有下一集我要死了~~
把所有画图都放在了`drawFunc`中，基本上卡牌展示的功能已经完善了<br>
手机端websocket不能用的原因找到了，地址是`localhost`，手机端ip与电脑端不同
存在的问题：
  1. 抢地主功能不完善，分数按钮的展示要把每个人分开（基本上和出牌`deckCard`一个思路吧

接下去要做的事：
  1. 彻底完成抢地主，思路写在上面了
  2. 卡牌逻辑
  3. 把后台功能流程整理一下

需要改善的地方：
  1. canvas相关学习视频看一点，为以后功能完善做好基础

## 2/23 逻辑开了个头
又要大改了，几分太麻烦，直接换成叫地主和不叫来判断，这样的话逻辑和按钮的展示就要改<br>
这回卡牌逻辑防止自己再拖下去就把开头起了，明天就做这部分了，这里先不想完善的事，先用`if else`写出来再说！！！

## 2/24 开工之前又发现了bug（已解决）
稍微修改了一下出牌删牌组的代码，加上了一个重新发牌的功能，便于调试

接下去要做的事：
  1. 先把后台卡牌生成逻辑改一下，我要不要先学ts再写呢
  2. 卡牌逻辑还是不能用`if else`，太傻了，我写不下去了

需要改善的地方：
  1. 卡牌逻辑
  2. 监听退出房间

算了，学ts去了

## 3/5 斗地主牌型判断部分完成
~~没想到已经有十天没写这个了~~<br>
我终于把牌型判断部分写好啦！！！~~（以后还要经过大量测试）~~

存在的问题：
  1. 坚持天天写
  2. 差点忘了，逻辑判断没有航天飞机牌型，其实马上就能加上去（我这点打字的时间就行，但不知道为什么，就是不想写）

接下去要做的事：
  1. 抢地主功能可以安排起来了
  2. 正式的游戏部分（轮流出牌）也可以安排上了

需要改善的地方：
  1. 牌型判断部分命名问题，再次感到我命名能力低下
  2. 我到底该用中文还是用英文

## 3/6 bug修改
今天朋友来我家玩，没时间写代码<br>
修复了四带二的问题，抢地主写了一点

存在的问题：
  1. 地主抢不了，明天检查

接下去要做的事：
  1. 把抢地主完成，快了，明天应该能完成

需要改善的地方：
  1. 后端那里应该分房间来制作游戏

## 3/7 ~~为什么地主抢不了呢，因为全是bug呀~~
## 3/7 换个标题，这TM全是BUG啊！！！抢地主写好了！！！！！！
忘了卡牌大小判断了<br>
~~地主牌顺序~~（改好了，状态贼好）<br>
存在的问题
  1. 卡牌大小判断（下一步）
  2. 花色

接下去要做的事：
  1. 卡牌大小比较，流程上基本上就是一个判断函数，先执行判断牌型的函数，然后执行判断函数，输入(cardType,max)，先比较牌型（注意炸弹的情况），然后比较最大的值
  2. 叫地主和牌型时可以显示文字

需要改善的地方
  1. ~~后台完善一下，写个斗地主房间，继承房间的大类，最好能吧socket也给放在那里面解决~~（搞好了）
  2. ~~牌型那里还是改成中文了~~（好了）
  3. 1那里只是把抢地主部分的改了，别的部分还没有

## 3/8 出牌流程
出牌成功的时候把按钮隐去，如果不出把不出打印出来<br>
所有人都不出，轮完一圈之后消去（要考虑到牌和文字的情况）

存在的问题：
  1. 花色

接下去要做的事：
  1. 把轮流出牌的给做好，现在基本上就是显示文字这一块了
  2. 抢地主那里的分数也要
  3. 后台那里需要写判断之后两个轮空的方法，把指针转向出牌的玩家，并清空桌面

需要改善的地方：
  1. 我觉得我真的是天生不适合命名

PS：赶在12点之前写好了

## 3/9 基本完成
没赶上，调试好的时候已经是凌晨八点了，QAQ（划去） <br>
但我还是要把它划在3/9~~嘤嘤嘤~~<br>

存在的问题：
  1. 抢地主的显示和自己不出时自己的显示
  2. 玩家的 `socket.id` 和别的需要绑定的（现阶段不算是问题吧）

接下去要做的事：
  1. 把不出和分数的做好
  2. 退出房间做好

需要改善的地方：
  1. 命名品味啊！！！
  2. `pokerGame.js`里面方法位置归拢一下，相同类的放在一起

## 3/10 差一点收尾
存在的问题：
  1. 抢地主文字问题，要不要每个玩家单独一个（等账号功能好了再说吧）

接下去要做的事：
  1. 最后结束时的清屏和重来之后的重新发牌
  2. 退出房间
  3. 开始大厅制作了

需要改善的地方
  1. 后端归拢，然后就是玩家判断问题

## 3/11 好烦啊
重置问题，还是开始不了，前后端的结构都得改一下吧，综上所述，这里先等等，等我把canvas的教学视频看一遍把，我估计要把结构全改了。后端那里主要整理，然后尝试把cookie的问题给解决吧，顶个期限吧，就这周做好。然后发牌那个也得改改。

## 3/12 转战注册登录
迷茫的时候就学习，github分支什么的也尝试一下

## 3/14 注册基本上就这样了
斗地主继续缓缓，用户这里我写上瘾了

## 3/15 主页面设计
目前这个页面规划我挺满意的，应该就是最终规划了

## 3/16 试了一下放到服务器
列表框的折叠效果，把头像信息页放上去了<br>
编译之后只需要`dist`里面的内容就行了，`dist`本身不需要<br>
我估计现在进度在60%-70%，四月之前看看能不能做完<br>
---
新建了`ftl`分支<br>
写了一个场景管理器，现在资源加载的环节已经做好了，接下去一步一步改<br>
socket方面要是能游戏单独一个socket就好了，不知道行不行<br>

## 3/17
每个游戏单独写个房间

## 3/18 ~~我感觉这样写不行~~，又可以了
其实结束发牌之后的跳转我还是有点不情愿的<br>
基本上场景二的进入工作已经完成了，接下来就差抢地主动作了<br>
不对，应该把文本显示也放入进去，即使没有文本

## 3/19
文本什么的准备工作已经好了，写错了分支，现在已经差不多学会怎么使了，下次改正

## 3/20 抢地主修改完成
`socket`发送`id`和`data`两个数据，接收`preid`、`curid`和`data`三个数据<br>
在加上三个玩家类，很容易就能完成一些显示的工作<br>
明天开始改`sceneNumber=3`也就是游戏阶段的部分<br>
内容梳理：
  1. 这个阶段需要监听`卡牌`和`按钮`两个事件
    + 需要把判断按钮的`if`分别放入
    + 卡牌是无论什么时候都可以点击的
  2. 三个按钮事件
  3. `卡牌`或`不出`展示

## 3/21 基本完成斗地主
现在就差三个
1. 禁止不出
2. 游戏胜利及重启
3. 提示

## 3/21 这回是真的基本完成
斗地主功能方面：
1. 提示
2. 记录结果和别的一些需要存入数据库的信息

房间方面
1. ~~未开始阶段的退出与进入（包括一局结束）~~
2. 密码的验证
3. ~~中途退出（直接结束游戏，重置？）~~
4. ~~玩家的显示~~

改进：
1. 把一局结束以后的重置单独拿出来放在一个方法里？
2. 卡牌大小

## 3/22 完成退出房间
具体直接在`3/21`上面修改了

### 追加1
个人主页先这样吧，明天还是完善登录注册（包括后台）<br>
数据库方面也要深入学习起来了，不知道下周能不能完成

### 追加2
把登录那里的`重置`选项改成`注册`

注册界面：
  + 用户名
  + 密码
  + 确认密码

后台用户基本信息（刚创建）：
  + 用户id
  + 用户名
  + 密码
  + 级别（普通用户）
  + 邮箱（null）
  + 个性签名（默认）
  + 创建时间
  + 生日

## 3/23 注册功能
注册事件前端的部分基本上是ok了，后端那里需要在注册的时候把各个表的内容都给完善好

## 3/25 个人主页 and 修改资料
修改资料差`css布局`和`上传提交`的部分，后端也没写<br>
主页那里需要配合`查看战绩`功能<br>
### 接下去的流程大纲
按流程走的话，我应该是先回去把先完善`游戏大厅`给完善了，然后`斗地主战绩`的部分做好，数据库`战绩表`给创建好，接着是`石头剪刀布`，全部完成了以后，，再做`战绩查询`，然后才是个人主页，`消息中心`是可以选择放弃的

## 3/26 信息修改
差个修改密码了，然后明天布局再搞一下就可以进入下一个阶段了

## 3/27 信息修改就这样吧
### 3/27 追加
游戏大厅就这样吧，明天（或者今天晚上）做`斗地主玩家页面了`
### 3/27 二次追加
改了斗地主房间的名字，然后把两边用户信息给加上去了<br>
之后可能需要根据背景颜色来做`猫腻矩形`<br>
存在的不足：
  1. 首先是准备，点击以后需要切换状态
  2. 然后需要标注出具体谁是地主
  3. 别的退出房间事件
  4. 出牌太多会把别人的牌给遮住

## 3/29 斗地主战绩
简单地把`战绩`存入了`数据库`，顺便昨天是做了一下游戏`中途退出`的处理<br>
简单地做了个`查看战绩`，接下来先把`石头剪刀布`给做好吧
### 3/29 追加
`石头剪刀布`起了个头，斗地主那里把`准备`给完成了，也是为了之后的猜拳做准备<br>
明天一天把游戏给做好，后天把剩下没完成的给完成（主要是`战绩`和`个人信息`展示）<br>
争取`4/1`开始进入论文和完善阶段

## 3/30 猜拳
晚上做绑定事件，对面的显示别忘了
### 3/30 追加
`猜拳`获胜那里要可以改成`$message`，还有`重置图标`位置不对，然后`太丑`了<br>
斗地主也结束和重置也顺便改好（新问题），然后又有新bug——>先进去的玩家点了准备，后进去的看不见（烦啊!!!）<br>
明天写做一下`猜拳战绩`，然后把主页给做好，四月就可以一边写论文一边改bug了<br>
对了，把`退出按钮`放到个人页吧，感觉这样好一点

## 3/31 猜拳战绩
message好了，战绩也这样吧，晚上把`个人页面`做一下<br>
明天开始边完善，边写论文
### 3/31 追加
个人页面加了游戏记录<br>
ps:侧边栏可以让头像区`v-if`,按钮移位

# 完善阶段
## 4/1
修复了游戏准备时准备不显示的bug，改为玩家没有到齐时无法点击准备

## 4/7 地主头像
脑子抽了，是4月7号的

## 4/9 移动端适配
使用了`@media`查询来选择样式，默认侧边栏折叠，移动端无法展开

## 4/10 移动端适配2
除了游戏画面，别的基本上没多大问题了

## 4/11 移动端适配3（废案，游戏画面不适配）
```js
if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian)/i
        )
      ) {
    // beFull(document.getElementById("battle-contaioner"));

        this.canvas.width = document.documentElement.clientWidth - 164;
        this.canvas.height = document.documentElement.clientHeight;
      }
```

## 4/11 edge适配
```js
const mousex = event.offsetX;
const mousey = event.offsetY;
```

## 4/14 房间人满时禁止进入

## 4/15 经验条

## 4/16 系统消息

## 4/20 修改桌面卡牌显示