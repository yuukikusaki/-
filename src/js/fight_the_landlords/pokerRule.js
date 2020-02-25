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
        if(card[0].point == card[1].point&&card[1].point == card[2].point){
            type = 'triple';
        }else{
            type = 'err';
        }
    }
    if(len == 4){
       if(card[1].point==card[2].point){
           if((card[0].point==card[1].point||card[1].point==card[3].point)
           &&card[0].point!=card[3].point){
               type = 'twa';
           }else if(card[0]==card[1]&&card[1]==card[3]){
               type = 'boom';
           }else{
               type = 'err';
           }
       }
    }
    
    return type;
}

export default cardType;