import { useContext } from 'react';

import './App.css';
import { GalleryContext } from '../contexts/galleryContext';
import { Gallery } from './Gallery/Gallery';
import { ImageUploader } from './ImageUploader/ImageUploader';

function App() {
  const { isModelLoading } = useContext(GalleryContext);

  if (isModelLoading) {
    return <h2>Model Loading...</h2>
  }

  return (
    <>
      <h1 className="app__heading">Dog Finder</h1>
      <div className="app__header">
        <ImageUploader />
      </div>
      <Gallery/>
    </>
  );
}

export default App;
