<script setup lang="ts">
  import { useECharts } from '@/hooks/useECharts';

  const props = defineProps({
    option: { type: Object, default: () => ({}) },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props,
    () => {
      setOptions(props.option);
    },
    { immediate: true, deep: true },
  );
</script>

<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<style scoped></style>
