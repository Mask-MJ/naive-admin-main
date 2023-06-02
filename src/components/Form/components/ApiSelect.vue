<script setup lang="ts" name="ApiSelect">
  import type { PropType } from 'vue';
  import type { SelectOption } from 'naive-ui';

  import { get, isArray, isFunction } from 'lodash-es';

  const attrs = useAttrs();
  const emits = defineEmits(['optionsChange', 'update:value']);
  const props = defineProps({
    api: {
      type: Function as PropType<
        (arg?: Recordable) => Promise<{ total: number; data: SelectOption[] }>
      >,
    },
    params: { type: Object as PropType<Recordable>, default: () => ({}) },
    immediate: { type: Boolean, default: true },
    disableArray: { type: Array, default: () => [] },
    resultField: { type: String, default: '' },
    allOptions: { type: Boolean, default: false },
    isScroll: { type: Boolean, default: false },
  });

  const optionsRef = ref<SelectOption[]>([]);
  const loading = ref(false);
  const isFirstLoad = ref(true);
  const currentPage = ref(1);
  const totalPage = ref(1);

  const getParams = computed(() => {
    return {
      ...props.params,
      pageNum: props.isScroll ? currentPage.value : null,
    };
  });

  const getAttrs = computed(() => {
    return {
      ...(props.api ? { options: optionsRef.value } : {}),
      loading: loading.value,
      resetMenuOnOptionsChange: !props.isScroll,
      ...attrs,
    };
  });

  watch(
    () => props.params,
    () => {
      optionsRef.value = [];
      !unref(isFirstLoad) && fetch();
    },
    { deep: true },
  );

  async function fetch() {
    const api = props.api;
    if (!api || !isFunction(api)) return;
    let result;
    try {
      loading.value = true;
      result = await api(getParams.value);
      if (!result) return;
      if (props.isScroll) {
        totalPage.value = result.total;
      }
      if (!isArray(result)) {
        result.data = get(result, props.resultField) || [];
      }

      optionsRef.value = props.isScroll ? optionsRef.value.concat(result.data) : result.data;
      emitChange();
      if (props.allOptions && currentPage.value < totalPage.value) {
        currentPage.value++;
        await fetch();
      }
    } catch (error) {
      console.warn(error);
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    props.immediate && fetch();
  });

  const handleScroll = (e: Event) => {
    const currentTarget = e.currentTarget as HTMLElement;
    if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
      if (currentPage.value < totalPage.value) {
        currentPage.value++;
        fetch();
      }
    }
  };

  function emitChange() {
    emits('optionsChange', unref(optionsRef));
  }

  function handleChange(...args: any) {
    emits('update:value', ...args);
  }
</script>

<template>
  <n-select v-bind="getAttrs" @update:value="handleChange" @scroll="handleScroll">
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </n-select>
</template>

<style scoped></style>
