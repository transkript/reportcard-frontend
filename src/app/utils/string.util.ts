export module StringUtil {
  export const toTitleCase = (str: string) => {
    let resStr = '';
    const words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
      const chars = words[i].toLowerCase().split('');
      chars[0] = chars[0].toUpperCase();
      words[i] = chars.join('');

    }
    return words.join(' ');
  }

  export const removeTrailWhiteSpace = (str: string) => {

  }
}
