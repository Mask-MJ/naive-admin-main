import { modalProps } from 'naive-ui';
import { i18n } from '@/locales';

const { t } = i18n.global;

export const basicProps = {
  ...modalProps,
  negativeText: { type: String, default: t('components.modal.negativeText') },
  positiveText: { type: String, default: t('components.modal.positiveText') },
  preset: { type: String, default: 'dialog' },
  showIcon: { type: Boolean, default: false },
  height: { type: [String, Number], default: 500 },
  // closeFunc: Function as PropType<() => Promise<boolean>>,
};
