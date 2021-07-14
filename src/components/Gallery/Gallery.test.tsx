import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Gallery } from './Gallery';
import { GalleryContext } from '../../contexts/galleryContext';

class IntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

describe('Gallery test suite', () => {
  it('renders Gallery result and header based on context data', () => {
    const context = {
      breed: 'Good boy',
      galleryItems: ['']
    };
    render(
      <GalleryContext.Provider value={context}>
        <Gallery />
      </GalleryContext.Provider>
    );
    screen.debug();
    expect(screen.getByText('See the best Good boys around', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Show More')).toBeInTheDocument();
  });
});
