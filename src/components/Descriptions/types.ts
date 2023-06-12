import type { DescriptionsProps, DescriptionItemProps } from 'naive-ui';

export type DescItem = DescriptionItemProps & {
  path: string;
  show?: boolean | ((...arg: any) => boolean);
  // render
  render?: (
    val: any,
    data: Recordable,
  ) => VNode | undefined | JSX.Element | Element | string | number;
};

export interface DescriptionProps extends DescriptionsProps {
  schema: DescItem[];
  data: Recordable;
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void;
}

export type Register = (descInstance: DescInstance) => void;

export type UseDescReturnType = [Register, DescInstance];
