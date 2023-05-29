<script setup lang="ts">
  import type { List } from '@/api/modules/member/types/management';
  import { useModalInner } from '@/components/Modal';
  import { schemas } from './data';
  import { useForm } from '@/components/Form';
  import { recharge } from '@/api/modules/member/management';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 100,
    schemas,
  });

  const [registerModal, { closeModal }] = useModalInner(async (data: List) => {
    await setPathsValue(data);
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      recharge({ userId: result.id, ...result });
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal title="充值" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>
