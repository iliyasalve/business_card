import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Seo from '../components/Seo';

const Custom404 = () => {
  const { t } = useTranslation('404');

  return (
    <>
      <Seo
        title={t('title')}
        description={t('description')}
        keywords={t('keywords')}
        pageSlug="404"
      />
      <div className="py-12 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">{t('heading')}</h2>
        <p className="mb-6">{t('text')}</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-blue-600 text-white dark:text-white rounded hover:bg-blue-700 transition"
        >
          {t('backToHome')}
        </Link>
      </div>
    </>
  );
};

export default Custom404;

