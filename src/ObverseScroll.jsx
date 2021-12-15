import React, { useEffect, useState } from 'react'
import usePrev from './store/usePrev'

export function ObverseScroll(props) {
  const [intersectTime, setIntersectTime] = useState(false)
  const prevIntersect = usePrev(intersectTime)

  useEffect(() => {
    const options = {
      root: document.querySelector('#observe-parent'),
      rootMargin: '0px',
      threshold: 1
    }

    const cb = (entries, observer) => {
      const isIntersecting = entries.filter(e => e.isIntersecting)
      setIntersectTime(!!isIntersecting.length)
    }

    const observer = new IntersectionObserver(cb, options)

    const target = document.querySelector('#observe-footer')
    observer.observe(target)
  })

  useEffect(() => {
    props.onFooterHit()
  }, [!prevIntersect && intersectTime])

  return (
    <div className="observe" id="observe-parent">
      {props.children}
      <div id="observe-footer" />
    </div>
  )
}