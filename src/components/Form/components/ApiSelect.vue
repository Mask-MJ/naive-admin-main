<script setup lang="ts">
  import type { SelectOption } from 'naive-ui';

  import { get, isArray, isFunction } from 'lodash-es';

  type Api = (
    arg?: Recordable,
  ) => Promise<{ total: number; totalPage: number; currentPage: number; data: SelectOption[] }>;

  const attrs = useAttrs();
  const emits = defineEmits(['optionsChange', 'update:value']);
  const props = defineProps({
    api: { type: Function as PropType<Api>, required: true },
    params: { type: Object as PropType<Recordable>, default: () => ({}) }, // 额外请求参数
    immediate: { type: Boolean, default: false }, // 是否立即请求
    disableArray: { type: Array, default: () => [] }, // 要禁用的选项
    queryField: { type: String, default: '' }, // 搜索字段
    resultField: { type: String, default: '' }, // 从返回结果中取出的字段
  });

  const loading = ref(false);
  const optionsRef = ref<SelectOption[]>([]);
  const totalRef = ref(1);

  const getBindValue = computed(() => {
    return { options: optionsRef.value, loading: loading.value, ...attrs };
  });

  const paramsRef = ref<Recordable>({ pageNum: 1, pageSize: 10, [props.queryField]: '' });

  const fetch = async () => {
    const api = props.api;
    if (!api || !isFunction(api)) return;
    try {
      loading.value = true;
      let result = await api({ ...unref(paramsRef), ...unref(props.params) });
      if (!result) return;
      totalRef.value = result.totalPage;

      if (!isArray(result)) {
        result = get(result, props.resultField) || [];
      }

      optionsRef.value.push(...(result as any));
      emits('optionsChange', unref(optionsRef));
    } catch (error) {
      console.warn(error);
    } finally {
      loading.value = false;
    }
  };

  const handleChange = (e: string) => {
    emits('update:value', e);
  };

  const handleSearch = (query: string) => {
    if (attrs.filterable && attrs.remote) {
      paramsRef.value[props.queryField] = query;
      handleReset();
      fetch();
    }
  };

  const handleReset = () => {
    paramsRef.value.pageNum = 1;
    optionsRef.value = [];
  };

  const handleScroll = (e: Event) => {
    const currentTarget = e.currentTarget as HTMLElement;
    if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
      if (paramsRef.value.pageNum >= totalRef.value) return;
      paramsRef.value.pageNum++;
      fetch();
    }
  };

  onMounted(() => {
    props.immediate && fetch();
  });
</script>

<template>
  <n-select
    v-bind="getBindValue"
    @update:value="handleChange"
    @search="handleSearch"
    @scroll="handleScroll"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </n-select>
</template>
