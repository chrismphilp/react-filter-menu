import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import FilterDropdown from './FilterDropdown';
import { processFilterMap } from './util/on-startup.util';
import { calculateFilterValues, resetCheckedValuesMap } from './util/process-value.util';
import styled from 'styled-components';

const FilterButton = styled.button`
  background-color: #f5f6h6;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 35%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
`;

type FilterMenuProps = {
  filterDefinitions: IFilterDefinition[];
  filterData: any[];
};

const FilterMenu: FunctionComponent<FilterMenuProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [checkedValuesMap, setCheckedValuesMap] = useState<Map<number, Map<number, boolean>>>(
    new Map<number, Map<number, boolean>>()
  );
  const [filterValuesMap, setFilterValuesMap] = useState<Map<number, any[]>>(new Map<number, any[]>());

  useEffect(() => {
    const [fMap, cMap] = processFilterMap(props.filterDefinitions, props.filterData);
    setFilterValuesMap(fMap);
    setCheckedValuesMap(cMap);
  }, [props.filterDefinitions, props.filterData]);

  const handleFilterRowClick = (checkedKey: number, checkedInnerKey: number) => {
    const mapCopy: Map<number, Map<number, boolean>> = checkedValuesMap;
    const currentMap: Map<number, boolean> = mapCopy.get(checkedKey)!;
    const previousState: boolean = currentMap.get(checkedInnerKey)!;
    currentMap.set(checkedInnerKey, !previousState);
    mapCopy.set(checkedKey, currentMap);
    setCheckedValuesMap(mapCopy);
    setLoading(!loading);
  };

  const getCurrentValues = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const startTime = performance.now();
    console.error(calculateFilterValues(props.filterDefinitions, props.filterData,
      checkedValuesMap, filterValuesMap));
    console.error(`Total time: ${performance.now() - startTime}`);
  };

  const resetCheckedValues = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setCheckedValuesMap(resetCheckedValuesMap(checkedValuesMap));
    setLoading(!loading);
  };

  return (
    <div>
      {props.filterDefinitions.map((definition: IFilterDefinition, index: number) =>
        <div key={index}>
          <div>{loading}</div>
          <FilterDropdown mapKey={index}
                          setChecked={handleFilterRowClick}
                          displayName={definition.displayName}
                          filterValues={filterValuesMap.get(index)!}
                          checkedMap={checkedValuesMap.get(index)!}/>
        </div>
      )}
      <FilterButton onClick={resetCheckedValues} type='button'>Reset Selections</FilterButton>
      <FilterButton onClick={getCurrentValues} type='button'>Apply Filter</FilterButton>
    </div>
  );
};

export default FilterMenu;