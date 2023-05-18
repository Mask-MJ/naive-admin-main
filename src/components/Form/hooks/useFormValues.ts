import type { Ref, ComputedRef } from 'vue';
import type { BasicFormProps, FormSchema } from '../types/form';
import { unref } from 'vue';
import {
  isUndefined,
  isNull,
  cloneDeep,
  isObject,
  isArray,
  isFunction,
  isString,
  set,
  isNumber,
} from 'lodash-es';
import { dateUtil, formatToDate } from '@/utils/dateUtil';

interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  getProps: ComputedRef<BasicFormProps>;
  formModel: Recordable;
}

/**
 * @desription deconstruct array-link key. This method will mutate the target.
 */
function tryDeconstructArray(key: string, value: any, target: Recordable) {
  const pattern = /^\[(.+)\]$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = Array.isArray(value) ? value : [value];
      keys.forEach((k, index) => {
        set(target, k.trim(), value[index]);
      });
      return true;
    }
  }
}

/**
 * @desription deconstruct object-link key. This method will mutate the target.
 */
function tryDeconstructObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)\}$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = isObject(value) ? value : {};
      keys.forEach((k) => {
        set(target, k.trim(), value[k.trim()]);
      });
      return true;
    }
  }
}

export function useFormValues({
  defaultValueRef,
  getSchema,
  formModel,
  getProps,
}: UseFormValuesContext) {
  // Processing form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }
      const transformDateFunc = unref(getProps).transformDateFunc;
      if (isObject(value)) {
        value = transformDateFunc?.(value);
      }
      if (isArray(value) && isNumber(value[0]) && isNumber(value[1])) {
        value = value.map((item) => formatToDate(item));
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map((item) => transformDateFunc?.(item));
      }
      // Remove spaces
      if (isString(value)) {
        value = value.trim();
      }
      if (!tryDeconstructArray(key, value, res) && !tryDeconstructObject(key, value, res)) {
        // 没有解构成功的，按原样赋值
        set(res, key, value);
      }
    }
    return handleRangeTimeValue(res);
  }

  /**
   * @description: Processing time interval parameters
   */
  function handleRangeTimeValue(values: Recordable) {
    const pathMapToTime = unref(getProps).pathMapToTime;

    if (!pathMapToTime || !Array.isArray(pathMapToTime)) {
      return values;
    }

    for (const [path, [startTimeKey, endTimeKey], format = 'yyyy-MM-dd'] of pathMapToTime) {
      if (!path || !startTimeKey || !endTimeKey) {
        continue;
      }
      // If the value to be converted is empty, remove the path
      if (!values[path]) {
        Reflect.deleteProperty(values, path);
        continue;
      }

      const [startTime, endTime]: string[] = values[path];

      const [startTimeFormat, endTimeFormat] = Array.isArray(format) ? format : [format, format];

      values[startTimeKey] = dateUtil(startTime).format(startTimeFormat);
      values[endTimeKey] = dateUtil(endTime).format(endTimeFormat);
      Reflect.deleteProperty(values, path);
    }

    return values;
  }

  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach((item) => {
      const { defaultValue } = item;
      if (!(isUndefined(defaultValue) || isNull(defaultValue))) {
        obj[item.path] = defaultValue;
        if (formModel[item.path] === undefined) {
          formModel[item.path] = defaultValue;
        }
      }
    });
    defaultValueRef.value = cloneDeep(obj);
  }

  return { handleFormValues, initDefault };
}
