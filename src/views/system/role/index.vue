<script setup lang="ts">
  import Table from '@/components/Table/index.vue';
  import { BasicColumn } from '@/components/Table/types';

  const columns: BasicColumn[] = [
    { type: 'selection' },
    { title: 'Name', key: 'name' },
    { title: 'Age', key: 'age' },
    { title: 'Address', key: 'address' },
  ];
  const data = [
    { id: 0, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { id: 1, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { id: 2, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  ];
  // const rowKey = (data) => data.key;
  // setTimeout(() => {
  //   k.value = [1, 2];
  // }, 3000);
</script>

<template>
  <div>
    <Table :columns="columns" :data="data" :bordered="false" />
  </div>
</template>

<style scoped></style>

<route lang="yaml">
# meta:
# layout: users
</route>
