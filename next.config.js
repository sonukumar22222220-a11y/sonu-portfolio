/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Force every page/API response to skip CDN + browser caching so admin
  // edits always show up immediately on the live site (only static JS/CSS
  // build assets under _next/static are still cached, which is safe since
  // those are content-hashed and change automatically on every deploy).
  async headers() {
    return [
      {
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
