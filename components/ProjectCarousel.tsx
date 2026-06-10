import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectLink {
  url: string;
  type: 'website' | 'github';
  label?: string;
}

interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  techs: string[];
  links: ProjectLink[];
  image: string;
}

const ProjectCarousel = () => {
  const { t } = useTranslation('projects');
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);

  const projects: Project[] = [
    {
      id: 'eurasie',
      titleKey: 'eurasie.title',
      descKey: 'eurasie.description',
      techs: ['Django', 'PostgreSQL', 'TailwindCSS'],
      links: [
        { url: 'https://eurasieanalyse.fr', type: 'website', label: 'Website' }
      ],
      image: '/images/project_eurasie.png',
    },
    {
      id: 'aco',
      titleKey: 'aco.title',
      descKey: 'aco.description',
      techs: ['JavaScript', 'Python', 'Algorithms'],
      links: [
        { url: 'https://iliyasalve.github.io/aco-routing-exploration/', type: 'website', label: 'Demo' },
        { url: 'https://github.com/iliyasalve/aco-routing-exploration', type: 'github', label: 'GitHub' }
      ],
      image: '/images/base_aco.png',
    },
    {
      id: 'blockchain',
      titleKey: 'blockchain.title',
      descKey: 'blockchain.description',
      techs: ['Python', 'Flask', 'Cryptography'],
      links: [
        { url: 'https://github.com/iliyasalve/Mini-Blockchain', type: 'github', label: 'GitHub' }
      ],
      image: '/images/project_blockchain.png',
    },
    {
      id: 'ml',
      titleKey: 'ml.title',
      descKey: 'ml.description',
      techs: ['Python', 'Scikit-Learn', 'Pandas'],
      links: [
        { url: 'https://github.com/iliyasalve/salifort_motors_hr_analytics', type: 'github', label: 'Salifort Motors HR' },
        { url: 'https://github.com/iliyasalve/tiktok_claim_classification_model', type: 'github', label: 'TikTok Classifier' }
      ],
      image: '/images/project_nebula.png',
    },
    {
      id: 'chicken',
      titleKey: 'chicken.title',
      descKey: 'chicken.description',
      techs: ['HTML5', 'JavaScript', 'Canvas'],
      links: [
        { url: 'https://iliyasalve.github.io/chicken-strike/', type: 'website', label: 'Play Game' },
        { url: 'https://github.com/iliyasalve/chicken-strike', type: 'github', label: 'GitHub' }
      ],
      image: '/images/project_aura.png',
    },
  ];

  // In the template, desktop clones first 3 cards to loop infinitely
  const displayProjects = isDesktop 
    ? [...projects, ...projects.slice(0, 3)] 
    : projects.slice(0, 2);

  const updateDimensions = () => {
    const desktop = window.innerWidth >= 768;
    setIsDesktop(desktop);
    if (firstCardRef.current) {
      setCardWidth(firstCardRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    // Extra timeout to ensure DOM layout has finalized
    const timer = setTimeout(() => {
      if (firstCardRef.current) {
        setCardWidth(firstCardRef.current.offsetWidth);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const handleNext = () => {
    if (!isDesktop) return;
    setAnimate(true);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex >= projects.length) {
      setTimeout(() => {
        setAnimate(false);
        setCurrentIndex(0);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (!isDesktop) return;
    if (currentIndex === 0) {
      setAnimate(false);
      setCurrentIndex(projects.length);
      // Wait for state to apply without transition, then slide back to length - 1
      setTimeout(() => {
        setAnimate(true);
        setCurrentIndex(projects.length - 1);
      }, 20);
    } else {
      setAnimate(true);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const gapSize = 32; // gap-8 = 32px
  const offset = isDesktop ? -currentIndex * (cardWidth + gapSize) : 0;

  return (
    <div className="relative w-full overflow-hidden pt-4 -mt-4">
      {/* Header controls matching template */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="font-display text-headline-lg mb-4">
            {t('title', 'Featured Projects')}
          </h2>
          <p className="text-on-surface-variant max-w-md md:max-w-3xl mb-4 font-body-lg">
            {t('intro', 'Selection of my projects and production-grade software architectures.')}
          </p>
          <a 
            href="https://github.com/iliyasalve" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-primary dark:text-primary-fixed-dim hover:opacity-80 transition-opacity font-bold"
          >
            {t('viewGithub', 'View GitHub')}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={handlePrev}
            id="project-prev"
            className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-on-surface"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            onClick={handleNext}
            id="project-next"
            className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-on-surface"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Slide Track matching template behavior */}
      <div className="relative w-full">
        <div 
          ref={trackRef}
          id="project-track"
          className="flex flex-col md:flex-row gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: isDesktop ? `translate3d(${offset}px, 0, 0)` : 'none',
            transition: animate ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {displayProjects.map((project, idx) => (
            <div 
              key={`${project.id}-${idx}`}
              ref={idx === 0 ? firstCardRef : undefined}
              className="group relative overflow-hidden rounded-3xl glass-card w-full md:w-[calc((100%-4rem)/3)] shrink-0 flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={project.image}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex gap-2 mb-4 flex-wrap h-14 overflow-hidden content-start">
                    {project.techs.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm uppercase font-bold mb-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-headline-md mb-2 group-hover:text-primary transition-colors duration-300 min-h-[64px] flex items-center">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                    {t(project.descKey)}
                  </p>
                </div>
                <div className="flex gap-4 mt-auto flex-wrap">
                  {project.links.map((link, lIdx) => (
                    <a 
                      key={lIdx}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title={link.label || (link.type === 'github' ? 'GitHub Repository' : 'Live Website')}
                      className="w-10 h-10 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-on-surface hover:border-primary"
                    >
                      {link.type === 'github' ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                        </svg>
                      ) : (
                        <span className="material-symbols-outlined text-xl">language</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
