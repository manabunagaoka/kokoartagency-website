import type { NextConfig } from "next";

// Old site served each artist at the top level (e.g. /francois-avril).
// The new site nests them under /artists/[slug]. These slugs let us 308-redirect
// every legacy artist URL so external inbound links keep working unchanged.
const artistSlugs = [
  "anna-hrachovec",
  "chico-hayasaki",
  "chris-long",
  "dominique-corbasson",
  "eveline-tarunadjaja",
  "francois-avril",
  "gisela-goppel",
  "jeffrey-fulvimari",
  "kana-kobayashi",
  "kenzo-minami",
  "lisa-grue",
  "lulu",
  "marcus-oakley",
  "masaki-ryo",
  "masayuki-ogisu",
  "miho-s",
  "stina-persson",
  "superdeux",
  "tina-berning",
  "tomoto",
];

const nextConfig: NextConfig = {
  async redirects() {
    return artistSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/artists/${slug}`,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
