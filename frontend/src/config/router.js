import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPage from '@/components/admin/AdminPage'
import ArticlesByCategory from '@/components/article/ArticleByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

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
        component: AdminPage,
        meta: { requiresAdmin: true }
    },
    {
        name: 'ArticlesByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    },
    {
        name: 'ArticleById',
        path: '/articles/:id',
        component: ArticleById
    },
    {
        name: 'Auth',
        path: '/auth',
        component: Auth
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ name: '/' })
    } else {
        next()
    }
})

export default router