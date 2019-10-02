import React, { FunctionComponent } from 'react';
import FilterRow from './FilterRow';

type FilterDropdownProps = {
  setChecked: (k1: number, k2: number) => void;
  mapKey: number;
  displayName: string;
  filterValues: any[];
  checkedMap: Map<number, boolean>;
};

const FilterDropdown: FunctionComponent<FilterDropdownProps> = (props) => {

  if (!props.filterValues) return <div/>;

  return (
    <div>
      <h2>{props.displayName}</h2>
      {props.filterValues.map((val, index: number) =>
        <FilterRow key={index}
                   setChecked={props.setChecked}
                   checkedMapKey={props.mapKey}
                   checkedMapInnerKey={index}
                   checked={props.checkedMap.get(index)!}
                   displayName={val}/>
      )}
    </div>
  );
};

export default FilterDropdown;