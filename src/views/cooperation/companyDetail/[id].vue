<script setup lang="ts">
  import type {
    companyDetails,
    DetailUserList,
  } from '@/api/modules/cooperation/types/companyDetail';
  import type { RowKey } from 'naive-ui/es/data-table/src/interface';

  import { Action, useTable } from '@/components/Table';
  import {
    getCompanyDetails,
    getDetailUserList,
    deleteUserList,
    getDetailPileList,
    deletePileList,
  } from '@/api/modules/cooperation/companyDetail';
  import { userColumns, pileColumns, DescItemSchemas } from './data';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';

  const router = useRouter();
  const { removeTab } = useMultipleTabStore();
  const props = defineProps({ id: { type: String, default: '' } });
  const tabValue = ref(0);
  const detailsData = ref<companyDetails>();
  const [registerSetModal, { openModal }] = useModal();
  const [registerTable, { reload, setProps, getSelectedRowKeys, clearSelectedRowKeys }] = useTable({
    api: getDetailUserList,
    columns: userColumns,
    outermost: false,
    pagination: false,
    rowKey: (rowData) => rowData.id,
    searchInfo: { id: props.id },
    actionColumn: {
      width: 100,
      key: 'ACTION',
      render: (row: DetailUserList) =>
        h(Action, {
          actions: [
            {
              type: 'del',
              onClick: async () => {
                await handleDelete([row.id]);
                await reload();
              },
            },
          ],
        }),
    },
  });

  async function handleDelete(e: RowKey[]) {
    if (e.length === 0) return;
    tabValue.value
      ? await deletePileList({ idList: e.join(',') })
      : await deleteUserList({ idList: e.join(',') });
    clearSelectedRowKeys();
    reload();
  }

  // 切换tab时,修改数据源,更新table项
  const changeTab = async (e: number) => {
    setProps({
      api: e ? getDetailPileList : getDetailUserList,
      columns: e ? pileColumns : userColumns,
    });
    await reload();
  };

  const handleClose = async () => {
    await removeTab(router.currentRoute.value.fullPath);
    router.push('/cooperation/company');
  };

  onMounted(async () => {
    detailsData.value = await getCompanyDetails(props.id);
  });
</script>

<template>
  <dark-mode-container class="p-4 h-full flex flex-col">
    <Descriptions class="mb-4" :schema="DescItemSchemas" :data="detailsData"></Descriptions>
    <n-tabs v-model:value="tabValue" type="line" animated @update:value="changeTab">
      <n-tab-pane :name="0" tab="人员列表"> </n-tab-pane>
      <n-tab-pane :name="1" tab="充电桩列表"> </n-tab-pane>
    </n-tabs>
    <Table @register="registerTable">
      <template #toolbar>
        <n-space>
          <n-button type="primary" @click="openModal(true, { id, type: tabValue })">
            新增
          </n-button>
          <n-button type="error" @click="handleDelete(getSelectedRowKeys())"> 批量删除 </n-button>
          <n-button type="warning" @click="handleClose"> 关闭 </n-button>
        </n-space>
      </template>
    </Table>
  </dark-mode-container>
  <setModal @register="registerSetModal" @success="reload()" />
</template>
