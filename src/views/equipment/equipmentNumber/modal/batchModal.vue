<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { generateEquipmentNumber } from '@/api/modules/equipment/equipmentNumber';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue }] = useForm({
    labelWidth: 80,
    schemas: schemas('batch'),
  });

  const [registerModal, { closeModal }] = useModalInner(async () => {});

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await generateEquipmentNumber(result);
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal title="批量生成设备编号" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>
