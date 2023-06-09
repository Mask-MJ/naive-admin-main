// export const routers = [
//   {
//     name: 'dashboard',
//     path: '/dashboard',
//     meta: {
//       title: '仪表盘',
//       icon: 'carbon:dashboard',
//       keepAlive: true,
//       show: true,
//       order: 1,
//     },
//     children: [
//       {
//         name: 'worktable',
//         path: '/dashboard/worktable',
//         meta: {
//           title: '个人工作台',
//           icon: 'carbon:workspace',
//           keepAlive: true,
//           show: true,
//           order: 1,
//         },
//       },
//     ],
//   },
//   {
//     name: 'system',
//     path: '/system',
//     meta: {
//       title: '系统管理',
//       icon: 'carbon:cloud-service-management',
//       keepAlive: true,
//       show: true,
//       order: 20,
//     },
//     children: [
//       {
//         name: 'user',
//         path: '/system/user',
//         meta: {
//           title: '用户管理',
//           icon: 'carbon:id-management',
//           keepAlive: true,
//           order: 1,
//           show: true,
//         },
//       },
//       {
//         name: 'role',
//         path: '/system/role',
//         meta: {
//           title: '角色管理',
//           icon: 'carbon:user-role',
//           keepAlive: true,
//           order: 2,
//           show: true,
//         },
//       },
//       {
//         name: 'menu',
//         path: '/system/menu',
//         meta: {
//           title: '菜单管理',
//           icon: 'carbon:menu',
//           keepAlive: true,
//           order: 3,
//           show: true,
//         },
//       },
//       {
//         name: 'dept',
//         path: '/system/dept',
//         meta: {
//           title: '部门管理',
//           icon: 'carbon:network-2',
//           keepAlive: true,
//           order: 4,
//           show: true,
//         },
//       },
//       {
//         name: 'post',
//         path: '/system/post',
//         meta: {
//           title: '岗位管理',
//           icon: 'carbon:network-3',
//           keepAlive: true,
//           order: 5,
//           show: true,
//         },
//       },
//       {
//         name: 'dict',
//         path: '/system/dict',
//         meta: {
//           title: '字典管理',
//           icon: 'carbon:list-dropdown',
//           keepAlive: true,
//           order: 6,
//           show: true,
//         },
//       },
//       {
//         name: 'config',
//         path: '/system/config',
//         meta: {
//           title: '参数设置',
//           icon: 'carbon:parameter',
//           keepAlive: true,
//           order: 7,
//           show: true,
//         },
//       },
//       {
//         name: 'notice',
//         path: '/system/notice',
//         meta: {
//           title: '通知公告',
//           icon: 'carbon:message-queue',
//           keepAlive: true,
//           order: 8,
//           show: true,
//         },
//       },
//       {
//         name: 'setting',
//         path: '/system/setting',
//         meta: {
//           title: '个人信息',
//           icon: 'carbon:user-profile',
//           keepAlive: true,
//           order: 9,
//           show: true,
//         },
//       },
//       {
//         name: 'distribution',
//         path: '/system/distribution',
//         meta: {
//           title: '分配角色',
//           icon: 'carbon:virtual-private-cloud',
//           keepAlive: true,
//           order: 10,
//           show: false,
//         },
//       },
//       {
//         name: 'assign',
//         path: '/system/assign',
//         meta: {
//           title: '分配用户',
//           icon: 'carbon:cloud-alerting',
//           keepAlive: true,
//           order: 11,
//           show: false,
//         },
//       },
//       {
//         name: 'dictData',
//         path: '/system/dictData',
//         meta: {
//           title: '字典数据',
//           icon: 'carbon:list',
//           keepAlive: true,
//           order: 12,
//           show: false,
//         },
//       },
//     ],
//   },
// ];
export const routers = [
  {
    id: '2022',
    parentId: '0',
    name: 'Dashboard',
    path: '/dashboard',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: 'Dashboard',
      icon: 'ant-design:appstore-outlined',
      noCache: false,
      link: null,
    },
    children: [
      {
        id: '2175',
        parentId: '2022',
        name: 'WorkTable',
        path: 'workTable',
        hidden: false,
        component: 'dashboard/workTable/index',
        meta: {
          title: '个人工作台',
          icon: 'ant-design:laptop-outlined',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    id: '2105',
    parentId: '0',
    name: 'Operation',
    path: '/operation',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: { title: '运营管理', icon: 'ant-design:compass-outlined', noCache: false, link: null },
    children: [
      {
        id: '2107',
        parentId: '2105',
        name: 'Group',
        path: 'group',
        hidden: false,
        component: 'operation/group/index',
        meta: {
          title: '计费规则分组',
          icon: 'ant-design:usergroup-add-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2108',
        parentId: '2105',
        name: 'Rule',
        path: 'rule',
        hidden: false,
        component: 'operation/rule/index',
        meta: {
          title: '计费规则管理',
          icon: 'ant-design:bar-chart-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2280',
        parentId: '2105',
        name: 'Coupon',
        path: 'coupon',
        hidden: false,
        component: 'operation/coupon/index',
        meta: {
          title: '优惠券管理',
          icon: 'ant-design:account-book-twotone',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2281',
        parentId: '2105',
        name: 'DiscountActivities',
        path: 'discountActivities',
        hidden: false,
        component: 'operation/discountActivities/index',
        meta: {
          title: '优惠活动管理',
          icon: 'ant-design:mobile-filled',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    id: '2106',
    parentId: '0',
    name: 'Equipment',
    path: '/equipment',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: { title: '设备管理', icon: 'ant-design:api-filled', noCache: false, link: null },
    children: [
      {
        id: '2109',
        parentId: '2106',
        name: 'ChargingPileBrand',
        path: 'chargingPileBrand',
        hidden: false,
        component: 'equipment/chargingPileBrand/index',
        meta: {
          title: '充电桩品牌管理',
          icon: 'ant-design:apple-filled',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2110',
        parentId: '2106',
        name: 'ChargingPileModel',
        path: 'chargingPileModel',
        hidden: false,
        component: 'equipment/chargingPileModel/index',
        meta: {
          title: '充电桩型号管理',
          icon: 'ant-design:ant-design-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2111',
        parentId: '2106',
        name: 'ChargingStation',
        path: 'chargingStation',
        hidden: false,
        component: 'equipment/chargingStation/index',
        meta: { title: '充电站管理', icon: 'ant-design:car-filled', noCache: false, link: null },
      },
      {
        id: '2112',
        parentId: '2106',
        name: 'ChargingPile',
        path: 'chargingPile',
        hidden: false,
        component: 'equipment/chargingPile/index',
        meta: {
          title: '充电桩管理',
          icon: 'ant-design:aliyun-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2148',
        parentId: '2106',
        name: 'ChargingCard',
        path: 'chargingCard',
        hidden: false,
        component: 'equipment/chargingCard/index',
        meta: {
          title: '充电卡管理',
          icon: 'ant-design:credit-card-twotone',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2163',
        parentId: '2106',
        name: 'EquipmentNumber',
        path: 'equipmentNumber',
        hidden: false,
        component: 'equipment/equipmentNumber/index',
        meta: {
          title: '设备编号管理',
          icon: 'ant-design:field-number-outlined',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2164',
        parentId: '2106',
        name: 'ChargingCarModel',
        path: 'chargingCarModel',
        hidden: false,
        component: 'equipment/chargingCarModel/index',
        meta: {
          title: '充电车型号管理',
          icon: 'ant-design:car-twotone',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2173',
        parentId: '2106',
        name: 'ChargingPileAlarm/:id',
        path: 'chargingPileAlarm/:id',
        hidden: true,
        component: 'equipment/chargingPileAlarm/index',
        meta: {
          title: '告警详情',
          icon: 'ant-design:warning-outlined',
          noCache: true,
          link: null,
        },
      },
    ],
  },
  {
    id: '2171',
    parentId: '0',
    name: 'Maintenance',
    path: '/maintenance',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: { title: '设备运维', icon: 'ant-design:tool-outlined', noCache: false, link: null },
    children: [
      {
        id: '2172',
        parentId: '2171',
        name: 'Alarmlog',
        path: 'alarmlog',
        hidden: false,
        component: 'maintenance/alarmlog/index',
        meta: {
          title: '设备告警日志',
          icon: 'ant-design:tool-outlined',
          noCache: true,
          link: null,
        },
      },
    ],
  },
  {
    id: '2137',
    parentId: '0',
    name: 'Member',
    path: '/member',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '会员中心',
      icon: 'ant-design:money-collect-outlined',
      noCache: false,
      link: null,
    },
    children: [
      {
        id: '2140',
        parentId: '2137',
        name: 'Management',
        path: 'management',
        hidden: false,
        component: 'member/management/index',
        meta: {
          title: '会员管理',
          icon: 'ant-design:usergroup-add-outlined',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2139',
        parentId: '2137',
        name: 'Car',
        path: 'car',
        hidden: false,
        component: 'member/car/index',
        meta: {
          title: '会员车辆管理',
          icon: 'ant-design:car-outlined',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2282',
        parentId: '2137',
        name: 'MemberCoupon',
        path: 'memberCoupon',
        hidden: false,
        component: 'member/memberCoupon/index',
        meta: {
          title: '会员优惠券管理',
          icon: 'ant-design:account-book-filled',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2310',
        parentId: '2137',
        name: 'MemberDetail/:id',
        path: 'memberDetail/:id',
        hidden: true,
        component: 'Layout',
        meta: {
          title: '会员信息详情',
          icon: 'ant-design:block-outlined',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    id: '2145',
    parentId: '0',
    name: 'Finance',
    path: '/finance',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '财务管理',
      icon: 'ant-design:codepen-square-filled',
      noCache: false,
      link: null,
    },
    children: [
      {
        id: '2146',
        parentId: '2145',
        name: 'Order',
        path: 'order',
        hidden: false,
        component: 'finance/order/index',
        meta: {
          title: '充值订单',
          icon: 'ant-design:reconciliation-outlined',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2147',
        parentId: '2145',
        name: 'Charge',
        path: 'charge',
        hidden: false,
        component: 'finance/chargeOrder/index',
        meta: {
          title: '充电订单',
          icon: 'ant-design:property-safety-filled',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2192',
        parentId: '2145',
        name: 'Invoice',
        path: 'invoice',
        hidden: false,
        component: 'finance/invoice/index',
        meta: {
          title: '开票管理',
          icon: 'ant-design:barcode-outlined',
          noCache: true,
          link: null,
        },
      },
    ],
  },
  {
    id: '2157',
    parentId: '0',
    name: 'Report',
    path: '/report',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: { title: '统计报表', icon: 'ant-design:rise-outlined', noCache: false, link: null },
    children: [
      {
        id: '2160',
        parentId: '2157',
        name: 'RevenueOverview',
        path: 'revenueOverview',
        hidden: false,
        component: 'report/revenueOverview/index',
        meta: {
          title: '充电总览',
          icon: 'ant-design:bar-chart-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2158',
        parentId: '2157',
        name: 'ChargingStationList',
        path: 'chargingStationList',
        hidden: false,
        component: 'report/chargingStationList/index',
        meta: {
          title: '充电站统计列表',
          icon: 'ant-design:environment-filled',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2159',
        parentId: '2157',
        name: 'ChargingPileList',
        path: 'chargingPileList',
        hidden: false,
        component: 'report/chargingPileList/index',
        meta: {
          title: '充电桩统计列表',
          icon: 'ant-design:rocket-filled',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2161',
        parentId: '2157',
        name: 'StationStatistics/:id',
        path: 'stationStatistics/:id',
        hidden: true,
        component: 'report/stationStatistics/index',
        meta: {
          title: '充电站统计明细',
          icon: 'ant-design:radar-chart-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2162',
        parentId: '2157',
        name: 'PileStatistics/:id',
        path: 'pileStatistics/:id',
        hidden: true,
        component: 'report/pileStatistics/index',
        meta: {
          title: '充电桩统计明细',
          icon: 'ant-design:pie-chart-filled',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2217',
        parentId: '2157',
        name: 'InvoiceChars',
        path: 'invoiceChars',
        hidden: false,
        component: 'report/invoiceChars/index',
        meta: {
          title: '发票统计',
          icon: 'ant-design:appstore-add-outlined',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    id: '2178',
    parentId: '0',
    name: 'DeviceMonitor',
    path: '/deviceMonitor',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '设备监控',
      icon: 'ant-design:console-sql-outlined',
      noCache: false,
      link: null,
    },
    children: [
      {
        id: '2179',
        parentId: '2178',
        name: 'CarModel',
        path: 'carModel',
        hidden: false,
        component: 'deviceMonitor/carModel/index',
        meta: { title: '物模型管理', icon: 'ant-design:car-outlined', noCache: true, link: null },
      },
      {
        id: '2181',
        parentId: '2178',
        name: 'MonitorDetails/:id',
        path: 'monitorDetails/:id',
        hidden: true,
        component: 'deviceMonitor/monitorDetails/index',
        meta: {
          title: '监控单元详情',
          icon: 'ant-design:eye-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2304',
        parentId: '2178',
        name: 'MonitorUnit',
        path: 'monitorUnit',
        hidden: false,
        component: 'deviceMonitor/monitorUnit/index',
        meta: {
          title: '监控单元管理',
          icon: 'ant-design:gold-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2303',
        parentId: '2178',
        name: 'MonitorDevice',
        path: 'monitorDevice',
        hidden: false,
        component: 'deviceMonitor/monitorDevice/index',
        meta: {
          title: '监控设备管理',
          icon: 'ant-design:usb-filled',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2311',
        parentId: '2178',
        name: 'MonitorPamel/:id',
        path: 'monitorPamel/:id',
        hidden: true,
        component: 'deviceMonitor/monitorPanel/index',
        meta: {
          title: '监控面板',
          icon: 'ant-design:node-expand-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2328',
        parentId: '2178',
        name: 'MonitorPamelMobile/:id',
        path: 'monitorPamelMobile/:id',
        hidden: true,
        component: 'deviceMonitor/monitorPanelMobile/index',
        meta: {
          title: '监控面板(小程序)',
          icon: 'ant-design:alert-twotone',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    id: '2218',
    parentId: '0',
    name: 'Cooperation',
    path: '/cooperation',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '加盟合作',
      icon: 'ant-design:user-switch-outlined',
      noCache: false,
      link: null,
    },
    children: [
      {
        id: '2219',
        parentId: '2218',
        name: 'Company',
        path: 'company',
        hidden: false,
        component: 'cooperation/company/index',
        meta: { title: '公司管理', icon: 'ant-design:home-filled', noCache: false, link: null },
      },
      {
        id: '2220',
        parentId: '2218',
        name: 'CompanyPile',
        path: 'companyPile',
        hidden: false,
        component: 'cooperation/companyPile/index',
        meta: {
          title: '公司充电桩管理',
          icon: 'ant-design:aliyun-outlined',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2222',
        parentId: '2218',
        name: 'Application',
        path: 'application',
        hidden: false,
        component: 'cooperation/application/index',
        meta: {
          title: '公众号应用管理',
          icon: 'ant-design:android-filled',
          noCache: true,
          link: null,
        },
      },
      {
        id: '2221',
        parentId: '2218',
        name: 'AppPermission',
        path: 'appPermission',
        hidden: false,
        component: 'cooperation/appPermission/index',
        meta: {
          title: '公众号应用权限管理',
          icon: 'ant-design:file-add-twotone',
          noCache: true,
          link: null,
        },
      },
    ],
  },
  {
    id: '1',
    parentId: '0',
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'ant-design:setting-filled', noCache: false, link: null },
    children: [
      {
        id: '100',
        parentId: '1',
        name: 'User',
        path: 'user',
        hidden: false,
        component: 'system/user/index',
        meta: { title: '用户管理', icon: 'ant-design:user-outlined', noCache: false, link: null },
      },
      {
        id: '101',
        parentId: '1',
        name: 'Role',
        path: 'role',
        hidden: false,
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          icon: 'ant-design:usergroup-add-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '102',
        parentId: '1',
        name: 'Menu',
        path: 'menu',
        hidden: false,
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'ant-design:menu-unfold-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '103',
        parentId: '1',
        name: 'Dept',
        path: 'dept',
        hidden: false,
        component: 'system/dept/index',
        meta: { title: '部门管理', icon: 'ant-design:gold-twotone', noCache: false, link: null },
      },
      {
        id: '104',
        parentId: '1',
        name: 'Post',
        path: 'post',
        hidden: false,
        component: 'system/post/index',
        meta: {
          title: '岗位管理',
          icon: 'ant-design:control-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '105',
        parentId: '1',
        name: 'Dict',
        path: 'dict',
        hidden: false,
        component: 'system/dict/index',
        meta: {
          title: '字典管理',
          icon: 'ant-design:medicine-box-outlined',
          noCache: true,
          link: null,
        },
      },
      {
        id: '106',
        parentId: '1',
        name: 'Config',
        path: 'config',
        hidden: false,
        component: 'system/config/index',
        meta: { title: '参数设置', icon: 'ant-design:edit-outlined', noCache: false, link: null },
      },
      {
        id: '107',
        parentId: '1',
        name: 'Notice',
        path: 'notice',
        hidden: false,
        component: 'system/notice/index',
        meta: {
          title: '通知公告',
          icon: 'ant-design:message-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2021',
        parentId: '1',
        name: 'Setting',
        path: 'setting',
        hidden: false,
        component: 'system/setting/index',
        meta: {
          title: '个人信息',
          icon: 'ant-design:radius-setting-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2020',
        parentId: '1',
        name: 'Distribution/:id',
        path: 'distribution/:id',
        hidden: true,
        component: 'system/distribution/index',
        meta: {
          title: '分配角色',
          icon: 'ant-design:ant-cloud-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2015',
        parentId: '1',
        name: 'Assign/:id',
        path: 'assign/:id',
        hidden: true,
        component: 'system/assign/index',
        query: 'id',
        meta: {
          title: '分配用户',
          icon: 'ant-design:audit-outlined',
          noCache: false,
          link: null,
        },
      },
      {
        id: '2182',
        parentId: '1',
        name: 'DictData/:id',
        path: 'dictData/:id',
        hidden: true,
        component: 'system/dictData/index',
        meta: {
          title: '字典数据',
          icon: 'ant-design:database-outlined',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    id: '2',
    parentId: '0',
    name: 'Monitor',
    path: '/monitor',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: { title: '系统监控', icon: 'ant-design:android-filled', noCache: false, link: null },
    children: [
      {
        id: '109',
        parentId: '2',
        name: 'Online',
        path: 'online',
        hidden: false,
        component: 'monitor/online/index',
        meta: { title: '在线用户', icon: 'ant-design:aim-outlined', noCache: false, link: null },
      },
      {
        id: '110',
        parentId: '2',
        name: 'Job',
        path: 'job',
        hidden: false,
        component: 'monitor/job/index',
        meta: {
          title: '定时任务',
          icon: 'ant-design:file-word-twotone',
          noCache: false,
          link: null,
        },
      },
    ],
  },
];
