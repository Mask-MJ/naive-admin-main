<script setup lang="ts">
  import type { OnlineList } from '@/api/modules/monitor/types/online';

  import { Action, useTable } from '@/components/Table';
  import { getOnlineList, deleteOnline } from '@/api/modules/monitor/online';
  import { columns, schemas } from './data';

  const [registerTable, { reload }] = useTable({
    api: getOnlineList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    rowKey: (rowData) => rowData.tokenId,
    actionColumn: {
      width: 100,
      key: 'ACTION',
      render: (row: OnlineList) =>
        h(Action, {
          actions: [
            {
              icon: 'i-carbon:logout',
              tooltipProps: { content: '强退' },
              buttonProps: { type: 'error' },
              popConfirmProps: {
                content: '是否确认删除',
                onPositiveClick: async () => {
                  await deleteOnline(row.tokenId);
                  window.$message.success('强退成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
  });
</script>

<template>
  <Table @register="registerTable" />
</template>
