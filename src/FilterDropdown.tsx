import React, { FunctionComponent, useState } from 'react';
import FilterRow from './FilterRow';
import { isEmptyObject } from './util/data.util';
import styled from 'styled-components';

const RootContainer = styled.div`
  background-color: #777;
  color: #FFF;
`;

type DropdownButtonProps = {
  checked: boolean;
  rowCount: number;
};

const DropdownButton = styled.button`
  background-color: ${(props: DropdownButtonProps) => (props.checked ? '#555' : '#777')};
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  
  &:hover {
    background-color: #555;
  }
  
  &:after {
    content: '\\002B';
    color: white;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }
`;

const DropdownContent = styled.div`
  padding: 0 18px;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  max-height: ${(props: DropdownButtonProps) => (props.checked ? `${props.rowCount * 65}px` : 0)};  
  background-color: #f1f1f1;
`;

type FilterDropdownProps = {
  setChecked: (k1: number, k2: number) => void;
  mapKey: number;
  displayName: string;
  filterValues: any[];
  checkedMap: Map<number, boolean>;
};

const FilterDropdown: FunctionComponent<FilterDropdownProps> = (props) => {

  const [open, setOpen] = useState<boolean>(false);

  if (isEmptyObject(props.filterValues)) return <div/>;

  const setDropdown = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <RootContainer>
      <DropdownButton onClick={setDropdown}
                      checked={open}
                      rowCount={0}>
        {props.displayName}
      </DropdownButton>
      <DropdownContent checked={open}
                       rowCount={props.filterValues.length}>
        {props.filterValues.map((val, index: number) =>
          <FilterRow key={index}
                     setChecked={props.setChecked}
                     checkedMapKey={props.mapKey}
                     checkedMapInnerKey={index}
                     checked={props.checkedMap.get(index)!}
                     displayName={val}/>
        )}
      </DropdownContent>
    </RootContainer>
  );
};

export default FilterDropdown;