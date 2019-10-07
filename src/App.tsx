import React, { FunctionComponent } from 'react';
import Filter from './Filter';
import { IFilterDefinition } from './model/FilterDefinitions.model';

const App: FunctionComponent = () => {
  const filterDefinitions: IFilterDefinition[] = [
    {
      displayName: 'Name',
      objectKey: 'name'
    },
    {
      displayName: 'Age',
      objectKey: 'age'
    },
    {
      displayName: 'Alive',
      objectKey: 'alive'
    }
  ];

  const filterData = [
    {
      age: 14,
      name: 'Paul Phelps',
      alive: true
    },
    {
      age: 25,
      name: 'Chris Philp',
      alive: true
    },
    {
      age: 105,
      name: 'Abraham Lincoln',
      alive: false
    },
    {
      age: 25,
      name: 'Abraham Lincoln',
      alive: false
    },
    {
      age: 105,
      name: 'Abraham Lincoln',
      alive: false
    }
  ];

  return (
    <div style={styles.root}>
      <div style={styles.data}/>
      <div style={styles.filterMenu}>
        <Filter filterDefinitions={filterDefinitions}
                filterData={filterData}
                filterHeader={'Humans'}/>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: 'flex'
  },
  data: {
    flex: 1
  },
  filterMenu: {
    flex: 1
  }
};

export default App;