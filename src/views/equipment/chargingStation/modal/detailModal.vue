<script setup lang="ts">
  import type { StationList } from '@/api/modules/equipment/types/chargingStation';
  import { useModalInner } from '@/components/Modal';
  import { detailData } from './detailData';
  import { getStation } from '@/api/modules/equipment/chargingStation';

  const isShow = ref(false);
  const rowData = ref<StationList>();
  const [registerModal] = useModalInner(async (data) => {
    const result = await getStation(data.id);
    rowData.value = result;
    isShow.value = true;
  });
</script>

<template>
  <Modal title="充电站详情" class="!w-250" positive-text="" @register="registerModal">
    <template v-for="item in detailData" :key="item.id">
      <Descriptions v-if="isShow" class="mb-4" v-bind="item" :data="rowData" />
    </template>
  </Modal>
</template>
