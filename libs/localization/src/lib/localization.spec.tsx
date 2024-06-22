import React from 'react';
import { render } from '@testing-library/react';

import Localization from './localization';

describe('Localization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Localization />);
    expect(baseElement).toBeTruthy();
  });
});
