import React from 'react';
import { useTranslation } from 'react-i18next';

const BentoSkills = () => {
  const { t } = useTranslation('common');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Backend & Core Architecture */}
      <div className="glass-card p-8 rounded-xl md:col-span-2">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">dns</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.backendTitle', 'Core Architecture & Backend')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Python', 'Django', 'Flask', 'PostgreSQL', 'SQLite', 'REST APIs', 'Node.js', 'Go / Golang'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Cloud & QA */}
      <div className="glass-card p-8 rounded-xl">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">cloud</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.toolsTitle', 'QA & Infrastructure')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Git / GitHub', 'GitHub Actions', 'Docker', 'Linux', 'REST Testing / Postman', 'Bash Scripting'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Frontend */}
      <div className="glass-card p-8 rounded-xl">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">palette</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.frontendTitle', 'Frontend & Style')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'CSS Grid / Flexbox', 'Framer Motion'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Game & Interactive Dev */}
      <div className="glass-card p-8 rounded-xl md:col-span-2">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">bolt</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.gamesTitle', 'Game & Interactive Engineering')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Godot Engine 4.4', 'GDScript', 'Pygame', 'HTML5 Game Dev', 'Data Visualization', 'Interactive UI'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoSkills;
