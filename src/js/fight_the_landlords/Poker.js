// 卡牌类
class Poker {
    constructor(name,point) {
        this.name = name
        // 记录图片位置和长宽
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.isLast = false;
        this.point = point;
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

export default Poker;
