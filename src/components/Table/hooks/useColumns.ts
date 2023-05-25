import type { ComputedRef } from 'vue';
import type { PaginationProps } from 'naive-ui';
import type { BasicTableProps, BasicColumn, GetColumnsParams } from '../types';

import { isArray, isBoolean, isFunction, isString, cloneDeep, isEqual } from 'lodash-es';
import { i18n } from '@/locales';

import { DEFAULT_ALIGN, PAGE_SIZE } from '../constants';
// 处理传入的column  默认居中 添加ellipsis
function handleItem(item: BasicColumn, ellipsis: boolean | object) {
  const { children } = item;
  item.align = item.align || DEFAULT_ALIGN;
  if (ellipsis) {
    Object.assign(item, { ellipsis });
  }
  if (children && children.length) {
    handleChildren(children, !!ellipsis);
  }
}
// 如果是 tree 结构，需要处理 children
function handleChildren(children: BasicColumn[] | undefined, ellipsis: boolean) {
  if (!children) return;
  children.forEach((item) => {
    const { children } = item;
    handleItem(item, ellipsis);
    handleChildren(children, ellipsis);
  });
}
// 添加序号 固定在左侧首位
function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  getPagination: () => boolean | PaginationProps,
  columns: BasicColumn[],
) {
  const { t } = i18n.global;
  const { showIndexColumn } = unref(propsRef);

  let pushIndexColumns = false;
  columns.forEach(() => {
    const indIndex = columns.findIndex((column) => column.flag === 'INDEX');
    if (showIndexColumn) {
      pushIndexColumns = indIndex === -1;
    } else if (!showIndexColumn && indIndex !== -1) {
      columns.splice(indIndex, 1);
    }
  });

  if (!pushIndexColumns) return;

  const isFixedLeft = columns.some((item) => item.fixed === 'left');
  const index: BasicColumn = {
    flag: 'INDEX',
    key: 'INDEX',
    width: 50,
    title: t('components.table.index'),
    align: 'center',
    render: (_rowData, rowIndex) => {
      const getPaginationInfo = getPagination();
      if (isBoolean(getPaginationInfo)) {
        return `${rowIndex + 1}`;
      } else {
        const { page = 1, pageSize = PAGE_SIZE } = getPaginationInfo;
        return ((page < 1 ? 1 : page) - 1) * pageSize + rowIndex + 1;
      }
    },
    ...(isFixedLeft ? { fixed: 'left' } : {}),
  };
  columns.unshift(index);
}
// 添加操作栏 固定在右侧
function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
  const { actionColumn } = unref(propsRef);
  if (!actionColumn) return;

  const hasIndex = columns.findIndex((column) => column.flag === 'ACTION');
  if (hasIndex === -1) {
    columns.push({
      title: '操作',
      fixed: 'right',
      ...actionColumn,
      flag: 'ACTION',
    } as BasicColumn);
  }
}
// 导出处理columns的函数
export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPagination: () => boolean | PaginationProps,
) {
  const columnsRef = ref(unref(propsRef).columns);
  // 单独保存一份数据做复原
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    handleIndexColumn(propsRef, getPagination, columns);
    handleActionColumn(propsRef, columns);
    if (!columns) return [];
    const { ellipsis } = unref(propsRef);
    columns.forEach((item) => {
      handleItem(item, item.ellipsis ?? ellipsis);
    });
    return columns;
  });
  // 判断是否显示
  function isIfShow(column: BasicColumn): boolean {
    const ifShow = column.ifShow;

    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(column);
    }
    return isIfShow;
  }
  // 获取展示的columns
  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));

    const columns = cloneDeep(viewColumns);
    return columns.filter((column) => isIfShow(column));
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns?.filter((item) => !item.type) ?? [];
    },
  );

  const setCacheColumnsByField = (key: string | undefined, value: Partial<BasicColumn>) => {
    if (!key || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.key === key) {
        Object.assign(item, value);
        return;
      }
    });
  };

  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(columnList: Partial<BasicColumn>[] | (string | string[])[]) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (columns.length <= 0) {
      columnsRef.value = [];
      return;
    }

    const firstColumn = columns[0];
    const cacheKeys = cacheColumns.map((item) => item.key);

    if (!isString(firstColumn) && !isArray(firstColumn)) {
      columnsRef.value = columns as BasicColumn[];
    } else {
      const columnKeys = (columns as (string | string[])[]).map((m) => m.toString());
      const newColumns: BasicColumn[] = [];
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          defaultHidden: !columnKeys.includes(item.key.toString()),
        });
      });
      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return columnKeys.indexOf(prev.key.toString()) - columnKeys.indexOf(next.key.toString());
        });
      }
      columnsRef.value = newColumns;
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction } = opt || {};
    let columns = toRaw(unref(getColumnsRef));
    if (ignoreIndex) {
      columns = columns.filter((item) => item.key !== 'index');
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.key !== 'action');
    }

    return columns;
  }

  function getCacheColumns() {
    return cacheColumns;
  }

  return {
    getViewColumns,
    getColumnsRef,
    getColumns,
    setColumns,
    getCacheColumns,
    setCacheColumnsByField,
  };
}

function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = [];
  const fixedRightColumns: BasicColumn[] = [];
  const defColumns: BasicColumn[] = [];
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column);
      continue;
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column);
      continue;
    }
    defColumns.push(column);
  }
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(
    (item) => !item.defaultHidden,
  );
}
