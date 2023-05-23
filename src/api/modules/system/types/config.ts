export interface ConfigList {
  configId: string;
  configType: string;
}

export interface ConfigSearchParams {
  configName?: string;
  configKey?: string;
  configType?: string;
  beginTime?: string;
  endTime?: string;
}

export interface ConfigParams {
  configName: string;
  configKey: string;
  configValue: string;
  configType: string;
  remark?: string;
}
