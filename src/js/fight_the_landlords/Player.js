// 玩家类
class Player{
    constructor(dealX,dealY,textX,textY){
        this.deallist=[]; // 出牌列表
        this.dealX = dealX; // 卡牌起始的 x 坐标
        this.dealY = dealY; // 卡牌起始的 y 坐标
        this.text = ''; // 文字
        this.textX = textX; // 文字起始的 x 坐标
        this.textY = textY; // 文字起始的 y 坐标
        this.length = 17; // 卡牌数量
        this.userid = null; // 玩家id
    }
}

// 玩家自己
class My extends Player{
    constructor( dealX,dealY,textX,textY){
        super(dealX,dealY,textX,textY)
        this.myPokerList = null; // 我的牌组
    }

    resetX(){
        this.dealX -=  52.5 - (this.deallist - 1) * 10;
    }
}

// 左边玩家
class LeftPlayer extends Player{
    constructor(dealX,dealY,textX,textY){
        super(dealX,dealY,textX,textY)
    }
}

// 右边玩家
class RightPlayer extends Player{
    constructor(dealX,dealY,textX,textY){
        super(dealX,dealY,textX,textY)
    }

    // 右边需要重设卡牌的 x
    resetX(){
        this.dealX -=  20 * (this.deallist.length - 1);
    }
}

export {My,LeftPlayer,RightPlayer}