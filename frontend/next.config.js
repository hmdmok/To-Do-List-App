/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	reactStrictMode: true,
	experimental: { appDir: true },
	images: { unoptimized: true },
};

module.exports = nextConfig;
