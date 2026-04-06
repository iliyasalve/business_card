import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { Code, Terminal, Activity } from 'lucide-react';
import Seo from '../components/Seo';

const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardClass = "bg-white dark:bg-gray-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/30 transition-all";

const SkillsPage = () => {
  const { t } = useTranslation('skills');

  const meta = t('meta', { returnObjects: true }) as any;
  const hardSkills = t('hardSkills', { returnObjects: true }) as any[];
  const softSkills = t('softSkills', { returnObjects: true }) as any[];

  return (
    <>
      <Seo
        title={meta?.title || t('title')}
        description={meta?.description || ''}
        keywords={meta?.keywords || ''}
        image={meta?.image || ''}
        pageSlug="skills"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="flex flex-col space-y-16 py-10 max-w-5xl mx-auto px-4 w-full">
        
        {/* HEADER SECTION WITH IMAGE BACKGROUND */}
        <section className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/images/skills_illustration.webp" alt="Skills Header" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70 flex flex-col justify-end p-6 md:p-12">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="flex flex-row items-center space-x-3 mb-4">
                <Code className="w-8 sm:w-10 h-8 sm:h-10 text-blue-400 shrink-0" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">{t('title')}</h1>
              </div>
              <p className="hidden md:block text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">{t('intro')}</p>
            </motion.div>
          </div>
        </section>

        {/* Mobile Description */}
        <p className="block md:hidden text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2 -mt-8">{t('intro')}</p>

        {/* SKILLS SECTION */}
        <section>
            {/* Hard Skills */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Terminal className="w-5 h-5 text-gray-500"/> {t('titleHard')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl">{t('introHard')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(hardSkills) && hardSkills.map((skill, i) => (
                  <div key={i} className={`${cardClass} group`}>
                    <h4 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{skill.name}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-base mb-4 leading-relaxed">{skill.description}</p>
                    <div className="text-sm font-mono bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg inline-block">{skill.example}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-gray-500"/> {t('titleSoft')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl">{t('introSoft')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(softSkills) && softSkills.map((skill, i) => (
                  <div key={i} className={`${cardClass} group`}>
                    <h4 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">{skill.name}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-base mb-4 leading-relaxed">{skill.description}</p>
                    <div className="text-sm italic font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200 px-3 py-2 rounded-lg inline-block">{skill.example}</div>
                  </div>
                ))}
              </div>
            </div>
        </section>
      </div>
    </>
  );
};

export default SkillsPage;
