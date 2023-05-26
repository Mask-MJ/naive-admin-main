<script setup lang="ts">
  import type { UploadFileInfo } from 'naive-ui';
  import type { CropendResult, Cropper } from './typing';

  import { isFunction } from 'lodash-es';
  import { useModalInner } from '@/components/Modal';
  import { dataURLtoBlob } from '@/utils';
  import CropperImage from './Cropper.vue';

  type apiFunParams = { file: Blob; name: string; filename: string };

  const emits = defineEmits(['uploadSuccess', 'register']);
  const props = defineProps({
    circled: { type: Boolean, default: true },
    uploadApi: {
      type: Function as PropType<(params: apiFunParams) => Promise<any>>,
    },
  });

  const { t } = useI18n();
  let filename = '';
  const src = ref('');
  const previewSource = ref('');
  const cropper = ref<Cropper>();
  let scaleX = 1;
  let scaleY = 1;

  const toolbars = [
    {
      title: t('components.cropper.btn_reset'),
      icon: 'i-ant-design:reload-outlined',
      event: 'reset',
    },
    {
      title: t('components.cropper.btn_rotate_left'),
      icon: 'i-ant-design:rotate-left-outlined',
      event: 'rotate',
      arg: -45,
    },
    {
      title: t('components.cropper.btn_rotate_right'),
      icon: 'i-ant-design:rotate-right-outlined',
      event: 'rotate',
      arg: 45,
    },
    {
      title: t('components.cropper.btn_scale_x'),
      icon: 'i-ant-design:column-width-outlined',
      event: 'scaleX',
    },
    {
      title: t('components.cropper.btn_scale_y'),
      icon: 'i-ant-design:column-height-outlined',
      event: 'scaleY',
    },
    {
      title: t('components.cropper.btn_zoom_in'),
      icon: 'i-ant-design:zoom-in-outlined',
      event: 'zoom',
      arg: 0.1,
    },
    {
      title: t('components.cropper.btn_zoom_out'),
      icon: 'i-ant-design:zoom-out-outlined',
      event: 'zoom',
      arg: -0.1,
    },
  ];

  const [register, { closeModal, setModalProps }] = useModalInner();

  // Block upload
  function handleBeforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
    const reader = new FileReader();
    reader.readAsDataURL(data.file.file as File);
    src.value = '';
    previewSource.value = '';
    reader.onload = function (e) {
      src.value = (e.target?.result as string) ?? '';
      filename = data.file.name;
    };
    return false;
  }

  function handleCropend({ imgBase64 }: CropendResult) {
    previewSource.value = imgBase64;
  }

  function handleReady(cropperInstance: Cropper) {
    cropper.value = cropperInstance;
  }

  function handlerToolbar(event: string, _arg?: number) {
    if (event === 'scaleX') {
      scaleX = _arg = scaleX === -1 ? 1 : -1;
    }
    if (event === 'scaleY') {
      scaleY = _arg = scaleY === -1 ? 1 : -1;
    }
  }

  async function handleOk() {
    const uploadApi = props.uploadApi;
    if (uploadApi && isFunction(uploadApi)) {
      const blob = dataURLtoBlob(previewSource.value);
      try {
        setModalProps({ loading: true });
        const result = await uploadApi({ name: 'file', file: blob, filename });
        emits('uploadSuccess', { source: previewSource.value, data: result.data });
        closeModal();
      } finally {
        setModalProps({ loading: false });
      }
    }
  }
</script>

<template>
  <Modal
    class="!w-200"
    v-bind="$attrs"
    :title="t('components.cropper.modalTitle')"
    :can-fullscreen="false"
    :positive-text="t('components.cropper.okText')"
    @register="register"
    @positive-click="handleOk"
  >
    <div class="cropper-am">
      <div class="cropper-am-left">
        <div class="cropper-am-cropper">
          <CropperImage
            v-if="src"
            :src="src"
            height="300px"
            :circled="circled"
            @cropend="handleCropend"
            @ready="handleReady"
          />
        </div>

        <div class="cropper-am-toolbar">
          <span>
            <n-upload
              :show-file-list="false"
              :file-list="[]"
              accept="image/*"
              response-type="blob"
              @before-upload="handleBeforeUpload"
            >
              <n-tooltip placement="bottom">
                <template #trigger>
                  <n-button size="small" type="primary">
                    <template #icon>
                      <i class="i-ant-design:upload-outlined"></i>
                    </template>
                  </n-button>
                </template>
                <span>{{ t('components.cropper.selectImage') }}</span>
              </n-tooltip>
            </n-upload>
          </span>
          <n-space>
            <n-tooltip v-for="item in toolbars" :key="item.title" placement="bottom">
              <template #trigger>
                <n-button
                  type="primary"
                  size="small"
                  :disabled="!src"
                  @click="handlerToolbar(item.event, item.arg)"
                >
                  <template #icon> <i :class="item.icon"></i> </template>
                </n-button>
              </template>
              <span>{{ item.title }}</span>
            </n-tooltip>
          </n-space>
        </div>
      </div>
      <div class="cropper-am-right">
        <div class="cropper-am-preview">
          <img v-if="previewSource" :src="previewSource" :alt="t('components.cropper.preview')" />
        </div>
        <template v-if="previewSource">
          <div class="cropper-am-group">
            <n-avatar round :src="previewSource" size="large" />
            <n-avatar round :src="previewSource" :size="48" />
            <n-avatar round :src="previewSource" :size="64" />
            <n-avatar round :src="previewSource" :size="80" />
          </div>
        </template>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
  .cropper-am {
    display: flex;

    &-left,
    &-right {
      height: 340px;
    }

    &-left {
      width: 55%;
    }

    &-right {
      width: 45%;
    }

    &-cropper {
      height: 300px;
      background: #eee;
      background-image: linear-gradient(
          45deg,
          rgb(0 0 0 / 25%) 25%,
          transparent 0,
          transparent 75%,
          rgb(0 0 0 / 25%) 0
        ),
        linear-gradient(
          45deg,
          rgb(0 0 0 / 25%) 25%,
          transparent 0,
          transparent 75%,
          rgb(0 0 0 / 25%) 0
        );
      background-position: 0 0, 12px 12px;
      background-size: 24px 24px;
    }

    &-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    &-preview {
      width: 220px;
      height: 220px;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid #303030;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-group {
      display: flex;
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid #303030;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>
