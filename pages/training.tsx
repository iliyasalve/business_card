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

const TrainingPage = () => {
  const { t } = useTranslation('training');

  const trainings = t('trainings', { returnObjects: true }) as Array<{
    title: string;
    institution: string;
    location: string;
    period: string;
    badgeId: string;
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
        pageSlug="training"
      />
      <Head>
        <title>{t('title')}</title>
        {/* Insert script for displaying icons */}
        <script
          type="text/javascript"
          async
          src="https://cdn.credly.com/assets/utilities/embed.js"
        />
      </Head>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
        <p className="mb-8">{t('intro')}</p>

      <section>
        {trainings.map((training, i) => (
          <div key={i} className="mb-4 pb-6">
            <div className="border-b border-gray-300 mb-6" />

            {/* Container for the icon and text */}
            <div className="flex flex-col items-center md:flex-row md:items-center">
              {/* Text part */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-semibold">{training.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {training.institution} — {training.location} ({training.period})
                </p>
                <p className="mt-2">{training.description}</p>
              </div>

              {/* Badge */}
              {training.badgeId && (
                <div className="credly-badge-wrapper mt-4 md:mt-0 md:ml-4">
                  <div
                    className="credly-badge-container"
                    data-iframe-width="150"
                    data-iframe-height="270"
                    data-share-badge-id={training.badgeId}
                    data-share-badge-host="https://www.credly.com"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      </div>
    </>
  );
};

export default TrainingPage;
