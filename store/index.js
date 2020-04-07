import Vuex from 'vuex'
import axios from 'axios'

const store = ()=>{
    return new Vuex.Store({
        state:{
            // 用户信息
            userinfo:null,

            // 游戏列表
            gameList:[
                { id:0,name: "石头剪刀布",type:'双人',path:'/morra', img: "http://192.168.0.104:3000/images/morra.jpg" },
                { id:1,name: "斗地主",type:'三人',path:'/ftl',img: "http://192.168.0.104:3000/images/doudizhu.png" },
                // { id:3,name: "斗地主",type:'三人',img: "http://localhost:3000/images/doudizhu.png" },
                // { id:4,name: "斗地主",type:'三人',img: "http://localhost:3000/images/doudizhu.png" },
                // { id:5,name: "斗地主",type:'三人',img: "http://localhost:3000/images/doudizhu.png" },
                // { id:6,name: "斗地主",type:'三人',img: "http://localhost:3000/images/doudizhu.png" },               
              ],
            
            // 单个游戏信息

            // 房间列表信息（用哈希表）
            // roomList:[
            //     { roomID:1,roomName:'斗地主',roomPass:123},
            // ]
        },
        mutations:{
            setUserInfo(state,res){
                state.userinfo = res;
                // session
                window.sessionStorage.setItem("userinfo",JSON.stringify(res));
            }
            
        },
        actions:{
            // 获取用户信息
            async getUserInfo(context){
                const {data:res} = await axios.get('user/userinfo');
                context.commit('setUserInfo',res.data);
                return res.data
            }
        },
        getters:{
            getUserInfo(state){
                if(state.userinfo==null){
                    state.userinfo = JSON.parse(window.sessionStorage.getItem("userinfo"));
                }
                return state.userinfo;
            },
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