import moment from 'moment';

export const numberConversion = (value) => {
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + "k";
        } else {
            return value;
        }
};
    
export const formatDate = (date) => {
    const newDate = moment(date).format("D.M.YYYY")
    return newDate;
}