import { createContext, FC, useEffect, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';

const defaultContext: any = {
  isModelLoading: false,
  setIsModelLoading: () => false,
  isGalleryLoading: false,
  setIsGalleryLoading: () => false,
  model: null,
  setModel: () => null,
  imageURL: null,
  setImageIRL: () => null,
  results: [],
  setResults: () => [],
  galleryItems: [],
  setGalleryItems: () => [],
  getImages: () => null,
  breed: null,
  setBreed: () => null,
  formatBreedName: () => null
};

export interface ModelResult {
  className: string;
  probability: number;
}

export const GalleryContext = createContext(defaultContext);

export const GalleryContextProvider: FC = ({ children }) => {

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [breed, setBreed] = useState('');
  const [imageURL, setImageURL] = useState<string|null>(null);
  const [results, setResults] = useState<ModelResult[]>([]);
  const [galleryItems, setGalleryItems] = useState<ModelResult[]>([]);
  
  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  }
  
  useEffect(() => {
    loadModel();
  }, []);

  const getImages = (formattedBreedName: string) => {
    setIsGalleryLoading(true);
    fetch(`https://dog.ceo/api/breed/${formattedBreedName}/images/random/10`)
    .then((res) => res.json())
    .then((data) => setGalleryItems((prevState) => {
      if(!prevState) {
        return data.message
      } else {
        return prevState.concat(data.message)
      }
    }))
    .catch((error) => {
      console.log(error);
    })
    setIsGalleryLoading(false);
  }

  const formatBreedName = (): string => {
    if(breed.includes(' ')) {
      return breed.split(' ').reverse().join('/').toLowerCase()
    }
    return breed;
  }
  
  return (
    <GalleryContext.Provider
      value={{
        isModelLoading,
        setIsModelLoading,
        isGalleryLoading,
        setIsGalleryLoading,
        model,
        setModel,
        breed,
        setBreed,
        imageURL,
        setImageURL,
        results,
        setResults,
        galleryItems,
        setGalleryItems,
        getImages,
        formatBreedName
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}