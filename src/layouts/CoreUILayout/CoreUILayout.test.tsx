import {configTests} from 'core/config';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import CoreUILayout from './CoreUILayout';

describe('CoreUILayout', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter>
          <CoreUILayout/>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});