import { computed } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import type { HeaderProps, ThemeLayoutMode } from '@/settings/theme';

type LayoutMode = 'vertical' | 'horizontal';
type LayoutHeaderProps = Record<ThemeLayoutMode, HeaderProps>;

export function useBasicLayout() {
  const app = useAppStore();
  const theme = useThemeStore();
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const layoutMode = computed(() => theme.layout.mode);

  const mode = computed(() => {
    const vertical: LayoutMode = 'vertical';
    const horizontal: LayoutMode = 'horizontal';
    return layoutMode.value.includes(vertical) ? vertical : horizontal;
  });

  const isMobile = breakpoints.smaller('sm');

  const layoutHeaderProps: LayoutHeaderProps = {
    vertical: {
      showLogo: false,
      showHeaderMenu: false,
      showMenuCollapse: true,
    },
    'vertical-mix': {
      showLogo: false,
      showHeaderMenu: false,
      showMenuCollapse: false,
    },
    horizontal: {
      showLogo: true,
      showHeaderMenu: true,
      showMenuCollapse: false,
    },
    'horizontal-mix': {
      showLogo: true,
      showHeaderMenu: false,
      showMenuCollapse: true,
    },
  };

  const headerProps = computed(() => layoutHeaderProps[layoutMode.value]);

  const siderVisible = computed(() => layoutMode.value !== 'horizontal');
  const siderWidth = computed(() => {
    const { width, mixWidth, mixChildMenuWidth } = theme.sider;
    const isVerticalMix = layoutMode.value === 'vertical-mix';
    let w = isVerticalMix ? mixWidth : width;
    if (isVerticalMix && app.mixSiderFixed) w += mixChildMenuWidth;

    return w;
  });
  const siderCollapsedWidth = computed(() => {
    const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = theme.sider;
    const isVerticalMix = layoutMode.value === 'vertical-mix';
    let w = isVerticalMix ? mixCollapsedWidth : collapsedWidth;
    if (isVerticalMix && app.mixSiderFixed) w += mixChildMenuWidth;

    return w;
  });

  return {
    mode,
    isMobile,
    headerProps,
    siderVisible,
    siderWidth,
    siderCollapsedWidth,
  };
}
