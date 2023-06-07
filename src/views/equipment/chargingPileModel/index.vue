<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';

  import { Action, useTable } from '@/components/Table';
  import { getModelList, deleteModel } from '@/api/modules/equipment/chargingPileModel';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getModelList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 150,
      key: 'ACTION',
      render: (row: CompanyList) =>
        h(Action, {
          actions: [
            { type: 'edit', onClick: () => openModal(true, row) },
            {
              type: 'del',
              onClick: async () => {
                await deleteModel(row.id);
                await reload();
              },
            },
          ],
        }),
    },
  });
</script>

<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button type="primary" @click="openModal(true)"> 新增 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>
