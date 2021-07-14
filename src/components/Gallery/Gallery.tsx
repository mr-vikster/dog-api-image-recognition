import { FC, useCallback, useContext, useEffect } from 'react';

import { useOnScreen } from '../../hooks/useOnScreen';
import { GalleryContext } from '../../contexts/galleryContext';

export const Gallery: FC = () => {

  const { galleryItems, getImages, breed, formatBreedName } = useContext(GalleryContext);
  const [loaderRef, visibility] = useOnScreen<HTMLButtonElement>({ rootMargin: '150px' });

  const loadMoreImages = useCallback(() => {
    const formattedBreedName = formatBreedName(); 
    getImages(formattedBreedName)
  }, [formatBreedName, getImages]);

  useEffect(() => {
    if(visibility > 0) {
      loadMoreImages();
    }
  }, [loadMoreImages, visibility]);

  return (
    galleryItems.length > 0 ? (
      <article className="gallery__content-wrapper">
        <h2 className="gallery__heading">See the best {breed}s around</h2>
        <section className="gallery__results-wrapper">
          {galleryItems.map((image: string, index: number) => (
            <div className='gallery__result' key={index} style={{ backgroundImage: `url(${image})` }}/>
          ))}
        </section>
        <button className="gallery__show-more" ref={loaderRef} onClick={loadMoreImages}>Show More</button>
      </article>
    ) : null
  )
}
