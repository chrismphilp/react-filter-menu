import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import FilterDropdown from './FilterDropdown';
import { processFilterMap } from './util/on-startup.util';
import { getPresentableData, resetCheckedValuesMap } from './util/process-value.util';
import { ColorScheme } from './model/ColorScheme.model';
import styled from 'styled-components';
import device from './device-sizes';
import { splitArrayIntoGroups } from './util/data.util';

type StyledProps = {
  colorScheme: ColorScheme;
};

const FilterButton = styled.button`
  width: 100%;
  background-color: ${(props: StyledProps) => props.colorScheme.button};
  color: ${(props: StyledProps) => props.colorScheme.secondaryTextColor};
  cursor: pointer;
  padding: 18px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  @media ${device.tablet} {
    display: flex;
    padding-top: 5px;
  }
  @media ${device.laptop} {
    display: flex;
    padding-top: 5px;
  }
  background-color: ${(props: StyledProps) => props.colorScheme.secondary};
`;

const FilterButtonContainer = styled.div`
  @media ${device.mobile} {
    width: 100%;
    padding: 0 5px 5px 5px;
  }
  @media ${device.tablet} {
    flex: 1;
    padding: 0 5px 5px 5px;
  }
  @media ${device.laptop} {
    flex: 1;
    padding-top: 0;
    padding-left: 5px;
  }
`;

type FilterMenuProps = {
  updateData: (data: any[]) => void;
  filterDefinitions: IFilterDefinition<any>[];
  filterData: any[];
  itemsPerRow: number;
  colorScheme: ColorScheme;
};

const FilterMenu: FunctionComponent<FilterMenuProps> = ({
  updateData,
  filterDefinitions,
  filterData,
  itemsPerRow,
  colorScheme,
}) => {
  const splitFilterDefinitions: IFilterDefinition<any>[][] = splitArrayIntoGroups(filterDefinitions, itemsPerRow);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkedValuesMap, setCheckedValuesMap] = useState<Map<number, Map<number, boolean>>>(
    new Map<number, Map<number, boolean>>(),
  );
  const [filterValuesMap, setFilterValuesMap] = useState<Map<number, any[]>>(new Map<number, any[]>());
  const [selectedRowMap, setSelectedRowMap] = useState<Map<number, boolean>>(new Map<number, boolean>());

  useEffect(() => {
    const [fMap, cMap] = processFilterMap(filterDefinitions, filterData);
    setCheckedValuesMap(cMap);
    setFilterValuesMap(fMap);
  }, [filterDefinitions, filterData]);

  const isRowSelected = (index: number): boolean => (selectedRowMap.has(index) ? selectedRowMap.get(index)! : false);

  const setRowSelected = (index: number, open: boolean): void => {
    const currMap: Map<number, boolean> = selectedRowMap;
    currMap.set(index, !open);
    setSelectedRowMap(currMap);
    setLoading(!loading);
  };

  const handleFilterRowClick = (checkedKey: number, checkedInnerKey: number) => {
    const mapCopy: Map<number, Map<number, boolean>> = checkedValuesMap;
    const currentMap: Map<number, boolean> = mapCopy.get(checkedKey)!;
    const previousState: boolean = currentMap.get(checkedInnerKey)!;
    currentMap.set(checkedInnerKey, !previousState);
    mapCopy.set(checkedKey, currentMap);
    setCheckedValuesMap(mapCopy);
    updateCurrentValues();
    setLoading(!loading);
  };

  const updateCurrentValues = (): void => {
    const startTime = performance.now();
    updateData(getPresentableData(filterDefinitions, filterData, checkedValuesMap, filterValuesMap));
    console.error(`Total time: ${performance.now() - startTime}`);
  };

  const resetCheckedValues = (event: any): void => {
    event.preventDefault();
    setCheckedValuesMap(resetCheckedValuesMap(checkedValuesMap));
    updateCurrentValues();
    setLoading(!loading);
  };

  return (
    <>
      {splitFilterDefinitions.map((definitionArray: IFilterDefinition<any>[], rowIndex: number) => {
        const open = isRowSelected(rowIndex);

        return (
          <ButtonContainer colorScheme={colorScheme}>
            {definitionArray.map((individualDefinition: IFilterDefinition<any>, index: number) => {
              // Previous index of the filter definition before array splitting
              const previousIndex: number = rowIndex * splitFilterDefinitions[0].length + index;

              return (
                <FilterButtonContainer key={index}>
                  {loading}
                  <FilterDropdown
                    setRowSelected={setRowSelected}
                    setChecked={handleFilterRowClick}
                    mapKey={previousIndex}
                    displayName={individualDefinition.displayName}
                    filterValues={filterValuesMap.get(previousIndex)!}
                    checkedMap={checkedValuesMap.get(previousIndex)!}
                    open={open}
                    rowIndex={rowIndex}
                    colorScheme={colorScheme}
                  />
                </FilterButtonContainer>
              );
            })}
          </ButtonContainer>
        );
      })}

      <ButtonContainer colorScheme={colorScheme}>
        <FilterButtonContainer>
          <FilterButton onClick={resetCheckedValues} type="button" colorScheme={colorScheme}>
            Reset Selections
          </FilterButton>
        </FilterButtonContainer>
      </ButtonContainer>
    </>
  );
};

export default FilterMenu;
