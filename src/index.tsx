import React from 'react';
import ReactDOM from 'react-dom';
import { GalleryContextProvider } from './contexts/galleryContext';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <GalleryContextProvider>
      <App />
    </GalleryContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
