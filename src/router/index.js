import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'lotto',
      component: require('@/components/Lotto').default,
    },

    {
      path: '/set',
      name: 'set-page',
      component: require('@/components/SetPage').default,
    },

    {
      path: '/stats',
      name: 'stats',
      component: require('@/components/Stats').default,
    },

    {
      path: '*',
      redirect: '/',
    }
  ]
})
