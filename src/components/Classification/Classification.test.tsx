import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Classification } from './Classification';
import { GalleryContext } from '../../contexts/galleryContext';

describe('Classification test suite', () => {
  it('renders classification result and best guess badge based on context data', () => {
    const context = { results: [{ className: 'dog', probability: 1 }] };
    render(
      <GalleryContext.Provider value={context}>
        <Classification />
      </GalleryContext.Provider>
    );
    screen.debug();
    expect(screen.getByText('dog')).toBeInTheDocument();
    expect(screen.getByText('Best Guess')).toBeInTheDocument();
  });
});
