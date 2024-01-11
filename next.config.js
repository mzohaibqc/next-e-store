/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'cdn-img.prettylittlething.com',
          },
        ],
      },
}

module.exports = nextConfig
