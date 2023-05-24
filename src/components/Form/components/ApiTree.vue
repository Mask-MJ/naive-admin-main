<script setup lang="ts" name="ApiTree">
  import { get, isArray, isFunction } from 'lodash-es';

  const attrs = useAttrs();
  const emits = defineEmits(['update:checked-keys', 'optionsChange']);
  const props = defineProps({
    api: { type: Function as PropType<(arg?: Recordable) => Promise<Recordable>> },
    params: { type: Object },
    immediate: { type: Boolean, default: true },
    resultField: { type: String, default: '' },
    afterFetch: { type: Function as PropType<Fn> },
    defaultCheckedKeys: { type: Array as PropType<Array<string | number>> },
  });
  const treeData = ref<Recordable[]>([]);
  const isFirstLoaded = ref(false);
  const getAttrs = computed(() => {
    return { ...(props.api ? { data: unref(treeData) } : {}), ...attrs };
  });

  watch(
    () => props.params,
    () => {
      !unref(isFirstLoaded) && fetch();
    },
    { deep: true },
  );

  watch(
    () => props.immediate,
    (v) => {
      v && !isFirstLoaded.value && fetch();
    },
  );

  onMounted(() => {
    props.immediate && fetch();
  });

  async function fetch() {
    const { api, afterFetch } = props;
    if (!api || !isFunction(api)) return;
    treeData.value = [];
    let result;
    try {
      result = await api(props.params);
    } catch (e) {
      console.error(e);
    }
    if (afterFetch && isFunction(afterFetch)) {
      result = afterFetch(result);
    }
    if (!result) return;
    if (!isArray(result)) {
      result = get(result, props.resultField);
    }
    treeData.value = (result as Recordable[]) || [];
    isFirstLoaded.value = true;
    emits('optionsChange', treeData.value);
  }
</script>

<template>
  <n-tree v-bind="getAttrs">
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </n-tree>
</template>

<style scoped></style>
