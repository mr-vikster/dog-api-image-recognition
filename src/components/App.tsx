import { useContext } from 'react';

import './App.css';
import { GalleryContext } from '../contexts/galleryContext';
import { Gallery } from './Gallery/Gallery';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ScrollArrow } from './ScrollArrow/ScrollArrow';

function App() {
  const { isModelLoading } = useContext(GalleryContext);

  if (isModelLoading) {
    return <h2 className="app__loader">Model Loading...</h2>
  }

  return (
    <>
      <h1 className="app__heading">Dog Finder</h1>
      <div className="content__wrapper">
        <ImageUploader />
        <Gallery/>
      </div>
      <ScrollArrow />
    </>
  );
}

export default App;
