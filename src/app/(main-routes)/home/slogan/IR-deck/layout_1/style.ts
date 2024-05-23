import { CSSProperties } from 'react'

const leftHeaderTitle: CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '-0.6px',
  position: 'relative',
  zIndex: 1
}

const leftHeaderSubTitle: CSSProperties = {
  fontStyle: 'normal',
  opacity: 0.8,
  position: 'relative',
  zIndex: 1
}

const rightHeader: CSSProperties = {
  fontStyle: 'normal',
  opacity: 0.4,
  position: 'relative',
  zIndex: 1
}

const txtSlogan: CSSProperties = {
  maxWidth: '597px',
  fontWeight: 800,
  fontStyle: 'normal',
  lineHeight: '130%' /* 41.6px */,
  letterSpacing: '9.6px',
  position: 'relative',
  zIndex: 1
}

export { leftHeaderTitle, leftHeaderSubTitle, rightHeader, txtSlogan }
