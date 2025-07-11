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
            {/* Experience link: hidden on mobile, visible on medium screens and up */}
            <Link
              href="/experience"
              className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
            >
              {t('header.experience')}
            </Link>
            <Link
                href="/skills"
                className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
            >
                {t('header.skills')}
            </Link>
            <Link 
                href="/education" 
                className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
            >
              {t('header.education')}
            </Link>
            <Link 
                href="/training" 
                className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
            >
              {t('header.training')}
            </Link>
            <Link 
                href="/projects" 
                className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
            >
              {t('header.projects')}
            </Link>
            <Link 
                href="/hobbies" 
                className="hidden md:inline-block px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
            >
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
          <nav className="mt-4 flex flex-col space-y-2 md:hidden">
            <Link
              href="/experience"
              className="px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
              onClick={() => setMobileMenuOpen(false)} // Close menu on click
            >
              {t('header.experience')}
            </Link>
            <Link
                href="/skills"
                className="px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                >
                {t('header.skills')}
            </Link>
            <Link href="/education" className="px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
              {t('header.education')}
            </Link>
            <Link href="/training" className="px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
              {t('header.training')}
            </Link>
            <Link href="/projects" className="px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
              {t('header.projects')}
            </Link>
            <Link href="/hobbies" className="px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
              {t('header.hobbies')}
            </Link>

            <div className="flex space-x-2">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    changeLanguage(code);
                    setMobileMenuOpen(false); // Close menu on language change
                  }}
                  className={`px-2 py-1 rounded ${
                    i18n.language === code
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-blue-200 dark:hover:bg-blue-700'
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
                setMobileMenuOpen(false); // Close menu on theme toggle
              }}
            />
          </nav>
        )}
      </header>

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-300 dark:border-gray-700 text-center text-sm">
        <p>
          {t('footer.emailLabel')}: <a href={`mailto:${t('footer.email')}`}>{t('footer.email')}</a>
          <span className="mx-2">|</span>
          {t('footer.phoneLabel')}: <a href={`tel:${t('footer.phone')}`}>{t('footer.phone')}</a>
          <span className="mx-2">|</span>
          {t('footer.linkedinLabel')}: <a href={t('footer.linkedin')} target="_blank" rel="noopener noreferrer">{t('footer.linkedinName')}</a>
          <span className="mx-2">|</span>
          {t('footer.githubLabel')}: <a href={t('footer.github')} target="_blank" rel="noopener noreferrer">{t('footer.githubName')}</a>
        </p>
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>



      <PrivacyNotice />
    </div>
  );
};

export default Layout;
