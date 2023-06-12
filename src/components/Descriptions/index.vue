<script setup lang="ts" name="Description">
  import type { DescItem, DescriptionProps, DescInstance } from './types';

  import { get, isFunction } from 'lodash-es';

  const attrs = useAttrs();
  const emits = defineEmits(['register']);
  const props = defineProps({
    schema: { type: Array as PropType<DescItem[]>, default: () => [] },
    data: { type: Object, default: () => {} },
    title: { type: String, default: '' },
    labelPlacement: { type: String, default: 'left' },
    bordered: { type: Boolean, default: false },
  });

  const propsRef = ref<Partial<DescriptionProps> | null>(null);

  const getMergeProps = computed(() => ({ ...props, ...unref(propsRef) } as DescriptionProps));
  const getDescriptionsProps = computed(
    () => ({ ...unref(attrs), ...unref(getMergeProps) } as DescriptionProps),
  );

  const getSchema = computed(() => {
    const { schema, data } = unref(getMergeProps);
    return schema.filter((item) => {
      const { show = true } = item;
      return isFunction(show) ? show(data) : show;
    });
  });

  const getItemProps = computed(() => (item: DescItem) => {
    const { span, label } = item;

    return { span, label };
  });

  const renderItem = computed(() => (item: DescItem) => {
    const { render, path } = item;
    const _data = unref(getMergeProps)?.data;
    if (!_data) return null;
    const getPath = get(_data, path);
    if (getPath && !toRefs(_data).hasOwnProperty(path)) {
      return isFunction(render) ? render('', _data) : '';
    }
    return isFunction(render) ? render(getPath, _data) : getPath ?? '';
  });

  const setDescProps = (descProps: Partial<DescriptionProps>) => {
    propsRef.value = { ...(unref(propsRef) as Recordable), ...descProps } as Recordable;
  };

  const methods: DescInstance = {
    setDescProps,
  };

  emits('register', methods);
</script>

<template>
  <NDescriptions v-bind="getDescriptionsProps">
    <n-descriptions-item v-for="item in getSchema" :key="item.path" v-bind="getItemProps(item)">
      <renderItem v-bind="item" />
    </n-descriptions-item>
  </NDescriptions>
</template>
