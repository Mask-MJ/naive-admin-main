import type { BasicColumn, FormSchema } from '@/components/Table';
import type { Applist } from '@/api/modules/cooperation/types/application';

import { NPopconfirm, NSwitch, NImage } from 'naive-ui';
import { getGroupList, changeStatus } from '@/api/modules/cooperation/application';

export const columns: BasicColumn<Applist & { pendingStatus: boolean }>[] = [
  { title: '应用名称', key: 'appName', width: 100 },
  { title: '所属分组', key: 'groupName', width: 100 },
  {
    title: '图标',
    key: 'icon',
    width: 100,
    render: (rowData) => h(NImage, { src: rowData.icon, fit: 'cover' }),
  },
  { title: '跳转地址', key: 'url', width: 100 },
  { title: '排序号', key: 'sort', width: 100 },
  {
    title: '启用状态',
    key: 'enable',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.enable;
            changeStatus({ id: rowData.id, enable: Number(!status) })
              .then(() => {
                rowData.enable = !status;
                window.$message.success(`已成功修改状态`);
              })
              .catch(() => {
                window.$message.error('修改状态失败');
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
          default: () => (rowData.enable ? '是否停用应用' : '是否启用应用'),
          trigger: () =>
            h(
              NSwitch,
              {
                loading: rowData.pendingStatus,
                value: rowData.enable,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '启用', unchecked: () => '停用' },
            ),
        },
      ),
  },
  { title: '创建人', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '更新时间', key: 'updateTime', width: 200 },
];

export const schemas: FormSchema[] = [
  { path: 'appName', label: '应用名称', component: 'NInput', span: 8 },
  {
    path: 'enable',
    label: '启用状态',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    path: 'groupName',
    label: '应用名称',
    component: 'ApiSelect',
    span: 8,
    componentProps: {
      api: getGroupList,
      allOptions: true,
      resultField: 'rows',
      labelField: 'name',
      valueField: 'id',
    },
  },
];
