<script setup lang="ts">
  import type { EquipmentList } from '@/api/modules/equipment/types/equipmentNumber';

  import { Action, useTable } from '@/components/Table';
  import { getEquipmentList, deleteEquipmentNumber } from '@/api/modules/equipment/equipmentNumber';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';
  import batchModal from './modal/batchModal.vue';
  import codeModal from './modal/codeModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerBatchModal, { openModal: openBatchModal }] = useModal();
  const [registerCodeModal, { openModal: openCodeModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getEquipmentList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: EquipmentList) =>
        h(Action, {
          actions: [
            { type: 'edit', onClick: () => openModal(true, row) },
            {
              icon: 'i-carbon:download',
              tooltipProps: { content: '下载二维码' },
              buttonProps: {
                type: 'success',
                onClick: () => openCodeModal(true, row),
              },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteEquipmentNumber(row.code);
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
        <n-button type="primary" class="mr-2" @click="openModal(true)"> 新增 </n-button>
        <n-button type="success" @click="openBatchModal(true)"> 批量生成 </n-button>
      </template>
    </Table>
    <setModal @register="registerModal" @success="reload()" />
    <batchModal @register="registerBatchModal" @success="reload()" />
    <codeModal @register="registerCodeModal" />
  </PageWrapper>
</template>
