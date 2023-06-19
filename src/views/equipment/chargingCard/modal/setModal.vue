<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { addCard, setCard } from '@/api/modules/equipment/chargingCard';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    const hasData = Object.keys(data).length !== 0;
    setModalProps({ title: hasData ? '修改充电卡' : '新增充电卡' });
    if (hasData) {
      // wtf?? 为什么没有详情数据
      const compatible = {
        status: data.status?.type,
        verifyPassword: data.verifyPassword?.type,
        blackWhiteList: data.blackWhiteList?.type,
        type: data.type?.type,
      };

      await setPathsValue({ ...data, ...compatible });
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.id ? setCard(result) : addCard(result));
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal class="!w-200" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>
