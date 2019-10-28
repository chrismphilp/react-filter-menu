import React from 'react';
import { calculateFilterValues, getPresentableData, resetCheckedValuesMap } from '../../util/process-value.util';
import filterDefinitionMock from '../mocks/filter-definition.mock';
import filterDataMock from '../mocks/filter-data.mock';
import filterValuesMapMock from '../mocks/filter-values-map.mock';

test('return empty if none of the filter values are checked', () => {

  const unselectedCheckedValuesMapMock: Map<number, Map<number, boolean>> = new Map([
    [0, new Map<number, boolean>([
      [0, false],
      [1, false],
      [2, true]
    ])],
    [1, new Map<number, boolean>([
      [0, false],
      [1, false],
      [0, false]
    ])]
  ]);

  const dataToIncludeMap: Map<number, boolean> = calculateFilterValues(
    filterDefinitionMock, filterDataMock, unselectedCheckedValuesMapMock, filterValuesMapMock);
  expect(dataToIncludeMap.get(0)).toBeFalsy();
  expect(dataToIncludeMap.get(1)).toBeFalsy();
});

test('return correct values if the filter values are checked', () => {

  const selectedMap: Map<number, Map<number, boolean>> = new Map([
    [0, new Map<number, boolean>([
      [0, false],
      [1, false],
      [2, true]
    ])],
    [1, new Map<number, boolean>([
      [0, false],
      [1, true],
      [0, false]
    ])]
  ]);

  const dataToIncludeMap: Map<number, boolean> = calculateFilterValues(
    filterDefinitionMock, filterDataMock, selectedMap, filterValuesMapMock);
  expect(dataToIncludeMap.get(0)).toBeFalsy();
  expect(dataToIncludeMap.get(1)).toBeFalsy();
  expect(dataToIncludeMap.get(2)).toBeFalsy();
  expect(dataToIncludeMap.get(3)).toBeTruthy();
  expect(dataToIncludeMap.get(4)).toBeFalsy();
});

test('reset checked values map should return all false values', () => {

  const selectedMap: Map<number, Map<number, boolean>> = new Map([
    [0, new Map<number, boolean>([
      [0, true],
      [1, false],
      [1, true]
    ])],
    [1, new Map<number, boolean>([
      [0, false],
      [1, true],
      [0, false]
    ])]
  ]);

  let uncheckedValuesMap = resetCheckedValuesMap(selectedMap);
  expect(uncheckedValuesMap.get(0)!.get(0)).toBeFalsy();
  expect(uncheckedValuesMap.get(1)!.get(1)).toBeFalsy();
});

test('get presentable values should return all values if no filter values are selected', () => {

  const unselectedMap: Map<number, Map<number, boolean>> = new Map([
    [0, new Map<number, boolean>([
      [0, false],
      [1, false],
      [2, false]
    ])],
    [1, new Map<number, boolean>([
      [0, false],
      [1, false],
      [0, false]
    ])]
  ]);

  const presentableData: any[] = getPresentableData(
    filterDefinitionMock, filterDataMock, unselectedMap, filterValuesMapMock);
  expect(presentableData.length).toEqual(5);
});

test('get presentable values should return only the values that match the filter criteria', () => {

  const selectedMap: Map<number, Map<number, boolean>> = new Map([
    [0, new Map<number, boolean>([
      [0, true],
      [1, false],
      [1, true]
    ])],
    [1, new Map<number, boolean>([
      [0, false],
      [1, true],
      [0, false]
    ])]
  ]);

  const presentableData: any[] = getPresentableData(
    filterDefinitionMock, filterDataMock, selectedMap, filterValuesMapMock);
  expect(presentableData.length).toEqual(1);
});