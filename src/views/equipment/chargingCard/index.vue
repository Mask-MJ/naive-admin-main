<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';

  import { Action, useTable } from '@/components/Table';
  import { getCardList, deleteCard } from '@/api/modules/equipment/chargingCard';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';
  import detailModal from './modal/detailModal.vue';

  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerDetailModal, { openModal: openDetailModel }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getCardList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: CompanyList) =>
        h(Action, {
          actions: [
            { type: 'edit', onClick: () => openSetModel(true, row) },
            {
              icon: 'i-carbon:view',
              tooltipProps: { content: '详情' },
              buttonProps: { type: 'success', onClick: () => openDetailModel(true, row) },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteCard(row.id);
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
        <n-button type="primary" @click="openSetModel(true)"> 新增 </n-button>
      </template>
    </Table>
    <setModal @register="registerSetModal" @success="reload()" />
    <detailModal @register="registerDetailModal" />
  </PageWrapper>
</template>
