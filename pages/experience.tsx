// pages/experience.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Seo from '../components/Seo';

interface Job {
  position: string;
  company: string;
  dates: string;
  description: string[];
}

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
}

const ExperiencePage: React.FC = () => {
  const { t } = useTranslation('experience');

  // Get the jobs array from i18n by specifying returnObjects: true and explicitly casting to Job[]
  const jobs = t('jobs', { returnObjects: true }) as Job[];

  const meta = t('meta', { returnObjects: true }) as MetaData;

  //const basePath = '/business_card';

  return (

    <>
      <Seo
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        image={meta.image}
        pageSlug="experience"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p className="mb-8">{t('intro')}</p>

      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map(({ position, company, dates, description }, idx) => (
          <section key={idx} className="mb-4 pb-6">
            <div className="border-b border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold">{position}</h2>
            <p className="text-sm italic mb-2">
              {company} — {dates}
            </p>
            <ul className="list-disc list-inside space-y-1">
              {description.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p>{t('noData', 'Experience data not available')}</p>
      )}
    </div>
    </>
  );
};

export default ExperiencePage;
