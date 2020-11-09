interface datatype {
  activeTab: string;
  loadingOverlayActive: Boolean;
  errorText: string;
  error: boolean;
  title: string | null;
  savings: number | null;
  currency: string;
  graph: number[];
  progressBar: ProgressBar[];
  redemptionHistory: redemptionHistoryData,
}

interface redemptionHistoryData { 
  currentYear: string,
  totalNumberOfRedemption: number,
  monthWiseRedemmptions: MonthWiseRedemmptionsData[],
}

interface  MonthWiseRedemmptionsData {
  month: string,
  redemptionCount: number,
  redemptions : RedemptionsData[]
  collapsed: boolean,
}

interface RedemptionsData {
  logo: string,
  merchantName: string,
  outletName: string,
  category: string,
  date: string,
  code: string,
  savings: number,
}

interface UserSavingData {
  lifeTimeSaving: number;
  monthly: SavingData;
  yearly: SavingData;
}

interface SavingData {
  graph: number[];
  progressBar: ProgressBar[];
}

interface ProgressBar {
  name: string;
  savings: number;
  totalSavings: number;
}

interface ErrorData {
  error: boolean;
  message: string;
}

interface callBacks {
  changeTab: (tab: string) => void;
  onError: (data: ErrorData) => void;
  onBack: () => void;
  pushAnalytics: (data: any) => void;
  onExpand: (index: number) => void
}

export interface Port {
  data: datatype;
  CallBacks: callBacks;
}
