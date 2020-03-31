// 猜拳游戏类
import { Shears, Stone, Hand } from './Selections'
import Vue from 'vue'

export default class MorraGame {
    constructor(canvas, ctx, loadedRes) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loadedRes = loadedRes;
        this.imgW = 101;
        this.imgH = 101;
        this.selects = [];
    }

    // 设置选项按钮
    setSelects() {
        const shears = new Shears("剪刀");
        const stone = new Stone("石头");
        const hand = new Hand("布");
        this.selects = [shears, stone, hand];
        let startY = (this.canvas.height - 3 * this.imgH - 2 * 50) / 2;
        this.selects.forEach((item, index) => {
            item.setPosition([50, startY + index * (this.imgH + 50), this.imgW, this.imgH]);
        });
    }

    // 背景图片
    renderBgImg() {
        this.ctx.drawImage(this.loadedRes["background"], 0, 0, this.canvas.width, this.canvas.height);
    }

    // 选项图片
    renderSelects() {
        this.selects.map(item => {
            window.console.log(item)
            this.ctx.drawImage(this.loadedRes[item.name], item.x, item.y, item.w, item.h);
        });
    }

    // 展示选择
    renderChoose(my, oth) {
        if (my !== "") {
            this.ctx.drawImage(this.loadedRes[my], this.canvas.width / 2 - 2 * this.imgW,
                (this.canvas.height - this.imgH) / 2, this.imgW, this.imgH);
        }
        if (oth !== "") {
            this.ctx.drawImage(this.loadedRes[oth], this.canvas.width / 2 + this.imgW,
                (this.canvas.height - this.imgH) / 2, this.imgW, this.imgH);
        }
    }

    // 渲染结果
    renderText(text) {
        // this.ctx.font = "36px bold 宋体";
        // // 设置颜色
        // this.ctx.fillStyle = "#ff0";
        // this.ctx.fillText(text, this.canvas.width/2-18, 50);
        switch (text) {
            case "平局":
                Vue.prototype.$message.warning(text);
                break;
            case "胜利":
                Vue.prototype.$message.success(text);
                break;
            case "失败":
                Vue.prototype.$message.error(text);
                break;
            default:
                break;
        }
    }

    // 渲染重新开始按钮
    renderRestart() {
        this.ctx.drawImage(this.loadedRes["restart"],
            this.canvas.width / 2 - this.imgW / 2, this.canvas.height / 2 - this.imgH / 2,
            this.imgW, this.imgH);
    }
}