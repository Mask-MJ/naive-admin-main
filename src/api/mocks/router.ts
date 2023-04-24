export const routers = [
  {
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'carbon:dashboard',
      keepAlive: true,
      link: null,
      hidden: false,
    },
    children: [
      {
        name: 'WorkTable',
        meta: {
          title: '个人工作台',
          icon: 'carbon:workspace',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
    ],
  },
  {
    name: 'System',
    hidden: false,
    meta: {
      title: '系统管理',
      icon: 'carbon:cloud-service-management',
      keepAlive: true,
      link: null,
      hidden: false,
    },
    children: [
      {
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'carbon:id-management',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'carbon:user-role',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Menu',
        meta: {
          title: '菜单管理',
          icon: 'carbon:menu',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Dept',
        meta: {
          title: '部门管理',
          icon: 'carbon:network-2',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Post',
        meta: {
          title: '岗位管理',
          icon: 'carbon:network-3',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Dict',
        meta: {
          title: '字典管理',
          icon: 'carbon:list-dropdown',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Config',
        meta: {
          title: '参数设置',
          icon: 'carbon:parameter',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Notice',
        meta: {
          title: '通知公告',
          icon: 'carbon:message-queue',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Setting',
        meta: {
          title: '个人信息',
          icon: 'carbon:user-profile',
          keepAlive: true,
          link: null,
          hidden: false,
        },
      },
      {
        name: 'Distribution',
        meta: {
          title: '分配角色',
          icon: 'carbon:virtual-private-cloud',
          keepAlive: true,
          link: null,
          hidden: true,
        },
      },
      {
        name: 'Assign',
        meta: {
          title: '分配用户',
          icon: 'carbon:cloud-alerting',
          keepAlive: true,
          link: null,
          hidden: true,
        },
      },
      {
        name: 'DictData',
        meta: { title: '字典数据', icon: 'carbon:list', keepAlive: true, link: null, hidden: true },
      },
    ],
  },
];
