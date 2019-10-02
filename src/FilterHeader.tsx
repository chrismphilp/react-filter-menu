import React, { FunctionComponent } from 'react';

type FilterHeader = {
  filterHeader: string;
};

const FilterHeader: FunctionComponent<FilterHeader> = (props) => {
  return (
    <div style={styles.root}>
      <h2>{props.filterHeader}</h2>
      <hr/>
    </div>
  )
};

const styles = {
  root: {
    width: '100%',
    minHeight: 25
  }
};

export default FilterHeader;