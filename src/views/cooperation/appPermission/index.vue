<script setup lang="ts">
  import type { ListResult } from '@/api/modules/cooperation/types/appPermission';

  import { Action, useTable } from '@/components/Table';
  import { getList, deletePermittedApp } from '@/api/modules/cooperation/appPermission';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 100,
      key: 'ACTION',
      render: (row: ListResult) =>
        h(Action, {
          actions: [
            {
              type: 'del',
              onClick: async () => {
                await deletePermittedApp(row.id);
                await reload();
              },
            },
          ],
        }),
    },
  });
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button type="primary" @click="openModal(true)"> 用户权限管理 </n-button>
      </template>
    </Table>
    <setModal @register="registerModal" />
  </PageWrapper>
</template>
