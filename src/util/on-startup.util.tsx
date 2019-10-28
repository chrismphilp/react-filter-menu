import { IFilterDefinition } from '../model/FilterDefinitions.model';

const processFilterMap = (filterDefinitions: IFilterDefinition[], filterData: any[]):
  [Map<number, any[]>, Map<number, Map<number, boolean>>] => {

  let filterValues: Map<number, any[]> = new Map<number, any[]>();
  let checkedMap: Map<number, Map<number, boolean>> = new Map<number, Map<number, boolean>>();

  for (let i = 0; i < filterDefinitions.length; i++) {
    const fieldKey = filterDefinitions[i].objectKey;
    let dataArray: any[] = [];
    let tempMap: Map<number, boolean> = new Map<number, boolean>();

    for (let j = 0; j < filterData.length; j++) {
      const curr = collectFilterValues(filterData[j], fieldKey);
      if (curr !== undefined && !dataArray.includes(curr)) {
        tempMap.set(j, false);
        dataArray.push(curr);
      }
    }
    filterValues.set(i, dataArray);
    checkedMap.set(i, tempMap);
  }
  return [filterValues, checkedMap];
};

const collectFilterValues = (data: any, objectKey: string): any =>
  (data && data.hasOwnProperty(objectKey)) ? data[objectKey] : undefined;

export {
  processFilterMap
}
