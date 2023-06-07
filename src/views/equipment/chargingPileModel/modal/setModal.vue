<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { addModel, setModel, getModel } from '@/api/modules/equipment/chargingPileModel';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    const hasData = Object.keys(data).length !== 0;
    setModalProps({ title: hasData ? '修改充电桩型号' : '新增充电桩型号' });
    if (hasData) {
      const result = await getModel(data.id);
      setPathsValue(result);
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.id ? setModel(result) : addModel(result));
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
