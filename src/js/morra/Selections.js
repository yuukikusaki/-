/**
 * 选项类，剪刀（shears）、石头（stone）、布（hand）
 */

class Selections{
    constructor(name) {
        this.name = name;
        // 记录图片位置和长宽
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
    }

    // 设置位置
    setPosition(positon) {
        this.x = positon[0];
        this.y = positon[1];
        this.w = positon[2];
        this.h = positon[3];
    }

    // 获取位置
    // getPositionX() {
    //     let positon = {
    //         x1: this.x,
    //         x2: this.x + this.w,
    //     };
    //     return positon;
    // }

    onClick(socket){
        socket.emit("select",this.name);
    }

}

class Shears extends Selections{
    constructor(name){
        super(name);
    }
}

class Stone extends Selections{
    constructor(name){
        super(name);
    }
}

class Hand extends Selections{
    constructor(name){
        super(name);
    }
}

export {Shears,Stone,Hand}