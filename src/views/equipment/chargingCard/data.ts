import type { BasicColumn, FormSchema } from '@/components/Table';
import type { CardList } from '@/api/modules/equipment/types/chargingCard';

import { NPopconfirm, NSwitch } from 'naive-ui';
import { getMemberList, ChangeStatus } from '@/api/modules/equipment/chargingCard';

export const columns: BasicColumn<CardList & { pendingStatus: boolean }>[] = [
  { title: '卡号', key: 'cardCode', width: 200 },
  { title: '卡类型', key: 'type.desc', width: 100 },
  {
    title: '所属会员',
    key: 'phoneNumber',
    width: 150,
    render: ({ phoneNumber }) =>
      phoneNumber ? phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '----',
  },
  { title: '校验密码', key: 'verifyPassword.desc', width: 100 },
  { title: '黑白名单', key: 'blackWhiteList.desc', width: 100 },
  {
    title: '状态',
    key: 'status.desc',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.status.type === 0 ? 1 : 0;
            ChangeStatus(rowData.id)
              .then(() => {
                rowData.status.type = status;
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
          default: () => (rowData.status.type === 0 ? '是否停用用户' : '是否启用用户'),
          trigger: () =>
            h(
              NSwitch,
              {
                checkedValue: 1,
                uncheckedValue: 0,
                loading: rowData.pendingStatus,
                value: rowData.status.type,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '启用', unchecked: () => '停用' },
            ),
        },
      ),
  },
  { title: '创建时间', key: 'createTime', width: 200 },
];

export const schemas: FormSchema[] = [
  { path: 'cardCode', label: '卡号', component: 'NInput', span: 8 },
  {
    path: 'type',
    label: '卡类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '校验卡', value: 1 },
        { label: '储值卡', value: 2 },
        { label: 'VIN卡', value: 3 },
      ],
    },
  },
  {
    path: 'blackWhiteList',
    label: '黑白名单',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '无', value: 0 },
        { label: '白名单', value: 1 },
        { label: '黑名单', value: 2 },
      ],
    },
  },
  {
    path: 'phoneNumber',
    label: '所属会员',
    component: 'AutoComplete',
    span: 8,
    componentProps: {
      immediate: false,
      allOptions: true,
      resultField: 'rows',
      api: getMemberList,
    },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '停用', value: 0 },
        { label: '启用', value: 1 },
      ],
    },
  },
  {
    path: 'verifyPassword',
    label: '检验密码',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    path: '[startTime,endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
];
