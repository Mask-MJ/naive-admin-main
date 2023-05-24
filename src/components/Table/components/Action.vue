<script lang="ts" setup>
  import type { DropdownProps } from 'naive-ui';
  import { NTooltip, NButton, NPopconfirm } from 'naive-ui';
  import { isBoolean, isFunction } from 'lodash-es';
  import { ActionItem, DropdownItem } from '../types';

  const props = defineProps({
    actions: { type: Array as PropType<ActionItem[]>, default: () => [] },
    dropDownActions: { type: Array as PropType<DropdownItem[]>, default: () => [] },
    divider: { type: Boolean, default: false },
    stopButtonPropagation: { type: Boolean, default: true },
  });

  function isIfShow(action: ActionItem): boolean {
    const ifShow = action.ifShow;

    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(action);
    }
    return isIfShow;
  }

  const getDropDownProps = computed((): DropdownProps => {
    const options = props.dropDownActions.map((item) => ({
      ...item,
      icon: () => h('i', { class: item.props?.icon }),
    }));
    return { trigger: 'click', options };
  });
  const getActions = computed(() => {
    return (toRaw(props.actions) || []).filter((action) => {
      // 权限过滤 hasPermission(action.auth)
      return isIfShow(action);
    });
  });

  function onCellClick(e: MouseEvent) {
    if (!props.stopButtonPropagation) return;
    const path = e.composedPath() as HTMLElement[];
    const isInButton = path.find((ele) => {
      return ele.tagName?.toUpperCase() === 'BUTTON';
    });
    isInButton && e.stopPropagation();
  }

  const RenderTooltip = (action: ActionItem) => {
    const { tooltipProps } = action;
    if (tooltipProps) {
      return h(NTooltip, tooltipProps, {
        trigger: () => renderPopconfirm(action),
        default: () => tooltipProps.content,
      });
    } else {
      return renderPopconfirm(action);
    }
  };

  const renderPopconfirm = (action: ActionItem) => {
    const { popConfirmProps } = action;
    return Object.keys(popConfirmProps || {}).length > 0
      ? h(NPopconfirm, popConfirmProps, {
          trigger: () => renderButton(action),
          default: () => popConfirmProps?.content ?? '是否确认删除',
        })
      : renderButton(action);
  };

  const renderButton = (action: ActionItem) => {
    const { icon, label, buttonProps } = action;
    return h(NButton, { size: 'small', ...buttonProps }, () => [
      icon && h('i', { class: [icon, !!label && 'mr-1'] }),
      label && h('span', label),
    ]);
  };
</script>
<template>
  <div @click="onCellClick">
    <n-space>
      <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
        <RenderTooltip v-bind="action" />
        <n-divider v-if="divider && index < getActions.length - 1" vertical />
      </template>
      <n-dropdown v-if="dropDownActions.length > 0" v-bind="getDropDownProps">
        <NButton quaternary size="small">
          <i class="i-carbon:overflow-menu-horizontal"></i>
        </NButton>
      </n-dropdown>
    </n-space>
  </div>
</template>
