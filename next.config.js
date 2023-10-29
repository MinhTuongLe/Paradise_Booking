/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.generationsforpeace.org",
      "res.cloudinary.com",
    ],
  },
  // // turn off ssr mode
  // getInitialProps: async (ctx) => {
  //   return { pageProps: {} };
  // },

  // getServerSideProps: async () => {
  //   return { props: {} };
  // },
};

module.exports = nextConfig;
