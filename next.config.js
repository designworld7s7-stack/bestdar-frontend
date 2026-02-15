/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-supabase-project-id.supabase.co', // استبدل هذا بالمعرف الخاص بك
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;