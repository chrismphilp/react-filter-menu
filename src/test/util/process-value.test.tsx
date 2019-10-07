import React from 'react';
import { calculateFilterValues } from '../../util/process-value.util';
import filterDefinitionMock from '../mocks/filter-definition.mock';
import filterDataMock from '../mocks/filter-data.mock';
import { unselectedCheckedValuesMapMock } from '../mocks/checked-values-map.mock';
import filterValuesMapMock from '../mocks/filter-values-map.mock';

test('return empty if none of the filter values are  checked', () => {
  const dataToIncludeMap: Map<number, boolean> = calculateFilterValues(
    filterDefinitionMock, filterDataMock, unselectedCheckedValuesMapMock, filterValuesMapMock);
});
