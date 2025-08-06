import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turn off built-in image optimization so Netlify will just serve your /public/avatar.jpg
  images: {
    unoptimized: true,
  },
  // …any other existing config options…
};

export default nextConfig;
