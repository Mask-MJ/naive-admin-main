<script setup lang="ts">
  import type { AutoCompleteOption } from 'naive-ui';
  import { get, isArray, isFunction } from 'lodash-es';

  const attrs = useAttrs();
  const emits = defineEmits(['optionsChange', 'update:value']);
  const props = defineProps({
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<any>>,
    },
    params: { type: Object as PropType<Recordable>, default: () => ({}) },
    immediate: { type: Boolean, default: true },
    labelField: { type: String, default: '' },
    valueField: { type: String, default: '' },
    resultField: { type: String, default: '' },
    allOptions: { type: Boolean, default: false },
  });

  const optionsRef = ref<AutoCompleteOption[]>([]);
  const loading = ref(false);
  const isFirstLoad = ref(true);
  const value = ref('');
  const paramsValue = ref({ ...props.params, pageNum: 1, pageSize: props.allOptions ? 1000 : 10 });

  const getAttrs = computed(() => {
    return {
      ...(props.api ? { options: optionsRef.value } : {}),
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

      let result = await api({ ...unref(paramsValue), phoneNumber: value.value });
      if (!result) return;

      if (!isArray(result)) {
        result = get(result, props.resultField) || [];
      }

      optionsRef.value = result.map((item: any) => ({
        value: item[props.valueField] || item.id,
        label: item[props.labelField] || item.phoneNumber,
      }));

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

  function handleChange(e: string) {
    fetch();
    // 如果有传入 valueField, 则返回对应的值
    emits('update:value', e);
  }
</script>

<template>
  <n-auto-complete
    v-model:value="value"
    v-bind="getAttrs"
    @update:value="handleChange"
  ></n-auto-complete>
</template>

<style scoped></style>
