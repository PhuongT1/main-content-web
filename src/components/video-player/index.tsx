'use client'
import { debounce } from '@/utils/debounce'
import { getYoutubeId } from '@/utils/get-youtube-id'
import { useCallback, useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube'

export const ASPECT_RATIO = 5.33 / 3

type VideoPlayerProps = {
  url: string
  onTrackTime?: (time: number) => void
  playAt?: number
} & YouTubeProps

const VideoPlayer = ({
  url,
  onStateChange: onAdditionalStateChange,
  onReady: onAdditionalReady,
  onTrackTime,
  playAt,
  ...rest
}: VideoPlayerProps) => {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [key, setKey] = useState(0) // Add a key state to force rerender
  const debounceTimoutRef = useRef<NodeJS.Timeout | null>(null)
  const seekToTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const videoId = getYoutubeId(url) as string
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  const debounceLoadData = useCallback(onTrackTime ? debounce(onTrackTime, 6000) : () => {}, [onTrackTime])

  const onReady = (event: { target: YouTubePlayer }) => {
    // Save video ref
    setPlayer(event.target)
    if (playAt) {
      seekToTimeoutRef.current = setTimeout(() => {
        event.target?.seekTo(playAt)
      }, 1000)
    }
    onAdditionalReady?.(event as YouTubeEvent<any>)
  }

  const onStateChange = (event: { data: number }) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      if (onTrackTime) {
        handleTrackVideoTime()
      }
    }
    onAdditionalStateChange?.(event as YouTubeEvent<number>)
  }

  const handleTrackVideoTime = () => {
    const checkTime = () => {
      if (!player) return

      const currentTime = player.getCurrentTime()
      console.log(`Currently progress: ${currentTime} s`)
      if (player.getPlayerState() === YouTube.PlayerState.PAUSED) {
        debounceLoadData(currentTime)
      }

      if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
        debounceTimoutRef.current = setTimeout(checkTime, 5000) // Kiểm tra lại sau mỗi giây
      }
    }

    checkTime()
  }

  useEffect(() => {
    return () => {
      if (debounceTimoutRef.current) {
        clearTimeout(debounceTimoutRef.current)
      }
      if (seekToTimeoutRef.current) {
        clearTimeout(seekToTimeoutRef.current)
      }
    }
  }, [url])

  useEffect(() => {
    // Update the key to force rerender when url changes
    setKey((prevKey) => prevKey + 1)
  }, [url])

  return <YouTube key={key} videoId={videoId} opts={opts} onReady={onReady} onStateChange={onStateChange} {...rest} />
}

export default VideoPlayer
