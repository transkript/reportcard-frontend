export module DateUtil {
  export const toRcDate = (date: Date): string => {
    // return format yyyy-MM-dd HH:mm:ss
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    const hour = addZero(date.getHours());
    const minute = addZero(date.getMinutes());
    const second = addZero(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  export const fromRcDate = (date: string): string => {
    // rc format: yyyy-MM-dd HH:mm:ss
    // return format: yyyy-mm-dd
    return date.split(' ')[0];
  }
  export const setToRcDateString = (date: string): string => {
    // input format: yyyy-mm-dd
    // return format: dd-mm-yyyy hh:mm:ss
    let dateAsNum = Date.parse(date);
    if (isNaN(dateAsNum)) {
      dateAsNum = Date.parse(new Date().toString());
    }
    const dateObj = new Date(dateAsNum);
    const day = addZero(dateObj.getDate());
    const month = addZero(dateObj.getMonth() + 1);
    const year = dateObj.getFullYear();
    const hours = addZero(dateObj.getHours());
    const minutes = addZero(dateObj.getMinutes());
    const seconds = addZero(dateObj.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const addZero = (num: number): string => {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  }

}
