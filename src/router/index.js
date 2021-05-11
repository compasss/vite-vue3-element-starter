import { createRouter, createWebHistory } from 'vue-router'
// import AuthPage from '@/views/AuthPage';

const routes = [
  // {
  //   path: '/',
  //   name: 'AuthPage',
  //   component: AuthPage,
  //   children: [
  //     {
  //       path: '/account/hospital',
  //       name: 'account_hospital',
  //       component: () => import(/* webpackChunkName: "account_hospital" */ '@/views/account/hospital.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/auth/login',
  //   name: 'auth_login',
  //   meta: {
  //     login: false
  //   },
  //   component: () => import(/* webpackChunkName: "auth_login" */ '@/views/auth/login.vue')
  // },
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
    component: () => import(/* webpackChunkName: "e_404" */ '@/pages/error/E404.vue')
  },
  {
    path: '/:pathMatch(.*)', // 页面不存在的情况下会跳到404页面
    redirect: '/error/404',
    name: 'notFound'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
