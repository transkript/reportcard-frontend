export module DateUtil {
  export const toRcDate = (date: Date): string => {
    // format: dd-mm-yyyy hh:mm:ss
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  export const getFromRcDate = (date: string): string => {
    // rc format: dd-mm-yyyy hh:mm:ss
    // return format: yyyy-mm-dd
    const dateAsNum = Date.parse(date);
    if(isNaN(dateAsNum)) {
      return '';
    }
    const dateObj = new Date(dateAsNum);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${year}/${month}/${day}`;
  }

  export const setToRcDateObj = (date: string): Date => {
    const dateAsNum = Date.parse(date);
    if(isNaN(dateAsNum)) {
      return new Date();
    }
    return new Date(dateAsNum)
  }
  export const setToRcDateString = (date: string): string  =>{
    // input format: yyyy-mm-dd
    // return format: dd-mm-yyyy hh:mm:ss
    const dateAsNum = Date.parse(date);
    if(isNaN(dateAsNum)) {
      return '';
    }
    const dateObj = new Date(dateAsNum);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  export const getTimeFromRcDate = (date: string): string => {
    // rc format: dd-mm-yyyy hh:mm:ss
    // return format: hh:mm:ss
    const dateAsNum = Date.parse(date);
    if(isNaN(dateAsNum)) {
      return '';
    }
    const dateObj = new Date(dateAsNum);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }
}
