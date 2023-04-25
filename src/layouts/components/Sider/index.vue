<script setup lang="ts" name="LayoutSider">
  import BasicSider from './BasicSider/index.vue';
  import BasicMixSider from './BasicMixSider/index.vue';

  const theme = useThemeStore();
  const isVerticalMix = computed(() => theme.layout.mode === 'vertical-mix');
</script>

<template>
  <BasicMixSider v-if="isVerticalMix" class="sider" />
  <BasicSider v-else class="sider" />
</template>

<style lang="scss" scoped>
  .sider {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  }
</style>
