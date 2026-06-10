import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  techs: string[];
  link: string;
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
      link: 'https://eurasieanalyse.fr',
      image: '/images/project_eurasie.png',
    },
    {
      id: 'aco',
      titleKey: 'aco.title',
      descKey: 'aco.description',
      techs: ['JavaScript', 'Python', 'Algorithms'],
      link: 'https://github.com/iliyasalve/aco-routing',
      image: '/images/base_aco.png',
    },
    {
      id: 'blockchain',
      titleKey: 'blockchain.title',
      descKey: 'blockchain.description',
      techs: ['Python', 'Flask', 'Cryptography'],
      link: 'https://github.com/iliyasalve/Mini-Blockchain',
      image: '/images/project_titan.png',
    },
    {
      id: 'ml',
      titleKey: 'ml.title',
      descKey: 'ml.description',
      techs: ['Python', 'Scikit-Learn', 'Pandas'],
      link: 'https://github.com/iliyasalve/salifort_motors_hr_analytics',
      image: '/images/project_nebula.png',
    },
    {
      id: 'pentaword',
      titleKey: 'pentaword.title',
      descKey: 'pentaword.description',
      techs: ['Python', 'Asyncio', 'aiogram'],
      link: 'https://github.com/iliyasalve/pentaword_telegram_bot',
      image: '/images/project_echo.png',
    },
    {
      id: 'chicken',
      titleKey: 'chicken.title',
      descKey: 'chicken.description',
      techs: ['HTML5', 'JavaScript', 'Canvas'],
      link: 'https://github.com/iliyasalve/Clicker_Game',
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
    <div className="relative w-full overflow-visible md:overflow-hidden pt-4 -mt-4">
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
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.techs.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm uppercase font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-headline-md mb-2 group-hover:text-primary transition-colors duration-300">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                    {t(project.descKey)}
                  </p>
                </div>
                <div className="flex gap-4 mt-auto">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-on-surface"
                  >
                    <span className="material-symbols-outlined text-sm">link</span>
                  </a>
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
