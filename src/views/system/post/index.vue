<script setup lang="ts">
  import type { PostList } from '@/api/modules/system/types/post';

  import { useTable, Action } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import { getPostList, deletePost } from '@/api/modules/system/post';
  import setModal from './modal/setModal.vue';

  const [registerSetModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getPostList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 80, schemas },
    rowKey: (rowData) => rowData.roleId,
    actionColumn: {
      width: 150,
      key: 'ACTION',
      render: (row: PostList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openModal(true, { postId: row.postId }),
            },
            {
              type: 'del',
              onClick: async () => {
                await deletePost(row.postId);
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
  <setModal @register="registerSetModal" @success="reload()" />
</template>

<style scoped></style>
