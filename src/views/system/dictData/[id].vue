<script setup lang="ts">
  import type { DictList } from '@/api/modules/system/types/dict';
  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { columns, schemas } from './data';
  import { getDictDataList, deleteDictDataList } from '@/api/modules/system/dict';
  import { find } from 'lodash';
  import setModal from './modal/setModal.vue';

  const props = defineProps({ id: { type: String } });

  const router = useRouter();
  const { removeTab } = useMultipleTabStore();
  const getSchemas = () => {
    const data = find(schemas, ['path', 'dictType']);
    data!.defaultValue = props.id;
    return schemas;
  };

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getDictDataList,
    columns,
    showIndexColumn: false,
    searchInfo: { isAsc: 'asc', orderByColumn: 'dictSort' },
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas: getSchemas() },
    bordered: true,
    rowKey: (rowData) => rowData.dictCode,
    actionColumn: {
      width: 150,
      key: 'ACTION',
      render: (rowData: DictList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openModal(true, { isUpdate: true, rowData }),
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteDictDataList(rowData.dictCode);
                await reload();
              },
            },
          ],
        }),
    },
  });

  const handleAdd = () => {
    openModal(true, { isUpdate: false, dictType: props.id });
  };
  const handleClose = async () => {
    await removeTab(router.currentRoute.value.fullPath);
    router.push('/system/dict');
  };
</script>

<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
      <n-button type="error" @click="handleClose">关闭</n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<style scoped></style>
