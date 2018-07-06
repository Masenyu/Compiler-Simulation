import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      component: resolve =>
        require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/register',
      component: resolve =>
        require(['../components/page/Register.vue'], resolve)
    },
    {
      path: '/find-back',
      component: resolve =>
        require(['../components/page/FindBack.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      redirect: '/index/main-interface',
      children: [
        {
          path: '/index/main-interface',
          component: resolve =>
            require(['../components/page/mainInterface.vue'], resolve)
        },
        {
          path: '/index/my-collection',
          component: resolve =>
            require(['../components/page/MyCollection.vue'], resolve)
        },
        {
          path: '/index/lexical-analysis',
          component: resolve =>
            require(['../components/page/LexicalAnalysis.vue'], resolve)
        },
        {
          path: '/index/modifypassword',
          component: resolve =>
            require(['../components/page/Modifypassword.vue'], resolve)
        }
      ]
    }
  ]
})
