import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { Award } from 'lucide-react';
import Seo from '../components/Seo';

const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardClass = "bg-white dark:bg-gray-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/30 transition-all";

const TrainingPage = () => {
  const { t } = useTranslation('training');

  const meta = t('meta', { returnObjects: true }) as any;
  const trainings = t('trainings', { returnObjects: true }) as any[];

  useEffect(() => {
    // Force Credly to re-evaluate on client-side route mount
    const script = document.createElement('script');
    script.src = "https://cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Seo
        title={meta?.title || t('title')}
        description={meta?.description || ''}
        keywords={meta?.keywords || ''}
        image={meta?.image || ''}
        pageSlug="training"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="flex flex-col space-y-16 py-10 max-w-5xl mx-auto px-4 w-full">
        
        {/* HEADER SECTION WITH IMAGE BACKGROUND */}
        <section className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/images/training_illustration.webp" alt="Training Header" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70 flex flex-col justify-end p-6 md:p-12">
            <div>
              <div className="flex flex-row items-center space-x-3 mb-4">
                <Award className="w-8 sm:w-10 h-8 sm:h-10 text-blue-400 shrink-0" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">{t('title')}</h1>
              </div>
              <p className="hidden md:block text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">{t('intro')}</p>
            </div>
          </div>
        </section>

        {/* Mobile Description */}
        <p className="block md:hidden text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2 -mt-8">{t('intro')}</p>

        {/* TRAINING GRID */}
        <section>
            <div className="space-y-6">
            {Array.isArray(trainings) && trainings.map((training, idx) => (
                <div key={idx} className={`${cardClass} flex flex-col sm:flex-row gap-6 items-center sm:items-start`}>
                
                {/* Badge (Rendered first so it appears above text on mobile) */}
                {training.badgeId ? (
                    <div className="shrink-0 inline-flex items-center justify-center bg-white rounded-xl mb-4 sm:mb-0 border border-gray-200 dark:border-gray-700 overflow-hidden h-[220px] w-[150px]">
                    <div
                        className="credly-badge-container scale-[0.85] origin-top sm:scale-100 sm:origin-center mt-2"
                        data-iframe-width="150"
                        data-iframe-height="250"
                        data-share-badge-id={training.badgeId}
                        data-share-badge-host="https://www.credly.com"
                    />
                    </div>
                ) : (
                    <div className="shrink-0 inline-flex items-center justify-center p-3 bg-white rounded-xl mb-4 sm:mb-0 border border-gray-200 dark:border-gray-700 overflow-hidden h-[220px] w-[150px]">
                    <a href="https://skillshop.exceedlms.com/student/award/X1iEkpRQh1kmvaDrRFnCMq71" target="_blank" rel="noopener noreferrer">
                        <img src="/images/google_badge.png" alt="Google Skillshop Badge" className="w-[120px] h-auto" />
                    </a>
                    </div>
                )}
                
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{training.title}</h3>
                    <div className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                    {training.institution} — {training.location} 
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full sm:ml-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap mt-2 sm:mt-0">{training.period}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed text-base">{training.description}</p>
                </div>
                </div>
            ))}
            </div>
        </section>
      </div>
    </>
  );
};

export default TrainingPage;
