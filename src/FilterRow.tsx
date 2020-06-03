import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ColorScheme } from './model/ColorScheme.model';
import FilterCheckboxRow from './FilterCheckboxRow';
import FilterRangeSelectionRow from './FilterRangeSelectionRow';

type StyledProps = {
  checked?: boolean;
  colorScheme: ColorScheme;
};

const RootContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props: StyledProps) => props.colorScheme.secondary};
    padding-top: 7.5px;
    color: ${(props: StyledProps) => props.colorScheme.secondaryTextColor};
  `,
  RowLabel = styled.label`
    width: 100%;
    padding-left: 10.5px;
  `;

type FilterRowProps = {
  setChecked: (k1: number, k2: number) => void;
  checked: boolean;
  checkedMapKey: number;
  checkedMapInnerKey: number;
  displayName: string;
  colorScheme: ColorScheme;
};

const FilterRow: FunctionComponent<FilterRowProps> = ({
  setChecked,
  checked,
  checkedMapKey,
  checkedMapInnerKey,
  displayName,
  colorScheme,
}) => {
  return (
    <RootContainer colorScheme={colorScheme}>
      <RowLabel>
        {/*<FilterCheckboxRow setChecked={setChecked}*/}
        {/*                   checked={checked}*/}
        {/*                   checkedMapKey={checkedMapKey}*/}
        {/*                   checkedMapInnerKey={checkedMapInnerKey}*/}
        {/*                   displayName={displayName}*/}
        {/*                   colorScheme={colorScheme}/>*/}

        <FilterRangeSelectionRow
          minValue={0}
          maxValue={100}
          displayName={displayName}
          colorScheme={colorScheme}
        />
      </RowLabel>
    </RootContainer>
  );
};

export default FilterRow;
