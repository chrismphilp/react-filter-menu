import React from 'react';
import ReactDOM from 'react-dom';
import Filter from '../Filter';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Filter updateData={() => null}
                          filterData={[]}
                          filterDefinitions={[]}
                          filterHeader={''}
                          theme={'dark'}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
