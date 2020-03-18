// 玩家类
class Player{
    constructor(pokerX,pokery,textX,textY){
        this.deallist=[]; // 出牌列表
        this.pokerX = pokerX; // 卡牌起始的 x 坐标
        this.pokery = pokery; // 卡牌起始的 y 坐标
        this.textX = textX; // 文字起始的 x 坐标
        this.textY = textY; // 文字起始的 y 坐标
        this.length = 17; // 卡牌数量
    }
}

// 玩家自己
class My extends Player{
    constructor( myPokerList,pokerX,pokery,textX,textY){
        super(pokerX,pokery,textX,textY)
        this.myPokerList = myPokerList; // 我的牌组
    }
}

// 左边玩家
class LeftPlayer extends Player{
    constructor(pokerX,pokery,textX,textY){
        super(pokerX,pokery,textX,textY)
    }
}

// 右边玩家
class RightPlayer extends Player{
    constructor(pokerX,pokery,textX,textY){
        super(pokerX,pokery,textX,textY)
    }
}

export {My,LeftPlayer,RightPlayer}