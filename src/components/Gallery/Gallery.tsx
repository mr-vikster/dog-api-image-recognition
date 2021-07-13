import { FC, useCallback, useContext } from 'react';

import { useOnScreen } from '../../hooks/useOnScreen';
import { GalleryContext } from '../../contexts/galleryContext';

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
