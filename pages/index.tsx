import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Seo from '../components/Seo';

interface HomeProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  image: string;
}

const Home: React.FC<HomeProps> = () => {
  const { t } = useTranslation();

  const meta = t('home.meta', { returnObjects: true }) as MetaData;
  //const basePath = '/business_card';

  // Get the description and split it into paragraphs
  const description = t('home.description');
  const paragraphs = description.split('\n').map((text, index) => (
    <p key={index} className="mt-4 text-sm sm:text-base">{text}</p>
  ));

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        image={meta.image}
        //image={`${basePath}${meta.image}`}
      />
      <Head>
        <title>{t('header.title')}</title>
      </Head>

      <section className="max-w-6xl mx-auto py-4 px-4 flex flex-col md:flex-row items-center justify-center md:space-x-12">
        {/* Image */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-6 sm:mb-0">
          <img
            //src={`${basePath}${t('home.image')}`} // Path to the image
            src={t('home.image')} // Path to the image
            alt="My photo"
            className="w-full h-auto object-cover rounded-full"
          />
        </div>

        {/* Text block */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold">{t('home.title')}</h1>

          {/* Text split into paragraphs */}
          <div className="mt-6 sm:mt-8 text-base sm:text-lg">
            {paragraphs}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
