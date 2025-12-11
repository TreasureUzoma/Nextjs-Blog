/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: "/blog-static",

  experimental: {
    serverActions: {
      allowedOrigins: [
        "blog.idolo.dev",
        "idolo.dev",
        "idolodevblog.vercel.app",
      ],
    },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },

  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;

  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}
