/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Type-safety is enforced via `tsc`/`next build`. ESLint is available via
    // `npm run lint` but is not required to produce a build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
