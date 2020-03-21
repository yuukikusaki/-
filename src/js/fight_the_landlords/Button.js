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

}

// 抢地主 按钮
class ScoreBtn extends Button {
    constructor(name, score) {
        super(name);
        this.score = score;
    }
    onClick(socket,userid) {
        socket.emit('next', {userid,data:this.score});
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
        myPoker.map(card => {
            if (card.getChecked()) {
                card.isChecked = false;
                card.y += 20;
            }
        });
        const dealinfo = {
                userid,
                data:{dealList:[],typeRank:0}
        }
        socket.emit('next', dealinfo);
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
        if (myPoker.length == dealList.length) {
            typeRank = 'win';
        }
        const dealinfo = { 
            userid,
            data:{dealList,typeRank}
         }
        socket.emit('next', dealinfo);
    }

}
export { ScoreBtn,TipBtn, PassBtn,PlayBtn }