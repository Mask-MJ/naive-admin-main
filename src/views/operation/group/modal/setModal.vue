<script setup lang="ts">
  import type { RuleList } from '@/api/modules/operation/types/rule';
  import { useModalInner } from '@/components/Modal';
  import { schemas } from './data';
  import { useForm } from '@/components/Form';
  import { addGroup, setGroup } from '@/api/modules/operation/group';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 100,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data: RuleList) => {
    setModalProps({ title: data.id ? '修改计费规则' : '新增计费规则' });
    if (data.id) {
      await setPathsValue(data);
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.id ? setGroup(result) : await addGroup(result));
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
