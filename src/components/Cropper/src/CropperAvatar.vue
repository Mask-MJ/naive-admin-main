<script setup lang="ts" name="CropperAvatar">
  import type { CSSProperties } from 'vue';
  import type { ButtonProps } from 'naive-ui';

  import { useModal } from '@/components/Modal';
  import CopperModal from './CopperModal.vue';

  const { t } = useI18n();
  const emits = defineEmits(['update:value', 'change']);
  const props = defineProps({
    width: { type: [String, Number], default: '200px' },
    value: { type: String },
    showBtn: { type: Boolean, default: true },
    btnProps: { type: Object as PropType<ButtonProps> },
    btnText: { type: String, default: '' },
    uploadApi: { type: Function as any },
  });

  const sourceValue = ref(props.value || '');
  const [register, { openModal, closeModal }] = useModal();

  const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px');

  // const getIconWidth = computed(() => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px');

  const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));

  const getImageWrapperStyle = computed(
    (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }),
  );

  watchEffect(() => {
    sourceValue.value = props.value || '';
  });

  watch(
    () => sourceValue.value,
    (v: string) => {
      emits('update:value', v);
    },
  );

  function handleUploadSuccess({ source }: any) {
    sourceValue.value = source;
    emits('change', source);
    window.$message.success(t('components.cropper.uploadSuccess'));
  }

  defineExpose({ openModal: openModal.bind(null, true), closeModal });
</script>

<template>
  <div class="cropper-avatar" :style="getStyle">
    <div class="cropper-avatar-image-wrapper" :style="getImageWrapperStyle" @click="openModal">
      <div class="cropper-avatar-image-mask" :style="getImageWrapperStyle">
        <i class="i-ant-design:cloud-upload-outlined" :style="getImageWrapperStyle"></i>
      </div>
      <img v-if="sourceValue" :src="sourceValue" alt="avatar" />
    </div>
    <n-button v-if="showBtn" class="cropper-avatar-upload-btn" v-bind="btnProps" @click="openModal">
      {{ btnText ? btnText : t('components.cropper.selectImage') }}
    </n-button>

    <CopperModal
      :upload-api="uploadApi"
      :src="sourceValue"
      @register="register"
      @upload-success="handleUploadSuccess"
    />
  </div>
</template>

<style lang="scss" scoped>
  .cropper-avatar {
    display: inline-block;
    text-align: center;

    &-image-wrapper {
      overflow: hidden;
      cursor: pointer;
      background: #151515;
      border: 1px solid #646363;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    &-image-mask {
      opacity: 0%;
      position: absolute;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      border: inherit;
      background: rgb(0 0 0 / 40%);
      cursor: pointer;
      transition: opacity 0.4s;

      i {
        color: #d6d6d6;
      }

      ::v-deep(svg) {
        margin: auto;
      }
    }

    &-image-mask:hover {
      opacity: 4000%;
    }

    &-upload-btn {
      margin: 10px auto;
    }
  }
</style>
