<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import {
    addEquipmentInfo,
    updataEquipmentInfo,
    getEquipmentModelInfo,
  } from '@/api/modules/equipment/equipmentNumber';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas: schemas('set'),
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    const hasData = Object.keys(data).length !== 0;
    setModalProps({ title: hasData ? '修改设备编号' : '新增设备编号' });
    if (hasData) {
      const result = await getEquipmentModelInfo(data.id);
      setPathsValue(result);
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.id ? updataEquipmentInfo(result) : addEquipmentInfo(result));
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
