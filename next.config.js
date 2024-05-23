/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  // logging: {
  //   fetches: {
  //     fullUrl: true
  //   }
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    remotePatterns: [
      { hostname: 'd2cp56g25ib4hk.cloudfront.net' },
      { hostname: 'dev-ssum.s3.ap-northeast-2.amazonaws.com' },
      { hostname: 'd341rnu99jxucb.cloudfront.net' },
      { hostname: 'images.unsplash.com' },
      {
        protocol: 'https',
        hostname: 'diggin-dev-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/blurphoto/**'
      },
      {
        protocol: 'http',
        hostname: 'plus.kipris.or.kr'
      }
    ]
  },
  // experimental feature from next, remove if solve all warning relate to useSearchParam()
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false
      }
    }
    return config
  }
}

module.exports = withBundleAnalyzer(nextConfig)
