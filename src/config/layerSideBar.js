export default [
  {
    id: 1,
    title: '账号管理',
    path: '/account',
    parent: null,
    icon: 'iconfont sc-zhanghaoguanli',
    roles: ['admin', 'crmSchoolAdmin', 'crmHospital']
  },
  {
    id: 2,
    title: '医院账号',
    path: '/hospital',
    parent: 1,
    icon: 'iconfont sc-huodongliebiao',
    roles: ['admin', 'crmSchoolAdmin', 'crmHospital']
  }
]

export default [ 
  {
    path: '/',
    name: 'AuthPage',
    component: () => import('@/pages/authPage.vue'),
    children: [
      {
        path: '/home/index',
        name: 'home_index',
        cnName: '控制台',
        menu: true, // 是否在左侧菜单展示
        component: () => import('@/pages/home/home.vue')
      },
      {
        path: '/',
        name: 'account',
        cnName: '账号管理',
        menu: true,
        component: () => import('@/pages/account/accountRoute.vue'),
        children: [
          {
            path: '/account/org',
            name: 'account_org',
            cnName: '账号1',
            menu: true,
            component: () => import('@/pages/account/org.vue')
          },
          {
            path: '/school',
            name: 'account_school',
            cnName: '账号2',
            menu: true,
            component: () => import('@/pages/account/school.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/auth/login',
    name: 'auth_login',
    meta: {
      login: false
    },
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/error/no-permission',
    name: 'no_permission',
    meta: {
      login: false
    },
    component: () => import('@/pages/error/noPermission.vue')
  },
  {
    path: "/error/404",
    name: 'e_404',
    meta: {
      login: false
    },
    component: () => import('@/pages/error/404.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 页面不存在的情况下会跳到404页面
    redirect: '/error/404',
    name: 'notFound'
  }
]
