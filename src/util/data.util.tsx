const isUndefined = (data: any) => data === undefined || data === null;

const isEmptyObject = (data: any[]) => isUndefined(data) || data.length === 0;

export { isUndefined, isEmptyObject };
