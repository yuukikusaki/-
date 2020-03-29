import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeContainer from './components/HomeContainer.vue'
import GameLobby from './components/GameLobby.vue'
import Login from './components/Login.vue'
import Users from './components/user/Users.vue'
import Home from './components/account/Home.vue'
import Record from './components/account/Record.vue'
import Setting from './components/account/Setting.vue'
import FtlRoom from './components/battle/FtlRoom.vue'
import MorraRoom from './components/battle/MorraRoom.vue'



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
                { path: '/account/home', component: Home },
                { path: '/account/record', component: Record },
                { path: '/account/setting', component: Setting },
                { path: '/admin/users', component: Users },
                { path: '/ftl', component: FtlRoom },
                { path: '/morra', component: MorraRoom }
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