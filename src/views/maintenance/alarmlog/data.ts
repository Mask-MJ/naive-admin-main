import type { BasicColumn, FormSchema } from '@/components/Table';
import type { List } from '@/api/modules/maintenance/types/alarmlog';

export const columns: BasicColumn<List>[] = [
  { title: '告警时间', key: 'alarmTime', width: 200 },
  { title: '省份城市', key: 'shortAddress', width: 150 },
  { title: '充电站', key: 'station', width: 150 },
  { title: '充电桩编号', key: 'pileCode', width: 150 },
  { title: '充电枪', key: 'gunName', width: 100 },
  { title: '告警编码', key: 'alarmCode', width: 100 },
  { title: '告警内容', key: 'alarmMsg', width: 150 },
  { title: '告警状态', key: 'alarmStatus.desc', width: 100 },
  { title: '告警值', key: 'alarmValue', width: 100 },
  {
    title: '处理说明',
    key: 'handleMsg',
    width: 150,
    render: (rowData) => rowData.handleMsg || '----',
  },
];

export const schemas: FormSchema[] = [
  {
    path: 'shortAddress',
    component: 'NInput',
    label: '省份城市',
    span: 6,
  },
  {
    path: 'station',
    component: 'NInput',
    label: '充电站',
    span: 6,
  },
  {
    path: 'pileCode',
    component: 'NInput',
    label: '充电桩编号',
    span: 6,
  },
  {
    path: 'gunName',
    component: 'NInput',
    label: '充电枪',
    span: 6,
  },
  {
    path: 'alarmCode',
    component: 'NInput',
    label: '告警编码',
    span: 6,
  },
  {
    path: 'alarmStatus',
    component: 'NSelect',
    label: '告警状态',
    span: 6,
    componentProps: {
      options: [
        { label: '恢复', value: 0 },
        { label: '告警', value: 1 },
        { label: '人工处理', value: 2 },
      ],
    },
  },
  {
    path: '[alarmTimeStart, alarmTimeEnd]',
    component: 'NDatePicker',
    label: '告警时间',
    span: 12,
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
];
