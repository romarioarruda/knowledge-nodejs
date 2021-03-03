import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPage from '@/components/admin/AdminPage'
import ArticlesByCategory from '@/components/article/ArticleByCategory'
import ArticleById from '@/components/article/ArticleById'

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
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router