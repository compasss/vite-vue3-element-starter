import authPage from '@/pages/authPage.vue'

export default [
  {
    path: '/',
    name: 'AuthPage',
    component: authPage,
    children: [
      {
        path: '/home/index',
        name: 'home_index',
        component: () => import(/* webpackChunkName: "home_index" */ '@/views/home/home.vue')
      }
    ]
  },
  {
    path: '/auth/login',
    name: 'auth_login',
    meta: {
      login: false
    },
    component: () => import(/* webpackChunkName: "auth_login" */ '@/pages/login.vue')
  },
  {
    path: '/error/no-permission',
    name: 'no_permission',
    meta: {
      login: false
    },
    component: () => import(/* webpackChunkName: "no_permission" */ '@/pages/error/noPermission.vue')
  },
  {
    path: "/error/404",
    name: 'e_404',
    meta: {
      login: false
    },
    component: () => import(/* webpackChunkName: "e_404" */ '@/pages/error/404.vue')
  },
  {
    path: '/:pathMatch(.*)', // 页面不存在的情况下会跳到404页面
    redirect: '/error/404',
    name: 'notFound'
  }
]
