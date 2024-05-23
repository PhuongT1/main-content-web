'use client'
import { secondsToHours } from '@/utils/date'
import { MutableRefObject, ReactNode, useCallback, useEffect, useRef } from 'react'
import Countdown, { CountdownProps, CountdownRenderProps } from 'react-countdown'

const ONE_MIN = 60000

type TTimerProps = {
  duration: number
  label?: ReactNode
  date?: Date | number | string
  renderLabel?: (label: string, time: CountdownRenderProps) => ReactNode
  timerRef: MutableRefObject<Countdown | null>
} & Omit<CountdownProps, 'date'>

const Timer = ({ date, duration, label, renderLabel, timerRef, ...rest }: TTimerProps) => {
  const countdownRef = useRef<Countdown | null>(null)

  const COUNTDOWN_TIME = Date.now() + duration * 1000

  console.log(COUNTDOWN_TIME, duration)

  const CountdownContent = useCallback(
    ({ minutes, seconds, hours, total, ...rest }: CountdownRenderProps) => {
      const label = secondsToHours(total / 1000)
      return <>{renderLabel ? renderLabel(label, { minutes, seconds, hours, total, ...rest }) : <span>{label}</span>}</>
    },
    [renderLabel]
  )

  useEffect(() => {
    if (countdownRef) {
      timerRef.current = countdownRef.current
    }
  }, [timerRef, countdownRef])

  return (
    <>
      <Countdown ref={countdownRef} renderer={CountdownContent} date={date || COUNTDOWN_TIME} {...rest} />
    </>
  )
}

export default Timer
