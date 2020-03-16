import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeContainer from './components/HomeContainer.vue'
import GameLobby from './components/GameLobby.vue'
import BattleRoom from './components/BattleRoom.vue'
import Login from './components/Login.vue'



const router = new Router({
    routes: [
        { path: '/', redirect: 'login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            redirect: '/lobby',
            component: HomeContainer,
            children: [
                { path: '/lobby', component: GameLobby },
                { path: '/battle', component: BattleRoom }
            ]
        },
        
    ]
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    const token = Vue.prototype.$cookies.get("token");
    if (to.path === '/login') { // 访问登录页则放行
        if (token) {
            next('/home');
        }
        return next();
    }
    if (!token) {
        return next('/login');
    }
    next();
});

export default router