const config = {
  plugins: [
    "@tailwindcss/postcss",
    // Add cssnano for production builds to minify CSS
    process.env.NODE_ENV === "production"
      ? [
          "cssnano",
          { preset: ["default", { discardComments: { removeAll: true } }] },
        ]
      : false,
  ].filter(Boolean),
};

export default config;
