import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://1qv208qvjmdhb7l3.public.blob.vercel-storage.com/**"
      ),
    ],
  },
};

export default nextConfig;