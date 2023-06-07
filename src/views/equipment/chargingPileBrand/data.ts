import type { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '名称', key: 'name', width: 300 },
  { title: '创建人', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '更新时间', key: 'updateTime', width: 200 },
];

export const schemas: FormSchema[] = [
  { path: 'name', label: '品牌名称', component: 'NInput', span: 8 },
];
