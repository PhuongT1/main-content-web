import { useEffect, useState } from 'react'
import { URL_GOOGLE_TRENDING_SCRIPT, URL_GOOGLE_TRENDING_EMBEDS } from '@/constants/advertisement-marketing.constant'
import { getBrowserName } from './../../utils'

declare global {
  interface Window {
    trends?: any
    opr?: any
    chrome?: any
  }
}

interface IUserGoogleTrending {
  comparisonItemA?: string
  comparisonItemB?: string
  geo?: string
  datetime?: string
}
function useGoogleTrending({ comparisonItemA, comparisonItemB, datetime, geo }: IUserGoogleTrending) {
  const [showGoogleTrendChart, setShowGoogleTrendChart] = useState(false)

  // ====
  // Load Google Trends script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = URL_GOOGLE_TRENDING_SCRIPT
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !comparisonItemA || !showGoogleTrendChart) return

    const comparisonItem = [{ keyword: comparisonItemA, geo, time: datetime }]
    let exploreQuery = `geo=${geo}&q=${comparisonItemA}&hl=ko&date=${datetime}`
    if (comparisonItemB) {
      comparisonItem.push({ keyword: comparisonItemB, geo, time: datetime })
      exploreQuery = exploreQuery.replace(`q=${comparisonItemA}`, `q=${comparisonItemA},${comparisonItemB}`)
    }

    try {
      // Render Google Trends widget
      window.trends = window.trends || {}
      window.trends.embed = window.trends.embed || {}
      window.trends.embed.renderExploreWidgetTo = window.trends.embed.renderExploreWidgetTo || function () {}
      window.trends.embed.renderExploreWidgetTo(
        document.getElementById('google-trending-wrapper'),
        'TIMESERIES',
        { comparisonItem },
        { guestPath: URL_GOOGLE_TRENDING_EMBEDS, exploreQuery }
      )
    } catch (error) {
      console.error('Error rendering Google Trends widget:', error)
    }

    return () => {
      // remove iframe element before push new one
      const iframeList = document.getElementsByTagName('iframe') || []
      iframeList?.[0]?.parentNode?.removeChild(iframeList?.[0])
    }
  }, [comparisonItemA, comparisonItemB, datetime, geo, showGoogleTrendChart])

  useEffect(() => {
    if (typeof window === 'undefined') return
    setShowGoogleTrendChart(getBrowserName() === 'chrome')
  }, [])

  // ====
  return { showGoogleTrendChart }
}

export default useGoogleTrending
