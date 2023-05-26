<script setup lang="ts">
  import type { AccountList } from '@/api/modules/system/types/user';

  import { Action, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import { getDeptList, getAccountList, deleteUser } from '@/api/modules/system/user';
  import AccountModal from './modal/AccountModal.vue';
  import ResetModal from './modal/ResetModal.vue';

  const searchValue = ref('');
  const searchInfo = reactive<Recordable>({});
  const data = ref();

  const router = useRouter();
  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerResetModal, { openModal: openResetModel }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getAccountList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    searchInfo,
    bordered: true,
    rowKey: (rowData) => rowData.userId,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: AccountList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openSetModel(true, { userId: row.userId, treeData: data.value }),
            },
            {
              icon: 'i-ant-design:user-outlined',
              tooltipProps: { content: '分配角色' },
              buttonProps: {
                type: 'warning',
                onClick: () => {
                  router.push(`/system/distribution/${row.userId}`);
                },
              },
            },
            {
              icon: 'i-carbon:ibm-cloud-key-protect',
              tooltipProps: { content: '重置密码' },
              buttonProps: {
                type: 'success',
                onClick: () => {
                  openResetModel(true, { userId: row.userId });
                },
              },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteUser(row.userId);
                await reload();
              },
            },
          ],
        }),
    },
  });

  const handleAdd = () => {
    openSetModel(true, { treeData: data.value });
  };

  /** 更新表格数据 */
  const handleSelect = (deptId: string[]) => {
    searchInfo.deptId = deptId[0];
    reload();
  };

  onMounted(async () => {
    data.value = await getDeptList('0');
  });
</script>

<template>
  <div class="flex h-full">
    <div class="w-1/4 xl:w-1/5 mr-4">
      <n-input v-model:value="searchValue" placeholder="搜索" />
      <n-tree
        :show-irrelevant-nodes="false"
        :pattern="searchValue"
        :data="data"
        block-line
        key-field="id"
        @update-selected-keys="handleSelect"
      />
    </div>
    <div class="w-3/4 xl:w-4/5">
      <Table @register="registerTable">
        <template #toolbar>
          <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
        </template>
      </Table>
    </div>
    <AccountModal @register="registerSetModal" @success="reload()" />
    <ResetModal @register="registerResetModal" />
  </div>
</template>

<style scoped></style>
