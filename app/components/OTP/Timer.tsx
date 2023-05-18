import React, {useState, useEffect} from 'react'
import {TCTextView as Text} from '@Components'
import styled from 'styled-components/native'
import {TEXT_VARIANTS} from '@Utils'

const TimerText = styled(Text)`
  margin-top: 16px;
  color: #57564f;
  text-align: right;
`

interface TimerProps {
  seconds: number
  onTimerComplete?: () => void
}

const Timer: React.FC<TimerProps> = ({seconds}) => {
  const [time, setTime] = useState(seconds)

  useEffect(() => {
    let interval: any

    if (time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else {
      //   onTimerComplete()
    }

    return () => {
      clearInterval(interval)
    }
  }, [time])

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    if (Number(formattedHours) > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    } else {
      return `${formattedMinutes}:${formattedSeconds}`
    }
  }

  return <TimerText variant={TEXT_VARIANTS.body}>{formatTime(time)}</TimerText>
}

export default Timer
