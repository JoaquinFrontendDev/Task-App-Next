/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'platform-lookaside.fbsbx.com', 'pbs.twimg.com', 'cdn.discordapp.com', 'static-cdn.jtvnw.net']
  }
};

module.exports = nextConfig;
