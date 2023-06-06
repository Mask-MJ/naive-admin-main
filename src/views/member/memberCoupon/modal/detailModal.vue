<script setup lang="ts">
  import type { CouponList } from '@/api/modules/member/types/memberCoupon';
  import { useModalInner } from '@/components/Modal';
  import { memberInfoSchemas, couponSchemas } from './data';

  const detailData = ref();
  const [registerModal] = useModalInner(async (data: CouponList) => {
    detailData.value = data;
  });
</script>

<template>
  <Modal title="优惠券详情" class="!w-200" positive-text="" @register="registerModal">
    <NDivider title-placement="left">会员信息</NDivider>
    <Descriptions class="mb-4" :schema="memberInfoSchemas" :data="detailData" />
    <NDivider title-placement="left">优惠券信息</NDivider>
    <Descriptions class="mb-4" :schema="couponSchemas" :data="detailData" />
  </Modal>
</template>
