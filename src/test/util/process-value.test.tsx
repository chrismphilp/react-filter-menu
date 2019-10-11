import React from 'react';
import { calculateFilterValues, resetCheckedValuesMap } from '../../util/process-value.util';
import filterDefinitionMock from '../mocks/filter-definition.mock';
import filterDataMock from '../mocks/filter-data.mock';
import { selectedCheckedValuesMapMock, unselectedCheckedValuesMapMock } from '../mocks/checked-values-map.mock';
import filterValuesMapMock from '../mocks/filter-values-map.mock';

test('return empty if none of the filter values are  checked', () => {
  const dataToIncludeMap: Map<number, boolean> = calculateFilterValues(
    filterDefinitionMock, filterDataMock, unselectedCheckedValuesMapMock, filterValuesMapMock);
});

test('reset checked values map should return all false values', () => {
  let uncheckedValuesMap = resetCheckedValuesMap(selectedCheckedValuesMapMock);
  expect(uncheckedValuesMap.get(0)!.get(0)).toBeFalsy();
  expect(uncheckedValuesMap.get(1)!.get(1)).toBeFalsy();
});