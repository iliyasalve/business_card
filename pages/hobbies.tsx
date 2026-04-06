import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Gamepad2, Plane, Music, Camera } from 'lucide-react';
import Seo from '../components/Seo';

const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardClass = "bg-white dark:bg-gray-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/30 transition-all";

const getIcon = (title: string | undefined) => {
    if (!title) return <Sparkles className="w-8 h-8 text-blue-500" />;
    const normalized = title.toLowerCase();
    if (normalized.includes('gaming')) return <Gamepad2 className="w-8 h-8 text-blue-500" />;
    if (normalized.includes('travel')) return <Plane className="w-8 h-8 text-purple-500" />;
    if (normalized.includes('music')) return <Music className="w-8 h-8 text-pink-500" />;
    if (normalized.includes('photo')) return <Camera className="w-8 h-8 text-indigo-500" />;
    return <Sparkles className="w-8 h-8 text-blue-500" />;
};

const HobbiesPage = () => {
  const { t } = useTranslation('hobbies');

  const meta = t('meta', { returnObjects: true }) as any;
  const hobbies = t('hobbies', { returnObjects: true }) as any[];

  return (
    <>
      <Seo
        title={meta?.title || t('title')}
        description={meta?.description || ''}
        keywords={meta?.keywords || ''}
        image={meta?.image || ''}
        pageSlug="hobbies"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="flex flex-col space-y-16 py-10 max-w-5xl mx-auto px-4 w-full">
        
        {/* HEADER SECTION WITH IMAGE BACKGROUND */}
        <section className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/images/hobbies_illustration.webp" alt="Hobbies Header" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70 flex flex-col justify-end p-6 md:p-12">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="flex flex-row items-center space-x-3 mb-4">
                <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-blue-400 shrink-0" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">{t('title')}</h1>
              </div>
              <p className="hidden md:block text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">{t('intro')}</p>
            </motion.div>
          </div>
        </section>

        {/* Mobile Description */}
        <p className="block md:hidden text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2 -mt-8">{t('intro')}</p>

        {/* HOBBIES SECTION */}
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(hobbies) && hobbies.map((hobby, idx) => (
                  <div key={idx} className={`${cardClass} group flex flex-col items-center text-center`}>
                    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-full group-hover:scale-110 transition-transform">
                        {getIcon(hobby.title)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">{hobby.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{hobby.description}</p>
                  </div>
              ))}
            </div>
        </section>
      </div>
    </>
  );
};

export default HobbiesPage;
