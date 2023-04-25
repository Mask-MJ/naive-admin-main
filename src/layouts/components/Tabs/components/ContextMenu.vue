<script setup lang="ts" name="ContextMenu">
  import type { DropdownOption } from 'naive-ui';

  interface Props {
    /** 右键菜单可见性 */
    visible?: boolean;
    /** 当前路由路径 */
    currentPath?: string;
    /** 是否固定在tab卡不可关闭  */
    affix?: boolean;
    /** 鼠标x坐标 */
    x: number;
    /** 鼠标y坐标 */
    y: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
    currentPath: '',
  });

  const emit = defineEmits<Emits>();

  interface Emits {
    (e: 'update:visible', visible: boolean): void;
  }

  const app = useAppStore();
  const tab = useMultipleTabStore();

  const dropdownVisible = computed({
    get() {
      return props.visible;
    },
    set(visible: boolean) {
      emit('update:visible', visible);
    },
  });

  function hide() {
    dropdownVisible.value = false;
  }

  type DropdownKey =
    | 'reload-current'
    | 'close-current'
    | 'close-other'
    | 'close-left'
    | 'close-right'
    | 'close-all';
  type Option = DropdownOption & {
    key: DropdownKey;
  };

  const options = computed<Option[]>(() => [
    {
      label: '重新加载',
      key: 'reload-current',
      disabled: props.currentPath !== tab.activeTab,
      icon: () => h('i', { class: 'icon-carbon:renew' }),
    },
    {
      label: '关闭',
      key: 'close-current',
      disabled: props.currentPath === tab.homeTab.fullPath || Boolean(props.affix),
      icon: () => h('i', { class: 'icon-carbon:close' }),
    },
    {
      label: '关闭其他',
      key: 'close-other',
      icon: () => h('i', { class: 'icon-carbon:column-delete' }),
    },
    {
      label: '关闭左侧',
      key: 'close-left',
      icon: () => h('i', { class: 'icon-carbon:arrow-left' }),
    },
    {
      label: '关闭右侧',
      key: 'close-right',
      icon: () => h('i', { class: 'icon-carbon:arrow-right' }),
    },
    {
      label: '关闭所有',
      key: 'close-all',
      icon: () => h('i', { class: 'icon-ant-design:line-outlined' }),
    },
  ]);

  const actionMap = new Map<DropdownKey, () => void>([
    [
      'reload-current',
      () => {
        app.reloadPage();
      },
    ],
    [
      'close-current',
      () => {
        tab.removeTab(props.currentPath);
      },
    ],
    [
      'close-other',
      () => {
        tab.clearTab([props.currentPath]);
      },
    ],
    [
      'close-left',
      () => {
        tab.clearLeftTab(props.currentPath);
      },
    ],
    [
      'close-right',
      () => {
        tab.clearRightTab(props.currentPath);
      },
    ],
    [
      'close-all',
      () => {
        tab.clearAllTab();
      },
    ],
  ]);

  function handleDropdown(optionKey: string) {
    const key = optionKey as DropdownKey;
    const actionFunc = actionMap.get(key);
    if (actionFunc) actionFunc();

    hide();
  }
</script>

<template>
  <n-dropdown
    :show="dropdownVisible"
    :options="options"
    placement="bottom-start"
    :x="x"
    :y="y"
    @clickoutside="hide"
    @select="handleDropdown"
  />
</template>

<style scoped></style>
