// 玩家类
class Player {
    constructor(deskX, deskY, textX, textY) {
        this.deskPoker = []; // 桌面上的牌
        this.deskX = deskX; // 卡牌起始的 x 坐标
        this.deskY = deskY; // 卡牌起始的 y 坐标
        this.text = ''; // 文字
        this.textX = textX; // 文字起始的 x 坐标
        this.textY = textY; // 文字起始的 y 坐标
        this.length = 17; // 卡牌数量
        this.userid = null; // 玩家id
        this.username = null; // 玩家名称
    }

    // 重置数据
    reset() {
        this.deskPoker = []; // 桌面上的牌
        this.text = ''; // 文字
        this.length = 17; // 卡牌数量
    }
}

// 玩家自己
class My extends Player {
    constructor(deskX, deskY, textX, textY) {
        super(deskX, deskY, textX, textY)
    }
}

// 左边玩家
class LeftPlayer extends Player {
    constructor(deskX, deskY, textX, textY) {
        super(deskX, deskY, textX, textY)
    }
}

// 右边玩家
class RightPlayer extends Player {
    constructor(deskX, deskY, textX, textY) {
        super(deskX, deskY, textX, textY)
    }

}

export { My, LeftPlayer, RightPlayer }