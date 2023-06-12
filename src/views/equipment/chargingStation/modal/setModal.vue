<script setup lang="ts">
  import type { StationList } from '@/api/modules/equipment/types/chargingStation';
  import { useModalInner } from '@/components/Modal';
  import { schemas, registerMapModal } from './data';
  import { useForm } from '@/components/Form';
  import { getStation, addStation, setStation } from '@/api/modules/equipment/chargingStation';
  import mapModal from './mapModal.vue';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 100,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(
    async (data: StationList) => {
      setModalProps({ title: data.id ? '修改充电站' : '新增充电站' });
      if (data.id) {
        const result = await getStation(data.id);
        await setPathsValue(result);
      }
    },
  );

  const handleSuccess = (e: any) => {
    if (!e) return;
    setPathsValue({
      province: e.addressComponents.province,
      city: e.addressComponents.city,
      district: e.addressComponents.district,
      address: e.address,
      latitude: e.point.lat,
      longitude: e.point.lng,
    });
  };

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.id ? setStation(result) : await addStation(result));
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal class="!w-250" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
  <mapModal @register="registerMapModal" @success="handleSuccess" />
</template>
