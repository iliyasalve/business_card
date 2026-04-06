import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Seo from '../components/Seo';

const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardClass = "bg-white dark:bg-gray-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/30 transition-all";

const ExperiencePage = () => {
  const { t } = useTranslation('experience');

  const meta = t('meta', { returnObjects: true }) as any;
  const jobs = t('jobs', { returnObjects: true }) as any[];

  return (
    <>
      <Seo
        title={meta?.title || t('title')}
        description={meta?.description || ''}
        keywords={meta?.keywords || ''}
        image={meta?.image || ''}
        pageSlug="experience"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="flex flex-col space-y-16 py-10 max-w-5xl mx-auto px-4 w-full">
        
        {/* HEADER SECTION WITH IMAGE BACKGROUND */}
        <section className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/images/experience_illustration.webp" alt="Experience Header" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70 flex flex-col justify-end p-6 md:p-12">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="flex flex-row items-center space-x-3 mb-4">
                <Briefcase className="w-8 sm:w-10 h-8 sm:h-10 text-blue-400 shrink-0" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">{t('title')}</h1>
              </div>
              <p className="hidden md:block text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">{t('intro')}</p>
            </motion.div>
          </div>
        </section>

        {/* Mobile Description */}
        <p className="block md:hidden text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2 -mt-8">{t('intro')}</p>

        {/* EXPERIENCE TIMELINE */}
        <section>
          <div className="relative border-l-2 border-blue-500/30 dark:border-blue-400/20 ml-3 md:ml-6 space-y-12 max-w-4xl">
            {Array.isArray(jobs) && jobs.map((job, idx) => (
              <div 
                key={idx} 
                className="relative pl-8 md:pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-900 shadow-sm" />
                
                <div className={cardClass}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.position}</h3>
                  <div className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1 mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                    <span>{job.company}</span>
                    <span className="hidden sm:inline text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-gray-500 dark:text-gray-400">{job.dates}</span>
                  </div>
                  <ul className="space-y-2">
                    {job.description.map((item: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-blue-500 mt-1.5 min-w-[6px] h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ExperiencePage;
