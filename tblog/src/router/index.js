import * as VueRouter from 'vue-router'
const Tech = () => import('../components/TechBlog.vue')
const Art = () => import('../components/ArtBlog.vue')
const Article = () => import('../components/ArticleDetail.vue')

const routes = [
    {
        path: '/',
        component: Tech
    },
    {
        path: '/tech',
        component: Tech
    },
    {
        path: '/art',
        component: Art
    },
    {
        path: '/article',
        component: Article
    },
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})