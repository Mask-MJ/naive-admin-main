import type { BasicColumn, FormSchema } from '@/components/Table';
import type { RuleList } from '@/api/modules/operation/types/rule';

export const schemas: FormSchema[] = [
  {
    path: 'ruleName',
    component: 'NInput',
    label: '规则名称',
    span: 8,
  },
  {
    path: 'ruleModel',
    component: 'NSelect',
    label: '规则模式',
    span: 8,
    componentProps: {
      options: [
        { label: '全部', value: '' },
        { label: '标准计费', value: '0' },
        { label: '分时计费', value: '1' },
      ],
    },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    span: 8,
    componentProps: {
      options: [
        { label: '待提交', value: '0' },
        { label: '待审核', value: '1' },
        { label: '已审核', value: '2' },
        { label: '已驳回', value: '3' },
      ],
    },
  },
];

export const columns: BasicColumn<RuleList>[] = [
  { title: '规则名称', key: 'ruleName', width: 150 },
  { title: '所属分组', key: 'groupName', width: 150 },
  { title: '下发时间', key: 'issueTime', width: 150 },
  {
    title: '规则模式',
    key: 'ruleModel',
    width: 80,
    render: (rowData) => (rowData.ruleModel === 0 ? '标准计费' : '分时计费'),
  },
  { title: '更新时间', key: 'updateTime', width: 150 },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render: (rowData) => ['待提交', '待审核', '已审核', '已驳回'][rowData.status],
  },
];
