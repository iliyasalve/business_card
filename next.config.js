// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Для GitHub Pages
  reactStrictMode: true,
  images: {
    unoptimized: true, // Чтобы работало на GitHub Pages
  },
};

module.exports = nextConfig;


/*module.exports = {
  output: 'export',  // собираем как статический сайт
  basePath: '/your-repo-name',  // путь к репозиторию, заменяй на свой
  assetPrefix: '/your-repo-name/',  // префикс для ресурсов
};*/