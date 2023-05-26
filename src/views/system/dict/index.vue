<script setup lang="ts">
  import type { DictList } from '@/api/modules/system/types/dict';
  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { getDictList, deleteDictList, refreshCache } from '@/api/modules/system/dict';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const router = useRouter();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getDictList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      key: 'ACTION',
      render: (row: DictList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openModal(true, { dictId: row.dictId }),
            },
            {
              icon: 'i-ant-design:database-outlined',
              tooltipProps: { content: '列表' },
              buttonProps: {
                type: 'success',
                onClick: () => {
                  router.push(`/system/dictData/${row.dictType}`);
                },
              },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteDictList(row.dictId);
                await reload();
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.dictId,
  });

  const handleAdd = () => {
    openModal(true);
  };

  const handleRefresh = async () => {
    await refreshCache();
    await reload();
  };
</script>

<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增字典 </n-button>
      <n-button type="error" @click="handleRefresh"> 刷新缓存 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<style scoped></style>
