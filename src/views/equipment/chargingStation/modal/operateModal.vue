<script setup lang="ts">
  import type { RuleList } from '@/api/modules/operation/types/rule';

  import { omitBy } from 'lodash-es';
  import { useForm } from '@/components/Form';
  import { useModalInner } from '@/components/Modal';
  import { schemas } from './operateData';
  import { getOperateSetting, operateSetting } from '@/api/modules/equipment/chargingStation';

  const emits = defineEmits(['success', 'register']);
  const [registerModal, { closeModal }] = useModalInner(async (data: RuleList) => {
    if (data.id) {
      const result = await getOperateSetting(data.id);
      await setPathsValue(omitBy(result, (item) => item === null));
    }
  });

  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    schemas,
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      operateSetting(result);
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal
    title="充电站运营设置"
    class="!w-150"
    @register="registerModal"
    @positive-click="handleSubmit"
  >
    <Form @register="registerForm" />
  </Modal>
</template>
