import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Seo from '../components/Seo';

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  image: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Home = () => {
  const { t } = useTranslation(['common']);

  // Data fetching
  const meta = t('home.meta', { returnObjects: true }) as MetaData;
  const description = t('home.description') || '';
  const paragraphs = description.split('\n').map((text, index) => (
    <p key={index} className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
  ));

  return (
    <>
      <Seo
        title={meta?.title || t('header.title')}
        description={meta?.description || ''}
        keywords={meta?.keywords || ''}
        image={meta?.image || ''}
      />
      <Head>
        <title>{t('header.title')}</title>
      </Head>

      <div className="flex flex-col space-y-32 py-10">
        
        {/* HERO SECTION */}
        <motion.section 
          id="hero"
          className="max-w-5xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl -z-10 rounded-full" />
          
          <motion.div variants={fadeInUp} className="flex-1 text-center lg:text-left mt-8 lg:mt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              {t('home.title')}
            </h1>
            <div className="mt-6 md:mt-8 space-y-4">
              {paragraphs}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/experience" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white dark:text-white !font-medium rounded-full transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1">
                {t('home.explore')}
              </Link>
              <Link href="/projects" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-full transition-all shadow-lg hover:-translate-y-1">
                {t('home.viewProjects')}
              </Link>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="w-full lg:w-[400px] shrink-0">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
              <img
                src={t('home.image')}
                alt="My photo"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </motion.section>



      </div>
    </>
  );
};

export default Home;
