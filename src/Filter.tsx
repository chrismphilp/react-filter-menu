import React, { FunctionComponent } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import FilterHeader from './FilterHeader';
import FilterMenu from './FilterMenu';

type FilterMenuProps = {
  filterDefinitions: IFilterDefinition[];
  filterData: any[];
  filterHeader: string;
};

const Filter: FunctionComponent<FilterMenuProps> = (props) => {
  return (
    <div style={styles.root}>
      <FilterHeader filterHeader={props.filterHeader}/>
      <FilterMenu filterDefinitions={props.filterDefinitions}
                  filterData={props.filterData}/>
    </div>
  );
};

const styles = {
  root: {}
};

export default Filter;
