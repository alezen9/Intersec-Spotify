import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { lazyLoadImage } from 'utils/utils'

export const usePrevious = value => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useHover = () => {
  const [value, setValue] = useState(false)
  const ref = useRef(null)
  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)
  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)

        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }
      }
    },
    [] // Recall only if ref changes
  )

  return [ref, value]
}

export const useLazyLoad = image => {
  const [state, setState] = useState(undefined)
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  const load = useCallback(
    async _img => {
      const res = await lazyLoadImage(_img)
      if (isMounted) setState(res)
    },
    [isMounted]
  )
  useMemo(() => isMounted
    ? load(image)
    : undefined, [image, isMounted, load])
  return state
}
