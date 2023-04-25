<script lang="ts" setup name="BackTop">
  const { y: scrollY } = useScroll(window);
  const show = computed(() => scrollY.value > 180);
</script>

<template>
  <n-back-top :show="show" class="z-1000" />
</template>
