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
        <>
          <h3>See the best {breed}s around</h3>
          <div className='gallery__wrapper'>
            {galleryItems.map((image: string, index: number) => (
              <div className='gallery__result' key={index}>
                <img src={image} alt={breed} />
              </div>
            ))}
            <button className="gallery__show-more" ref={loaderRef} onClick={loadMoreImages}>Show More</button>
          </div>
        </>
      )}
    </>
  )
}
