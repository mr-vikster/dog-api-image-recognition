import { useContext } from 'react'
import { GalleryContext, ModelResult } from '../../contexts/galleryContext';

export const Classification = () =>  {

  const { results } = useContext(GalleryContext);


  return (
    <>
      {results.length > 0 && (
        <div className='classification__wrapper'>
          {results.map((result: ModelResult, index: number) => {
          return (
            <div className='classification__result' key={result.className}>
              <span className='result__name'>{result.className}</span>
              <span className='result__confidence'>{(result.probability * 100).toFixed(2)} %</span>
              {index === 0 && <span className='result__best-guess'>Best Guess</span>}
            </div>
          )
          })}
        </div>
      )}
    </>
  )
}
