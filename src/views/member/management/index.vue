<script setup lang="ts">
  import type { List } from '@/api/modules/member/types/management';
  import { useTable, Action } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { getList } from '@/api/modules/member/management';
  import { columns, schemas } from './data';

  import rechargeModal from './modal/rechargeModal.vue';
  import overChargeModal from './modal/overChargeModal.vue';

  const router = useRouter();
  const [registerRechargeModal, { openModal: openRechargeModal }] = useModal();
  const [registerOverChargeModal, { openModal: openOverChargeModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: List) =>
        h(Action, {
          actions: [
            {
              icon: 'i-carbon:view',
              tooltipProps: { content: '详情' },
              buttonProps: {
                type: 'primary',
                onClick: () => router.push(`/member/memberDetail/${row.id}`),
              },
            },
            {
              icon: 'i-carbon:box-plot',
              tooltipProps: { content: '线下充值' },
              buttonProps: {
                type: 'success',
                onClick: () => openRechargeModal(true, row),
              },
            },
            {
              icon: 'i-carbon:chart-violin-plot',
              tooltipProps: { content: '多充设置' },
              buttonProps: {
                type: 'warning',
                onClick: () => openOverChargeModal(true, { id: row.id }),
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
    <rechargeModal @register="registerRechargeModal" @success="reload()" />
    <overChargeModal @register="registerOverChargeModal" @success="reload()" />
  </PageWrapper>
</template>

<style scoped></style>
