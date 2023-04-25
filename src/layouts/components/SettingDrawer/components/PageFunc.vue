<script lang="ts" setup name="PageFunc">
  import SettingMenu from './SettingMenu.vue';

  const theme = useThemeStore();
  const tab = computed(() => theme.tab);
  const header = computed(() => theme.header);
  const menu = computed(() => theme.menu);
  const sider = computed(() => theme.sider);
  const footer = computed(() => theme.footer);
  const fixedHeaderAndTab = computed(() => theme.fixedHeaderAndTab);
</script>

<template>
  <n-divider title-placement="center"> 界面功能 </n-divider>
  <n-space vertical size="large">
    <SettingMenu label="侧边栏反转色">
      <n-switch :value="sider.inverted" @update:value="theme.setSiderInverted" />
    </SettingMenu>
    <SettingMenu label="头部反转色">
      <n-switch :value="header.inverted" @update:value="theme.setHeaderInverted" />
    </SettingMenu>
    <SettingMenu label="固定头部和多页签">
      <n-switch :value="fixedHeaderAndTab" @update:value="theme.setIsFixedHeaderAndTab" />
    </SettingMenu>
    <SettingMenu label="顶部菜单位置">
      <n-select
        class="w-120px"
        size="small"
        :value="menu.horizontalPosition"
        :options="menu.horizontalPositionList"
        @update:value="theme.setHorizontalMenuPosition"
      />
    </SettingMenu>
    <SettingMenu label="头部高度">
      <n-input-number
        class="w-120px"
        size="small"
        :value="header.height"
        :step="1"
        @update:value="theme.setHeaderHeight"
      />
    </SettingMenu>
    <SettingMenu label="多页签高度">
      <n-input-number
        class="w-120px"
        size="small"
        :value="tab.height"
        :step="1"
        @update:value="theme.setTabHeight"
      />
    </SettingMenu>
    <SettingMenu label="多页签缓存">
      <n-switch :value="tab.isCache" @update:value="theme.setTabIsCache" />
    </SettingMenu>
    <SettingMenu label="侧边栏展开宽度">
      <n-input-number
        class="w-120px"
        size="small"
        :value="sider.width"
        :step="10"
        @update:value="theme.setSiderWidth"
      />
    </SettingMenu>
    <SettingMenu label="左侧混合侧边栏展开宽度">
      <n-input-number
        class="w-120px"
        size="small"
        :value="sider.mixWidth"
        :step="5"
        @update:value="theme.setMixSiderWidth"
      />
    </SettingMenu>
    <SettingMenu label="固定底部">
      <n-switch :value="footer.fixed" @update:value="theme.setFooterIsFixed" />
    </SettingMenu>
    <SettingMenu label="显示底部">
      <n-switch :value="footer.visible" @update:value="theme.setFooterVisible" />
    </SettingMenu>
  </n-space>
</template>

<style scoped></style>
