export interface ListParams {
  alarmCode?: string;
  alarmStatus?: number;
  alarmTimeEnd?: string;
  alarmTimeStart?: string;
  gunName?: string;
  pileCode?: string;
  shortAddress?: string;
  station?: string;
}

export interface List {
  alarmCode: string;
  alarmMsg: string;
  alarmStatus: { type: number; desc: string };
  alarmTime: string;
  alarmValue: number;
  gunName: string;
  handleMsg: null;
  id: string;
  pileCode: string;
  shortAddress: string;
  station: string;
  [x: string]: any;
}
