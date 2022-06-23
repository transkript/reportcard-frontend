export module AcademicYearUtil {
  export const isValid = (yearName: string): boolean => {
    const yearParts = yearName.split("/");
    if (yearParts.length == 2) {
      const ys = [];
      for (let i = 0; i < yearParts.length; i++) {
        const part = yearParts[i].trim();
        if (part.length != 4) return false;
        else {
          try {
            ys.push(parseInt(part));
          } catch (e) {
            return false;
          }
        }
      }
      const [y1, y2]: number[] = [...ys];
      return y1 == y2 - 1;
    }
    return false;
  }
}
