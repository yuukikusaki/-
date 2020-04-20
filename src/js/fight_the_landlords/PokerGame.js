import Poker from './Poker'
import { ScoreBtn, TipBtn, PassBtn, PlayBtn } from './Button'

class PokerGame {
    constructor(canvas, ctx, loadedRes, sceneManager) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loadedRes = loadedRes;
        this.sceneManager = sceneManager;
        this.pokerList = []; // 接收到的卡牌列表
        this.mypoker = []; // 我的卡牌
        this.landCard = []; // 地主牌
        // 按钮大小和位置
        this.btnW = this.canvas.width / 8;
        this.btnH = this.canvas.height / 12;
        this.btnY = this.canvas.height * 0.618;
        this.head = { x: null, y: null }
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

    // 抢地主按钮
    setLordBtn() {
        const buqiang = new ScoreBtn("不抢", 0);
        const qiang = new ScoreBtn("抢地主", 1)
        const buttonList = [buqiang, qiang];
        const startX = this.canvas.width / 2 - (buttonList.length * this.btnW * 3 - this.btnW) / 4;
        buttonList.forEach((item, index) => {
            item.setPosition([startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH]);
        });
        return buttonList;
    }

    // 游戏按钮
    setPlayBtn(nopass) {
        const buttonList = []
        if (nopass === false) {
            this.pass = new PassBtn("不出");
            buttonList.push(this.pass);
        }
        this.tip = new TipBtn("提示");
        buttonList.push(this.tip);
        this.play = new PlayBtn("出牌");
        buttonList.push(this.play);
        // buttonList = [this.pass, this.tip, this.play];
        const startX = this.canvas.width / 2 - (buttonList.length * this.btnW * 3 - this.btnW) / 4;
        buttonList.forEach((item, index) => {
            item.setPosition([startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH])
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

    // 地主增加牌
    insertCard() {
        if (this.landCard == false) {
            return false;
        }
        this.landCard.map(item => {
            for (let i = 0; i < this.pokerList.length; i++) {
                if (item.point >= this.pokerList[i].point) {
                    this.pokerList.splice(i, 0, item);
                    break;
                }
            }
            // 如果比最小的小
            if (item.point < this.pokerList[this.pokerList.length - 1].point) {
                this.pokerList.push(item);
            }
        });
        this.mypoker = [];
        // 创建新的卡牌队列
        this.createPokerClass();
    }


    // 渲染按钮 start
    // 渲染准备按钮
    renderReadyBtn(my) {
        if (my == null || my.text == "") {
            this.ctx.drawImage(this.loadedRes["ready"], this.canvas.width / 2 - 65, this.canvas.height * 0.618, 130, 65);
        } else {
            this.ctx.drawImage(this.loadedRes["cancel"], this.canvas.width / 2 - 65, this.canvas.height * 0.618, 130, 65);
        }
    }

    // 渲染抢地主按钮
    renderLordBtn(buttonList) {
        buttonList.forEach(item => {
            this.ctx.drawImage(this.loadedRes[item.name],
                item.x, item.y, item.w, item.h)
        });
    }

    // 渲染游戏按钮
    renderPlayBtn(buttonList) {
        buttonList.forEach(item => {
            this.ctx.drawImage(this.loadedRes[item.name],
                item.x, item.y, item.w, item.h)
        });
    }

    // 渲染重置按钮
    renderRestart() {
        this.ctx.drawImage(this.loadedRes["restart"],
            this.canvas.width / 2 - this.btnW / 2, this.canvas.height / 3,
            this.btnW, this.btnW);
    }
    // 渲染按钮 end

    // 渲染卡牌 start
    // 渲染三方卡牌
    renderPoker(mlen, llen, rlen) {
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

    // 渲染地主牌
    renderLandCard() {
        if (this.landCard == false) {
            return false;
        }
        for (let i = 0; i < 3; i++) {
            this.ctx.drawImage(this.loadedRes[this.landCard[i].name],
                this.canvas.width / 2 - 72 + i * 20.5, 0);
        }
    }

    // 渲染三方文字
    renderText(my, left, right, sn) {
        this.ctx.font = "36px bold 宋体";
        // 设置颜色
        this.ctx.fillStyle = "#ff0";
        if (my == null) return;
        if (sn === 1) {
            this.ctx.fillText(left.text, 50, left.textY);
            this.ctx.fillText(right.text, this.canvas.width - 100, right.textY);
            return
        }
        if (my != null && my.text) {
            this.ctx.fillText(my.text, my.textX, my.textY);
        }
        if (left != null && left.text) {
            this.ctx.fillText(left.text, left.textX, left.textY);
        }
        if (right != null && right.text) {
            this.ctx.fillText(right.text, right.textX, right.textY);
        }
        // this.ctx.fillText(this.text, this.mw, this.canvasH * 2 / 3)
    }

    // 渲染桌面上的卡牌
    renderDeskPoker(my, left, right) {
        this.renderLeftDeskPoker(left);
        this.renderMyDeskPoker(my);
        this.renderRightDeskPoker(right);
    }

    // 渲染我桌面上的卡牌
    renderMyDeskPoker(my) {
        if (my.deskPoker == false) {
            return;
        }
        for (let i = 0; i < my.deskPoker.length; i++) {
            this.ctx.drawImage(
                this.loadedRes[my.deskPoker[i].name],
                this.canvas.width / 2 - 52.5 - (my.deskPoker.length - 1) * 10 + i * 20,
                my.deskY,
            );
        }
    }

    // 渲染左边桌面上的卡牌
    renderLeftDeskPoker(left) {
        if (left.deskPoker == false) {
            return;
        }
        for (let i = 0; i < left.deskPoker.length; i++) {
            this.ctx.drawImage(
                this.loadedRes[left.deskPoker[i].name],
                180 + i * 20,
                left.deskY,
            );
        }
    }

    // 渲染右边桌面上的卡牌
    renderRightDeskPoker(right) {
        if (right.deskPoker == false) {
            return;
        }
        for (let i = 0; i < right.deskPoker.length; i++) {
            this.ctx.drawImage(
                this.loadedRes[right.deskPoker[i].name],
                this.canvas.width - 300 - 20 * (right.deskPoker.length - 1) + i * 20,
                right.deskY,
            );
        }
    }

    // 渲染卡牌 end

    // 设置地主头像
    setLandlordHead(index) {
        switch (index) {
            case 0:
                this.head.x = 120;
                this.head.y = this.canvas.height - 150;
                break;
            case 1:
                this.head.x = 120;
                this.head.y = 120;
                break;
            case 2:
                this.head.x = this.canvas.width - 150;
                this.head.y = 120;
                break;
            default:
                break;
        }
    }

    // 渲染地主头像
    renderLandlordHead() {
        this.ctx.drawImage(this.loadedRes["地主"], this.head.x, this.head.y, 30, 30);
    }



}

export { PokerGame };