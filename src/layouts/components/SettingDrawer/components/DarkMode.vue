<script lang="ts" setup name="DarkMode">
  import SettingMenu from './SettingMenu.vue';

  const theme = useThemeStore();
</script>

<template>
  <n-divider title-placement="center"> 主题模式 </n-divider>
  <n-space vertical size="large">
    <SettingMenu label="深色主题">
      <n-switch :value="theme.darkMode" @update:value="theme.setDarkMode">
        <template #checked>
          <i class="text-14px text-primary icon-line-md:sunny-outline" />
        </template>
        <template #unchecked>
          <i class="text-14px text-primary icon-line-md:moon-filled" />
        </template>
      </n-switch>
    </SettingMenu>
    <SettingMenu label="跟随系统">
      <n-switch :value="theme.followSystemTheme" @update:value="theme.setFollowSystemTheme">
        <template #checked>
          <i class="text-14px text-primary icon-ant-design:stop-outlined" />
        </template>
        <template #unchecked>
          <i class="text-14px text-primary icon-ant-design:clock-circle-outlined" />
        </template>
      </n-switch>
    </SettingMenu>
  </n-space>
</template>

<style scoped>
  :deep(.n-switch__rail) {
    background-color: #000e1c !important;
  }
</style>
