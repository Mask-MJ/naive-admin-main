// import type { BasicColumn } from '@/components/Table';
// import type { FormSchema } from '@/components/Form';
// import type { PostList } from '@/api/modules/system/types/post';
import type { VxeFormItemProps, VxeGridPropTypes } from '@/components/VxeTable';

// import { NTag } from 'naive-ui';

export const columns: VxeGridPropTypes.Columns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '50',
  },
  {
    title: '岗位编号',
    field: 'postId',
    width: 100,
  },
  {
    title: '岗位编码',
    field: 'postCode',
    width: 100,
  },
  {
    title: '岗位名称',
    field: 'postName',
    minWidth: 150,
  },
  {
    title: '岗位排序',
    field: 'postSort',
    width: 100,
  },
  {
    title: '状态',
    field: 'status',
    width: 100,
    // render: (rowData) => {
    //   const status = rowData.status;
    //   const enable = ~~status === 0;
    //   return h(NTag, { type: enable ? 'success' : 'error' }, () => (enable ? '启用' : '停用'));
    // },
  },

  {
    title: '创建时间',
    field: 'createTime',
    width: 200,
  },
  {
    width: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const schemas: VxeFormItemProps[] = [
  {
    field: 'postCode',
    itemRender: { name: 'NInput' },
    title: '岗位编码',
    span: 6,
  },
  {
    field: 'postName',
    itemRender: { name: 'NInput' },
    title: '岗位名称',
    span: 6,
  },
  // {
  //   field: 'status',
  //   itemRender: {
  //     name: 'NSelect',
  //     options: [
  //       { label: '正常', value: '0', field: '0' },
  //       { label: '停用', value: '1', field: '1' },
  //     ],
  //   },
  //   title: '状态',
  //   span: 4,
  // },
  {
    span: 12,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'NButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', attrType: 'submit' },
          attrs: { class: 'mr-2' },
        },
        { props: { type: 'default', attrType: 'reset', content: '重置' } },
      ],
    },
  },
];
