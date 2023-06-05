<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';

  import { Action, useTable } from '@/components/Table';
  import { getCompanyList } from '@/api/modules/cooperation/companyPile';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import detailModal from './modal/detailModal.vue';

  const [registerDetailModal, { openModal }] = useModal();
  const [registerTable] = useTable({
    api: getCompanyList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    rowKey: (rowData) => rowData.id,
    beforeFetch: (T) => {
      for (const key in T) {
        Array.isArray(T[key]) && (T[key] = T[key].join(','));
      }
    },
    actionColumn: {
      width: 100,
      key: 'ACTION',
      render: (row: CompanyList) =>
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
  <Table @register="registerTable" />
  <detailModal @register="registerDetailModal" />
</template>
