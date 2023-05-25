<script setup lang="ts">
  import type { RoleList } from '@/api/modules/system/types/role';

  import { schemas, columns } from './data';
  import { useTable, Action } from '@/components/Table';
  import { getRoleList, deleteUser } from '@/api/modules/system/role';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';
  import depModal from './modal/depModal.vue';

  const router = useRouter();

  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerDepModal, { openModal: openDepModel }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getRoleList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    rowKey: (rowData) => rowData.roleId,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: RoleList) =>
        h(Action, {
          actions: [
            {
              icon: 'i-carbon:edit',
              tooltipProps: { content: '编辑' },
              buttonProps: {
                type: 'primary',
                onClick: () => {
                  openSetModel(true, { roleId: row.roleId });
                },
              },
            },
            {
              icon: 'i-carbon:user-admin',
              tooltipProps: { content: '分配' },
              buttonProps: {
                type: 'warning',
                onClick: () => {
                  router.push(`/system/assign/${encodeURIComponent(row.roleId)}`);
                },
              },
            },
            {
              icon: 'i-ant-design:poweroff-outlined',
              tooltipProps: { content: '权限' },
              buttonProps: {
                type: 'success',
                onClick: () => {
                  openDepModel(true, { roleId: row.roleId });
                },
              },
            },
            {
              icon: 'i-carbon:delete',
              tooltipProps: { content: '删除' },
              buttonProps: { type: 'error' },
              popConfirmProps: {
                content: '是否确认删除',
                onPositiveClick: async () => {
                  await deleteUser(row.roleId);
                  window.$message.success('删除成功');
                  await reload();
                },
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
      <n-button type="primary" @click="openSetModel(true)">新增</n-button>
    </template>
  </Table>
  <setModal @register="registerSetModal" @success="reload()" />
  <depModal @register="registerDepModal" @success="reload()" />
</template>

<style scoped></style>
