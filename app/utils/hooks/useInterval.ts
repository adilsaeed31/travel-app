import {useEffect, useRef} from 'react'

const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay)
      return () => clearInterval(intervalId)
    }
  }, [delay])
}

export default useInterval
