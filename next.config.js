/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // تفعيل صيغ الصور الحديثة لسرعة أكبر
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        // هذا هو النطاق الذي تسبب في الخطأ
        hostname: 'kvpjixibtnxmocwnldwe.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;