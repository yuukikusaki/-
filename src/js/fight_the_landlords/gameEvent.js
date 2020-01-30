// 按钮类
class ButtonEvent {
    constructor() {
        this.name = null;
        // 记录图片位置和长宽
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
    }

    // 设置图片位置
    setPosition(name, positon) {
        this.name = name;
        this.x = positon[0];
        this.y = positon[1];
        this.width = positon[2];
        this.height = positon[3];
    }

    // 获取图片位置
    getPositionX() {
        let positon = {
            x1: this.x,
            x2: this.x + this.width,
        };
        return positon;
    }

    // 点击事件
    onClick() {
        // alert(this.name)
        return ;
        // 1. 点击之后把数据返回给游戏主类
        // 2. 游戏主类把这些信息发送给服务器
        // 3. 如果是卡牌，则改变位置
    }
}

// 卡牌类
// class PokerEvent {
//     constructor() {
//         this.name = null;
//         // 记录图片位置和长宽
//         this.x = null;
//         this.y = null;
//         this.width = null;
//         this.height = null;
//     }

//     // 设置图片位置
//     setPosition(name, positon) {
//         this.name = name;
//         this.x = positon[0];
//         this.y = positon[1];
//         this.width = positon[2];
//         this.height = positon[3];
//     }

//     // 获取图片位置
//     getPositionX(isLast) {
//         // 最后一张是完整返回，给最后一张加个指针
//         // 别的都是自己的起始到下一个起始
//         // 因此返回自己的x就行
//         let positon = null;
//         if (isLast) {
//             positon = {
//                 name: this.name,
//                 x1: this.x,
//                 x2: this.x + this.width,
//             };
//             return positon
//         }else{
//             positon = {
//                 name: this.name,
//                 x1: this.x,
//             }
//             return positon;
//         }
//     }

//     // 点击事件
//     onClick() {
//         alert(this.name)
//         // 1. 点击之后把数据返回给游戏主类
//         // 2. 游戏主类把这些信息发送给服务器
//         // 3. 如果是卡牌，则改变位置
//     }
// }

export default ButtonEvent