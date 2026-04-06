import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../i18n/config';
import i18n from '../i18n/config';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isReady, setIsReady] = useState(false); // track client hydration

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

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Load language from localStorage and apply to i18n
    const savedLng = localStorage.getItem('i18nextLng');
    if (savedLng && i18n.language !== savedLng) {
      i18n.changeLanguage(savedLng).then(() => {
        setIsReady(true);
      });
    } else {
      setIsReady(true);
    }

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const router = useRouter();
  const isPrivacyRoute = router.pathname.startsWith('/privacy');

  if (!isReady) {
    // Avoid rendering UI until language (and theme) synced
    return null; // or a spinner/loading indicator if хочешь
  }

  if (isPrivacyRoute) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
