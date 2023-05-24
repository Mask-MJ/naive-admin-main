import type { ModalProps } from 'naive-ui';

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
}

// 弹窗外部方法
export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
  closeModal: () => void;
}

// 弹窗内部方法
export interface ReturnInnerMethods extends ModalMethods {
  closeModal: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
}

export type RegisterFn = (modalMethods: ModalMethods, uuid?: string) => void;
export type UseModalReturnType = [RegisterFn, ReturnMethods];
export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods];
