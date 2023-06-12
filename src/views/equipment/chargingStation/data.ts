import type { BasicColumn, FormSchema } from '@/components/Table';
import type { StationList } from '@/api/modules/equipment/types/chargingStation';
import { NPopconfirm, NSwitch } from 'naive-ui';
import { setOpeningStatus } from '@/api/modules/equipment/chargingStation';

export const schemas: FormSchema[] = [
  { path: 'name', component: 'NInput', label: '充电站名称', span: 6 },
  {
    path: 'stationType',
    component: 'NSelect',
    label: '站点类型',
    span: 6,
    componentProps: {
      options: [
        { label: '个人', value: '1' },
        { label: '公用', value: '2' },
        { label: '专用', value: '3' },
      ],
    },
  },
  {
    path: '[openingTimeBegin, openingTimeEnd]',
    component: 'NDatePicker',
    label: '投运时间',
    span: 12,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  { path: 'internalSn', component: 'NInput', label: '内部编号', span: 6 },
  { path: 'licensePlate', component: 'NInput', label: '车牌号码', span: 6 },
  { path: 'address', component: 'NInput', label: '省份城市', span: 6 },
  {
    path: 'openingStatus',
    component: 'NSelect',
    label: '投运状态',
    span: 6,
    componentProps: {
      options: [
        { label: '已投运', value: 1 },
        { label: '未投运', value: 0 },
      ],
    },
  },
  {
    path: 'isChargeCar',
    component: 'NSelect',
    label: '是否充电车',
    span: 6,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
];

export const columns: BasicColumn<StationList & { pendingStatus: boolean }>[] = [
  { title: '充电站名称', key: 'name', width: 150 },
  { title: '运营类型', key: 'operationType.desc', width: 100 },
  {
    title: '是否充电车',
    key: 'isChargeCar',
    width: 100,
    render: (rowData) => (rowData.isChargeCar ? '是' : '否'),
  },
  { title: '充电桩数量', key: 'chargerAmount', width: 100 },
  { title: '站点类型', key: 'stationType.desc', width: 80 },
  {
    title: '省份城市',
    key: 'shortAddress',
    width: 100,
    ellipsis: true,
    render: (rowData) => rowData.shortAddress || '----',
  },
  {
    title: '车牌号码',
    key: 'licensePlate',
    width: 100,
    render: (rowData) => rowData.licensePlate ?? '----',
  },
  { title: '投运时间', key: 'openingTime', width: 200 },
  {
    title: '投运状态',
    key: 'openingStatus',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.openingStatus;
            setOpeningStatus({ id: rowData.id, openingStatus: !status })
              .then(() => {
                rowData.openingStatus = !status;
                window.$message.success(`已成功修改用户状态`);
              })
              .catch(() => {
                window.$message.error('修改用户状态失败');
              })
              .finally(() => {
                rowData.pendingStatus = false;
              });
          },
          onNegativeClick() {
            rowData.pendingStatus = false;
          },
        },
        {
          default: () => (rowData.openingStatus ? '是否停用用户' : '是否启用用户'),
          trigger: () =>
            h(
              NSwitch,
              {
                loading: rowData.pendingStatus,
                value: rowData.openingStatus,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '已投运', unchecked: () => '未投运' },
            ),
        },
      ),
  },
  {
    title: '站点位置',
    key: 'positionType.desc',
    width: 100,
    render: (rowData) => rowData.positionType?.desc ?? '----',
  },
  { title: '内部编号', key: 'internalSn', width: 100 },
];
