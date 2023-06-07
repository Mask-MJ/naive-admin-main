<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { addBrand, setBrand } from '@/api/modules/equipment/chargingPileBrand';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    const hasData = Object.keys(data).length !== 0;
    setModalProps({ title: hasData ? '修改充电桩品牌' : '新增充电桩品牌' });
    hasData && (await setPathsValue(data));
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.id ? setBrand(result) : addBrand(result));
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
