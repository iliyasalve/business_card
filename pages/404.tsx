import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Seo from '../components/Seo';

const Custom404 = () => {
  const { t } = useTranslation('404');
  const parallaxRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
        parallaxRef.current.style.transition = 'transform 0.1s ease-out';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Seo
        title={t('title')}
        description={t('description')}
        keywords={t('keywords')}
        pageSlug="404"
      />
      
      {/* 404 Main Canvas responding to light/dark themes natively */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 px-margin-mobile bg-background text-on-background overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full" />

        <div className="max-w-[1200px] w-full text-center relative z-10">
          {/* Massive Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none">
            <span
              ref={parallaxRef}
              className="font-display font-bold text-[250px] md:text-[400px] lg:text-[550px] leading-none error-number-bg inline-block"
            >
              404
            </span>
          </div>

          {/* Content Overlay */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-display text-headline-lg md:text-display text-on-surface tracking-tight text-glow-subtle mb-6 leading-tight">
              {t('heading')}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-xl mx-auto leading-relaxed">
              {t('text')}
            </p>

            {/* Terminal Message */}
            <div className="mt-10 p-4 px-6 rounded-lg bg-surface-variant/30 border border-outline/10 backdrop-blur-sm max-w-md mx-auto hidden md:block">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">terminal</span>
                <p className="font-code text-[13px] text-on-surface-variant/80 uppercase tracking-wider">
                  {t('terminalErr')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-12 flex flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto">
              <Link
                href="/#home"
                className="flex-grow sm:flex-grow-0 px-8 md:px-10 py-4 bg-primary text-on-primary rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 hover:opacity-100 transition-all active:scale-95 text-center"
              >
                {t('backToHome')}
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link
                href="/#projects"
                className="flex-grow sm:flex-grow-0 px-8 md:px-10 py-4 border border-outline/30 text-on-surface rounded-full font-bold hover:bg-surface-variant hover:text-primary hover:opacity-100 transition-all text-center"
              >
                {t('viewProjects')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
