import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/manga-create',
      name: 'manga-create',
      component: () => import('./views/manga/Create.vue')
    },
    {
      path: '/genre-create',
      component: () => import('./views/manga/GenreCreate.vue')
    }
  ]
})
