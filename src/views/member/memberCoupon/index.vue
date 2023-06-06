<script setup lang="ts">
  import type { CouponList } from '@/api/modules/member/types/memberCoupon';

  import { Action, useTable } from '@/components/Table';
  import { getList } from '@/api/modules/member/memberCoupon';
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
      render: (row: CouponList) =>
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
  <detailModal @register="registerModal" />
</template>
