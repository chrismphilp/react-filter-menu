import React, { FunctionComponent } from 'react';

type FilterRow = {
  setChecked: (k1: number, k2: number) => void;
  checked: boolean;
  checkedMapKey: number;
  checkedMapInnerKey: number;
  displayName: string;
};

const FilterRow: FunctionComponent<FilterRow> = (props) => {
  return (
    <div onClick={() => props.setChecked(props.checkedMapKey, props.checkedMapInnerKey)}>
      <h5>{props.displayName} - {props.checked.toString()}</h5>
    </div>
  );
};

export default FilterRow;