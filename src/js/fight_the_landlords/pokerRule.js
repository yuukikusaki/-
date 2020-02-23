// 游戏规则
// 判断出的是什么类型的牌
function cardType(card){
    let type = null;
    const len = card.length;
    if (len == 1){
        type = 'single';
    }
    if(len == 2){
        if(card[0].point == card[1].point){
            type = 'pairs';
        }else{
            type = 'err';
        }
    }
    if(len == 3){
        if(card[0].point == card[1].point == card[2].point){
            type = 'triple';
        }else{
            type = 'err'
        }
    }
    if(len == 4){
        if(card.every(c => c.point === card[0].pont)){
            type = 'bomb';
        }
    }
    
    return type;
}

export default cardType;