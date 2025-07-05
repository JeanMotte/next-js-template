import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},

  // Example of how to add redirects if needed
	// async redirects() {
	//   return [
	//     {
	//       source: '/',
	//       destination: '/dashboard',
	//       permanent: true,
	//     },
	//   ]
	// },
};

export default nextConfig;
