import  ButtonEvent  from './gameEvent'

// 扑克牌游戏类
class PokerGame {
    constructor(params) {
        this.canvas = document.querySelector(params.canvasid);
        this.ctx = this.canvas.getContext("2d");
        this.pokerResource = params.pokerResource;
        this.pokerImage = this.pokerResource.images;
        this.loadedRes = {}; // 加载完毕的资源
        // 保存设置完毕的资源，背景图片分开，0位置存放Y区域对象
        this.settedRes = { button: [], poker: [] };
        // 背景及一些初始化图片
        this.bgImage = null;
        this.startBtn = null;
        this.one = null;
        this.two = null;
        this.three = null;
        this.loadAllResource();
        // 位置数据
        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;
        this.btnW = this.canvasW / 8;
        this.btnH = this.canvasH / 12;
        this.btnY = this.canvasH * 0.618;
        // 点击事件
        this.point = { x: null, y: null };
        // this.init();
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

    // 读取资源
    loadAllResource() {
        let alreadyDoneNumber = 0;
        for (let i = 0; i < this.pokerImage.length; i++) {
            this.loadedRes[this.pokerImage[i].name] = new Image();
            this.loadedRes[this.pokerImage[i].name].src = this.pokerImage[i].url;
            this.loadedRes[this.pokerImage[i].name].onload = () => {
                alreadyDoneNumber++;
                if (alreadyDoneNumber == this.pokerImage.length) {
                    window.console.log('图片加载完毕');
                    this.init()
                }
            }
        }
    }

    // 设置初始图片（改为页面初始化）
    setBgImage() {
        let canvasW = this.canvas.width;
        let canvasH = this.canvas.height;
        let btnW = this.btnW;
        let btnH = this.btnH;
        let btnY = this.btnY;
        // 设置背景图片
        this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, canvasW, canvasH);
        // 设置开始按钮
        this.startBtn = new ButtonEvent();
        this.startBtn.setPosition("startBtn", [canvasW / 2 - btnW / 2, btnY, btnW, btnH]);
        this.ctx.drawImage(this.loadedRes["startBtn"], canvasW / 2 - btnW / 2, btnY, btnW, btnH);
        this.settedRes.button.push({ y1: btnY, y2: btnY + btnH });
        this.settedRes.button.push(this.startBtn);
        // this.setBtnImage();
    }

    // 设置按钮图片
    setScoreImage() {
        let canvasW = this.canvasW;
        let btnW = this.btnW;
        let btnH = this.btnH;
        let btnY = this.btnY;

        // 设置分数按钮
        this.one = new ButtonEvent();
        this.two = new ButtonEvent();
        this.three = new ButtonEvent();
        this.one.setPosition("one", [canvasW / 3 - btnW / 2, btnY, btnW, btnH])
        this.two.setPosition("two", [canvasW / 2 - btnW / 2, btnY, btnW, btnH])
        this.three.setPosition("three", [canvasW * 2 / 3 - btnW / 2, btnY, btnW, btnH]);
        this.ctx.drawImage(this.loadedRes["one"], canvasW / 3 - btnW / 2, btnY, btnW, btnH);
        this.ctx.drawImage(this.loadedRes["two"], canvasW / 2 - btnW / 2, btnY, btnW, btnH);
        this.ctx.drawImage(this.loadedRes["three"], canvasW * 2 / 3 - btnW / 2, btnY, btnW, btnH);
        this.settedRes.button.push(this.one, this.two, this.three);
    }

    // 添加点击事件
    addClickEvent() {
        // 1. 在初始化之后给 canvas 添加点击事件
        // 2. 根据点击的 x,y 找到对应的图片,y来判断是什么区
        // 3. 调用对应图片的事件
        this.canvas.addEventListener("click", (e) => {
            this.point.x = e.layerX;
            this.point.y = e.layerY;
            // 按钮区
            let buttonY1 = this.settedRes.button[0].y1;
            let buttonY2 = this.settedRes.button[0].y2;
            if (this.point.y >= buttonY1 && this.point.y <= buttonY2) {
                for (let i = 1; i < this.settedRes.button.length; i++) {
                    let p = this.settedRes.button[i].getPositionX();
                    if (e.layerX >= p.x1 && e.layerX <= p.x2) {
                        this.settedRes.button[i].onClick();
                        // *这里暂时这么写
                        // 理论上应该是按钮类发送给服务端，服务端回发调用
                        this.judgeClickEvent(this.settedRes.button[i]);
                        break;
                    }
                }
            }
            // 卡牌区
            // 1. 

        })
    }

    // 判断点击事件（有服务端的话应该在服务端）
    judgeClickEvent(btn) {
        if (btn.name == "startBtn") {
            this.dealCards()
        }
    }

    // 发牌
    dealCards() {
        // 这里是一个动画动作，应该放入setInterval中
        // 1. 清空画布
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        // 2. 发牌动画和显示按钮
        // 2.1 先放背景图片
        this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvasW, this.canvasH);
        // 2.2 发牌动画，应该传入获得的牌组
        this.dealAmine(1);
    }

    // 发牌动画
    dealAmine(len) {
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
            this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvasW, this.canvasH);
            this.setScoreImage();
            let startX = this.canvasW / 2 - 52.5 - (len - 1) * 10;
            let startL = this.canvasH / 2 + 52.5 + (len - 1) * 5 - (this.canvasW - this.canvasH) / 2;
            let startR = this.canvasH / 2 - 52.5 - (len - 1) * 5;
            for (let i = 0; i < len; i++) {
                // 自己
                this.ctx.drawImage(
                    this.loadedRes[this.pokerImage[i].name],
                    startX + i * 20,
                    this.canvasH - 150);
                // 平移加旋转，x，y轴也旋转了，虚拟的已经画上去了
                // 这里改的只是绘画方向，变回去之后已经写好的也不会变
                this.ctx.translate(this.canvasW, 0);
                this.ctx.rotate(Math.PI / 2);
                // 左边
                this.ctx.drawImage(
                    this.loadedRes["pokerBack"],
                    startL - i * 10,
                    this.canvasW - 150,
                );
                // 右边
                this.ctx.drawImage(
                    this.loadedRes["pokerBack"],
                    startR + i * 10,
                    0,
                );
                this.ctx.rotate(-Math.PI / 2);
                this.ctx.translate(-this.canvasW, 0);
            }

            if (len < this.pokerImage.length / 3) {
                this.dealAmine(++len);
            }
        }, 300);
    }
}

export default PokerGame;