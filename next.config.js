/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.generationsforpeace.org",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
