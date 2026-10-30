/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "avatar.vercel.sh",
      "ui-avatars.com",
    ],
  },
};

module.exports = nextConfig;
