<script lang="ts" setup name="FullScreen">
  const { isFullscreen, toggle } = useFullscreen();
  const theme = useThemeStore();
</script>

<template>
  <hover-container
    class="w-40px h-full"
    tooltip-content="全屏"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <i v-if="isFullscreen" class="text-18px i-carbon:minimize" />
    <i v-else class="text-18px i-carbon:maximize" />
  </hover-container>
</template>
