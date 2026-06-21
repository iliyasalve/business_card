import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../i18n/config';
import i18n from '../i18n/config';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Suppress non-fatal React Fiber / Permission denied errors from browser extensions or third-party scripts
    const handleError = (e: ErrorEvent | PromiseRejectionEvent) => {
      const message = 'reason' in e ? e.reason?.message : e.message;
      if (
        message?.includes('__reactFiber') || 
        message?.includes('Permission denied to access property')
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    // Load theme from localStorage, default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Load language from localStorage and apply to i18n
    const savedLng = localStorage.getItem('i18nextLng') || i18n.language || 'en';
    if (i18n.language !== savedLng) {
      i18n.changeLanguage(savedLng).then(() => {
        setCurrentLanguage(savedLng);
        document.documentElement.setAttribute('lang', savedLng);
      });
    } else {
      setCurrentLanguage(savedLng);
      document.documentElement.setAttribute('lang', savedLng);
    }

    // Subscribe to language updates to force re-render
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      document.documentElement.setAttribute('lang', lng);
    };
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // 1. Блокируем анимации переходов перед сменой классов темы
    document.documentElement.classList.add('no-transitions');

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');

    // 2. Принудительно вызываем перерисовку (reflow) для мгновенного применения стилей
    document.documentElement.offsetHeight;

    // 3. На следующем кадре возвращаем анимации обратно
    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-transitions');
    });
  };

  const router = useRouter();
  const isPrivacyRoute = router.pathname.startsWith('/privacy');



  if (isPrivacyRoute) {
    return <Component {...pageProps} key={currentLanguage} />;
  }

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <Component {...pageProps} key={currentLanguage} />
    </Layout>
  );
}

export default MyApp;
