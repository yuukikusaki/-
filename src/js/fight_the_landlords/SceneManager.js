// 场景管理器
/**
 *  1: 初始屏幕，只有背景和准备按钮
 *  2：进入场景二，抢地主阶段，首先便是发牌页面
 *  3：场景三，出牌阶段
 *  4：结束画面
 */
import loadAllResource from './LoadResource'
import { PokerGame } from './pokerGame';
// import { My, LeftPlayer, RightPlayer } from './Player'


class SceneManager {
    constructor(canvas, ctx, socket) {
        this.canvas = canvas,
            this.ctx = ctx;
        this.sceneNumber = 1;
        this.loadedRes = null;
        this.socket = socket;
        this.pokerGame = null;
        this.buttonList = []; // 按钮列表
        this.press = true; // 使用按钮
        this.pokerTypeRank = null;
        // 玩家类
        this.my = null;
        this.leftPlayer = null;
        this.rightPlayer = null;
        this.players = [];
        this.bindEvent(); // 添加监听
        // this.loadAllResource();
        // this.render()
    }

    // 场景内动作
    update(req) {
        window.console.log('update', req)
        // 这里加一个轮到我，把text和poker都先清空
        const { preUserID, curUserID, data } = req;
        switch (this.sceneNumber) {
            case 1:
                if (this.my.userid != curUserID) {
                    this.press = false;
                }
                break;
            case 2: // 抢地主
                this.players.map(item => {
                    // 把别人的选择加上去
                    if (item.userid == preUserID) {
                        item.text = data == 1 ? '抢地主' : '不抢';
                    }
                    // 清空目前轮到的人的文字
                    if (item.userid == curUserID) {
                        item.text = '';
                    }
                });
                // 轮到我，则可以按下按钮
                if (curUserID == this.my.userid) {
                    this.press = true;
                }
                break;
            case 3:
                // 1. 清空文本和出牌
                this.players.map(item => {
                    // 上一个人
                if (item.userid == preUserID) {
                        if(data.typeRank==0){
                            item.text='不出';
                            item.deskPoker=[];
                        }else{
                            item.deskPoker = data.dealList;
                            this.pokerTypeRank = data.typeRank
                        }
                    }
                    // 清空轮到的人
                    if (item.userid == curUserID) {
                        item.text = '';
                        item.deskPoker = [];
                    }
                });
                // 轮到我，则可以按下按钮
                if (curUserID == this.my.userid) {
                    this.press = true;
                }
                break;
            default:
                break;
        }
        // 每次更新之后渲染
        this.render();
    }

    // 选择渲染的场景
    render() {
        switch (this.sceneNumber) {
            case 1: // 等待开始
                // 1. 创建 pokergame
                this.pokerGame = new PokerGame(this.canvas, this.ctx, this.loadedRes, this);
                this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.loadedRes["startBtn"], this.canvas.width / 2 - 65, this.canvas.height * 0.618, 130, 65);
                break;
            case 2: // 抢地主
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvas.width, this.canvas.height);
                // 渲染三方面玩家的卡牌
                this.pokerGame.renderPoker(this.my.length, this.leftPlayer.length, this.rightPlayer.length);
                this.buttonList = this.press ? this.pokerGame.setLordBtn() : []; // 是否设置抢地主按钮
                this.pokerGame.renderLordBtn(this.buttonList); // 渲染抢地主按钮
                // 渲染三方的文字
                this.pokerGame.renderText(this.my, this.leftPlayer, this.rightPlayer);
                break;
            case 3: // 游戏阶段
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvas.width, this.canvas.height);
                // 渲染三方面玩家的卡牌
                this.pokerGame.renderPoker(this.my.length, this.leftPlayer.length, this.rightPlayer.length);
                // 渲染地主牌
                this.pokerGame.renderLandCard();
                // 渲染按钮
                this.buttonList = this.press ? this.pokerGame.setPlayBtn() : []; // 是否设置游戏按钮
                this.pokerGame.renderPlayBtn(this.buttonList); // 渲染游戏按钮
                // 渲染三方的文字
                this.pokerGame.renderText(this.my, this.leftPlayer, this.rightPlayer);
                // 渲染三方桌面上面的牌
                this.pokerGame.renderDeskPoker(this.my, this.leftPlayer, this.rightPlayer);
                break;

            default:
                break;
        }
    }

    // 进入场景时的动作
    enter(req) {
        switch (this.sceneNumber) {
            case 1:
                // 获取资源
                loadAllResource(this.canvas, this.ctx, this);
                break;
            case 2:
                // 发牌动画
                this.pokerGame.pokerList = req; // 传入牌组
                this.pokerGame.createPokerClass(); // 创建卡牌类
                this.pokerGame.dealAmine(1, this);
                break;
            case 3:
                // 地主决定
                // 1. 存入地主牌
                this.pokerGame.landCard = req.data;
                // this.pokerGame.update();
                // 2. 先把地主的文字清除，并加上三张牌
                this.players.map(item => {
                    if (item.userid == req.curUserID) {
                        item.text = '';
                        item.length += 3;
                    }
                });
                // 3. 自己是地主
                if (this.my.userid == req.curUserID) {
                    this.press = true;
                    this.pokerGame.insertCard(); // 增加地主牌

                } else {
                    this.press = false;
                }
                this.render();
                break;
            default:
                break;
        }
    }

    // 添加监听
    bindEvent() {
        this.canvas.onclick = event => {
            window.console.log(event);
            const mousex = event.layerX;
            const mousey = event.layerY;
            switch (this.sceneNumber) {
                case 1: // 准备开始按钮
                    if (mousex > this.canvas.width / 2 - 65 && mousex < this.canvas.width / 2 + 65 &&
                        mousey > this.canvas.height * 0.618 && mousey < this.canvas.height * 0.618 + 65) {
                        this.socket.emit('onready', this.my.userid);
                    }
                    break;
                case 2:
                    // 添加抢地主事件
                    if (this.press == false) {
                        return;
                    }
                    this.buttonList.map(item => {
                        if (mousex >= item.x && mousex <= item.x + item.w && mousey >= item.y && mousey <= item.y + item.h) {
                            item.onClick(this.socket, this.my.userid);
                            this.press = false;
                        }
                    });
                    break;
                case 3: // 卡牌和游戏按钮
                    // 按钮
                    this.buttonList.map(item => {
                        if (mousex >= item.x && mousex <= item.x + item.w && mousey >= item.y && mousey <= item.y + item.h && this.press == true) {
                            const flag = item.onClick(this.socket, this.my.userid, this.pokerGame.mypoker, this.pokerTypeRank);
                            if (flag == false) {
                                return
                            }
                            this.pokerGame.mypoker = this.pokerGame.mypoker.filter(c => !c.getChecked());
                            this.my.length = this.pokerGame.mypoker.length;
                            // this.pokerGame.mypoker = myPoker;
                            // this.my.length -= myPoker.length
                            this.press = false;
                            this.render();
                        }
                    });
                    // 卡牌
                    this.pokerGame.mypoker.map(item => {
                        const { x1, x2 } = item.getPositionX();
                        if (mousey >= item.y && mousey <= item.y + item.height && mousex >= x1 && mousex <= x2) {
                            item.onClick();
                            this.render()
                        }
                    });
                    break;
                default:
                    break;
            }
        }


    }

    // 获取玩家
    setPlayers(my, leftPlayer, rightPlayer) {
        this.my = my;
        this.leftPlayer = leftPlayer;
        this.rightPlayer = rightPlayer;
        this.players = [this.my, this.leftPlayer, this.rightPlayer];
    }
}

export default SceneManager;