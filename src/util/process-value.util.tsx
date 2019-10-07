import { IFilterDefinition } from '../model/FilterDefinitions.model';

const calculateFilterValues = (filterDefinitions: IFilterDefinition[], filterData: any[],
                               checkedValuesMap: Map<number, Map<number, boolean>>,
                               filterValuesMap: Map<number, any[]>): Map<number, boolean> => {

  let includeMap: Map<number, boolean> = new Map<number, boolean>();
  const indexesToInclude: number[] = getMapKeysToInclude(checkedValuesMap);

  for (let i = 0; i < indexesToInclude.length; i++) {
    const currentCheckedMapIndex = indexesToInclude[i];
    const currentObjectKey = filterDefinitions[currentCheckedMapIndex].objectKey;
    const relatedMap: Map<number, boolean> = checkedValuesMap.get(currentCheckedMapIndex)!;
    const filterValues = filterValuesMap.get(currentCheckedMapIndex)!;

    for (let j = 0; j < filterData.length; j++) {
      let shouldInclude: boolean = false;
      for (let k = 0; k < filterValues.length; k++) {
        if (relatedMap.get(k)
          && !shouldInclude
          && filterData[j][currentObjectKey] === filterValues[k]) {
          shouldInclude = true;
          break;
        }
      }
      if (!shouldInclude) includeMap.set(j, false);
      else if (!includeMap.has(j)) includeMap.set(j, true);
    }
  }
  return includeMap;
};

const getMapKeysToInclude = (checkedValuesMap: Map<number, Map<number, boolean>>): number[] => {
  let indexesToInclude: number[] = [];

  for (let i = 0; i < checkedValuesMap.size; i++) {
    const innerMap: Map<number, boolean> = checkedValuesMap.get(i)!;
    for (let j = 0; j < innerMap.size; j++) {
      if (innerMap.get(j)) {
        indexesToInclude.push(i);
        break;
      }
    }
  }
  return indexesToInclude;
};

export {
  calculateFilterValues
};