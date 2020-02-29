// 游戏规则
// 判断出的是什么类型的牌
// 单牌（single）、对子（pair）、三张（triplet）、炸弹（boom）
// 三带一（twa)、三带二（twp）、飞机带单（sota）、飞机带对（sotp）
// 顺子（straight）、连对（sop）、三连对（sot）
// 王炸（rocket）、四带二单（fbta）、四带二对（fptp）
/*
    一人17张，地主20，顺子最多12
    1：单牌
    2：对子、王炸
    3：三张
    4：三带一、炸弹
    5：顺子、三带二
    6：顺子、连对、三连对、四带二
    7：顺子
    8：顺子、连对、飞机带单、四带二对
    9：顺子、三连对
    10：顺子、连对、飞机带对（减-4 %3==0）
    11：顺子、飞机带单
    12：顺子、连对、三连对
    13：无
    14：连对、飞机带单（减-2 %3==0）
    15：三连对
    16：连对、飞机带对
    17：飞机带单
*/
/*
    1. 一个方法判断一个里面重复两次的 m 个，三次的 m 个
    2. 一个方法判断顺子
    3. 重复两次的有 m 个
    4. if(m==len && 顺子判断) 顺子
    5. if(m==len/2 && 顺子判断) 连对
    6. 
*/

function cardType(card){
    let type = null;
    const len = card.length;
    if (len == 1){
        type = 'single';
    }
    if(len == 2){
        if(card[0].point == card[1].point){
            type = 'pair';
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