<script setup lang="ts">
  import type { UploadFileInfo } from 'naive-ui';
  import type { UploadFileParams } from '@/api/request/types';
  import { isArray } from 'lodash-es';
  import { PropType } from 'vue';

  const emits = defineEmits(['update:fileList']);
  const attrs = useAttrs();
  const props = defineProps({
    name: { type: String, default: '' },
    max: { type: Number },
    type: { type: Array, default: () => [] },
    api: {
      type: Function as PropType<(params: UploadFileParams) => Promise<any>>,
      default: () => {},
    },
    value: { type: [String, Array] as PropType<string | string[]>, default: () => [] },
  });

  const getFileList = computed((): UploadFileInfo[] => {
    if (isArray(props.value)) {
      return props.value.map((item) => ({ id: item, name: item, status: 'finished', url: item }));
    } else {
      return [{ id: props.value, name: props.value, status: 'finished', url: props.value }];
    }
  });

  const beforeUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
    if (props.type.length) {
      if (props.type.includes(data.file.file?.type)) {
        return true;
      } else {
        window.$message.error(`只能上传${props.type}格式的文件，请重新上传`);
        return false;
      }
    }
    return true;
  };

  const getBindValue = computed(() => ({ ...attrs, name: props.name, max: props.max }));

  const customRequest = async ({ file }: { file: UploadFileInfo }) => {
    try {
      if (file.status === 'removed') {
        emits('update:fileList', []);
      } else {
        const result = await props.api({ name: props.name, file: file.file });
        emits('update:fileList', [...props.value, result.data.data.url]);
        window.$message.success('上传成功');
      }
    } catch (error) {}
  };
</script>
<template>
  <n-upload
    v-bind="getBindValue"
    :file-list="getFileList"
    list-type="image-card"
    @before-upload="beforeUpload"
    @change="customRequest"
  />
</template>
