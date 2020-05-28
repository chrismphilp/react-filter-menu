const isUndefined = (data: any) => data === undefined || data === null;

const isEmptyObject = (data: any[]) => isUndefined(data) || data.length === 0;

const splitArrayIntoGroups = (data: any[], groupSize: number): any[][] =>
  data.reduce((accumulator, currentValue, currentIndex, array) => {
    if (currentIndex % groupSize === 0) accumulator.push(array.slice(currentIndex, currentIndex + groupSize));
    return accumulator;
  }, []);

export { isUndefined, isEmptyObject, splitArrayIntoGroups };
