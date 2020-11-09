interface datatype {
  user: userDataType,
  loadingOverlayActive: Boolean,
  errorText: string,
  error: boolean,
};


interface userDataType {
  firstName: string,
  lastName: string,
  email: string,
  currency: string,
  savings: number,
  profileImage: string,
}


interface ErrorData {
  error: boolean,
  message: string
}


interface callBacks {
  profileRefresh: () => void
  onCameraClick: (file) => void
  onClickViewBreakDown: () => void
  onClickSetting: () => void
  onError: (data: ErrorData) => void
};

export interface Port {
  data: datatype,
  CallBacks: callBacks
};
