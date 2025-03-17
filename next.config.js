/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    unoptimized: true,  // Required for static export
  },
  // The following are needed for GitHub Pages when deploying to a repository
  basePath: '/daily_task_web',
  assetPrefix: '/daily_task_web',
}

module.exports = nextConfig 