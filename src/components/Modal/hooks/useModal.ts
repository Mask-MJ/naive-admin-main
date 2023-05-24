import type {
  UseModalReturnType,
  ModalMethods,
  ReturnMethods,
  UseModalInnerReturnType,
} from '../type';

import { isProdMode } from '@/utils/env';
import { isEqual, isFunction } from 'lodash-es';
import { tryOnUnmounted } from '@vueuse/core';
import { ModalProps } from 'naive-ui';

const dataTransfer = reactive<any>({});

const visibleData = reactive<{ [key: number]: boolean }>({});

/**
 * @description: Applicable to independent modal and call outside
 */
export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');

  function register(modalMethod: ModalMethods, uuid = '') {
    uid.value = uuid;
    isProdMode() &&
      onUnmounted(() => {
        modal.value = null;
        loaded.value = false;
        dataTransfer[unref(uid)] = null;
      });
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return;

    modal.value = modalMethod;
    loaded.value = true;
    modalMethod.emitVisible = (show: boolean, uid: number) => {
      visibleData[uid] = show;
    };
  }

  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      console.error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props);
    },

    openModal: <T = any>(show = true, data = {} as T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        show: show,
      });

      // if (!data) return;
      const id = unref(uid);
      if (openOnSet) {
        dataTransfer[id] = null;
        dataTransfer[id] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
      if (!equal) {
        dataTransfer[id] = toRaw(data);
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ show: false });
    },
  };
  return [register, methods];
}

export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) {
      console.error('useModalInner instance is undefined!');
    }
    return instance;
  };

  const register = (modalInstance: ModalMethods, uuid = '') => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null;
      });
    uidRef.value = uuid;
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading });
      },

      changeOkLoading: (loading = true) => {
        getInstance()?.setModalProps({ positiveButtonProps: { loading } });
      },

      closeModal: () => {
        getInstance()?.setModalProps({ show: false });
      },

      setModalProps: (props: Partial<ModalProps>) => {
        getInstance()?.setModalProps(props);
      },
    },
  ];
};
