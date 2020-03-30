// 猜拳游戏类
import {Shears,Stone,Hand} from './Selections'

export default class MorraGame{
    constructor(canvas,ctx,loadedRes){
        this.canvas = canvas;
        this.ctx = ctx;
        this.loadedRes = loadedRes;
        this.imgW = 101;
        this.imgH = 101;
        this.selects = [];
    }

    // 设置选项按钮
    setSelects(){
        const shears = new Shears("shears");
        const stone = new Stone("stone");
        const hand = new Hand("hand");
        this.selects = [shears,stone,hand];
        let startY = (this.canvas.height-3*this.imgH-2*50)/2;
        this.selects.forEach((item,index)=>{
            item.setPosition([50,startY+index*(this.imgH+50),this.imgW,this.imgH]);
        });
    }

    // 背景图片
    renderBgImg(){
        this.ctx.drawImage(this.loadedRes["background"],0,0,this.canvas.width,this.canvas.height);
    }

    // 选项图片
    renderSelects(){
        // let startY = (this.canvas.height-3*this.imgH-2*50)/2;
        // this.ctx.drawImage(this.loadedRes["shears"],50,startY,this.imgW,this.imgH);
        // startY += this.imgH+50;
        // this.ctx.drawImage(this.loadedRes["stone"],50,startY,this.imgW,this.imgH);
        // startY += this.imgH+50;
        // this.ctx.drawImage(this.loadedRes["hand"],50,startY,this.imgW,this.imgH);
        this.selects.map(item=>{
            window.console.log(item)
            this.ctx.drawImage(this.loadedRes[item.name],item.x,item.y,item.w,item.h);
        });
    }
}