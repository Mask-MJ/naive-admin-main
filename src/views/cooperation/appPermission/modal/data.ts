import type { BasicColumn } from '@/components/Table';
export const columns: BasicColumn[] = [
  { type: 'selection', key: 'selection' },
  { title: '应用名称', key: 'appName', width: 80 },
  { title: '分组名称', key: 'groupName', width: 80 },
];
