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

const EducationPage = () => {
  const { t } = useTranslation('education');

  const degrees = t('degrees', { returnObjects: true }) as Array<{
    title: string;
    institution: string;
    location: string;
    period: string;
    description: string;
    projects: string[];
  }>;

  const meta = t('meta', { returnObjects: true }) as MetaData;

  const basePath = '/business_card';

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        image={`${basePath}${meta.image}`}
        pageSlug="education"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
        <p className="mb-8">{t('intro')}</p>

        <section>
          {degrees.map((degree, i) => (
            <div key={i} className="mb-4 pb-6">
              <div className="border-b border-gray-300 mb-6" />
              <h2 className="text-2xl font-semibold">{degree.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {degree.institution} — {degree.location} ({degree.period})
              </p>
              <p className="mt-2">{degree.description}</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                {degree.projects.map((proj, j) => (
                  <li key={j}>{proj}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default EducationPage;
