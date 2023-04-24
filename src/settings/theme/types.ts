import type {
  EnumThemeAnimateMode,
  EnumThemeHorizontalMenuPosition,
  EnumThemeLayoutMode,
  EnumThemeTabMode,
} from './theme';

/** 布局模式 */
export type ThemeLayoutMode = keyof typeof EnumThemeLayoutMode;
/** 多页签风格 */
export type ThemeTabMode = keyof typeof EnumThemeTabMode;
/** 水平模式的菜单位置 */
export type ThemeHorizontalMenuPosition = keyof typeof EnumThemeHorizontalMenuPosition;
/** 过渡动画 */
export type ThemeAnimateMode = keyof typeof EnumThemeAnimateMode;

/** 头部样式 */
export interface Header {
  /** 头部反转色 */
  inverted: boolean;
  /** 头部高度 */
  height: number;
  /** 面包屑样式 */
  crumb: {
    /** 面包屑可见 */
    visible: boolean;
    /** 显示图标 */
    showIcon: boolean;
  };
}
/** 全局头部属性 */
export interface HeaderProps {
  /** 显示logo */
  showLogo: boolean;
  /** 显示头部菜单 */
  showHeaderMenu: boolean;
  /** 显示菜单折叠按钮 */
  showMenuCollapse: boolean;
}

/** 标多页签样式 */
interface Tab {
  /** 多页签可见 */
  visible: boolean;
  /** 多页签高度 */
  height: number;
  /** 多页签风格 */
  mode: ThemeTabMode;
  /** 多页签风格列表 */
  modeList: {
    value: ThemeTabMode;
    label: EnumThemeTabMode;
  }[];
  /** 开启多页签缓存 */
  isCache: boolean;
}

/** 侧边栏样式 */
interface Sider {
  /** 侧边栏反转色 */
  inverted: boolean;
  /** 侧边栏宽度 */
  width: number;
  /** 侧边栏折叠时的宽度 */
  collapsedWidth: number;
  /** vertical-mix模式下侧边栏宽度 */
  mixWidth: number;
  /** vertical-mix模式下侧边栏折叠时的宽度 */
  mixCollapsedWidth: number;
  /** vertical-mix模式下侧边栏的子菜单的宽度 */
  mixChildMenuWidth: number;
}

/** 菜单样式 */
interface Menu {
  /** 水平模式的菜单的位置 */
  horizontalPosition: ThemeHorizontalMenuPosition;
  /** 水平模式的菜单的位置列表 */
  horizontalPositionList: {
    value: ThemeHorizontalMenuPosition;
    label: EnumThemeHorizontalMenuPosition;
  }[];
}

/** 底部样式 */
interface Footer {
  /** 是否固定底部 */
  fixed: boolean;
  /** 底部高度 */
  height: number;
  /* 底部是否可见 */
  visible: boolean;
}

/** 页面样式 */
interface Page {
  /** 页面是否开启动画 */
  animate: boolean;
  /** 动画类型 */
  animateMode: ThemeAnimateMode;
  /** 动画类型列表 */
  animateModeList: {
    value: ThemeAnimateMode;
    label: EnumThemeAnimateMode;
  }[];
}

/** 主题配置 */
export interface Theme {
  /** 暗黑模式 */
  darkMode: boolean;
  /** 是否自动跟随系统主题 */
  followSystemTheme: boolean;
  /** 布局样式 */
  layout: {
    /** 最小宽度 */
    minWidth: number;
    /** 布局模式 */
    mode: ThemeLayoutMode;
    /** 布局模式列表 */
    modeList: {
      value: ThemeLayoutMode;
      label: EnumThemeLayoutMode;
    }[];
  };
  /** 主题颜色 */
  themeColor: string;
  /** 主题颜色列表 */
  themeColorList: string[];
  /** 其他颜色 */
  otherColor: {
    /** 信息 */
    info: string;
    /** 成功 */
    success: string;
    /** 警告 */
    warning: string;
    /** 错误 */
    error: string;
  };
  /** 是否自定义info的颜色(默认取比主题色深一级的颜色) */
  isCustomizeInfoColor: boolean;
  /** 固定头部和多页签 */
  fixedHeaderAndTab: boolean;
  /** 显示重载按钮 */
  showReload: boolean;
  /** 头部样式 */
  header: Header;
  /** 标多页签样式 */
  tab: Tab;
  /** 侧边栏样式 */
  sider: Sider;
  /** 菜单样式 */
  menu: Menu;
  /** 底部样式 */
  footer: Footer;
  /** 页面样式 */
  page: Page;
}
