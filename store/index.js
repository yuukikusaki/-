import Vuex from 'vuex'
import axios from 'axios'

const store = ()=>{
    return new Vuex.Store({
        state:{
            // 用户信息
            userinfo:null,

            // 游戏列表
            gameList:[
                { id:0,name: "石头剪刀布",type:'双人',path:'/morra', img: "http://119.23.248.175:3000/images/morra.jpg" },
                { id:1,name: "斗地主",type:'三人',path:'/ftl',img: "http://119.23.248.175:3000/images/doudizhu.png" },             
              ],
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