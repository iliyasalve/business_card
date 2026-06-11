import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import PrivacyNotice from './PrivacyNotice';

interface LayoutProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'fr', label: 'Français', short: 'FR' },
];

const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  const router = useRouter();
  const { i18n, t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [activeSection, setActiveSection] = useState('home');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const scrollToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#home');
    if (target) {
      setActiveSection('home');
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { href: '#home', labelKey: 'header.home', fallback: 'Home' },
    { href: '#about', labelKey: 'header.about', fallback: 'About' },
    { href: '#skills', labelKey: 'header.skills', fallback: 'Skills' },
    { href: '#experience', labelKey: 'header.experience', fallback: 'Experience' },
    { href: '#projects', labelKey: 'header.projects', fallback: 'Projects' },
    { href: '#education', labelKey: 'header.education', fallback: 'Education' },
    { href: '#contact', labelKey: 'header.contact', fallback: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Smooth scroll implementation to avoid router latency in Safari
    const anchors = document.querySelectorAll('a[href^="#"]');
    const clickHandlers: { anchor: Element, handler: (e: Event) => void }[] = [];

    let isScrollingClick = false;
    let scrollTimeout: any = null;
    const isHomePage = router.pathname === '/';

    anchors.forEach((anchor) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId) return;

      const clickHandler = (e: Event) => {
        if (!isHomePage) return; // Allow normal navigation on subpages
        e.preventDefault();
        e.stopPropagation(); // Stop Next.js from intercepting the click and introducing route lag
        const target = document.querySelector(targetId);
        if (target) {
          isScrollingClick = true;
          setActiveSection(targetId.slice(1));
          target.scrollIntoView({
            behavior: 'smooth'
          });

          if (scrollTimeout) clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrollingClick = false;
          }, 1000);
        }
      };
      anchor.addEventListener('click', clickHandler);
      clickHandlers.push({ anchor, handler: clickHandler });
    });

    // Scroll spy IntersectionObserver modifying state to bypass React re-render lag
    let isChangingLang = false;
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isChangingLang || isScrollingClick) return; // Ignore observer triggers during language reflows or click scrolls
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          if (activeId) {
            setActiveSection(activeId);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Handle language switch scroll shifts by re-aligning the active section
    const handleLangChange = () => {
      isChangingLang = true;

      // Small delay to let Next/i18n update DOM layout dimensions
      setTimeout(() => {
        const allSections = document.querySelectorAll('section[id]');
        let closestSectionId = 'home';
        let minDiff = Infinity;
        
        allSections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const diff = Math.abs(rect.top);
          if (diff < minDiff) {
            minDiff = diff;
            closestSectionId = section.getAttribute('id') || 'home';
          }
        });

        setActiveSection(closestSectionId);

        const target = document.getElementById(closestSectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'auto' });
        }
        // Release lock after layout settled
        setTimeout(() => {
          isChangingLang = false;
        }, 100);
      }, 100);
    };

    i18n.on('languageChanged', handleLangChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => observer.unobserve(section));
      i18n.off('languageChanged', handleLangChange);
      clickHandlers.forEach(({ anchor, handler }) => {
        anchor.removeEventListener('click', handler);
      });
    };
  }, [i18n.language]);

  // Handle scrolling to anchor on initial load or cross-page navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          setActiveSection(hash.slice(1));
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [router.asPath]);

  const isHomePage = router.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* TopNavBar matching template exactly */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-on-surface/10">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-margin-mobile md:px-gutter h-20">
          <a href={isHomePage ? "#home" : "/"} className="font-display text-headline-md font-bold tracking-tight flex items-center shrink-0 cursor-pointer select-none no-underline text-on-surface dark:text-white hover:text-on-surface dark:hover:text-white hover:opacity-100 group transition-none">
            <span className="opacity-40 group-hover:opacity-80 transition-opacity font-light">{'{'}</span>
            <span className="text-primary dark:text-primary-fixed-dim mx-1.5">IG</span>
            <span className="opacity-30 group-hover:opacity-70 transition-opacity mx-1">:</span>
            <span className="text-on-surface/80 dark:text-on-surface/90 group-hover:text-on-surface dark:group-hover:text-white transition-all mx-1.5">dev</span>
            <span className="opacity-40 group-hover:opacity-80 transition-opacity font-light">{'}'}</span>
          </a>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              const href = isHomePage ? link.href : `/${link.href}`;
              return (
                <a
                  key={link.href}
                  className={
                    isActive
                      ? "text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1 font-medium transition-all text-sm lg:text-base"
                      : "text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors font-medium text-sm lg:text-base"
                  }
                  href={href}
                >
                  {t(link.labelKey, link.fallback)}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3 lg:gap-6 shrink-0">
            {/* Language switch */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 text-xs lg:text-sm font-medium">
              {languages.map(({ code, short }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`transition-all px-2 py-1 rounded-md ${
                    i18n.language === code
                      ? 'bg-primary text-on-primary active:scale-95'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {short}
                </button>
              ))}
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-desktop"
              className="hidden md:flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-lg text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-variant/30"
            >
              <span className="material-symbols-outlined text-xl lg:text-2xl">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-btn"
              className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        ></div>
      )}

      {/* Mobile Menu Panel matching template exactly */}
      <div 
        className={`fixed right-0 top-0 bottom-0 w-[300px] z-50 bg-surface dark:bg-surface backdrop-blur-xl border-l border-on-surface/10 flex flex-col justify-between p-6 transition-transform duration-300 transform md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-center h-20 border-b border-on-surface/10 mb-6">
            <a href={isHomePage ? "#home" : "/"} onClick={() => setMobileMenuOpen(false)} className="font-display text-headline-md font-bold tracking-tight flex items-center cursor-pointer select-none no-underline text-on-surface dark:text-white hover:text-on-surface dark:hover:text-white hover:opacity-100 group transition-none">
              <span className="opacity-40 group-hover:opacity-80 transition-opacity font-light">{'{'}</span>
              <span className="text-primary dark:text-primary-fixed-dim mx-1.5">IG</span>
              <span className="opacity-30 group-hover:opacity-70 transition-opacity mx-1">:</span>
              <span className="text-on-surface/80 dark:text-on-surface/90 group-hover:text-on-surface dark:group-hover:text-white transition-all mx-1.5">dev</span>
              <span className="opacity-40 group-hover:opacity-80 transition-opacity font-light">{'}'}</span>
            </a>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-col text-base font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              const href = isHomePage ? link.href : `/${link.href}`;
              return (
                <a
                  key={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    isActive
                      ? "mobile-nav-link py-3 border-b border-on-surface/5 text-primary dark:text-primary-fixed-dim font-medium transition-all"
                      : "mobile-nav-link py-3 border-b border-on-surface/5 text-on-surface-variant hover:text-primary transition-colors font-medium"
                  }
                  href={href}
                >
                  {t(link.labelKey, link.fallback)}
                </a>
              );
            })}
          </div>
        </div>
        {/* Bottom Controls */}
        <div className="flex flex-col gap-6 pt-6 border-t border-on-surface/10 mt-auto">
          <div className="flex flex-wrap gap-2 text-sm font-medium">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  i18n.language === code
                    ? 'bg-primary text-on-primary active:scale-95'
                    : 'text-on-surface-variant bg-surface-variant/30 hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button 
            onClick={toggleTheme}
            className="w-12 h-12 rounded-xl bg-surface-variant/30 border border-outline/20 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
          >
            <span className="material-symbols-outlined text-2xl">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-grow w-full">{children}</main>

      {/* Footer matching template exactly */}
      <footer className="w-full bg-surface-container dark:bg-surface-container-lowest border-t border-on-surface/5">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto py-12 px-margin-mobile md:px-gutter">
          <div className="mb-8 md:mb-0 w-full md:w-auto max-w-[345px] md:max-w-none mx-auto md:mx-0 text-left">
            <a href={isHomePage ? "#home" : "/"} className="font-display text-headline-md font-bold tracking-tight inline-flex items-center mb-2 cursor-pointer select-none no-underline text-on-surface dark:text-white hover:text-on-surface dark:hover:text-white hover:opacity-100 group transition-none">
              <span className="opacity-40 group-hover:opacity-80 transition-opacity font-light">{'{'}</span>
              <span className="text-primary dark:text-primary-fixed-dim mx-1.5">IG</span>
              <span className="opacity-30 group-hover:opacity-70 transition-opacity mx-1">:</span>
              <span className="text-on-surface/80 dark:text-on-surface/90 group-hover:text-on-surface dark:group-hover:text-white transition-all mx-1.5">dev</span>
              <span className="opacity-40 group-hover:opacity-80 transition-opacity font-light">{'}'}</span>
            </a>
            <p className="font-body-md text-on-secondary-container dark:text-on-secondary-container/70 max-w-md text-left">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
          <div className="flex justify-between w-full md:w-auto max-w-[345px] md:max-w-none mx-auto md:mx-0 md:justify-start md:gap-12 lg:gap-24 shrink-0">
            <div className="flex flex-col gap-3">
              <h5 className="font-label-sm uppercase text-primary font-bold">{t('footer.networkLabel', 'Network')}</h5>
              <a 
                className="flex items-center gap-2 text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-left"
                href={t('footer.github', 'https://github.com/iliyasalve')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                {t('footer.githubLabel', 'GitHub')}
              </a>
              <a 
                className="flex items-center gap-2 text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-left"
                href={t('footer.linkedin', 'https://fr.linkedin.com/in/iliya-glazunov')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                {t('footer.linkedinLabel', 'LinkedIn')}
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-label-sm uppercase text-primary font-bold">{t('footer.connectLabel', 'Connect')}</h5>
              <a 
                className="flex items-center gap-2 text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-left"
                href={`mailto:${t('footer.email', 'iliyasalve@gmail.com')}`}
              >
                <span className="material-symbols-outlined text-lg w-5 h-5 flex items-center justify-center shrink-0">mail</span>
                {t('footer.emailLabel', 'Email')}
              </a>
              <a 
                className="flex items-center gap-2 text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-left"
                href={`tel:${t('footer.phone', '+33753662400')}`}
              >
                <span className="material-symbols-outlined text-lg w-5 h-5 flex items-center justify-center shrink-0">call</span>
                {t('footer.phoneLabel', 'Phone')}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyNotice />

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 rounded-full bg-primary text-on-primary shadow-lg shadow-primary/20 flex items-center justify-center hover:-translate-y-1 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <span className="material-symbols-outlined text-2xl font-bold">arrow_upward</span>
      </button>
    </div>
  );
};

export default Layout;
