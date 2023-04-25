export const routers = [
  {
    name: 'dashboard',
    path: '/dashboard',
    meta: {
      title: '仪表盘',
      icon: 'carbon:dashboard',
      keepAlive: true,
      show: true,
      order: 1,
    },
    children: [
      {
        name: 'worktable',
        path: '/dashboard/worktable',
        meta: {
          title: '个人工作台',
          icon: 'carbon:workspace',
          keepAlive: true,
          show: true,
          order: 1,
        },
      },
    ],
  },
  {
    name: 'system',
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'carbon:cloud-service-management',
      keepAlive: true,
      show: true,
      order: 20,
    },
    children: [
      {
        name: 'user',
        path: '/system/user',
        meta: {
          title: '用户管理',
          icon: 'carbon:id-management',
          keepAlive: true,
          order: 1,
          show: true,
        },
      },
      {
        name: 'role',
        path: '/system/role',
        meta: {
          title: '角色管理',
          icon: 'carbon:user-role',
          keepAlive: true,
          order: 2,
          show: true,
        },
      },
      {
        name: 'menu',
        path: '/system/menu',
        meta: {
          title: '菜单管理',
          icon: 'carbon:menu',
          keepAlive: true,
          order: 3,
          show: true,
        },
      },
      {
        name: 'dept',
        path: '/system/dept',
        meta: {
          title: '部门管理',
          icon: 'carbon:network-2',
          keepAlive: true,
          order: 4,
          show: true,
        },
      },
      {
        name: 'post',
        path: '/system/post',
        meta: {
          title: '岗位管理',
          icon: 'carbon:network-3',
          keepAlive: true,
          order: 5,
          show: true,
        },
      },
      {
        name: 'dict',
        path: '/system/dict',
        meta: {
          title: '字典管理',
          icon: 'carbon:list-dropdown',
          keepAlive: true,
          order: 6,
          show: true,
        },
      },
      {
        name: 'config',
        path: '/system/config',
        meta: {
          title: '参数设置',
          icon: 'carbon:parameter',
          keepAlive: true,
          order: 7,
          show: true,
        },
      },
      {
        name: 'notice',
        path: '/system/notice',
        meta: {
          title: '通知公告',
          icon: 'carbon:message-queue',
          keepAlive: true,
          order: 8,
          show: true,
        },
      },
      {
        name: 'setting',
        path: '/system/setting',
        meta: {
          title: '个人信息',
          icon: 'carbon:user-profile',
          keepAlive: true,
          order: 9,
          show: true,
        },
      },
      {
        name: 'distribution',
        path: '/system/distribution',
        meta: {
          title: '分配角色',
          icon: 'carbon:virtual-private-cloud',
          keepAlive: true,
          order: 10,
          show: false,
        },
      },
      {
        name: 'assign',
        path: '/system/assign',
        meta: {
          title: '分配用户',
          icon: 'carbon:cloud-alerting',
          keepAlive: true,
          order: 11,
          show: false,
        },
      },
      {
        name: 'dictData',
        path: '/system/dictData',
        meta: {
          title: '字典数据',
          icon: 'carbon:list',
          keepAlive: true,
          order: 12,
          show: false,
        },
      },
    ],
  },
];
