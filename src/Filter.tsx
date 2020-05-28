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
  background-color: ${(props: StylingProps) => props.colorScheme.primary};
`;

type FilterMenuProps = {
  updateData: (data: any[]) => void;
  filterDefinitions: IFilterDefinition[];
  filterData: any[];
  filterHeader: string;
  theme?: Theme;
};

const Filter: FunctionComponent<FilterMenuProps> = ({
  updateData,
  filterDefinitions,
  filterData,
  filterHeader,
  theme,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(fetchColorScheme(theme));

  useEffect(() => setColorScheme(fetchColorScheme(theme)), [theme]);

  return (
    <FilterRoot colorScheme={colorScheme}>
      <FilterHeader filterHeader={filterHeader} colorScheme={colorScheme} />
      <FilterMenu
        filterDefinitions={filterDefinitions}
        filterData={filterData}
        updateData={updateData}
        colorScheme={colorScheme}
      />
    </FilterRoot>
  );
};

export default Filter;
