import type { BasicColumn, FormSchema } from '@/components/Table';
import { NPopconfirm, NSwitch } from 'naive-ui';
import { setStatus } from '@/api/modules/member/management';

export const columns: BasicColumn[] = [
  { title: '昵称', key: 'nickname', width: 100 },
  { title: '手机号', key: 'phoneNumber', width: 100 },
  { title: '性别', key: 'genderType.desc', width: 100 },
  {
    title: '钱包余额',
    key: 'balance',
    width: 100,
    render: (rowData) => h('span', { style: { color: '#ea1b1b' } }, rowData['balance']),
  },
  {
    title: '最近充电时间',
    key: 'lastChargeTime',
    width: 120,
    render: (rowData) => rowData.lastChargeTime || '----',
  },
  { title: '最近登录时间', key: 'lastLoginTime', width: 120 },
  { title: '注册时间', key: 'createTime', width: 100 },
  {
    title: '是否多充',
    key: 'overCharge',
    width: 80,
    render: (rowData) => (rowData.overCharge ? '是' : '否'),
  },
  {
    title: '状态',
    key: 'statusType.type',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.statusType.type === 1 ? 0 : 1;
            setStatus(rowData.id)
              .then(() => {
                rowData.statusType.type = status;
                window.$message.success(`已成功修改会员状态`);
              })
              .catch(() => {
                window.$message.error('修改会员状态失败');
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
          default: () => (rowData.statusType.type === 1 ? '是否停用会员' : '是否启用会员'),
          trigger: () =>
            h(
              NSwitch,
              {
                checkedValue: 1,
                uncheckedValue: 0,
                loading: rowData.pendingStatus,
                value: rowData.statusType.type,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '启用', unchecked: () => '停用' },
            ),
        },
      ),
  },
];

export const schemas: FormSchema[] = [
  {
    path: 'phoneNumber',
    component: 'NInput',
    label: '手机号',
    span: 8,
  },
  {
    path: 'nickName',
    component: 'NInput',
    label: '昵称',
    span: 8,
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    span: 8,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
];
