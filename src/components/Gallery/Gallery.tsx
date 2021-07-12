import { FC, useCallback, useContext } from 'react';
import { GalleryContext } from '../../contexts/galleryContext';
import { useOnScreen } from '../../hooks/useOnScreen';

export const Gallery: FC = () => {

  const { galleryItems, getImages, breed } = useContext(GalleryContext);
  const [loaderRef] = useOnScreen<HTMLButtonElement>();

  const loadMoreImages = useCallback(() => {
    getImages(breed.split(' ').reverse().join('/').toLowerCase())
  }, [breed, getImages])
  // TODO:add autoloading
  // useEffect(() => {
  //   if(visibility > 0 && breed && !isGalleryLoading) {
  //     loadMoreImages();
  //   }
  // }, [breed, loadMoreImages, visibility, isGalleryLoading]);


  return (
    <>
      {galleryItems.length > 0 && (
        <div className='gallery__wrapper'>
          <h2 className="gallery__title">See the best {breed}s around</h2>
          <div className='gallery__results'>
            {galleryItems.map((image: string, index: number) => (
              <div className='gallery__result' key={index} style={{ backgroundImage: `url(${image})` }}/>
            ))}
          </div>
          <button className="gallery__show-more" ref={loaderRef} onClick={loadMoreImages}>Show More</button>
        </div>
      )}
    </>
  )
}
