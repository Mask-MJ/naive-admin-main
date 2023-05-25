import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'userId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'userName',
    label: '用户名称',
    required: true,
    component: 'NInput',
    componentProps: { disabled: true },
    span: 12,
  },
  {
    path: 'nickName',
    label: '用户昵称',
    required: true,
    component: 'NInput',
    span: 12,
  },
  {
    path: 'password',
    label: '用户密码',
    required: true,
    component: 'NInput',
    ifShow: ({ model }) => !Boolean(model.userId),
    span: 12,
  },
  {
    path: 'phonenumber',
    label: '手机号码',
    component: 'NInput',
    span: 12,
    rule: [
      {
        required: true,
        validator: (_rule, value) => {
          const regExp = new RegExp('^[1][3,4,5,7,8,9][0-9]{9}$');
          return regExp.test(value) ? Promise.resolve() : Promise.reject('手机号格式不正确');
        },
        trigger: 'change',
      },
    ],
  },
  {
    path: 'email',
    label: '邮箱',
    required: true,
    component: 'NInput',
    span: 12,
    rule: [
      {
        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: '邮箱格式不正确',
      },
      { max: 50, message: '邮箱不得超过50字符' },
    ],
  },
  {
    path: 'deptId',
    label: '归属部门',
    component: 'NTreeSelect',
    span: 12,
    componentProps: { keyField: 'id' },
  },
  {
    path: 'postIds',
    label: '岗位',
    component: 'NSelect',
    span: 12,
    componentProps: {
      labelField: 'postName',
      valueField: 'postId',
      multiple: true,
    },
  },
  {
    path: 'sex',
    label: '用户性别',
    component: 'NRadioGroup',
    span: 12,
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '男', value: '0' },
        { label: '女', value: '1' },
      ],
    },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NRadioGroup',
    defaultValue: '0',
    span: 12,
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },

  {
    path: 'roleIds',
    label: '角色',
    component: 'NSelect',
    span: 24,
    componentProps: {
      labelField: 'roleName',
      valueField: 'roleId',
      multiple: true,
    },
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NRadioGroup',
    defaultValue: '00',
    span: 12,
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
    span: 24,
  },
];

export const resetSchemas: FormSchema[] = [
  {
    path: 'userId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'password',
    label: '新密码',
    component: 'NInput',
    rule: [
      {
        required: true,
        trigger: 'change',
        validator: (_rule, value) =>
          new RegExp(/^.{5,20}$/).test(value)
            ? Promise.resolve()
            : Promise.reject('用户密码长度必须介于 5 和 20 之间'),
      },
    ],
  },
];
