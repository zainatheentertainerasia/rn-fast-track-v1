interface datatype {
    currency: string,
    redemptionHistory: redemptionHistoryData,
    loadingOverlayActive: Boolean,
    errorText: string,
    error: boolean,
};

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


interface ProgressBar {
    name: string,
    savings: number,
    totalSavings: number
}

interface ErrorData {
    error: boolean,
    message: string
}


interface callBacks {
    onError: (data: ErrorData) => void,
    onBack: () => void,
    onExpand: (index: number) => void
};

export interface Port {
    data: datatype,
    CallBacks: callBacks
};
