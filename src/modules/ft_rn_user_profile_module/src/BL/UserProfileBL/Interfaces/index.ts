declare global {
    interface Window {
        profile_init: InitDataType;
    }
}

export interface InitDataType {
    userServiceUrl : string,
    redemptionHistoryUrl: string,
    userSavingHistoryUrl: string,
    historyToken: string,
    mode: string,
}

export interface RequestObjectDataType {
    path: string,
    method: string,
    headers: HeaderDataType,
    postData?: object
}

interface HeaderDataType {
    Authorization?: string
    authorizationToken? : string
}


export interface ForgotPasswordDataType {
    token: string,
    email: string
    language: string
}


export interface UserProfileDataType {
    userId: number,
    countryOfResidence: string,
    currency: string,
    gender: string,
    pushNotifications: boolean,
    nationality: string,
    mobilePhone: number | null,
    email: string,
    demographicsUpdated : boolean,
    firstName: string,
    lastName: string,
    profileImage: string,
    savings: number,
    dateOfBirth: string
}

export interface UserUpdateDataType {
    token: string
    countryOfResidence: string,
    mobilePhone: number,
    currency: string,
    pushNotifications: number,
    language: string
}

export interface userProfileImage {
    token: string
    profile_image:File
}

export interface RedemptionhistoryAPIdataType {
    sessionToken: string,
    company: string,
    currency: string,
    currentYear: number,
    language: string
}

export interface RedemptionHistoryData {
    currentYear: string,
    totalNumberOfRedemption: number,
    monthWiseRedemmptions: MonthWiseRedemmptionsData[],
}

export interface  MonthWiseRedemmptionsData {
    month: string,
    redemptionCount: number,
    redemptions : RedemptionsData[]
}

export interface RedemptionsData {
    logo: string,
    merchantName: string,
    outletName: string,
    category: string,
    date: string,
    code: string,
    savings: number,
}

export interface UserSavingAPIdataType {
    sessionToken: string,
    company: string,
    currency: string,
    summaryType: string,
    language: string
}

export interface UserSavingData {
    lifeTimeSaving: number,
    currentYear: number,
    currentMonth: number,
    currentMonthSaving: number,
    savings: SavingData
}

interface SavingData {
    graph: number[],
    progressBar: ProgressBar[]
}

export interface ProgressBar {
    name: string,
    savings: number,
    totalSavings: number
}
