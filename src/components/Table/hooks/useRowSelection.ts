import type { RowKey } from 'naive-ui/es/data-table/src/interface';
import type { BasicTableProps } from '../types';

export function useRowSelection(propsRef: ComputedRef<BasicTableProps>) {
  // 选中行的key checkedRowKeys 优先,没有的话就用 defaultCheckedRowKeys
  const checkedRowKeysRef = ref<RowKey[]>(
    propsRef.value.checkedRowKeys || propsRef.value.defaultCheckedRowKeys || [],
  );

  // 获取选中的keys
  const getSelectedRowKeys = () => unref(checkedRowKeysRef);
  // 设置选中的keys
  const setSelectedRowKeys = (rowKeys: RowKey[]) => {
    checkedRowKeysRef.value = rowKeys;
  };
  // 清空选中的keys
  const clearSelectedRowKeys = () => {
    checkedRowKeysRef.value = [];
  };
  // 获取选中的数据
  const getSelectedRows = () => {
    const data = propsRef.value.data || [];
    const rowKey = (propsRef.value.rowKey || 'id') as string;
    return data.filter((item) => checkedRowKeysRef.value.includes(item[rowKey]));
  };

  return {
    checkedRowKeysRef,
    getSelectedRows,
    getSelectedRowKeys,
    setSelectedRowKeys,
    clearSelectedRowKeys,
  };
}
