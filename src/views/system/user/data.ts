import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';
import type { AccountList } from '@/api/modules/system/types/user';

import { NPopconfirm, NSwitch } from 'naive-ui';
import { setRoleStatus } from '@/api/modules/system/user';
export const schemas: FormSchema[] = [
  {
    path: 'userName',
    label: '用户名称',
    component: 'NInput',
    span: 8,
  },
  {
    path: 'phonenumber',
    label: '手机号码',
    component: 'NInput',
    span: 8,
  },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
    span: 8,
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
    span: 8,
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
    span: 8,
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  // {
  //   path: '[beginTime, endTime]',
  //   label: '创建时间',
  //   component: 'RangePicker',
  //   componentProps: {
  //     format: 'YYYY-MM-DD',
  //     placeholder: ['开始日期', '结束日期'],
  //   },
  //   giProps: {
  //     span: 12,
  //   },
  // },
];

export const columns: BasicColumn<AccountList & { pendingStatus: boolean }>[] = [
  {
    title: '用户名称',
    key: 'userName',
    width: 100,
  },
  {
    title: '用户昵称',
    key: 'nickName',
    width: 100,
  },
  {
    title: '部门',
    key: 'dept.deptName',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.status === '0' ? '1' : '0';
            setRoleStatus({ userId: rowData.userId, status })
              .then(() => {
                rowData.status = status;
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
          default: () => (rowData.status === '0' ? '是否停用用户' : '是否启用用户'),
          trigger: () =>
            h(
              NSwitch,
              {
                checkedValue: '0',
                uncheckedValue: '1',
                loading: rowData.pendingStatus,
                value: rowData.status,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '启用', unchecked: () => '停用' },
            ),
        },
      ),
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200,
  },
];
