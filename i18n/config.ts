import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enExperience from './locales/en/experience.json';
import enSkills from './locales/en/skills.json';
import enEducation from './locales/en/education.json';
import enTraining from './locales/en/training.json';
import enProjects from './locales/en/projects.json';
import enHobbies from './locales/en/hobbies.json';
import en404 from './locales/en/404.json';

import ruCommon from './locales/ru/common.json';
import ruExperience from './locales/ru/experience.json';
import ruSkills from './locales/ru/skills.json';
import ruEducation from './locales/ru/education.json';
import ruTraining from './locales/ru/training.json';
import ruProjects from './locales/ru/projects.json';
import ruHobbies from './locales/ru/hobbies.json';
import ru404 from './locales/ru/404.json';

import frCommon from './locales/fr/common.json';
import frExperience from './locales/fr/experience.json';
import frSkills from './locales/fr/skills.json';
import frEducation from './locales/fr/education.json';
import frTraining from './locales/fr/training.json';
import frProjects from './locales/fr/projects.json';
import frHobbies from './locales/fr/hobbies.json';
import fr404 from './locales/fr/404.json';

const storedLng = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, experience: enExperience, skills: enSkills, education: enEducation, training: enTraining, projects: enProjects, hobbies: enHobbies, '404': en404 },
      ru: { common: ruCommon, experience: ruExperience, skills: ruSkills, education: ruEducation, training: ruTraining, projects: ruProjects, hobbies: ruHobbies, '404': ru404 },
      fr: { common: frCommon, experience: frExperience, skills: frSkills, education: frEducation, training: frTraining, projects: frProjects, hobbies: frHobbies, '404': fr404 },
    },
    //lng: storedLng || 'fr',
    fallbackLng: 'en',
    ns: ['common', 'experience', 'skills', 'education', 'training', 'projects', 'hobbies', '404'], // namespaces
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18n;
