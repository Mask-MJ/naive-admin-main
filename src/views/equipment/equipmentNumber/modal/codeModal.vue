<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { QrCodeActionType } from '@/components/Qrcode/typing';

  const qrCodeUrl = ref<string>();
  const qrRef = ref<Nullable<QrCodeActionType>>(null);
  const [registerModal, { closeModal }] = useModalInner((data) => {
    qrCodeUrl.value = data.code;
  });

  const onQrcodeDone = ({ ctx }: any) => {
    if (ctx instanceof CanvasRenderingContext2D) {
      ctx.fillStyle = 'black';
      ctx.font = '18px "微软雅黑"';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.fillText(qrCodeUrl.value as string, 200, 380, 200);
    }
  };

  const handleSubmit = async () => {
    const qrEl = unref(qrRef);
    if (!qrEl) return;
    qrEl.download('设备编号:' + qrCodeUrl.value);
    closeModal();
  };
</script>

<template>
  <Modal
    title="设备二维码"
    positive-text="下载二维码"
    @register="registerModal"
    @positive-click="handleSubmit"
  >
    <Qrcode ref="qrRef" :value="qrCodeUrl" :width="400" @done="onQrcodeDone" />
  </Modal>
</template>
