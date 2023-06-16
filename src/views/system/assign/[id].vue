<script setup lang="ts">
  import { useTable } from '@/components/Table';
  import { Action } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import addUser from './modal/addUser.vue';

  import { getAllocatedList, cancel, cancelAll } from '@/api/modules/system/assign';
  import { schemas, columns } from './data';

  const props = defineProps({
    id: { type: String, required: true },
  });

  const router = useRouter();
  const { removeTab } = useMultipleTabStore();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectedRowKeys }] = useTable({
    api: getAllocatedList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    searchInfo: { roleId: props.id },
    actionColumn: {
      width: 100,
      key: 'ACTION',
      render: (row) =>
        h(Action, {
          actions: [
            {
              icon: 'i-carbon:delete',
              tooltipProps: { content: '删除' },
              buttonProps: { type: 'error' },
              popConfirmProps: {
                content: '是否确认删除',
                onPositiveClick: async () => {
                  await cancel({ roleId: props.id, userId: row.userId });
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.userId,
  });

  const handleAdd = () => {
    openModal(true, { roleId: props.id });
  };

  const handleDeleteAll = async () => {
    const userIds = getSelectedRowKeys();
    if (userIds.length === 0) {
      window.$message.error('请选择要取消授权的用户');
    } else {
      let params = {
        roleId: Number(props.id),
        userIds: userIds.join(','),
      };
      await cancelAll(params);
      await reload();
    }
  };

  const handleClose = async () => {
    await removeTab(router.currentRoute.value.fullPath);
    router.push('/system/role');
  };
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
        <n-button class="mr-2" type="error" @click="handleDeleteAll"> 批量取消授权 </n-button>
        <n-button class="mr-2" type="warning" @click="handleClose"> 关闭 </n-button>
      </template>
    </Table>
    <addUser @register="registerModal" @success="reload()" />
  </PageWrapper>
</template>

<style scoped></style>
