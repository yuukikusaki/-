import PokerResource from './pokerResource'
import  Poker from './Poker'
import {ScoreBtn} from './Button'

// 初始化类
class GameInit {
    constructor(canvasid, vm) {
        // 保留区 start
        this.canvas = document.querySelector(canvasid);
        this.ctx = this.canvas.getContext("2d");
        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;
        this.loadedRes = {}; // 加载完毕的资源
        // 保留区 end
        // canvas 信息

        this.pokerResource = PokerResource;
        this.pokerImage = this.pokerResource.images;
        // 加载资源
        this.loadAllResource();
        // 位置数据

        this.btnW = this.canvasW / 8;
        this.btnH = this.canvasH / 12;
        this.btnY = this.canvasH * 0.618;
        // 点击事件
        this.isfocus = true; // 按钮能否使用
        this.point = { x: null, y: null };
        this.vm = vm; // vm实例
    }
    // 读取资源(保留)
    loadAllResource() {
        let alreadyDoneNumber = 0;
        for (let i = 0; i < this.pokerImage.length; i++) {
            this.loadedRes[this.pokerImage[i].name] = new Image();
            this.loadedRes[this.pokerImage[i].name].src = this.pokerImage[i].url;
            this.loadedRes[this.pokerImage[i].name].onload = () => {
                alreadyDoneNumber++;
                if (alreadyDoneNumber == this.pokerImage.length) {
                    window.console.log('图片加载完毕');
                    // this.init()
                    this.render()
                }
            }
        }
    }

    // 设置初始图片（改为页面初始化）(修改)
    // setBgImage() {
    //     let canvasW = this.canvas.width;
    //     let canvasH = this.canvas.height;
    //     let btnW = this.btnW;
    //     let btnH = this.btnH;
    //     let btnY = this.btnY;
    //     // 设置背景图片
    //     this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, canvasW, canvasH);
    //     // 设置开始按钮
    //     this.startBtn = new StartBtn("startBtn", this.vm);
    //     this.startBtn.setPosition([canvasW / 2 - btnW / 2, btnY, btnW, btnH]);
    //     this.ctx.drawImage(this.loadedRes["startBtn"], canvasW / 2 - btnW / 2, btnY, btnW, btnH);
    //     this.settedRes.button = { y1: btnY, y2: btnY + btnH };
    //     this.settedRes.poker = { y1: this.canvasH - 170, y2: this.canvasH };
    //     this.button.push(this.startBtn);
    //     // this.setBtnImage();
    // }

    // 设置按钮
    // setBtn() {
    //     // 设置分数按钮
    //     if (!this.isplay) {
    //         this.buqiang = new ScoreBtn("不抢", this.vm, this, 0);
    //         this.qiang = new ScoreBtn("抢地主", this.vm, this, 1)
    //         this.button = [this.buqiang, this.qiang];
    //         let startX = this.canvasW / 2 - (this.button.length * this.btnW * 3 - this.btnW) / 4;
    //         this.button.forEach((item, index) => {
    //             item.setPosition([startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH]);
    //         });
    //     } else {
    //         // 设置游戏按钮
    //         this.pass = new PassBtn("不出", this.vm, this);
    //         this.tip = new TipBtn("tip");
    //         this.play = new PlayBtn("play", this.vm, this);
    //         this.button = [this.pass, this.tip, this.play];
    //         let startX = this.canvasW / 2 - (this.button.length * this.btnW * 3 - this.btnW) / 4;
    //         this.button.forEach((item, index) => {
    //             item.setPosition([startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH])
    //         });
    //     }
    // }

    // 添加点击事件
    addClickEvent() {
        // 1. 在初始化之后给 canvas 添加点击事件
        // 2. 根据点击的 x,y 找到对应的图片,y来判断是什么区
        // 3. 调用对应图片的事件
        this.canvas.addEventListener("click", (e) => {
            this.point.x = e.layerX;
            this.point.y = e.layerY;
            // 按钮y范围
            let buttonY1 = this.settedRes.button.y1;
            let buttonY2 = this.settedRes.button.y2;
            // 卡牌y范围
            let pokerY1 = this.settedRes.poker.y1;
            let pokerY2 = this.settedRes.poker.y2;

            // 按钮区
            if (this.point.y >= buttonY1 && this.point.y <= buttonY2) {
                if (this.isfocus == false) {
                    return;
                }
                // window.console.log(this.button);
                for (let i = 0; i < this.button.length; i++) {
                    let p = this.button[i].getPositionX();
                    if (e.layerX >= p.x1 && e.layerX <= p.x2) {
                        this.button[i].onClick(this.deck);
                    }
                }
            }
            // 卡牌区
            else if (this.point.y >= pokerY1 && this.point.y <= pokerY2) {
                for (let i = 0; i < this.deck.length; i++) {
                    let p = this.deck[i].getPositionX();
                    if (e.layerX >= p.x1 && e.layerX <= p.x2) {
                        this.deck[i].onClick();
                        this.drawFunc();
                        break;
                    }
                }
            }

        });
    }
}

/*
// 扑克牌游戏类
class PokerGame extends GameInit {
    constructor(params) {
        super(params.canvasid, params.that);
        // 游戏信息
        this.settedRes = { button: {}, poker: {} };
        this.button = []; // 存储按钮
        this.deck = []; // 牌组
        this.checkedDeck = []; // 选中的牌
        // 背景及一些初始化图片
        this.bgImage = null;
        this.startBtn = null;
        this.isplay = false; // 游戏是否开始
        // 两边玩家

        this.landCard = null; // 地主牌
        this.positionX = null; // 横向坐标
        this.deskCard = null; // 桌面上的牌
        this.text = '';
        this.oTR = null;
        // this.loadAllResource();
    }

    // 初始化
    init() {
        // 适应手机，暂时不需要
        // let windowW = document.documentElement.clientWidth;
        // let windowH = document.documentElement.clientHeight;
        // if (windowW > 414) {
        //     windowW = 414;
        // } else if (windowW < 320) {
        //     windowW = 320;
        // }
        // if (windowH > 736) {
        //     windowH = 736;
        // } else if (windowH < 500) {
        //     windowH = 500;
        // }
        let windowW = 800;
        let windowH = 600;
        this.canvas.width = windowW;
        this.canvas.height = windowH;
        this.setBgImage();
        this.addClickEvent();
    }

    // 发牌
    dealCards(pokerList) {
        this.setBtn();
        this.pokerList = pokerList;
        // 这里是一个动画动作，应该放入setInterval中
        // 1. 清空画布
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        // 2. 发牌动画和显示按钮
        // 2.1 先放背景图片
        this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvasW, this.canvasH);
        // 2.2 发牌动画，应该传入获得的牌组
        this.createPokerClass();
        this.dealAmine(1);
    }
    // 调用卡牌类
    createPokerClass() {
        let startX = this.canvasW / 2 - 52.5 - 16 * 10;
        for (let i = 0; i < this.pokerList.length; i++) {
            const poker = new PokerEvent(this.pokerList[i].name, this.pokerList[i].point);
            poker.setPosition([startX + i * 20, this.canvasH - 150, 20, 150]);
            this.deck.push(poker);
        }

    }

    // 动画
    dealAmine(len) {
        setTimeout(() => {
            this.drawPoker(len, len, len);
            if (len < this.pokerList.length) {
                this.dealAmine(++len);
            } else if (len == this.pokerList.length) {
                this.drawBtn();
                this.left = 17;
                this.right = 17;
            }
        }, 0) // 暂时归零
    }

    // 出牌展示
    setDeal(dealList) {
        this.deskCard = dealList;
        const len = dealList.length;
        let startX = this.canvasW / 2 - 52.5 - (len - 1) * 10;
        this.positionX = startX;
    }

    // 地主增加牌
    insertCard(landCard) {
        if (landCard == null) {
            return false;
        }
        this.deck = [];
        landCard.map(c => {
            for (let i = 0; i < this.pokerList.length; i++) {
                if (c.point > this.pokerList[i].point) {
                    this.pokerList.splice(i, 0, c);
                    break;
                }
            }
        });
        // 创建新的卡牌队列
        this.createPokerClass();
    }

    // 抢地主
    robText(data, direction) {
        if (data == 0) {
            this.text = "不抢";
        } else {
            this.text = "抢地主"
        }
        this.tPosition(direction);
    }
    // 改变牌数
    changeCardNum(cardInfo, direction) {
        if (cardInfo.length == 0) {
            // 打印文字
            this.text = '不出';
            this.tPosition(direction);
            return;
        } else {
            this.oTR = cardInfo.typeRank; // 把牌类型和大小给
            this.deskCard = cardInfo.dealList;
            this.pPosition(direction);
        }
    }

    // 卡牌方位
    pPosition(direction) {
        switch (direction) {
            case 'left':
                this.left -= this.deskCard.length;
                this.positionX = 200;
                this.lw = -9999;
                break;
            case 'right':
                this.right -= this.deskCard.length;
                this.positionX = this.canvasW - 300 - 20 * (this.deskCard.length - 1);
                this.rw = -9999;
                break;
            default:
                break;
        }
    }

    // 文字方向
    tPosition(direction) {
        switch (direction) {
            case 'my':
                this.mw = 382;
                break;
            case 'left':
                this.lw = 170;
                break;
            case 'right':
                this.rw = this.canvasW - 250;
                break;
            default:
                break;
        }
    }

    // 清理卡牌
    clearCard() {
        this.deskCard = [];
        this.oTR = null;
    }

    // 清理文字
    clearText() {
        this.mw = -9999;
    }

    // 清桌面
    clearDesk() {
        this.mw = -9999;
        this.lw = -9999;
        this.rw = -9999;
    }

    // 重置
    restart() {
        this.button = []; // 存储按钮
        this.deck = []; // 牌组
        this.pokerList = [];
        this.mw = -9999;
        this.lw = -9999;
        this.rw = -9999;
        this.left = 0;
        this.right = 0;
        this.landCard = null; // 地主牌
        this.positionX = null; // 横向坐标
        this.deskCard = null; // 桌面上的牌
        this.text = '';
        this.oTR = null;
        this.isfocus = true;
        this.setBgImage();
    }

    // 绘图方法 start
    // 画图顺序
    drawFunc() {
        // 按顺序来
        // 可以把每个分开来，把背景和安奈u放进这里，别的用case执行
        // 修改牌型也要单独列出来
        // 基础布局(背景，按钮，卡牌)
        // 1. 清空屏幕
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        // 2. 画上背景
        this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvasW, this.canvasH);
        // 3. 画上按钮
        this.drawBtn();
        // 4. 画卡牌
        this.drawPoker(this.deck.length, this.left, this.right);
        // 5. 写文字
        this.drawText();
        // 6. 地主牌展示
        this.drawLandCard();
        // 7. 画桌面上的卡牌
        this.drawDeskCard();
    }
    // 3. 描绘按钮
    drawBtn() {
        if (this.isfocus == false) {
            return;
        }
        let startX = this.canvasW / 2 - (this.button.length * this.btnW * 3 - this.btnW) / 4;
        this.button.forEach((item, index) => {
            this.ctx.drawImage(this.loadedRes[item.name],
                startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH)
        });
    }
    // 4. 画卡牌
    drawPoker(mlen, llen, rlen) {
        let startX = this.canvasW / 2 - 52.5 - (mlen - 1) * 10;
        let startL = this.canvasH / 2 + 52.5 + (llen - 1) * 5 - (this.canvasW - this.canvasH) / 2;
        let startR = this.canvasH / 2 - 52.5 - (rlen - 1) * 5;
        for (let i = 0; i < mlen; i++) {
            // 自己
            this.ctx.drawImage(
                this.loadedRes[this.deck[i].name],
                startX + i * 20,
                this.deck[i].y);
            this.deck[i].changePosition(startX + i * 20);
            if (i == this.deck.length - 1) {
                this.deck[i].setLast(true);
            }
        }
        // 平移加旋转，x，y轴也旋转了，虚拟的已经画上去了
        // 这里改的只是绘画方向，变回去之后已经写好的也不会变
        this.ctx.translate(this.canvasW, 0);
        this.ctx.rotate(Math.PI / 2);
        // 左边
        for (let i = 0; i < llen; i++) {
            this.ctx.drawImage(
                this.loadedRes["pokerBack"],
                startL - i * 10,
                this.canvasW - 150,
            );
        }
        // 右边
        for (let i = 0; i < rlen; i++) {
            this.ctx.drawImage(
                this.loadedRes["pokerBack"],
                startR + i * 10,
                0,
            );
        }
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.translate(-this.canvasW, 0);
    }
    // 5. 写文字
    drawText() {
        // 设置字体
        // window.console.log(this.text);
        this.ctx.font = "36px bold 宋体";
        // 设置颜色
        this.ctx.fillStyle = "#ff0";
        this.ctx.fillText(this.text, this.mw, this.canvasH * 2 / 3)
        this.ctx.fillText(this.text, this.lw, this.canvasH / 3);
        this.ctx.fillText(this.text, this.rw, this.canvasH / 3);
    }
    // 6. 地主牌显示
    drawLandCard() {
        if (this.landCard == null) {
            return false;
        }
        for (let i = 0; i < 3; i++) {
            this.ctx.drawImage(this.loadedRes[this.landCard[i].name],
                this.canvasW / 2 - 72 + i * 20.5, 0);
        }
    }
    // 7. 画桌面上的卡牌
    drawDeskCard() {
        if (!this.deskCard) {
            return;
        }
        for (let i = 0; i < this.deskCard.length; i++) {
            this.ctx.drawImage(
                this.loadedRes[this.deskCard[i].name],
                this.positionX + i * 20,
                this.canvasH / 2 - 100,
            );
        }
    }
    // 绘图方法 end
}
*/

class PokerGame {
    constructor(canvas, ctx, loadedRes, sceneManager) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loadedRes = loadedRes;
        this.sceneManager = sceneManager;
        this.pokerList = []; // 接收到的卡牌列表
        this.mypoker = []; // 我的卡牌

        // 
        this.btnW = this.canvas.width / 8;
        this.btnH = this.canvas.height / 12;
        this.btnY = this.canvas.height * 0.618;
    }

    // 创建卡牌类
    createPokerClass() {
        let startX = this.canvas.width / 2 - 52.5 - 16 * 10;
        for (let i = 0; i < this.pokerList.length; i++) {
            const poker = new Poker(this.pokerList[i].name, this.pokerList[i].point);
            poker.setPosition([startX + i * 20, this.canvas.height - 150, 20, 150]);
            this.mypoker.push(poker);
        }

    }

    // 按钮
    setLordBtn() {
        const buqiang = new ScoreBtn("不抢", 0);
        window.console.log(buqiang)
        const qiang = new ScoreBtn("抢地主", 1)
        const buttonList = [buqiang, qiang];
        const startX = this.canvas.width / 2 - (buttonList.length * this.btnW * 3 - this.btnW) / 4;
        buttonList.forEach((item, index) => {
            item.setPosition([startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH]);
        });
        return buttonList;
    }

    // 动画
    dealAmine(len) {
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvas.width, this.canvas.height);
            this.renderMyPoker(len);
            this.renderLeftPlayerPoker(len);
            this.renderRightPlayerPoker(len);
            if (len < 17) {
                this.dealAmine(++len);
            } else if (len == 17) {
                this.sceneManager.render();
                this.sceneManager.bindEvent()
                // this.drawBtn();
            }
        }, 20) // 暂时归零
    }

    // 渲染卡牌 start
    // 渲染三方卡牌
    renderPoker(mlen,llen,rlen){
        this.renderMyPoker(mlen);
        this.renderLeftPlayerPoker(llen);
        this.renderRightPlayerPoker(rlen);
    }

    // 渲染我的卡牌
    renderMyPoker(len) {
        let startX = this.canvas.width / 2 - 52.5 - (len - 1) * 10;
        for (let i = 0; i < len; i++) {
            // 自己
            this.ctx.drawImage(
                this.loadedRes[this.mypoker[i].name],
                startX + i * 20,
                this.mypoker[i].y);
            this.mypoker[i].changePosition(startX + i * 20);
            if (i == this.mypoker.length - 1) {
                this.mypoker[i].setLast(true);
            }
        }
    }

    // 渲染左边
    renderLeftPlayerPoker(len) {
        let start = this.canvas.height / 2 + 52.5 + (len - 1) * 5 - (this.canvas.width - this.canvas.height) / 2;
        this.ctx.save();
        this.ctx.translate(this.canvas.width, 0);
        this.ctx.rotate(Math.PI / 2);
        // 左边
        for (let i = 0; i < len; i++) {
            this.ctx.drawImage(
                this.loadedRes["pokerBack"],
                start - i * 10,
                this.canvas.width - 150,
            );
        }
        this.ctx.restore();
    }

    // 渲染右边
    renderRightPlayerPoker(len) {
        const start = this.canvas.height / 2 - 52.5 - (len - 1) * 5;
        this.ctx.save();
        this.ctx.translate(this.canvas.width, 0);
        this.ctx.rotate(Math.PI / 2);
        // 右边
        for (let i = 0; i < len; i++) {
            this.ctx.drawImage(
                this.loadedRes["pokerBack"],
                start + i * 10,
                0,
            );
        }
        this.ctx.restore();
    }
    // 渲染卡牌 start

    // 渲染抢地主按钮
    renderLordBtn(buttonList) {
        buttonList.forEach(item => {
            this.ctx.drawImage(this.loadedRes[item.name],
                item.x,item.y,item.w,item.h)
        });
    }

    // 渲染三方文字
    renderText(my,left,right){
        this.ctx.font = "36px bold 宋体";
        // 设置颜色
        this.ctx.fillStyle = "#ff0";
        if(my.text){
            this.ctx.fillText(my.text, my.textX, my.textY);
        }
        if(left.text){
            this.ctx.fillText(left.text, left.textX, left.textY);
        }
        if(right.text){
            this.ctx.fillText(right.text, right.textX, right.textY);
        }
        // this.ctx.fillText(this.text, this.mw, this.canvasH * 2 / 3)
    }

}


export { GameInit, PokerGame };