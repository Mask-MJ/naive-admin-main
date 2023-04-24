import type { GlobalThemeOverrides } from 'naive-ui';
import type { Theme } from '@/settings/theme';

import { defaultThemeSetting } from '@/settings/theme';
import { addColorAlpha, getColorPalette } from '@/utils';

type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error';
type ColorKey = `${ColorType}Color${ColorScene}`;
type ThemeColor = Partial<Record<ColorKey, string>>;
interface ColorAction {
  scene: ColorScene;
  handler: (color: string) => string;
}

function getThemeColors(colors: [ColorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: (color) => getColorPalette(color, 7) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) },
  ];

  const themeColor: ThemeColor = {};

  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color;
      const colorKey: ColorKey = `${colorType}Color${action.scene}`;
      themeColor[colorKey] = action.handler(colorValue);
    });
  });

  return themeColor;
}

export function initThemeSettings(): Theme {
  const info = defaultThemeSetting.isCustomizeInfoColor
    ? defaultThemeSetting.otherColor.info
    : getColorPalette(defaultThemeSetting.themeColor, 7);

  return {
    ...defaultThemeSetting,
    otherColor: { ...defaultThemeSetting.otherColor, info },
  };
}

/** 获取naive的主题颜色 */
export function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
  const { primary, success, warning, error } = colors;

  const info = defaultThemeSetting.isCustomizeInfoColor ? colors.info : getColorPalette(primary, 7);

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error],
  ]);

  const colorLoading = primary;

  return {
    common: {
      ...themeColors,
    },
    LoadingBar: {
      colorLoading,
    },
  };
}
