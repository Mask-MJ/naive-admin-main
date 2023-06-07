<script setup lang="ts">
  import type { CouponList } from '@/api/modules/member/types/memberCoupon';
  import { useModalInner } from '@/components/Modal';
  import { schema } from './data';

  const detailData = ref();
  const [registerModal] = useModalInner(async (data: CouponList) => {
    detailData.value = data;
  });
</script>

<template>
  <Modal title="会员详细信息" class="!w-250" positive-text="" @register="registerModal">
    <Descriptions class="mb-4" :schema="schema" :data="detailData" />
  </Modal>
</template>
