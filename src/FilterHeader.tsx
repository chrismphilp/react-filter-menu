import React, { FunctionComponent } from 'react';
import { ColorScheme } from './model/ColorScheme.model';
import styled from 'styled-components';

type FilterStylingProps = {
  colorScheme: ColorScheme;
};

const FilterHeaderRoot = styled.div`
  width: 100%;
  minheight: 15px;
  background-color: ${(props: FilterStylingProps) => props.colorScheme.primary};
`;

const FilterHeaderText = styled.h2`
  color: ${(props: FilterStylingProps) => props.colorScheme.secondaryTextColor};
  padding-top: 15px;
  padding-left: 15px;
`;

type FilterHeaderProps = {
  filterHeader: string;
  colorScheme: ColorScheme;
};

const FilterHeader: FunctionComponent<FilterHeaderProps> = (props) => {
  return (
    <FilterHeaderRoot colorScheme={props.colorScheme}>
      <FilterHeaderText colorScheme={props.colorScheme}>{props.filterHeader}</FilterHeaderText>
      <hr />
    </FilterHeaderRoot>
  );
};

export default FilterHeader;
