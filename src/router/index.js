import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [{
        path: '/',
        redirect: '/b'
    },
    {
        path: '/b',
        component: () =>
            import ('../components/basic')
    }
]

export default new Router({
    // mode: 'history',
    routes
})
