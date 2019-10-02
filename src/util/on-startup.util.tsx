import { IFilterDefinition } from '../model/FilterDefinitions.model';

const processFilterMap = (filterDefinitions: IFilterDefinition[], filterData: any[]):
  [Map<number, any[]>, Map<number, Map<number, boolean>>] => {

  let filterValues: Map<number, any[]> = new Map<number, any[]>();
  let checkedMap: Map<number, Map<number, boolean>> = new Map<number, Map<number, boolean>>();

  for (let i = 0; i < filterDefinitions.length; i++) {
    const fieldKey = filterDefinitions[i].objectKey;
    let dataArray: Set<any> = new Set<any>();
    let tempMap: Map<number, boolean> = new Map<number, boolean>();

    for (let j = 0; j < filterData.length; j++) {
      dataArray.add(collectFilterValues(filterData[j], fieldKey));
      tempMap.set(j, false);
    }
    filterValues.set(i, Array.from(dataArray));
    checkedMap.set(i, tempMap);
  }
  return [filterValues, checkedMap];
};

const collectFilterValues = (data: any, objectKey: string): any => {
  if (data && data.hasOwnProperty(objectKey)) return data[objectKey];
};

export {
  processFilterMap
}