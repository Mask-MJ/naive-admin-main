<script setup lang="ts">
  import { useTable } from '@/components/Table';
  import { getList } from '@/api/modules/maintenance/alarmlog';
  import { columns, schemas } from './data';
  const [registerTable] = useTable({
    api: getList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    rowKey: (rowData) => rowData.id,
  });
</script>

<template>
  <Table @register="registerTable" />
</template>

<style scoped></style>
