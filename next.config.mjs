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
  //output: 'export',

  experimental: {
    reactCompiler: true,
  },
  basePath: '',
  assetPrefix: '',
}

export default nextConfig