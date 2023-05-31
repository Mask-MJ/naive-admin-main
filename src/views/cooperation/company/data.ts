import type { BasicColumn, FormSchema } from '@/components/Table';
import type { CompanyList } from '@/api/modules/cooperation/types/company';
import { NPopconfirm, NSwitch } from 'naive-ui';
import { setCompanyStatus } from '@/api/modules/cooperation/company';

export const columns: BasicColumn<CompanyList & { pendingStatus: boolean }>[] = [
  { title: '公司名称', key: 'name', width: 300 },
  {
    title: '合作状态',
    key: 'partner',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.partner;
            setCompanyStatus({ id: rowData.id, partner: status })
              .then(() => {
                rowData.partner = !status;
                window.$message.success(`已成功修改合作状态`);
              })
              .catch(() => {
                window.$message.error('修改合作状态失败');
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
          default: () => (rowData.partner ? '是否终止合作' : '是否启用合作'),
          trigger: () =>
            h(
              NSwitch,
              {
                loading: rowData.pendingStatus,
                value: rowData.partner,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '合作中', unchecked: () => '未合作' },
            ),
        },
      ),
  },
  { title: '创建人', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '更新时间', key: 'updateTime', width: 200 },
];

export const schemas: FormSchema[] = [
  { path: 'name', label: '公司名称', component: 'NInput', span: 8 },
  { path: 'partner', label: '合作状态', component: 'NInput', span: 8 },
];
