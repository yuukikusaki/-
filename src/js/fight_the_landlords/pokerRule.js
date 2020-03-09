// 游戏规则
// 牌点数 3-大王 => 1-15

// 是否可以出牌
function candeal(dealList,o) {
    const {type,rank} = cardType(dealList); // 自己的牌
    // 先判断是不是 err
    if(type == 'err'){ 
        return false; 
    }
    if(o == null){
        return {type,rank};
    }
    // 别人的牌
    const otype = o.type;
    const orank = o.rank;
    if(rank>50&&rank>orank){ // 我是炸弹（不用管别人是不是炸弹）
        return {type,rank};
    }else if(type==otype&&rank>orank){ // 普通牌型，首先相等，其次大小
        return {type,rank};
    }else{
        return false;
    }
}


// 牌型判断 start
// 判断是不是连续
function isseries(arr) {
    // 有大小王或者 2 就直接报错
    if (arr.some(c => { c >= 13 })) {
        return false;
    }
    if (arr[0] - arr[arr.length - 1] == arr.length - 1) {
        return true;
    } else {
        return false;
    }
}

// 重复数类
class CountList {
    constructor() {
        this.one = []; // 只出现一次
        this.two = []; // 重复两次
        this.three = []; // 重复三次
        this.four = []; // 重复四次
    }
    set() { // 按次数把重复的合一
        this.one = [...new Set(this.one)];
        this.two = [...new Set(this.two)];
        this.three = [...new Set(this.three)];
        this.four = [...new Set(this.four)];
    }
}

// 计算重复数
function count(list) {
    const countList = new CountList();
    list.map(item => {
        const count = list.lastIndexOf(item) - list.indexOf(item) + 1;
        if (count == 1) {
            countList.one.push(item);
        } else if (count == 2) {
            countList.two.push(item);
        } else if (count == 3) {
            countList.three.push(item);
        } else {
            countList.four.push(item);
        }
    });
    countList.set();
    return countList;
}

// 确定牌型
function cardType(card) {
    const len = card.length;
    if (len < 1) {
        return false;
    }
    let type = null; // 牌型
    let rank = 0; // 牌大小
    let list = card.map(c => { return c.point; }); // 卡牌大小列表
    let countList = count(list);
    // window.console.log(countList)
    // 以 5 为界限分开来
    if (len <= 5) {
        if (len == 1) { // 单牌
            type = '单牌';
            rank = countList.one[0];
        } else if (len == 2) {
            if (countList.two.length == 1) {
                type = '对子'; // 对子
                rank = countList.two[0];
            } else if (countList.one[0] == 15 && countList.one[1] == 14) {
                type = '王炸'; // 王炸
                rank = 100; // 无脑压 100    
            } else {
                type = 'err';
            }
        } else if (len == 3) {
            if (countList.three.length == 1) {
                type = '三张'; // 三张
                rank = countList.three[0];
            } else {
                type = 'err';
            }
        } else if (len == 4) {
            if (countList.three.length == 1) {
                type = '三带一'; // 三带一
                rank = countList.three[0];
            } else if (countList.four.length == 1) {
                type = '炸弹'; // 炸弹
                rank = countList.four[0] + 50; // 炸弹加 50
            } else {
                type = 'err';
            }
        } else {
            if (isseries(countList.one)) {
                type = '顺子'; // 顺子
                rank = countList.one[0];
            } else if (countList.three.length == 1 && countList.two.length == 1) {
                type = '三带二'; // 三带二
                rank = countList.three[0];
            } else {
                type = 'err';
            }
        }
    } else {
        if (countList.one.length == len && isseries(countList.one)) {
            type = '顺子'; // 顺子
            rank = countList.one[0];
        } else if (countList.two.length * 2 == len && isseries(countList.two)) {
            type = '连对'; // 连对
            rank = countList.two[0];
        } else if (countList.three.length * 3 == len && isseries(countList.two)) {
            type = '三连对'; // 三连对
            rank = countList.three[0];
        } else if (countList.three.length != 0 && isseries(countList.three)) {
            if (countList.one.length + countList.three.length * 3 == len) {
                type = '飞机'; // 飞机带单
                rank = countList.three[0];
            } else if (countList.two.length * 2 + countList.three.length * 3 == len) {
                type = '飞机'; // 飞机带双
                rank = countList.three[0];
            } else {
                type = 'err';
            }
        } else if (countList.four.length == 1) {
            if (countList.one.length + countList.four.length * 4 == len) {
                type = '四带二'; // 四带二
                rank = countList.four[0];
            } else if (countList.two.length * 2 + countList.four.length * 4 == len) {
                type = '四带二'; // 四带二对;
                rank = countList.four[0];
            } else {
                type = 'err';
            }
        } else {
            type = 'err';
        }
    }
    return {type,rank};
}
// 牌型判断 end

export  {candeal};