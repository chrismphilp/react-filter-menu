import React, { FunctionComponent } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import FilterHeader from './FilterHeader';
import FilterMenu from './FilterMenu';
import styled from 'styled-components';

const FilterRoot = styled.div`
  background-color: #f5f6f2;
`;

type FilterMenuProps = {
  updateData: (data: any[]) => void;
  filterDefinitions: IFilterDefinition[];
  filterData: any[];
  filterHeader: string;
};

const Filter: FunctionComponent<FilterMenuProps> = (props) => {
  return (
    <FilterRoot>
      <FilterHeader filterHeader={props.filterHeader}/>
      <FilterMenu filterDefinitions={props.filterDefinitions}
                  filterData={props.filterData}
                  updateData={props.updateData}/>
    </FilterRoot>
  );
};

export default Filter;
