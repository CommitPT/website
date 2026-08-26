/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  // SWC minification (faster than Terser, handles node_modules)
  swcMinify: true,

  // Push @commitpt/design-system through SWC so it gets minified/tree-shaken
  transpilePackages: ['@commitpt/design-system'],

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', '@commitpt/design-system'],
  },

  async headers() {
    return [
      {
        source: '/:all*(woff2|woff|ttf|otf|eot)',
        locale: false,
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(webp|avif|png|jpg|jpeg|gif|svg|ico)',
        locale: false,
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/:all*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

module.exports = nextConfig
