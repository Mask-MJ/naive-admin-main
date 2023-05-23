export interface DictList {
  dictId: string;
  dictType: string;
  dictCode: string;
}

export interface DictSearchParams {
  dictName?: string;
  dictType?: string;
  status?: string;
  createTime?: string[];
}

export interface DictParams {
  dictName: string;
  dictType: string;
  status: string;
  remark?: string;
}

export interface DictDataListParams {
  dictType?: string;
  dictLabel?: string;
  status?: string;
}

export interface DictListDetail {
  dictType: string;
  dictLabel: string;
  dictValue: string;
  dictSort: number;
  cssClass?: string;
  listClass?: string;
  isDefault: string;
  status: string;
  remark?: string;
}
