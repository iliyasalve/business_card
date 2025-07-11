import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  pageSlug?: string;
}

const BASE_URL = 'https://iliyasalve.github.io/business_card';

const Seo: React.FC<SeoProps> = ({ title, description, keywords, image = '/images/photo.jpg', pageSlug }) => {
  const fullImageUrl = `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  const fullUrl = pageSlug ? `${BASE_URL}/${pageSlug}` : BASE_URL;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/*<link rel="icon" href="/business_card/favicon.ico" />*/}
    </Head>
  );
};

export default Seo;
