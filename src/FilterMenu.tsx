import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import FilterDropdown from './FilterDropdown';
import { processFilterMap } from './util/on-startup.util';
import { calculateFilterValues } from './util/process-value.util';

type FilterMenuProps = {
  filterDefinitions: IFilterDefinition[];
  filterData: any[];
};

const FilterMenu: FunctionComponent<FilterMenuProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [checkedValuesMap, setCheckedValuesMap] = useState<Map<number, Map<number, boolean>>>(
      new Map<number, Map<number, boolean>>()
    );
    const [filterValuesMap, setFilterValuesMap] = useState<Map<number, any[]>>(new Map<number, any[]>());

    useEffect(() => {
      const [fMap, cMap] = processFilterMap(props.filterDefinitions, props.filterData);
      setFilterValuesMap(fMap);
      setCheckedValuesMap(cMap);
    }, [props.filterDefinitions, props.filterData]);

    const handleFilterRowClick = (checkedKey: number, checkedInnerKey: number) => {
      const mapCopy: Map<number, Map<number, boolean>> = checkedValuesMap;
      const currentMap: Map<number, boolean> = mapCopy.get(checkedKey)!;
      const previousState: boolean = currentMap.get(checkedInnerKey)!;
      currentMap.set(checkedInnerKey, !previousState);
      mapCopy.set(checkedKey, currentMap);
      setCheckedValuesMap(mapCopy);
      setLoading(!loading);
    };

    const getCurrentValues = () => {
      const startTime = performance.now();
      console.error(calculateFilterValues(props.filterDefinitions, props.filterData,
        checkedValuesMap, filterValuesMap));
      console.error(`Total time: ${performance.now() - startTime}`);
    };

    return (
      <div style={styles.root}>
        {props.filterDefinitions.map((definition: IFilterDefinition, index: number) =>
          <div key={index}>
            <div>{loading}</div>
            <FilterDropdown mapKey={index}
                            setChecked={handleFilterRowClick}
                            displayName={definition.displayName}
                            filterValues={filterValuesMap.get(index)!}
                            checkedMap={checkedValuesMap.get(index)!}/>
          </div>
        )}
        <button onClick={getCurrentValues} type='button'>Reset Selections</button>
        <button onClick={getCurrentValues} type='button'>Apply Filter</button>
      </div>
    );
  }
;

const styles = {
  root: {}
};

export default FilterMenu;