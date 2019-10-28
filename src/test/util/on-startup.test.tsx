import React from 'react';
import { processFilterMap } from '../../util/on-startup.util';
import filterDefinitionMock from '../mocks/filter-definition.mock';
import filterDataMock from '../mocks/filter-data.mock';

test('correctly creates the checkedValues map on startup', () => {
  const [, checkedValuesMap] = processFilterMap(filterDefinitionMock, filterDataMock);
  expect(checkedValuesMap.size).toBe(2);
  expect(checkedValuesMap.get(0)!.size).toBe(3);
});

test('correctly creates the filterValues map on startup', () => {
  const [filterValuesMap] = processFilterMap(filterDefinitionMock, filterDataMock);
  expect(filterValuesMap.size).toBe(2);
  expect(filterValuesMap.get(0)!.length).toBe(3);
  expect(filterValuesMap.get(0)).toStrictEqual(['Paul Phelps', 'Chris Philp', 'Abraham Lincoln']);
});
