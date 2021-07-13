import { render, screen } from '@testing-library/react';

import App from './App';

test('renders Dog Finder heading', () => {
  render(<App />);
  const pageHeading = screen.getByText(/dog finder/i);
  expect(pageHeading).toBeInTheDocument();
});
