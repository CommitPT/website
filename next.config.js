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
    // '@commitpt/design-system' removed: combined with its barrel-style dist/index.js,
    // this experimental optimization causes a dev-only RSC client-reference bug
    // ("Cannot read properties of undefined (reading 'call')") when new client
    // components pull in new combinations of its exports. Production builds are
    // unaffected either way; this only controls how aggressively dev tree-shakes it.
    optimizePackageImports: ['lucide-react'],
  },

  async redirects() {
    return [
      { source: '/projects', destination: '/#beneficios', permanent: true },
      { source: '/projects/:id', destination: '/#beneficios', permanent: true },
      { source: '/contributors', destination: '/#quem', permanent: true },
      { source: '/pricing', destination: '/#precos', permanent: true },
      { source: '/commit-plus', destination: '/#precos', permanent: true },
    ]
  },

  async headers() {
    const immutableCache = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]

    return [
      {
        source: '/:all*(woff2|woff|ttf|otf|eot)',
        locale: false,
        headers: immutableCache,
      },
      {
        source: '/:all*(webp|avif|png|jpg|jpeg|gif|svg|ico)',
        locale: false,
        headers: immutableCache,
      },
      // Dev chunk filenames under /_next/static aren't content-hashed the same
      // way prod build output is — caching them as immutable in dev makes the
      // browser keep serving pre-restart JS forever. Only safe in production.
      ...(process.env.NODE_ENV === 'production'
        ? [{ source: '/_next/static/:all*', headers: immutableCache }]
        : []),
    ]
  },
}

module.exports = nextConfig
