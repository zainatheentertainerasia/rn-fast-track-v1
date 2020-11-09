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
}

export interface Port {
  data: datatype;
  CallBacks: callBacks;
}
