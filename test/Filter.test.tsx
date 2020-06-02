import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Filter from '../src/Filter';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Filter updateData={() => null}
                          filterData={[]}
                          filterDefinitions={[]}
                          theme={'dark'}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
