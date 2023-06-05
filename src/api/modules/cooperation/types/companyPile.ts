export interface CompanyPileParams {
  pileName: string;
  code: string;
  stationIds: string;
  company: string;
  brandName: string;
  modelName: string;
  openingStatus: string;
  status: string;
  useTypes: string;
  chargeType: 0 | 1;
}

export interface CompanyPileList {
  id: string;
  name: string;
  code: string;
  company: string;
  openingStatus: boolean;
}
