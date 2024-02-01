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
      {
        source: "/privacy",
        destination:
          "https://www.privacypolicies.com/live/da5b9975-25ab-4a60-8e64-2c324dc78556",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
