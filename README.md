# react-filter-menu

The aim of this project is to create a simple filtration system for data,
providing both a versatile UI design aesthetic and efficient processing 
of data.

## Installation

```sh
$ npm i -g npm

// with npm
$ npm i react-filter-menu

// with yarn
$ yarn add react-filter-menu

Note: add --save if you are using npm < 5.0.0
```

## Usage

Here is a quick example to get you started, **it's all you need**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Filter, IFilterDefinition} from 'react-filter-menu';

const filterDefinitions: IFilterDefinition[] = [
  {
    displayName: 'Name',
    objectKey: 'name'
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
];


const App = () => {
  return (
    <Filter filterHeader={'Filter'}
            updateData={(data) => console.log('New filtered data:', data)}
            filterDefinitions={filterDefinitions}
            filterData={filterData}
            theme={'light'}/>
  );
}

ReactDOM.render(<App/>, document.querySelector('#app'));
```

### Further Documentation

#### ```<Filter/> ```

1) ```filterHeader``` 
    1) Input: (<b>string</b>): Text to be displayed at the header of the Filter menu.
2) ```updateData```
    1) Input: ((data: <b>T</b>) => void): Function that takes data as an input parameter 
    and does something with it, but returns nothing.
    1) Output: (<b>T</b>): Data of type T, filtered on the criteria specified by
    the user.
3) ```filterDefinitions```
    1) Input: (<b>IFilterDefinition</b>[]): An array of filter definitions which can be
    used to define which filter options will be displayed.
4) ```filterData```
    1) Input: (<b>any</b>): Any data can be inputted here, as long as it 
    contains the required fields from the filterDefinitions data.
5) ```theme```
    1) Input: ('light' | 'dark'): Defaults to the light theme.     

#### ```<IFilterDefinition/>```

1) ```displayName``` 
    1) Input: (<b>string</b>): Text to be displayed on the expandable filter-menu row.
2) ```objectKey```
    1) Input: (<b>string</b>): The key used to access the required data from 
    the collection.
3) ```checkedByDefault```
    1) Input: (<b>boolean</b> - *optional*): True if you want the option to be selected
    by default. Defaults to *false*.
4) ```checkboxIcon```
    1) Input: (<b>ReactElement<IFilterIcon></b> | <b>null</b> - *optional*): Provide your
    own checkbox icon if required. Uses the standard, onClick behaviour.
5) ```filterValues```
    1) Input: (<b>any</b>[] - *optional*): Specify the filter values to be used, if you
    do not want all options to be available.  
## Examples

Are you looking for an example project to get started?
[Take a look here](https://github.com/chrismphilp/blog).

## License

This project is licensed under the terms of the[MIT license](/LICENSE).
