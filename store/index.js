import Vuex from 'vuex'

const store = ()=>{
    return new Vuex.Store({
        state:{
            gameList:[
                { id:1,name: "石头剪刀布",type:'双人', img: "http://kusaki.xyz:3000/images/morra.jpg" },
                { id:2,name: "斗地主",type:'三人',img: "http://kusaki.xyz:3000/images/doudizhu.png" },
                { id:3,name: "斗地主",type:'三人',img: "http://kusaki.xyz:3000/images/doudizhu.png" },
                { id:4,name: "斗地主",type:'三人',img: "http://kusaki.xyz:3000/images/doudizhu.png" },
                { id:5,name: "斗地主",type:'三人',img: "http://kusaki.xyz:3000/images/doudizhu.png" },
                { id:6,name: "斗地主",type:'三人',img: "http://kusaki.xyz:3000/images/doudizhu.png" },
                
              ]
        },
        mutations:{},
        getters:{
            getGameList(state){
                return state.gameList;
            }
        }
    })
}

export default store