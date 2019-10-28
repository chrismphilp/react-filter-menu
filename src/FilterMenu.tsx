import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import FilterDropdown from './FilterDropdown';
import { processFilterMap } from './util/on-startup.util';
import { getPresentableData, resetCheckedValuesMap } from './util/process-value.util';
import styled from 'styled-components';
import device from './device-sizes';

const FilterButton = styled.button`
  width: 100%;
  background-color: #f5f6h6;
  color: white;
  cursor: pointer;
  padding: 18px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  @media ${device.laptop} {
    display: flex;
  }  
  background-color: #f5f6f2;
  padding: 10px;
`;

const FilterButtonContainer = styled.div` 
  @media ${device.mobile} {
    width: 100%;
    padding-top: 5px;
  }  
  
  @media ${device.laptop} {
    flex: 1;
    padding-left: 5px;
  }
`;

type FilterMenuProps = {
  updateData: (data: any[]) => void;
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

  const updateCurrentValues = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const startTime = performance.now();
    props.updateData(getPresentableData(props.filterDefinitions, props.filterData,
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
      <ButtonContainer>
        <FilterButtonContainer>
          <FilterButton onClick={resetCheckedValues} type='button'>Reset Selections</FilterButton>
        </FilterButtonContainer>
        <FilterButtonContainer>
          <FilterButton onClick={updateCurrentValues} type='button'>Apply Filter</FilterButton>
        </FilterButtonContainer>
      </ButtonContainer>
    </div>
  );
};

export default FilterMenu;