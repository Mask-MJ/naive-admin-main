<script lang="ts" setup name="ThemeMode">
  const theme = useThemeStore();
  function changeDark() {
    theme.setDarkMode(!theme.darkMode);
  }
</script>

<template>
  <hover-container class="w-40px" :inverted="theme.header.inverted" tooltip-content="主题模式">
    <dark-mode-switch :dark="theme.darkMode" class="wh-full" @update:dark="changeDark" />
  </hover-container>
</template>

<style scoped></style>
