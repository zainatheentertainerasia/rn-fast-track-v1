import moment from 'moment';

export default {

  getFormattedDate(date, format) {
    const dateObj = moment(date);
    const formattedDate = moment(dateObj).format(format);
    return formattedDate;
  },

}
