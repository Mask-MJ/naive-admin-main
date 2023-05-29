import type { DescItem } from '@/components/Descriptions';
import type { BasicColumn, FormSchema } from '@/components/Table';

export const carDetail = [
  { name: '车牌号码', key: 'licenceNumber' },
  { name: '车辆品牌', key: 'carBrand' },
  { name: '车辆系列', key: 'carSeries' },
  { name: '车辆型号', key: 'carType' },
] as const;

export const DescItemSchemas: DescItem[] = [
  { path: 'nickname', label: '昵称' },
  { path: 'genderType', label: '性别', render: (val) => `${val?.desc}` },
  { path: 'countryCode', label: '手机前置编号' },
  { path: 'phoneNumber', label: '手机号' },
  { path: 'statusType', label: '状态', render: (val) => `${val?.desc}` },
  { path: 'createTime', label: '注册时间' },
  { path: 'lastLoginTime', label: '最近登录时间' },
];

export const recordSchemas: FormSchema[] = [
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '交易日期',
    span: 10,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  {
    path: 'status',
    label: '收入/支出',
    component: 'NSelect',
    span: 6,
    componentProps: {
      options: [
        { label: '收入', value: 1 },
        { label: '支出', value: 2 },
      ],
    },
  },
];

export const recordColumns: BasicColumn[] = [
  { title: '交易时间', key: 'createTime', width: 100 },
  { title: '订单编号', key: 'tradeSource', width: 150 },
  { title: '收入/支出', key: 'incomeOrPay', width: 80 },
  { title: '交易类型', key: 'tradeType.desc', width: 80 },
  {
    title: '交易金额',
    key: 'adjustMoney',
    width: 80,
    render: (rowData) =>
      h(
        'span',
        { style: { color: rowData.adjustMoney > 0 ? '' : '#ea1b1b' } },
        rowData.adjustMoney,
      ),
  },
  { title: '交易后余额', key: 'balance', width: 80 },
];

export const orderSchemas: FormSchema[] = [
  {
    path: '[startTime,endTime]',
    component: 'NDatePicker',
    label: '创建日期',
    span: 16,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  {
    path: 'orderCode',
    component: 'NInput',
    label: '订单编号',
    span: 8,
  },
  {
    path: 'startMode',
    component: 'NSelect',
    label: '启动充电方式',
    span: 5,
    componentProps: {
      options: [
        { label: '远程', value: 1 },
        { label: '校验卡', value: 2 },
        { label: 'VIN卡', value: 3 },
        { label: '储值卡', value: 4 },
      ],
    },
  },
  {
    path: 'stationName',
    component: 'NInput',
    label: '充电站',
    span: 5,
  },
  {
    path: 'code',
    component: 'NInput',
    label: '充电桩',
    span: 6,
  },
];

export const orderColumns: BasicColumn[] = [
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '订单编号', key: 'orderCode', width: 200 },
  { title: '充电站', key: 'stationName', width: 100 },
  { title: '充电桩', key: 'code', width: 150 },
  { title: '启动充电方式', key: 'startMode.desc', width: 120 },
  {
    title: '充电时长',
    key: 'totalTime',
    width: 80,
    render: (rowData) => rowData.totalTime || '----',
  },
  {
    title: '充电电量',
    key: 'totalBattery',
    width: 80,
    // 待启动、待结算、进行中、异常待处理的如果返回数据为0，则显示----
    // render: (rowData) => {
    // const arr = [0, 10, 15, 60];
    // if (!rowData.totalBattery && arr.includes(rowData.orderStatus.type)) {
    //   return '----';
    // } else {
    //   return rowData.totalBattery;
    // }
    // },
  },
  {
    title: '订单金额',
    key: 'totalMoney',
    width: 80,
    // render: (rowData) => {
    //   const arr = [0, 10, 15, 60];
    //   if (!rowData.totalMoney && arr.includes(rowData.orderStatus.type)) {
    //     return h('span', null, '----');
    //   } else {
    //     return h('span', null, rowData['totalMoney']);
    //   }
    // },
  },
  {
    title: '支付方式',
    key: 'paymentMethod.desc',
    width: 80,
    // render: (rowData) => {
    //   return rowData.paymentMethod === null ? '----' : rowData.paymentMethod.desc;
    // },
  },
  {
    title: '订单状态',
    key: 'orderStatus.desc',
    width: 100,
  },
];
