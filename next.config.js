/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
    ],
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    //Vercel issue https://vercel.com/empav/bnb-find/2xSFPamb8gXEJnEsqt8FSWtNFkwP?filter=all
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
