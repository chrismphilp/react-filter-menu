import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFilterDefinition } from './model/FilterDefinitions.model';
import { processFilterMap } from './util/on-startup.util';
import FilterDropdown from './FilterDropdown';

type FilterMenuProps = {
  filterDefinitions: IFilterDefinition[];
  filterData: any[];
};

const FilterMenu: FunctionComponent<FilterMenuProps> = (props) => {
  const [filterValuesMap, setFilterValuesMap] = useState<Map<number, any[]>>(new Map());
  const [checkedValuesMap, setCheckedValuesMap] = useState<Map<number, Map<number, boolean>>>(
    new Map<number, Map<number, boolean>>()
  );

  useEffect(() => {
    const [fMap, cMap] = processFilterMap(props.filterDefinitions, props.filterData);
    console.error(fMap);
    console.error(cMap);
    setFilterValuesMap(fMap);
    setCheckedValuesMap(cMap);
  }, [props.filterDefinitions, props.filterData]);

  const handleFilterRowClick = (checkedKey: number, checkedInnerKey: number) => {
    // console.error(checkedValuesMap.get(checkedKey)!.get(checkedInnerKey));
    const mapCopy: Map<number, Map<number, boolean>> = checkedValuesMap;
    const currentMap: Map<number, boolean> = mapCopy.get(checkedKey)!;
    const previousState: boolean = currentMap.get(checkedInnerKey)!;
    currentMap.set(checkedInnerKey, !previousState);
    mapCopy.set(checkedKey, currentMap);
    setCheckedValuesMap(mapCopy);
    console.error(checkedValuesMap);
  };

  return (
    <div style={styles.root}>
      {props.filterDefinitions.map((definition: IFilterDefinition, index: number) =>
        <FilterDropdown key={index}
                        mapKey={index}
                        setChecked={handleFilterRowClick}
                        displayName={definition.displayName}
                        filterValues={filterValuesMap.get(index)!}
                        checkedMap={checkedValuesMap.get(index)!}/>
      )}
    </div>
  );
};

const styles = {
  root: {}
};

export default FilterMenu;