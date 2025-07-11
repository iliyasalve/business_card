import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../i18n/config';
import i18n from '../i18n/config';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isReady, setIsReady] = useState(false); // track client hydration

  useEffect(() => {
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
        setIsReady(true); // mark ready only after language changed
      });
    } else {
      setIsReady(true); // no language change needed, mark ready immediately
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!isReady) {
    // Avoid rendering UI until language (and theme) synced
    return null; // or a spinner/loading indicator if хочешь
  }

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
