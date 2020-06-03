import { IFilterDefinition } from '..';

const getPresentableData = (
    filterDefinitions: IFilterDefinition<any>[],
    filterData: any[],
    checkedValuesMap: Map<number, Map<number, boolean>>,
    filterValuesMap: Map<number, any[]>,
  ): any[] => {
    const includeMap: Map<number, boolean> = calculateFilterValues(
      filterDefinitions,
      filterData,
      checkedValuesMap,
      filterValuesMap,
    );

    if (includeMap.size === 0) {
      return filterData;
    } else {
      const data: any[] = [];
      for (let i = 0; i < includeMap.size; i++) {
        if (includeMap.get(i)) data.push(filterData[i]);
      }
      return data;
    }
  },
  calculateFilterValues = (
    filterDefinitions: IFilterDefinition<any>[],
    filterData: any[],
    checkedValuesMap: Map<number, Map<number, boolean>>,
    filterValuesMap: Map<number, any[]>,
  ): Map<number, boolean> => {
    const includeMap: Map<number, boolean> = new Map<number, boolean>(),
      indexesToInclude: number[] = getMapKeysToInclude(checkedValuesMap);

    for (let i = 0; i < indexesToInclude.length; i++) {
      const currentCheckedMapIndex = indexesToInclude[i],
        currentObjectKey = filterDefinitions[currentCheckedMapIndex].objectKey,
        relatedMap: Map<number, boolean> = checkedValuesMap.get(currentCheckedMapIndex)!,
        filterValues = filterValuesMap.get(currentCheckedMapIndex)!;

      for (let j = 0; j < filterData.length; j++) {
        let shouldInclude = false;
        for (let k = 0; k < filterValues.length; k++) {
          if (relatedMap.get(k) && !shouldInclude && filterData[j][currentObjectKey] === filterValues[k]) {
            shouldInclude = true;
            break;
          }
        }
        if (!shouldInclude) includeMap.set(j, false);
        else if (!includeMap.has(j)) includeMap.set(j, true);
      }
    }
    return includeMap;
  },
  getMapKeysToInclude = (checkedValuesMap: Map<number, Map<number, boolean>>): number[] => {
    const indexesToInclude: number[] = [];

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
  },
  resetCheckedValuesMap = (checkedValuesMap: Map<number, Map<number, boolean>>): Map<number, Map<number, boolean>> => {
    for (let i = 0; i < checkedValuesMap.size; i++) {
      for (let j = 0; j < checkedValuesMap.get(i)!.size; j++) {
        checkedValuesMap.get(i)!.set(j, false);
      }
    }
    return checkedValuesMap;
  };

export { getPresentableData, calculateFilterValues, resetCheckedValuesMap };
