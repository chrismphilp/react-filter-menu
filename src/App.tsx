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
    <Filter filterDefinitions={filterDefinitions}
            filterData={filterData}
            filterHeader={'Humans'}/>
  );
};

export default App;