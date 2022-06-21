import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Portfolio from '../components/portfolio/Portfolio'
import Stocks from '../components/stocks/Stocks'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/portfolio', name: 'portfolio', component: Portfolio },
    { path: '/stocks', name: 'stocks', component: Stocks },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router