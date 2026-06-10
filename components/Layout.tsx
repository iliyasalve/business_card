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
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'fr', label: 'Français' },
];

const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  const router = useRouter();
  const { i18n, t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState('home');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Smooth scroll implementation to avoid router latency in Safari
    const anchors = document.querySelectorAll('a[href^="#"]');
    const clickHandlers: { anchor: Element, handler: (e: Event) => void }[] = [];

    anchors.forEach((anchor) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      const clickHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation(); // Stop Next.js from intercepting the click and introducing route lag
        setActiveSection(targetId.slice(1));
        target.scrollIntoView({
          behavior: 'smooth'
        });
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
      if (isChangingLang) return; // Ignore observer triggers during language reflows
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* TopNavBar matching template exactly */}
      <nav className={`fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 transition-shadow duration-300 ${scrolled ? 'shadow-xl' : 'shadow-sm'}`}>
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-margin-mobile md:px-gutter h-20">
          <div className="font-display text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
            IG
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  className={
                    isActive
                      ? "text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1 font-medium transition-all"
                      : "text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors font-medium"
                  }
                  href={link.href}
                >
                  {t(link.labelKey, link.fallback)}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            {/* Language switch */}
            <div className="hidden md:flex items-center gap-4 text-sm font-medium">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`transition-all ${
                    i18n.language === code
                      ? 'bg-primary text-on-primary px-3 py-1.5 rounded-lg active:scale-95'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-desktop"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-variant/30"
            >
              <span className="material-symbols-outlined text-2xl">
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
            <div className="font-display text-headline-md font-bold text-primary dark:text-primary-fixed-dim">IG</div>
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
              return (
                <a
                  key={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    isActive
                      ? "mobile-nav-link py-3 border-b border-on-surface/5 text-primary dark:text-primary-fixed-dim font-medium transition-all"
                      : "mobile-nav-link py-3 border-b border-on-surface/5 text-on-surface-variant hover:text-primary transition-colors font-medium"
                  }
                  href={link.href}
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
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto py-section-gap-md px-margin-mobile md:px-gutter">
          <div className="mb-8 md:mb-0">
            <div className="font-display text-headline-md font-bold text-primary dark:text-primary-fixed-dim mb-2">
              IG
            </div>
            <p className="font-body-md text-on-secondary-container dark:text-on-secondary-container/70 max-w-xs">
              &copy; {new Date().getFullYear()} Iliya Glazunov. Crafted with precision.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h5 className="font-label-sm uppercase text-primary font-bold">Connect</h5>
              <a 
                className="text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors"
                href={t('footer.github', 'https://github.com/iliyasalve')}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                className="text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors"
                href={t('footer.linkedin', 'https://fr.linkedin.com/in/iliya-glazunov')}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-label-sm uppercase text-primary font-bold">Network</h5>
              <a 
                className="text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors"
                href={`mailto:${t('footer.email', 'iliya.glazunov.fr@gmail.com')}`}
              >
                Email
              </a>
              <a 
                className="text-on-secondary-container dark:text-on-secondary-container/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors"
                href={`tel:${t('footer.phone', '+33777777777')}`}
              >
                Phone
              </a>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyNotice />
    </div>
  );
};

export default Layout;
