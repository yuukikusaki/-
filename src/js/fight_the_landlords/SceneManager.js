// 场景管理器
/**
 *  1: 初始屏幕，只有背景和准备按钮
 *  2：进入场景二，抢地主阶段，首先便是发牌页面
 *  3：场景三，出牌阶段
 *  4：结束画面
 */
import loadAllResource from './LoadResource'
import { PokerGame } from './pokerGame';
import { My, LeftPlayer, RightPlayer } from './Player'


class SceneManager {
    constructor(canvas, ctx, socket) {
        this.canvas = canvas,
            this.ctx = ctx;
        this.sceneNumber = 1;
        this.loadedRes = null;
        this.socket = socket;
        this.pokerGame = null;
        this.buttonList = []; // 按钮列表
        this.press = true;
        // 玩家类
        this.my = null;
        this.leftPlayer = null;
        this.rightPlayer = null;
        this.bindEvent(); // 添加监听
        // this.loadAllResource();
        // this.render()
    }

    // 场景内动作
    update() {
        switch (this.sceneNumber) {
            case 1:

                break;
            case 2:
                break;
            default:
                break;
        }
    }


    /**
     * this.ctx.fillText(this.text, this.mw, this.canvasH * 2 / 3)
        this.ctx.fillText(this.text, this.lw, this.canvasH / 3);
        this.ctx.fillText(this.text, this.rw, this.canvasH / 3);
     */

    // 选择渲染的场景
    render() {
        switch (this.sceneNumber) {
            case 1:
                // 1. 创建 pokergame
                this.pokerGame = new PokerGame(this.canvas, this.ctx, this.loadedRes, this);
                // 2. 创建三个玩家类（出牌的 x y 和 文字的 x y）
                this.my = new My(this.canvas.width / 2, this.canvas.height / 2 - 100, this.canvas.w / 2 - 18, this.canvas.height * 2 / 3);
                this.leftPlayer = new LeftPlayer(200, this.canvas.height / 2 - 150, 170, this.canvas.height / 3);
                this.rightPlayer = new RightPlayer(this.canvas.width - 300, this.canvas.height / 2 - 150, this.canvas.width - 250, this.canvas.height / 3);
                // 3. 加载背景和准备按钮
                this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.loadedRes["startBtn"], this.canvas.width / 2 - 65, this.canvas.height * 0.618, 130, 65);
                break;
            case 2:
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvas.width, this.canvas.height);
                // 渲染三方面玩家的卡牌
                this.pokerGame.renderPoker(this.my.length, this.leftPlayer.length, this.rightPlayer.length);
                // this.pokerGame.renderLeftPlayer(17);
                // this.pokerGame.renderRightPlayer(17);
                this.buttonList = this.pokerGame.setLordBtn(); // 设置抢地主按钮
                this.pokerGame.renderLordBtn(this.buttonList); // 渲染抢地主按钮
                // 渲染三方的文字
                this.pokerGame.renderText();
                break;

            default:
                break;
        }
    }

    // 进入场景时的动作
    enter(data) {
        switch (this.sceneNumber) {
            case 1:
                // 获取资源
                loadAllResource(this.canvas, this.ctx, this);
                break;
            case 2:
                // 发牌动画
                this.pokerGame.pokerList = data; // 传入牌组
                this.pokerGame.createPokerClass(); // 创建卡牌类
                this.pokerGame.dealAmine(1, this);
                break;
            default:
                break;
        }
    }

    // 添加监听
    bindEvent() {
        this.canvas.onclick = event => {
            if(this.press==false){
                return;
            }
            window.console.log(event)
            const mousex = event.layerX;
            const mousey = event.layerY;
            switch (this.sceneNumber) {
                case 1:
                    if (mousex > this.canvas.width / 2 - 65 && mousex < this.canvas.width / 2 + 65 &&
                        mousey > this.canvas.height * 0.618 && mousey < this.canvas.height * 0.618 + 65) {
                        this.socket.emit('onready');
                    }
                    break;
                case 2:
                    // 添加抢地主事件
                    this.buttonList.map(item => {
                        if (mousex > item.x && mousex < item.x + item.w && mousey > item.y && mousey < item.y + item.h) { 
                                item.onClick(this.socket);
                        }
                    });
                    break;

                default:
                    break;
            }
        }


    }
}

export default SceneManager;