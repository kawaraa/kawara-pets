module.exports = {
  images: {
    // formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        // hostname: "arablocalmarket.com",
        // pathname: "/s/files/**",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/password",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
};
