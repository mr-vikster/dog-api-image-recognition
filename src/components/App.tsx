import { useContext } from 'react';

import { GalleryContext } from '../contexts/galleryContext';
import { Gallery } from './Gallery/Gallery';
import { Uploader } from './Uploader/Uploader';
import { ScrollArrow } from './ScrollArrow/ScrollArrow';
import './App.css';

function App() {
  const { isModelLoading } = useContext(GalleryContext);

  if (isModelLoading) {
    return <h2 className="app__loader">Loading mobilenet Model...</h2>
  }

  return (
    <>
      <main className="app__content-wrapper">
        <h1 className="heading">Dog Finder</h1>
        <Uploader />
        <Gallery />
        <ScrollArrow />
      </main>
    </>
  );
}

export default App;
