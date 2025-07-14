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

const SkillsPage = () => {
  const { t } = useTranslation('skills'); 

  const hardSkills = t('hardSkills', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    example: string;
  }>;

  const softSkills = t('softSkills', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    example: string;
  }>;

  const meta = t('meta', { returnObjects: true }) as MetaData;
  //const basePath = '/business_card';


  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        image={meta.image}
        pageSlug="skills"
      />
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

        <section className="space-y-8">
          {/* Hard Skills Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t('titleHard')}</h2>
            <p className="mb-8">{t('introHard')}</p>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {hardSkills.map((item, i) => (
                <div key={i} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold text-3xl mb-4">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p> 
                  <p className="italic text-gray-600 dark:text-gray-400 text-sm mt-1">{item.example}</p> 
                </div>
              ))}
            </section>
          </div>

          {/* Soft Skills Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t('titleSoft')}</h2>
            <p className="mb-6">{t('introSoft')}</p>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {softSkills.map((item, i) => (
                <div key={i} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold text-3xl mb-4">{item.name}</h3> {/* Увеличили размер шрифта */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p> {/* Уменьшили размер шрифта */}
                  <p className="italic text-gray-600 dark:text-gray-400 text-sm mt-1">{item.example}</p> {/* Уменьшили размер шрифта и курсив */}
                </div>
              ))}
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default SkillsPage;

