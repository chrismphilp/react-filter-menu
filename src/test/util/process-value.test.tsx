import React from 'react';
import { calculateFilterValues, resetCheckedValuesMap } from '../../util/process-value.util';
import filterDefinitionMock from '../mocks/filter-definition.mock';
import filterDataMock from '../mocks/filter-data.mock';
import { selectedCheckedValuesMapMock, unselectedCheckedValuesMapMock } from '../mocks/checked-values-map.mock';
import filterValuesMapMock from '../mocks/filter-values-map.mock';

test('return empty if none of the filter values are checked', () => {
  const dataToIncludeMap: Map<number, boolean> = calculateFilterValues(
    filterDefinitionMock, filterDataMock, unselectedCheckedValuesMapMock, filterValuesMapMock);
  expect(dataToIncludeMap.get(0)).toBeFalsy();
  expect(dataToIncludeMap.get(1)).toBeFalsy();
});

test('return correct values if the filter values are checked', () => {
  let selectedMap = new Map(selectedCheckedValuesMapMock);
  selectedMap.delete(1);
  const dataToIncludeMap: Map<number, boolean> = calculateFilterValues(
    filterDefinitionMock, filterDataMock, selectedMap, filterValuesMapMock);
  expect(dataToIncludeMap.get(0)).toBeTruthy();
  expect(dataToIncludeMap.get(1)).toBeTruthy();
  expect(dataToIncludeMap.get(2)).toBeFalsy();
});

test('reset checked values map should return all false values', () => {
  let uncheckedValuesMap = resetCheckedValuesMap(selectedCheckedValuesMapMock);
  expect(uncheckedValuesMap.get(0)!.get(0)).toBeFalsy();
  expect(uncheckedValuesMap.get(1)!.get(1)).toBeFalsy();
});