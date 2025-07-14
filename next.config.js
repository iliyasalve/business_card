// next.config.js

// next.config.js
/** @type {import('next').NextConfig} 
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
  basePath: '/business_card',
  assetPrefix: '/business_card/',
};

module.exports = nextConfig;*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Для экспорта статического контента
  reactStrictMode: true,
  images: {
    unoptimized: true,  // Отключаем оптимизацию изображений
  },
  //basePath: '/business_card',  // Путь на GitHub Pages
  //assetPrefix: '/business_card/',  // Абсолютные пути с префиксом
};

module.exports = nextConfig;


/*module.exports = {
  output: 'export',  // собираем как статический сайт
  basePath: '/your-repo-name',  // путь к репозиторию, заменяй на свой
  assetPrefix: '/your-repo-name/',  // префикс для ресурсов
};*/