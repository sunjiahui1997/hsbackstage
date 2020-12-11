import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const product = () => import('./views/Product')
const addna = () => import('./views/Addna')
const addkna = () => import('./views/Addkna')
const addk = () => import('./views/Addk')
const news = () => import('./views/News')
const addnew = () => import('./views/Addnew')
const addvideo = () => import('./views/Addvideo')
const editlist = () => import('./views/EditList')
const editnews = () => import('./views/Editnews')
const message = () => import('./views/Message')
const login = () => import('./views/Login')
const backstage = () => import('./views/Backstage')

export default new Router({
    mode: 'history',
    routes: [{
            path: '',
            redirect: '/backstage'
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/backstage',
            component: backstage,
            children: [
                {
                    path: '',
                    redirect: 'product'
                },
                
                {
                path: 'product',
                component: product
            }, {
                path: 'addna',
                component: addna
            }, {
                path: 'news',
                component: news
            }, {
                path: 'addk',
                component: addk
            }, {
                path: 'addkna',
                component: addkna
            }, {
                path: 'addnew',
                component: addnew
            }, {
                path: 'addvideo',
                component: addvideo
            }, {
                path: 'editlist',
                component: editlist
            }, {
                path: 'editnews',
                component: editnews
            }, {
                path: 'message',
                component: message
            }, ]
        }

    ]
})