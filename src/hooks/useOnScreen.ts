import {
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
  useState
} from 'react'

const defaultIntersectionObserverInit: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: Array.from({ length: 100 }, (_, i: number) => i * 0.01)
}
export const useOnScreen = <T extends Element, V = number>(
  option: Partial<IntersectionObserverInit> = {}
): [MutableRefObject<T | null>, V | number] => {
  const targetRef = useRef<T | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [visibilityRatio, setVisibilityRatio] = useState<number>(0)
  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      setVisibilityRatio(entries[0].intersectionRatio)
    },[])

  useEffect(() => {
    if (observerRef.current) return
    if (!targetRef.current) return
    observerRef.current = new IntersectionObserver(observerCallback, {
      ...defaultIntersectionObserverInit,
      ...option
    })
    observerRef.current.observe(targetRef.current)
  })

  return [targetRef, visibilityRatio]
}
