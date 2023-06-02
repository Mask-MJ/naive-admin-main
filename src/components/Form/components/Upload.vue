<script setup lang="ts">
  import type { UploadFileInfo, UploadCustomRequestOptions } from 'naive-ui';
  import { isArray } from 'lodash-es';
  import { PropType } from 'vue';

  const emits = defineEmits(['update:fileList']);
  const attrs = useAttrs();
  const props = defineProps({
    name: { type: String, default: '' },
    max: { type: Number },
    type: { type: Array, default: () => [] },
    api: {
      type: Function as PropType<(params: UploadCustomRequestOptions) => Promise<any>>,
      default: () => {},
    },
    value: { type: [String, Array] as PropType<string | string[]>, default: '' },
  });

  const fileList = ref<UploadFileInfo[]>([]);

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

  const customRequest = async (params: UploadCustomRequestOptions) => {
    params.file.name = props.name;
    try {
      const result = await props.api(params);
      params.file.url = result.data.data.url;
      emits('update:fileList', params.file.url);
      window.$message.success('上传成功');
      params.onFinish();
    } catch (error) {
      params.onFinish();
    }
  };

  watch(
    () => props.value,
    () => {
      if (isArray(props.value)) {
        fileList.value = props.value.map((item: string) => ({
          id: item,
          name: item,
          status: 'finished',
          thumbnailUrl: item,
        }));
      } else if (props.value) {
        fileList.value.push({
          id: props.value,
          name: props.value,
          status: 'finished',
          thumbnailUrl: props.value,
        });
      }
    },
    { immediate: true, deep: true },
  );
</script>
<template>
  <n-upload
    v-bind="getBindValue"
    :default-file-list="fileList"
    list-type="image-card"
    :custom-request="customRequest"
    @before-upload="beforeUpload"
  />
</template>

<style scoped></style>
