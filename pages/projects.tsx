import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { Palette, ExternalLink } from 'lucide-react';
import Seo from '../components/Seo';

const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardClass = "bg-white dark:bg-gray-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/30 transition-all";

const ProjectsPage = () => {
  const { t } = useTranslation('projects');

  const meta = t('meta', { returnObjects: true }) as any;
  const projects = t('projects', { returnObjects: true }) as any[];

  return (
    <>
      <Seo
        title={meta?.title || t('title')}
        description={meta?.description || ''}
        keywords={meta?.keywords || ''}
        image={meta?.image || ''}
        pageSlug="projects"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="flex flex-col space-y-16 py-10 max-w-5xl mx-auto px-4 w-full">
        
        {/* HEADER SECTION WITH IMAGE BACKGROUND */}
        <section className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/images/projects_illustration.webp" alt="Projects Header" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70 flex flex-col justify-end p-6 md:p-12">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="flex flex-row items-center space-x-3 mb-4">
                <Palette className="w-8 sm:w-10 h-8 sm:h-10 text-blue-400 shrink-0" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">{t('title')}</h1>
              </div>
              <p className="hidden md:block text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">{t('intro')}</p>
            </motion.div>
          </div>
        </section>

        {/* Mobile Description */}
        <p className="block md:hidden text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2 -mt-8">{t('intro')}</p>

        {/* PROJECTS GRID */}
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(projects) && projects.map((project, idx) => (
                <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={idx}
                className={`${cardClass} block group relative overflow-hidden`}
                >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 flex items-center justify-between text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{project.description}</p>
                </div>
                </a>
            ))}
            </div>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;
