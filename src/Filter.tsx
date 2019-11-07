import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import { ColorScheme, Theme } from './model/ColorScheme.model';
import FilterHeader from './FilterHeader';
import FilterMenu from './FilterMenu';
import fetchColorScheme from './util/color-scheme.util';
import styled from 'styled-components';

type StylingProps = {
  colorScheme: ColorScheme;
};

const FilterRoot = styled.div`
  background-color: ${(props: StylingProps) => (props.colorScheme.primary)};
`;

type FilterMenuProps = {
  updateData: (data: any[]) => void;
  filterDefinitions: IFilterDefinition[];
  filterData: any[];
  filterHeader: string;
  theme: Theme;
};

const Filter: FunctionComponent<FilterMenuProps> = (props) => {

  const [colorScheme, setColorScheme] = useState<ColorScheme>(fetchColorScheme(props.theme));

  useEffect(() => setColorScheme(fetchColorScheme(props.theme)), [props.theme]);

  return (
    <FilterRoot colorScheme={colorScheme}>
      <FilterHeader filterHeader={props.filterHeader}
                    colorScheme={colorScheme}/>
      <FilterMenu filterDefinitions={props.filterDefinitions}
                  filterData={props.filterData}
                  updateData={props.updateData}
                  colorScheme={colorScheme}/>
    </FilterRoot>
  );
};

export default Filter;
