import type { BasicColumn } from '@/components/Table';
import type { DescItem } from '@/components/Descriptions';
import type { CompanyList } from '@/api/modules/cooperation/types/company';

export const userColumns: BasicColumn<CompanyList>[] = [
  { type: 'selection', key: 'selection' },
  { title: '登录名称', key: 'userName', width: 100 },
  { title: '用户名称', key: 'nickName', width: 100 },
  { title: '状态', key: 'status', width: 100, render: (val) => (val ? '启用' : '禁用') },
  { title: '创建时间', key: 'createTime', width: 200 },
];

export const pileColumns: BasicColumn<CompanyList>[] = [
  { type: 'selection', key: 'selection' },
  { title: '编号', key: 'code', width: 150 },
  { title: '充电桩名称', key: 'name', width: 150 },
  { title: '运营状态', key: 'status', width: 100, render: (val) => (val ? '营业中' : '已停业') },
  { title: '所属电站', key: 'stationName', width: 200 },
];

export const DescItemSchemas: DescItem[] = [
  { path: 'name', label: '公司名称' },
  { path: 'partner', label: '合作状态', render: (val) => (val ? '合作中' : '未合作') },
  { path: 'createTime', label: '创建时间' },
  { path: 'updateTime', label: '更新时间' },
];
