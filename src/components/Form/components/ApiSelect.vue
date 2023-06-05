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
  });

  const optionsRef = ref<SelectOption[]>([]);
  const loading = ref(false);
  const isFirstLoad = ref(true);

  const getAttrs = computed(() => {
    return {
      ...(props.api ? { options: optionsRef.value } : {}),
      loading: loading.value,
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
    try {
      loading.value = true;

      let result = await api({ ...unref(props.params), pageSize: props.allOptions ? 1000 : null });
      if (!result) return;

      if (!isArray(result)) {
        result = get(result, props.resultField) || [];
      }

      optionsRef.value = result as any;
      emitChange();
    } catch (error) {
      console.warn(error);
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    props.immediate && fetch();
  });

  function emitChange() {
    emits('optionsChange', unref(optionsRef));
  }

  function handleChange(...args: any) {
    emits('update:value', ...args);
  }
</script>

<template>
  <n-select v-bind="getAttrs" @update:value="handleChange">
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </n-select>
</template>
