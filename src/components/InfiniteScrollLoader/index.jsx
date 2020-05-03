import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'

const InfiniteScrollLoader = props => {
  const { loadMore, _key, stopObserving = false, children } = props
  const isFetching = useSelector(state => get(state, `request.${_key}.status`, null) === 'REQUEST_FETCHING')
  const _isFetching = useRef(isFetching)
  const [element, setElement] = useState(null)
  const _loadMore = useRef(loadMore)
  const observer = useRef(
    new window.IntersectionObserver(
      entries => {
        const first = entries[0]
        if (first.isIntersecting && !_isFetching.current) {
          _loadMore.current()
        }
      },
      { threshold: 1 }
    )
  )

  useEffect(() => {
    _loadMore.current = loadMore
  }, [loadMore])

  useEffect(() => {
    _isFetching.current = isFetching
  }, [isFetching])

  useEffect(() => {
    const currentElement = element
    const currentObserver = observer.current

    if (currentElement) {
      currentObserver.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [element])

  return (
    <div>
      {children}
      {!isFetching && !stopObserving && <div ref={setElement} style={{ background: 'transparent' }} />}
    </div>
  )
}

export default InfiniteScrollLoader
