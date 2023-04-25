export const routers = [
  {
    name: 'dashboard',
    path: '/dashboard',
    redirect: '/dashboard/worktable',
    meta: {
      title: 'dashboard',
      icon: 'carbon:dashboard',
      keepAlive: true,
      show: true,
      order: 1,
    },
    children: [
      {
        name: 'dashboard-worktable',
        path: '/dashboard/worktable',
        meta: {
          title: '个人工作台',
          icon: 'carbon:workspace',
          keepAlive: true,
          show: true,
          order: 1,
        },
        // children: [
        //   {
        //     name: 'dashboard-worktable-222',
        //     path: '/dashboard/worktable-222',
        //     meta: {
        //       title: '个人工作台',
        //       icon: 'carbon:workspace',
        //       keepAlive: true,
        //       show: true,
        //       order: 1,
        //     },
        //   },
        // ],
      },
    ],
  },
  // {
  //   name: 'System',
  //   show: true,
  //   meta: {
  //     title: '系统管理',
  //     icon: 'carbon:cloud-service-management',
  //     keepAlive: true,
  //     link: null,
  //     show: true,
  //   },
  //   children: [
  //     {
  //       name: 'User',
  //       meta: {
  //         title: '用户管理',
  //         icon: 'carbon:id-management',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Role',
  //       meta: {
  //         title: '角色管理',
  //         icon: 'carbon:user-role',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Menu',
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'carbon:menu',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Dept',
  //       meta: {
  //         title: '部门管理',
  //         icon: 'carbon:network-2',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Post',
  //       meta: {
  //         title: '岗位管理',
  //         icon: 'carbon:network-3',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Dict',
  //       meta: {
  //         title: '字典管理',
  //         icon: 'carbon:list-dropdown',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Config',
  //       meta: {
  //         title: '参数设置',
  //         icon: 'carbon:parameter',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Notice',
  //       meta: {
  //         title: '通知公告',
  //         icon: 'carbon:message-queue',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Setting',
  //       meta: {
  //         title: '个人信息',
  //         icon: 'carbon:user-profile',
  //         keepAlive: true,
  //         link: null,
  //         show: true,
  //       },
  //     },
  //     {
  //       name: 'Distribution',
  //       meta: {
  //         title: '分配角色',
  //         icon: 'carbon:virtual-private-cloud',
  //         keepAlive: true,
  //         link: null,
  //         hidden: true,
  //       },
  //     },
  //     {
  //       name: 'Assign',
  //       meta: {
  //         title: '分配用户',
  //         icon: 'carbon:cloud-alerting',
  //         keepAlive: true,
  //         link: null,
  //         hidden: true,
  //       },
  //     },
  //     {
  //       name: 'DictData',
  //       meta: { title: '字典数据', icon: 'carbon:list', keepAlive: true, link: null, hidden: true },
  //     },
  //   ],
  // },
];
