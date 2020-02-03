// 按钮类
class ButtonEvent {
    constructor(vm) {
        this.name = null;
        // 记录图片位置和长宽
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.vm = vm;
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

    // 点击事件
    onClick() {
        window.console.log(this.name)
        switch (this.name) {
            case 'startBtn':
                this.vm.$socket.emit('onready');
                break;
            case 'pass':
                // this.that.$socket.emit()
                // that.drawPoker(that.deck);
                break;
            case 'tip':
                break;
            case 'play':
                // this.that.$socket.emit()
                break;
            default:
                // this.that.$socket.emit('')
                break;
        }
        return;
        // 1. 点击之后把数据返回给游戏主类
        // 2. 游戏主类把这些信息发送给服务器
        // 3. 如果是卡牌，则改变位置
    }
}

class PassButton extends ButtonEvent {
    constructor(that) {
        super();
        this.that = that;
    }

    onClick(deck) {
        deck.map(card => {
            window.console.log()
            if (card.getChecked()) {
                card.isChecked = false;
                card.y += 20;
            }
        });
        this.that.drawPoker(deck.length);
    }
}

// 卡牌类
class PokerEvent {
    constructor() {
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
        window.console.log(this.name);
    }

    getChecked() {
        return this.isChecked;
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

export { ButtonEvent, PassButton, PokerEvent }