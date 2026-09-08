/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://iliyaglazunov.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  // Пишем прямо в артефакт сборки, а не в public/.
  // public/ копируется в out/ на шаге `next build`, то есть до postexport —
  // сгенерированный туда sitemap попадал бы в прод только следующим деплоем.
  outDir: 'out/business_card',
};
