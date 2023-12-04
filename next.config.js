/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/register",
        destination: "https://vtop1.vitap.ac.in/VTAPP/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
