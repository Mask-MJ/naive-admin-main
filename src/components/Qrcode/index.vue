<script setup lang="ts">
  import { toCanvas, QRCodeRenderersOptions, LogoType } from './qrcodePlus';
  import { toDataURL } from 'qrcode';
  import { downloadByUrl } from '@/utils';

  const emits = defineEmits(['done', 'error']);
  const props = defineProps({
    value: {
      type: [String, Array],
    },
    options: {
      type: Object as PropType<QRCodeRenderersOptions>,
    },
    width: {
      type: Number,
      default: 200,
    },
    logo: {
      type: [String, Object] as PropType<Partial<LogoType> | string>,
    },
    tag: {
      type: String as PropType<'canvas' | 'img'>,
      default: 'canvas',
      validator: (v: string) => ['canvas', 'img'].includes(v),
    },
  });

  const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null);
  async function createQrcode() {
    try {
      const { tag, value, options = {}, width, logo } = props;
      const renderValue = String(value);
      const wrapEl = unref(wrapRef);

      if (!wrapEl) return;

      if (tag === 'canvas') {
        const url: string = await toCanvas({
          canvas: wrapEl,
          width,
          logo: logo as any,
          content: renderValue,
          options: options || {},
        });
        emits('done', { url, ctx: (wrapEl as HTMLCanvasElement).getContext('2d') });
        return;
      }

      if (tag === 'img') {
        const url = await toDataURL(renderValue, {
          errorCorrectionLevel: 'H',
          width,
          ...options,
        });
        (unref(wrapRef) as HTMLImageElement).src = url;
        emits('done', { url });
      }
    } catch (error) {
      emits('error', error);
    }
  }
  /**
   * file download
   */
  function download(fileName?: string) {
    let url = '';
    const wrapEl = unref(wrapRef);
    if (wrapEl instanceof HTMLCanvasElement) {
      url = wrapEl.toDataURL();
    } else if (wrapEl instanceof HTMLImageElement) {
      url = wrapEl.src;
    }
    if (!url) return;
    downloadByUrl({
      url,
      fileName,
    });
  }

  onMounted(createQrcode);

  // 监听参数变化重新生成二维码
  watch(
    props,
    () => {
      createQrcode();
    },
    {
      deep: true,
    },
  );

  defineExpose({
    createQrcode,
    download,
  });
</script>

<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>

<style scoped></style>
