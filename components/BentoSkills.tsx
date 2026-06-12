import React from 'react';
import { useTranslation } from 'react-i18next';

const BentoSkills = () => {
  const { t } = useTranslation('common');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* ROW 1: Mobile (wide, col-span-2) + Back-End */}

      <div className="glass-card p-8 rounded-xl md:col-span-2">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">phone_iphone</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.mobileTitle', 'Mobile Development')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Swift', 'SwiftUI / UIKit', 'React Native', 'Expo', 'AdMob', 'iOS', 'Android'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 rounded-xl">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">dns</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.backendTitle', 'Back-End & APIs')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Python', 'Django', 'Flask', 'PostgreSQL', 'SQLite', 'Firebase', 'REST APIs'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ROW 2: Data & AI + Frontend + Tools — три равных блока */}

      <div className="glass-card p-8 rounded-xl">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">psychology</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.aiTitle', 'Data & AI')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'TensorFlow', 'LLM APIs', 'Prompt Engineering'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 rounded-xl">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">palette</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.frontendTitle', 'Frontend & Web')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'TypeScript', 'HTML5 / CSS3', 'Tailwind CSS', 'HTMX', 'Bootstrap'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-surface-variant rounded-full text-on-surface font-label-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 rounded-xl">
        <span className="material-symbols-outlined text-primary mb-4 text-4xl">build</span>
        <h3 className="font-display text-headline-md mb-4">
          {t('skills.toolsTitle', 'Tools & Infrastructure')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Git', 'Node.js', 'Postman', 'Linux / Bash', 'Godot', 'GDScript', 'Go'].map((skill) => (
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
