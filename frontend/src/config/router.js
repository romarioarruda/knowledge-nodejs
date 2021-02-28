import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPage from '@/components/admin/AdminPage'

Vue.use(VueRouter)

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'AdminPage',
        path: '/admin',
        component: AdminPage
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router