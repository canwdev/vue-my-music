import Vue from 'vue'
import Router from 'vue-router'
import recommend from './views/recommend.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/singer',
      component: () => import('./views/singer.vue'),
      children: [
        {path: 'detail/:id', component: () => import('./views/singerDetail.vue')}
      ]
    },
    {
      path: '/rank',
      component: () => import('./views/rank.vue')
    },
    {
      path: '/search',
      component: () => import('./views/search.vue')
    }
  ]
})
