import { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'nickName',
    component: 'NInput',
    label: '昵称',
  },
  {
    path: 'phonenumber',
    component: 'NInput',
    label: '手机号码',
    rule: [{ pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '手机号码不正确' }],
  },
  {
    path: 'email',
    component: 'NInput',
    label: '邮箱',
    rule: [
      {
        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: '邮箱格式不正确',
      },
      { max: 50, message: '邮箱不得超过50字符' },
    ],
  },
  {
    path: 'sex',
    component: 'NRadioGroup',
    label: '性别',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '男', value: '0' },
        { label: '女', value: '1' },
      ],
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    path: 'oldPassword',
    label: '当前密码',
    component: 'NInput',
    required: true,
    componentProps: {
      type: 'password',
      showPasswordOn: 'click',
    },
  },
  {
    path: 'newPassword',
    label: '新密码',
    component: 'NInput',
    componentProps: {
      placeholder: '新密码',
    },
    rule: [{ required: true, message: '请输入新密码' }],
  },
  {
    path: 'confirmPassword',
    label: '确认密码',
    component: 'NInput',
    componentProps: { type: 'password' },
    // dynamicRules: ({ values }) => {
    //   return [
    //     {
    //       required: true,
    //       validator: (_, value) => {
    //         if (!value) {
    //           return Promise.reject('不能为空');
    //         }
    //         if (value !== values.newPassword) {
    //           return Promise.reject('两次输入的密码不一致!');
    //         }
    //         return Promise.resolve();
    //       },
    //     },
    //   ];
    // },
  },
];
