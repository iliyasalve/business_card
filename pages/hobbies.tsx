import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Seo from '../components/Seo';

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
}

const HobbiesPage = () => {
  const { t } = useTranslation('hobbies'); 

  const hobbies = t('hobbies', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const meta = t('meta', { returnObjects: true }) as MetaData;


  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        image={meta.image}
        pageSlug="skills"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
        <p className="mb-8">{t('intro')}</p>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {hobbies.map((hobby, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">{hobby.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hobby.description}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default HobbiesPage;
