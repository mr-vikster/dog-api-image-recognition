import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { GalleryContext } from '../contexts/galleryContext';
import App from './App';

describe('App test suite', () => {
  it('renders Dog Finder heading', () => {
    render(<App />);
    const pageHeading = screen.getByText(/dog finder/i);
    expect(pageHeading).toBeInTheDocument();
  });
  it('renders placeholder text when model is loading', () => {
    const user = { isModelLoading: true };
    render(
      <GalleryContext.Provider value={user}>
        <App />
      </GalleryContext.Provider>
    );
    expect(screen.getByText('Loading mobilenet Model...')).toBeInTheDocument();
  });

});
