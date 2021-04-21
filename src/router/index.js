import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
/*
import Login from '@/pages/login/template.vue';
import Create from '@/pages/create/template.vue';
import User from '@/pages/user/template.vue';
import My from '@/pages/my/template.vue';
import Index from '@/pages/index/template.vue';
import Edit from '@/pages/edit/template.vue';
import Register from '@/pages/register/template.vue';
import Detail from '@/pages/detail/template.vue';
*/


window.store = store;
Vue.use(Router);

/*
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    }
    ,
    {
      path: '/create',
      component: Create
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta:{ requiresAuth:true}
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/my',
      component: My,
      meta:{ requiresAuth:true}
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/user/:userId',
      component: User,
      meta:{ requiresAuth:true}
    }
  ]
})
*/

const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/index/template.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/login/template.vue')
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/pages/detail/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/pages/create/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: () => import('@/pages/user/template.vue')
    },
    {
      path: '/my',
      component: () => import('@/pages/my/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import('@/pages/register/template.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router;
