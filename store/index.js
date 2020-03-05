import Vuex from 'vuex'

const store = ()=>{
    return new Vuex.Store({
        state:{
            // 游戏列表
            gameList:[
                { id:1,name: "石头剪刀布",type:'双人', img: "http://119.23.248.175:3000/images/morra.jpg" },
                { id:2,name: "斗地主",type:'三人',img: "http://119.23.248.175:3000/images/doudizhu.png" },
                { id:3,name: "斗地主",type:'三人',img: "http://119.23.248.175:3000/images/doudizhu.png" },
                { id:4,name: "斗地主",type:'三人',img: "http://119.23.248.175:3000/images/doudizhu.png" },
                { id:5,name: "斗地主",type:'三人',img: "http://119.23.248.175:3000/images/doudizhu.png" },
                { id:6,name: "斗地主",type:'三人',img: "http://119.23.248.175:3000/images/doudizhu.png" },               
              ],
            
            // 单个游戏信息

            // 房间列表信息（用哈希表）
            roomList:[
                { roomID:1,roomName:'斗地主',roomPass:123},
            ]
        },
        mutations:{
            addNewRoom(state,roomInfo){
                state.roomList.push(roomInfo);
            }
        },
        getters:{
            getGameList(state){
                return state.gameList;
            },
            getRoomList(state){
                return state.roomList;
            }
        }
    })
}

export default store