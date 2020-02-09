// 按钮类
class Button {
    constructor(vm,that) {
        this.name = null;
        // 记录图片位置和长宽
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.vm = vm;
        this.that = that;
    }

    // 设置图片位置
    setPosition(name, positon) {
        this.name = name;
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

// startBtn 按钮
class startBtn extends Button {
    constructor(vm,that) {
        super(vm,that);
    }

    onClick() {
        this.vm.$socket.emit('onready',this.vm.room.rid);
    }
}

// 抢地主 按钮
class scoreBtn extends Button{
    constructor(vm,that){
        super(vm,that);
    }
    onClick(score){
        this.vm.$socket.emit('next',score);
    }
}

// 不出 按钮
class PassBtn extends Button {
    constructor(vm,that) {
        super(vm,that);
    }

    onClick(deck) {
        deck.map(card => {
            if (card.getChecked()) {
                card.isChecked = false;
                card.y += 20;
            }
        });
        this.that.drawPoker(deck.length);
        // socket
        this.vm.$socket.emit('next',null);
    }
}

// 提示 按钮
class tipBtn extends Button{

}

// 出牌 按钮
class PlayBtn extends Button {
    constructor(vm,that) {
        super(vm,that);
    }
    onClick(deck){
        let dealList = [];
        for(let i=0;i<deck.length;i++){
            if(deck[i].getChecked()){
                dealList.push(deck[i]);
                deck[i] = undefined;
            }
        }
        this.that.deck = deck.filter(c=>c);
        this.that.drawPoker(this.that.deck.length);
        this.that.drawDealList(dealList);
        this.vm.$socket.emit('next',dealList);
    }

}

// 卡牌类
class PokerEvent {
    constructor(name) {
        this.name = name
        // 记录图片位置和长宽
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.isLast = false;
        this.isChecked = false;
    }

    // 设置图片位置
    setPosition(positon) {
        this.x = positon[0];
        this.y = positon[1];
        this.width = positon[2];
        this.height = positon[3];
    }

    // 获取图片 X 坐标
    getPositionX() {
        // 最后一张是完整返回，给最后一张加个指针
        // 别的都是自己的起始到下一个起始
        // 因此返回自己的x就行
        let positon = null;
        if (this.isLast) {
            positon = {
                x1: this.x,
                x2: this.x + 105,
            };
            return positon
        } else {
            positon = {
                x1: this.x,
                x2: this.x + this.width
            }
            return positon;
        }
    }

    // 标记为最后一张图片
    setLast(flag) {
        this.isLast = flag;
    }

    getChecked() {
        return this.isChecked;
    }

    // 改变位置
    changePosition(x){
        this.x = x;
    }

    // 点击事件
    onClick() {
        if (this.isChecked) {
            this.isChecked = false;
            this.y += 20;
        } else {
            this.isChecked = true;
            this.y -= 20;
        }
        // 1. 点击之后把数据返回给游戏主类
        // 2. 游戏主类把这些信息发送给服务器
        // 3. 如果是卡牌，则改变位置
    }
}

export { scoreBtn, startBtn,tipBtn, PassBtn,PlayBtn, PokerEvent }