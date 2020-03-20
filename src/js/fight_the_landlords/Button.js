import { candeal } from './pokerRule'
// 按钮类
class Button {
    constructor(name) {
        this.name = name;
        // 记录图片位置和长宽
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
    }

    // 设置图片位置
    setPosition(positon) {
        this.x = positon[0];
        this.y = positon[1];
        this.w = positon[2];
        this.h = positon[3];
    }

    // 获取图片位置
    getPositionX() {
        let positon = {
            x1: this.x,
            x2: this.x + this.w,
        };
        return positon;
    }


    // 1. 点击之后把数据返回给游戏主类
    // 2. 游戏主类把这些信息发送给服务器
    // 3. 如果是卡牌，则改变位置

}

// 抢地主 按钮
class ScoreBtn extends Button {
    constructor(name, score) {
        super(name);
        this.score = score;
    }
    onClick(socket,userid) {
        socket.emit('next', {userid,data:this.score});
        // this.that.text = this.name
        // this.that.tPosition('my');
        // this.that.drawFunc();
    }
}

// 不出 按钮
class PassBtn extends Button {
    constructor(name) {
        super(name);
        this.canClick = false; // 是否可以不出
    }

    reClick(flag) {
        this.canClick = flag;
    }
    onClick(socket,userid,myPoker) {
        // if (this.canClick) {
        //     return;
        // }
        myPoker.map(card => {
            if (card.getChecked()) {
                card.isChecked = false;
                card.y += 20;
            }
        });
        // this.that.text = this.name
        // this.that.tPosition('my');
        // this.that.drawFunc();
        // socket
        const dealinfo = {
                userid,
                data:{dealList:[],typeRank:0}
        }
        socket.emit('next', dealinfo);
        // this.that.rw = -9999; // 清右边
    }
}

// 提示 按钮
class TipBtn extends Button {

}

// 出牌 按钮
class PlayBtn extends Button {
    constructor(name) {
        super(name);
    }
    onClick(socket,userid,myPoker,pokerTypeRank) {
        // 先放入出牌列表
        let dealList = [];
        myPoker.map(item => {
            if (item.getChecked()) {
                dealList.push(item);
            }
        });
        let typeRank = candeal(dealList, pokerTypeRank);
        if (typeRank == false) {
            return false;
        }
        // 删除牌组中的卡牌
        // myPoker = myPoker.filter(c => !c.getChecked());
        // this.that.setDeal(dealList);
        // this.that.drawFunc();
        if (myPoker.length == 0) {
            pokerTypeRank = 'win';
        }
        const dealinfo = { 
            userid,
            data:{dealList,typeRank}
         }
        socket.emit('next', dealinfo);
        window.console.log(myPoker)
        // return myPoker;
    }

}
export { ScoreBtn,TipBtn, PassBtn,PlayBtn }

// // 设置分数按钮
// function setLordBtn() {
//     const buqiang = new ScoreBtn("不抢", 0);
//     const qiang = new ScoreBtn("抢地主", 1)
//     const buttonList = [buqiang, qiang];
//     const startX = this.canvasW / 2 - (buttonList.length * this.btnW * 3 - this.btnW) / 4;
//     buttonList.forEach((item, index) => {
//         item.setPosition([startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH]);
//     });
//     return buttonList;
    
// }

// // 设置游戏按钮
// function setplayBtn() {
//     this.pass = new PassBtn("不出", this.vm, this);
//     this.tip = new TipBtn("tip");
//     this.play = new PlayBtn("play", this.vm, this);
//     this.button = [this.pass, this.tip, this.play];
//     let startX = this.canvasW / 2 - (this.button.length * this.btnW * 3 - this.btnW) / 4;
//     this.button.forEach((item, index) => {
//         item.setPosition([startX + index * this.btnW * 1.5, this.btnY, this.btnW, this.btnH])
//     });
// }

// export {setLordBtn,setplayBtn}