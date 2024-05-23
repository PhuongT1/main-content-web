// // components/GlobalLoading.js
// 'use client'
// import React from 'react'
// import { useRouter } from 'next/router'
// const GlobalLoading = () => {
//   const router = useRouter()

//   const [loading, setLoading] = React.useState(false)

//   React.useEffect(() => {
//     if (!router) return
//     const handleStart = (url) => {
//       setLoading(true)
//     }

//     const handleComplete = (url) => {
//       setLoading(false)
//     }

//     const handleError = (error, url) => {
//       setLoading(false)
//     }

//     router.events.on('routeChangeStart', handleStart)
//     router.events.on('routeChangeComplete', handleComplete)
//     router.events.on('routeChangeError', handleError)

//     return () => {
//       router.events.off('routeChangeStart', handleStart)
//       router.events.off('routeChangeComplete', handleComplete)
//       router.events.off('routeChangeError', handleError)
//     }
//   }, [router])

//   return (
//     loading && (
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 9999
//         }}
//       >
//         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//           Loading...
//         </div>
//       </div>
//     )
//   )
// }

// export default GlobalLoading
