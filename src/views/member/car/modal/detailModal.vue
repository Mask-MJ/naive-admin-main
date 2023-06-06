<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';
  import { useModalInner } from '@/components/Modal';
  import { DescItemSchemas } from './data';

  const detailData = ref();
  const imgList = computed(() => detailData.value?.imageUrl);
  const [registerModal] = useModalInner(async (data: CompanyList) => {
    detailData.value = data;
  });
</script>

<template>
  <Modal title="会员车辆详细信息" class="!w-200" positive-text="" @register="registerModal">
    <Descriptions class="mb-4" :schema="DescItemSchemas" :data="detailData" />
    <NDivider title-placement="left">车辆图片</NDivider>
    <template v-for="item in imgList" :key="item">
      <n-image :width="200" :src="item" preview-disabled />
    </template>
  </Modal>
</template>
