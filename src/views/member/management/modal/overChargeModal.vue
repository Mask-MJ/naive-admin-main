<script setup lang="ts">
  import type { List } from '@/api/modules/member/types/management';
  import { useModalInner } from '@/components/Modal';
  import { orderSchemas } from './data';
  import { useForm } from '@/components/Form';
  import { getOverCharge, addOverCharge, updateOverCharge } from '@/api/modules/member/management';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 100,
    schemas: orderSchemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data: List) => {
    const result = await getOverCharge(data.id);
    setModalProps({ title: result ? '修改多充设置' : '新增多充设置' });
    await setPathsValue(result);
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      result.id ? await updateOverCharge(result) : await addOverCharge(result);
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>
