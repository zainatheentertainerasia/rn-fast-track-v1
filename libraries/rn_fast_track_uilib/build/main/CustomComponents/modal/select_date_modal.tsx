import React from "react";
import moment from "moment";
import DateTimePicker from "../datepicker/index";

const SelectDateTime = ({
  isVisible,
  handleCancel,
  date,
  handleDone,
  handleDateChange,
}) => {
  return isVisible ? (
    <DateTimePicker
      date={date}
      handleDateChanged={handleDateChange}
      handleCancelBtnPress={handleCancel}
      handleConfirmButtonPress={handleDone}
      maxDate={moment().add(-13, "years").toDate()}
      is24Hour={false}
      mode="date"
      iosBottomSheetHeaderStyles={{ padding: 8 }}
      iosBottomSheetContentStyles={{ paddingTop: 16 }}
      iosBottomSheetInitialPosition={"40%"}
      iosBottomSheetSnapPoints={["40%"]}
      iosBottomSheetBackdrop={true}
      iosBottomSheetBackDropDismissByPress={false}
    />
  ) : null;
};

export default SelectDateTime;
