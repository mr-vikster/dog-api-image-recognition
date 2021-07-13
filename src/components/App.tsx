import { useContext } from 'react';

import { GalleryContext } from '../contexts/galleryContext';
import { Gallery } from './Gallery/Gallery';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ScrollArrow } from './ScrollArrow/ScrollArrow';
import './App.css';

function App() {
  const { isModelLoading } = useContext(GalleryContext);

  if (isModelLoading) {
    return <h2 className="app__loader">Model Loading...</h2>
  }

  return (
    <>
      <main className="app__content-wrapper">
        <h1 className="heading">Dog Finder</h1>
        <ImageUploader />
        <Gallery />
        <ScrollArrow />
      </main>
    </>
  );
}

export default App;
