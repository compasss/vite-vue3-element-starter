
const routes =  [
  {
    path: '/',
    name: 'AuthPage',
    component: '@/pages/authPage.vue',
    children: [
      {
        path: '/home/index',
        name: 'home_index',
        menu: true, // 是否在左侧菜单展示
        component: '@/pages/home/home.vue'
      },
      {
        path: '/account/org',
        name: 'account_org',
        parent: {
          path: 'account',
          name: '账号管理'
        },
        menu: true,
        component: '@/pages/account/org.vue'
      },
      {
        path: '/account/school',
        name: 'account_school',
        parent: {
          path: 'account',
          name: '账号管理'
        },
        menu: true,
        component: '@/pages/account/school.vue'
      },
      {
        path: '/home/index2',
        name: 'home_index2',
        menu: true, // 是否在左侧菜单展示
        component: '@/pages/home/home.vue'
      }
    ]
  },
  {
    path: '/auth/login',
    name: 'auth_login',
    meta: {
      login: false
    },
  },
  {
    path: '/error/no-permission',
    name: 'no_permission',
    meta: {
      login: false
    },
  },
  {
    path: "/error/404",
    name: 'e_404',
    meta: {
      login: false
    },
  },
  {
    path: '/:pathMatch(.*)*', // 页面不存在的情况下会跳到404页面
    redirect: '/error/404',
    name: 'notFound'
  }
]

function aa() {
  let menus = []
  function a(data) {
    for (const item of data) {
      if (item.menu) {
        menus.push(item)
      }
      if (item.children && item.children.length) {
        a(item.children)
      }
    }
  }
  a(routes)
  return menus
}

let c = aa(routes)

console.log('menus ====================================>')
console.log(c)

let result = []
let map = {}
c.forEach((item, index) => {
  if (item.parent) {
    if (item.parent.name !== map.name) {
      map = {}
    }
    if (!map.name) {
      map = {
        path: '/',
        name: item.parent.name,
        children: []
      }
    }
    map.children.push(item)
    if (index === c.length - 1) {
      result.push(map)
    }
  } else {
    if (map.name) {
      result.push(map)
    }
    result.push(item)
    map = {}
  }
})


console.log('result =====================================>')
console.log(result)