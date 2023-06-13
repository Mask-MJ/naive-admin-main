import type { BasicColumn, FormSchema } from '@/components/Table';
import type { EquipmentList } from '@/api/modules/equipment/types/equipmentNumber';

import { NTag } from 'naive-ui';

export const columns: BasicColumn<EquipmentList>[] = [
  { title: '设备编号', key: 'code', width: 200 },
  { title: '充电桩品牌', key: 'brandName', width: 200 },
  { title: '充电桩型号', key: 'modelName', width: 200 },
  {
    title: '启用状态',
    key: 'status',
    width: 100,
    render: (rowData) =>
      h(NTag, { type: rowData.status ? 'success' : 'error' }, () =>
        rowData.status ? '已启用' : '未启用',
      ),
  },
  { title: '创建人', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '更新时间', key: 'updateTime', width: 200 },
];

export const schemas: FormSchema[] = [
  { path: 'code', label: '设备编号', component: 'NInput', span: 8 },
  { path: 'brandName', label: '品牌', component: 'NInput', span: 8 },
  { path: 'modelName', label: '型号', component: 'NInput', span: 8 },
  {
    path: 'status',
    label: '启用状态',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '未启用', value: 0 },
        { label: '已启用', value: 1 },
      ],
    },
  },
];
