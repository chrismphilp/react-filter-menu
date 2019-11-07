import React, { FunctionComponent, useState } from 'react';
import FilterRow from './FilterRow';
import { isEmptyObject } from './util/data.util';
import { ColorScheme } from './model/ColorScheme.model';
import styled from 'styled-components';

type StyledProps = {
  open: boolean;
  rowCount: number;
  colorScheme: ColorScheme;
};

const RootContainer = styled.div`
  background-color: ${(props: StyledProps) => props.colorScheme.tertiary};
`;

const DropdownButton = styled.button`
  background-color: ${(props: StyledProps) => (props.open ? props.colorScheme.hover : props.colorScheme.tertiary)};
  color: ${(props: StyledProps) => props.colorScheme.primaryTextColor};
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  
  &:hover {
    background-color: ${(props: StyledProps) => props.colorScheme.hover};
  }
  
  &:after {
    content: '\\002B';
    color: ${(props: StyledProps) => props.colorScheme.primaryTextColor};
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }
`;

const DropdownContent = styled.div`
  padding: 0 18px;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  max-height: ${(props: StyledProps) => (props.open ? `${props.rowCount * 65}px` : 0)};  
  background-color: ${(props: StyledProps) => props.colorScheme.secondary};
`;

type FilterDropdownProps = {
  setChecked: (k1: number, k2: number) => void;
  mapKey: number;
  displayName: string;
  filterValues: any[];
  checkedMap: Map<number, boolean>;
  colorScheme: ColorScheme;
};

const FilterDropdown: FunctionComponent<FilterDropdownProps> = (props) => {

  const [open, setOpen] = useState<boolean>(false);

  if (isEmptyObject(props.filterValues)) return <div/>;

  const setDropdown = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <RootContainer open={open}
                   rowCount={0}
                   colorScheme={props.colorScheme}>
      <DropdownButton onClick={setDropdown}
                      open={open}
                      rowCount={0}
                      colorScheme={props.colorScheme}>
        {props.displayName}
      </DropdownButton>
      <DropdownContent open={open}
                       rowCount={props.filterValues.length}
                       colorScheme={props.colorScheme}>
        {props.filterValues.map((val, index: number) =>
          <FilterRow key={index}
                     setChecked={props.setChecked}
                     checkedMapKey={props.mapKey}
                     checkedMapInnerKey={index}
                     checked={props.checkedMap.get(index)!}
                     displayName={val}
                     colorScheme={props.colorScheme}/>
        )}
      </DropdownContent>
    </RootContainer>
  );
};

export default FilterDropdown;