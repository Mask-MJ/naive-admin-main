export interface RuleList {
  id: string;
  groupName: string;
  belongGroup: string;
  ownerId: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  status: number;
  issueStatus: { type: number; desc: string };
  issueTime: string;
  ruleName: string;
  ruleModel: number;
  ordinaryService: number;
  peakService: number;
  valleyService: number;
  tipService: number;
  ordinaryEnergy: number;
  peakEnergy: number;
  valleyEnergy: number;
  tipEnergy: number;
  reserveCharge: number;
  times: any;
}

export interface SearchListParams {
  ruleName: string;
  ruleModel: number;
  status: number;
}

export interface ManageParams {
  id?: string;
}

export interface historyListParams {
  ruleId: string;
}

export interface AuditParams {
  id: string;
  status: number;
}
