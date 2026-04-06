import React, { ReactNode, useState } from 'react';
import ThemeToggle from './ThemeToggle';
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
  const { i18n, t } = useTranslation();

  // Function to change the language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // State to control whether the mobile menu is open or closed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="border-b border-gray-300 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: site title and experience link */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-semibold hover:underline">
              {t('header.title')}
            </Link>
            {/* Navigation links: hidden on mobile, visible on md and up */}
            <Link href="/experience" className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
              {t('header.experience')}
            </Link>
            <Link href="/skills" className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
                {t('header.skills')}
            </Link>
            <Link href="/education" className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
              {t('header.education')}
            </Link>
            <Link href="/training" className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
              {t('header.training')}
            </Link>
            <Link href="/projects" className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
              {t('header.projects')}
            </Link>
            <Link href="/hobbies" className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
              {t('header.hobbies')}
            </Link>
          </div>

          {/* Right side: language buttons and theme toggle, hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-4">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`px-2 py-1 rounded ${
                  i18n.language === code
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-200 dark:hover:bg-blue-700'
                }`}
              >
                {label}
              </button>
            ))}

            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </nav>

          {/* Hamburger button for mobile menu */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {/* Hamburger icon or close icon depending on state */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                // Close icon (X)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon (three lines)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu, visible only if mobileMenuOpen is true */}
        {mobileMenuOpen && (
          <nav className="absolute left-0 right-0 top-[73px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl z-50 flex flex-col p-6 space-y-4 md:hidden">
            <Link href="/experience" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-2" onClick={() => setMobileMenuOpen(false)}>
              {t('header.experience')}
            </Link>
            <Link href="/skills" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-2" onClick={() => setMobileMenuOpen(false)}>
                {t('header.skills')}
            </Link>
            <Link href="/education" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-2" onClick={() => setMobileMenuOpen(false)}>
              {t('header.education')}
            </Link>
            <Link href="/training" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-2" onClick={() => setMobileMenuOpen(false)}>
              {t('header.training')}
            </Link>
            <Link href="/projects" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-2" onClick={() => setMobileMenuOpen(false)}>
              {t('header.projects')}
            </Link>
            <Link href="/hobbies" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-2" onClick={() => setMobileMenuOpen(false)}>
              {t('header.hobbies')}
            </Link>

            <div className="flex items-center justify-between pt-2">
              <div className="flex space-x-2">
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeLanguage(code);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      i18n.language === code
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <ThemeToggle
                theme={theme}
                toggleTheme={() => {
                  toggleTheme();
                }}
              />
            </div>
          </nav>
        )}
      </header>

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-300 dark:border-gray-700 text-center text-sm">
        <ul className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 mb-4 text-gray-700 dark:text-gray-300">
          <li>{t('footer.emailLabel')}: <a href={`mailto:${t('footer.email')}`} className="text-blue-600 dark:text-blue-400 hover:underline">{t('footer.email')}</a></li>
          <li className="hidden sm:inline text-gray-300 dark:text-gray-600">|</li>
          <li>{t('footer.phoneLabel')}: <a href={`tel:${t('footer.phone')}`} className="text-blue-600 dark:text-blue-400 hover:underline">{t('footer.phone')}</a></li>
          <li className="hidden sm:inline text-gray-300 dark:text-gray-600">|</li>
          <li>{t('footer.linkedinLabel')}: <a href={t('footer.linkedin')} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{t('footer.linkedinName')}</a></li>
          <li className="hidden sm:inline text-gray-300 dark:text-gray-600">|</li>
          <li>{t('footer.githubLabel')}: <a href={t('footer.github')} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{t('footer.githubName')}</a></li>
        </ul>
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>

      {/* Floating Scroll to Top button */}
      <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="fixed bottom-12 md:bottom-8 right-6 md:right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform hover:-translate-y-1 focus:outline-none"
          aria-label="Scroll to top"
      >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
      </button>

      <PrivacyNotice />
    </div>
  );
};

export default Layout;
