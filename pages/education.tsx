import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import Seo from '../components/Seo';

const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardClass = "bg-white dark:bg-gray-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/30 transition-all";

const EducationPage = () => {
  const { t } = useTranslation('education');

  const meta = t('meta', { returnObjects: true }) as any;
  const degrees = t('degrees', { returnObjects: true }) as any[];

  return (
    <>
      <Seo
        title={meta?.title || t('title')}
        description={meta?.description || ''}
        keywords={meta?.keywords || ''}
        image={meta?.image || ''}
        pageSlug="education"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="flex flex-col space-y-16 py-10 max-w-5xl mx-auto px-4 w-full">
        
        {/* HEADER SECTION WITH IMAGE BACKGROUND */}
        <section className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/images/education_illustration.webp" alt="Education Header" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70 flex flex-col justify-end p-6 md:p-12">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="flex flex-row items-center space-x-3 mb-4">
                <GraduationCap className="w-8 sm:w-10 h-8 sm:h-10 text-blue-400 shrink-0" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">{t('title')}</h1>
              </div>
              <p className="hidden md:block text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">{t('intro')}</p>
            </motion.div>
          </div>
        </section>

        {/* Mobile Description */}
        <p className="block md:hidden text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2 -mt-8">{t('intro')}</p>

        {/* EDUCATION SECTION */}
        <section>
            <div className="space-y-6">
              {Array.isArray(degrees) && degrees.map((degree, idx) => (
                <div key={idx} className={cardClass}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{degree.title}</h3>
                      <div className="font-medium text-blue-600 dark:text-blue-400 text-lg">{degree.institution}</div>
                    </div>
                    <div className="mt-2 md:mt-0 text-gray-500 dark:text-gray-400 text-sm md:text-right flex flex-col">
                      <span>{degree.location}</span>
                      <span className="font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full mt-2 self-start md:self-end text-sm">{degree.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed text-base">{degree.description}</p>
                  
                  {degree.projects && degree.projects.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4"/> {t('keyProjects', { defaultValue: 'Key Projects' })}</h4>
                      <ul className="space-y-2">
                        {degree.projects.map((proj: string, j: number) => (
                          <li key={j} className="text-gray-700 dark:text-gray-300 flex items-start text-base">
                             <span className="mr-2 mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                             {proj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
        </section>
      </div>
    </>
  );
};

export default EducationPage;
