import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeContainer from './components/HomeContainer.vue'
import GameLobby from './components/GameLobby.vue'
import BattleRoom from './components/BattleRoom.vue'
import Login from './components/Login.vue'

export default new Router({
    routes: [
        { path: '/', redirect: 'login' },
        { path: '/login', component: Login },
        { path: '/home', component: HomeContainer, meta: { title: '对战大厅' } },
        { path: '/lobby', component: GameLobby },
        { path: '/battle', component: BattleRoom }
    ]
})