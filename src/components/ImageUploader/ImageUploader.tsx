import { ChangeEvent, useContext, useRef, FC, useCallback, useEffect } from 'react';

import { GalleryContext } from '../../contexts/galleryContext';
import { Classification } from '../Classification/Classification';

export const ImageUploader: FC = () =>  {

  const { 
    setResults,
    setBreed,
    model,
    setImageURL,
    imageURL,
    getImages,
    formatBreedName,
    breed,
    setGalleryItems
  } = useContext(GalleryContext);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    setResults([])
    setGalleryItems([])
    const { files } = e.target;
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  }

  const identify = useCallback(async () => {
    const results = await model.classify(imageRef.current);
    setResults(results);
    setBreed(results[0].className);
  }, [imageRef, model, setBreed, setResults]);

  const triggerUpload = () => fileInputRef.current && fileInputRef.current.click();

  useEffect(() => {
    if(breed) {
      const formattedBreedName = formatBreedName();
      getImages(formattedBreedName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breed]);

  return (
    <article className="preview__wrapper">
      <div className='preview__input-wrapper'>
        <input type='file' accept='image/*' capture='camera' style={{ display: 'none' }} onChange={uploadImage} ref={fileInputRef} />
        <button onClick={triggerUpload}>Upload Image</button>
        {imageURL && <button style={{ marginLeft: '1rem' }} onClick={identify}>Identify</button>}
      </div>
      {imageURL && (
        <section className="preview__content-wrapper">
          <section className="preview__image-wrapper">
            <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />
          </section>
          <Classification/>
        </section>
      )}
    </article>
  )
}
