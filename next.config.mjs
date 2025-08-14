/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '',
  assetPrefix: '',
  browserslist: {
    "production": [
      "defaults",
      "safari >= 13",
      "ios_saf >= 13"
    ],
  },
}

export default nextConfig