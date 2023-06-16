<script setup lang="ts">
  import type { CarList } from '@/api/modules/member/types/car';

  import { Action, useTable } from '@/components/Table';
  import { getList } from '@/api/modules/member/car';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import detailModal from './modal/detailModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable] = useTable({
    api: getList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 100,
      key: 'ACTION',
      render: (row: CarList) =>
        h(Action, {
          actions: [
            {
              icon: 'i-carbon:view',
              tooltipProps: { content: '详情' },
              buttonProps: {
                type: 'info',
                onClick: () => openModal(true, row),
              },
            },
          ],
        }),
    },
  });
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable" />
    <detailModal @register="registerModal" />
  </PageWrapper>
</template>
