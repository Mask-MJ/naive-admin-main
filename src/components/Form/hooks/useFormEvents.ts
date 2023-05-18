import type { ComputedRef, Ref } from 'vue';
import type { BasicFormProps, FormSchema, FormActionType } from '../types';

import {
  isArray,
  isFunction,
  isObject,
  isEmpty,
  isString,
  isUndefined,
  isNull,
  merge,
  cloneDeep,
  uniqBy,
} from 'lodash-es';

interface UseFormActionContext {
  emits: EmitType;
  getProps: ComputedRef<BasicFormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  defaultValueRef: Ref<Recordable>;
  formElRef: Ref<FormActionType>;
  schemaRef: Ref<FormSchema[]>;
  handleFormValues: Fn;
}
export function useFormEvents({
  emits,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues,
}: UseFormActionContext) {
  // 重置表单值
  const resetPaths = async () => {
    const resetFunc = getProps.value.formAction.resetButtonOptions.resetFunc;
    const submitOnReset = getProps.value.formAction.submitButtonOptions.submitOnReset;
    // 如果有自定义重置函数 执行自定义重置函数
    resetFunc && isFunction(resetFunc) && (await resetFunc());
    // 遍历 formModel 把值置为 defaultValue 或 ''
    Object.keys(formModel).forEach((key) => {
      const schema = unref(getSchema).find((item) => item.path === key);
      const isInput = schema?.component && schema.component === 'NInput';
      const defaultValue = cloneDeep(defaultValueRef.value[key]);
      formModel[key] = isInput ? defaultValue || '' : defaultValue || null;
    });
    // 清空校验
    nextTick(() => restoreValidation());
    emits('reset', toRaw(formModel));
    // 如果有设置清空提交查询, 执行查询函数 (例如清空 Table 的筛选 form 重置 Table 数据)
    submitOnReset && handleSubmit();
  };
  // 表单提交
  const handleSubmit = async (e?: Event): Promise<void> => {
    e && e.preventDefault();
    const submitFunc = getProps.value.formAction.submitButtonOptions.submitFunc;
    // 如果有自定义提交函数 执行自定义提交函数
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(formElRef);
    if (!formEl) return;
    try {
      await validate();
      const res = handleFormValues(formModel);
      emits('submit', res);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  // 验证全部
  const validate = async () => await unref(formElRef).validate();
  // 还原到未校验的状态
  const restoreValidation = async () => unref(formElRef).restoreValidation();
  // 获取表单值
  const getPathsValue = (): Recordable => {
    const formEl = unref(formElRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  };
  // 设置 paths 的值
  const setPathsValue = async (values: Recordable) => {
    Object.keys(values).forEach((key) => {
      // 获取 path 对应的 schema
      const schema = unref(getSchema).find((item) => item.path === key);
      schema && (formModel[key] = values[key]);
    });
  };
  // 更新 schema
  const updateSchema = async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
    let updateData: Partial<FormSchema>[] = [];
    if (isObject(data)) {
      updateData.push(data as FormSchema);
    }
    if (isArray(data)) {
      updateData = [...data];
    }
    const hasPath = updateData.every(
      (item) => item.component === 'NDivider' || (Reflect.has(item, 'path') && item.path),
    );
    if (!hasPath) {
      console.error(
        'All children of the form Schema array that need to be updated must contain the `path` path',
      );
      return;
    }
    const schema: FormSchema[] = [];
    unref(getSchema).forEach((val) => {
      updateData.forEach((item) => {
        if (val.path === item.path) {
          const newSchema = merge(val, item);
          schema.push(newSchema as FormSchema);
        } else {
          schema.push(val);
        }
      });
    });
    _setDefaultValue(schema);

    schemaRef.value = uniqBy(schema, 'path');
  };

  const _setDefaultValue = (data: FormSchema | FormSchema[]) => {
    let schemas: FormSchema[] = [];
    if (isObject(data)) {
      schemas.push(data as FormSchema);
    }
    if (isArray(data)) {
      schemas = [...data];
    }

    const obj: Recordable = {};
    const currentPathsValue = getPathsValue();
    schemas.forEach((item) => {
      if (
        item.component != 'NDivider' &&
        Reflect.has(item, 'path') &&
        item.path &&
        !(isUndefined(item.defaultValue) || isNull(item.defaultValue)) &&
        (!(item.path in currentPathsValue) ||
          isUndefined(currentPathsValue[item.path]) ||
          isNull(currentPathsValue[item.path]) ||
          isEmpty(currentPathsValue[item.path]))
      ) {
        obj[item.path] = item.defaultValue;
      }
    });
    setPathsValue(obj);
  };

  // 重置 schema
  const resetSchema = async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
    let updateData: Partial<FormSchema>[] = [];
    if (isObject(data)) {
      updateData.push(data as FormSchema);
    }
    if (isArray(data)) {
      updateData = [...data];
    }

    const hasPath = updateData.every(
      (item) => item.component === 'NDivider' || (Reflect.has(item, 'path') && item.path),
    );
    if (!hasPath) {
      console.error(
        'All children of the form Schema array that need to be updated must contain the `path` path',
      );
      return;
    }
    schemaRef.value = data as FormSchema[];
  };
  // 在特定的 path 之前插入 schema
  const appendSchemaByPath = async (schema: FormSchema, prefixPath?: string, first = false) => {
    const schemaList: FormSchema[] = cloneDeep(unref(getSchema));
    // 获取要插入的下标
    const index = schemaList.findIndex((schema) => schema.path === prefixPath);
    if (!prefixPath || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(schema);
      schemaRef.value = schemaList;
      _setDefaultValue(schema);
      return;
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema);
    }
    _setDefaultValue(schema);
    schemaRef.value = schemaList;
  };
  // 根据 path 移除 schema
  const removeSchemaByPath = async (paths: string | string[]) => {
    const schemaList: FormSchema[] = cloneDeep(unref(getSchema));
    if (!paths) {
      return;
    }

    let pathList: string[] = isString(paths) ? [paths] : paths;
    if (isString(paths)) {
      pathList = [paths];
    }
    for (const path of pathList) {
      _removeSchemaByPath(path, schemaList);
    }
    schemaRef.value = schemaList;
  };

  const _removeSchemaByPath = (path: string, schemaList: FormSchema[]) => {
    if (isString(path)) {
      const index = schemaList.findIndex((schema) => schema.path === path);
      if (index !== -1) {
        delete formModel[path];
        schemaList.splice(index, 1);
      }
    }
  };

  return {
    resetPaths,
    handleSubmit,
    restoreValidation,
    validate,
    getPathsValue,
    updateSchema,
    resetSchema,
    appendSchemaByPath,
    removeSchemaByPath,
    setPathsValue,
  };
}
