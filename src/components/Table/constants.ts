export const ROW_KEY = 'id';
// Optional display number per page;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Number of items displayed per page
export const PAGE_SIZE = 10;
// Common interface field settings
export const FETCH_SETTING = {
  // The field name of the current page passed to the background
  pageField: 'pageNum',
  // The number field name of each page displayed in the background
  sizeField: 'pageSize',
  // Field name of the form data returned by the interface
  listField: 'rows',
  // Total number of tables returned by the interface field name
  totalField: 'total',
};
// Default Size
export const DEFAULT_SIZE = 'small';
//  默认居中
export const DEFAULT_ALIGN = 'center';
// 操作栏配置
export const ACTION_SETTINGS = {
  STRIPED: [
    { label: '显示', key: 'true' },
    { label: '不显示', key: 'false' },
  ],
  DENSITY: [
    { label: '紧凑', key: 'small' },
    { label: '默认', key: 'medium' },
    { label: '宽松', key: 'large' },
  ],
};
