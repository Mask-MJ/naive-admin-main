import type { BasicFormProps, FormActionType, UseFormReturnType, FormSchema } from '../types';
import type { DynamicProps } from '#/utils';
import { ref, onUnmounted, unref, nextTick, watch } from 'vue';
import { isProdMode } from '@/utils/env';
import { getDynamicProps } from '@/utils';

type Props = Partial<DynamicProps<BasicFormProps>>;

export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const getForm = async () => {
    const form = unref(formRef);
    if (!form) {
      console.error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      );
    }
    await nextTick();
    return form as FormActionType;
  };

  const register = (instance: FormActionType) => {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null;
        loadedRef.value = null;
      });
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return;
    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      { immediate: true, deep: true },
    );
  };

  const methods: FormActionType = {
    setProps: async (formProps: Partial<BasicFormProps>) => {
      const form = await getForm();
      form.setProps(formProps);
    },

    updateSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form.updateSchema(data);
    },

    resetSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form.resetSchema(data);
    },

    restoreValidation: async () => {
      const form = await getForm();
      form.restoreValidation();
    },

    resetPaths: async () => {
      getForm().then(async (form) => {
        await form.resetPaths();
      });
    },

    removeSchemaByPath: async (paths: string | string[]) => {
      unref(formRef)?.removeSchemaByPath(paths);
    },

    // TODO promisify
    getPathsValue: <T>() => {
      return unref(formRef)?.getPathsValue() as T;
    },

    setPathsValue: async (values) => {
      const form = await getForm();
      form.setPathsValue(values);
    },

    appendSchemaByPath: async (schema: FormSchema, prefixPath?: string, first?: boolean) => {
      const form = await getForm();
      form.appendSchemaByPath(schema, prefixPath, first);
    },

    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },

    validate: async () => {
      const form = await getForm();
      return form.validate();
    },
  };

  return [register, methods];
}
