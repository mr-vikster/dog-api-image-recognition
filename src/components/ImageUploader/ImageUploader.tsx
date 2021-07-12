import { ChangeEvent, useContext, useRef, FC, useEffect, useCallback } from 'react';
import { GalleryContext } from '../../contexts/galleryContext';
import { Classification } from '../Classification/Classification';

export const ImageUploader: FC = () =>  {

  const { breed, setResults, setBreed, getImages, model, setImageURL, imageURL } = useContext(GalleryContext);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      await setImageURL(url);
    } else {
      await setImageURL(null);
    }
  }
  
  const identify = useCallback(async () => {
    const img = imageRef.current;
    console.log(img);
    const results = await model.classify(img);
    setResults(results);
    setBreed(results[0].className);
  }, [model, setBreed, setResults])
  
  const formatBreedName = useCallback((): string => {
    if(breed.includes(' ')) {
      return breed.split(' ').reverse().join('/').toLowerCase()
    }
    return breed;
  }, [breed])

  const requestGallery = useCallback(() => {
    const formattedBreedName = formatBreedName();
    getImages(formattedBreedName);
  }, [formatBreedName, getImages]);
  
  const triggerUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  }
  
  useEffect(() => {
    if(imageURL && imageRef.current) {
      identify();
      requestGallery();
    }
  }, [imageURL]);
  
  return (
    <div className='uploader__wrapper'>
      <div className='input__wrapper'>
        <input type='file' accept='image/*' capture='camera' className='input__upload-input' style={{ display: 'none' }} onChange={uploadImage} ref={fileInputRef} />
        <button className='input__upload-button' onClick={triggerUpload}>Upload Image</button>
      </div>
      <div className="app__image-wrapper">
        {imageURL && (
          <figure>
            <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} style={{ minHeight: 500, minWidth: 375 }} />
            <figcaption><Classification/></figcaption>
          </figure>
        )}
      </div>
    </div>
  )
}
