import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../i18n/config';
import i18n from '../i18n/config';
import '../styles/globals.css';

/** localStorage бросает исключение, когда хранилище сайта заблокировано. */
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

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
    const savedTheme = readStorage('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    const hideLoader = () => {
      const loader = document.getElementById('global-loader');
      if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
          loader.remove();
        }, 300);
      }
    };

    // Load language from localStorage or fallback to browser language
    let detectedLng = 'en';
    const saved = readStorage('i18nextLng');
    if (saved) {
      detectedLng = saved;
    } else {
      const browserLng = navigator.language || 'en';
      const shortLng = browserLng.split('-')[0];
      if (['en', 'ru', 'fr'].includes(shortLng)) {
        detectedLng = shortLng;
      }
    }

    // Смену языка откладываем на отдельную задачу. В продовой сборке React 18
    // на момент выполнения эффекта ещё не закончил гидратацию, и смена текста
    // прямо здесь рвёт её — те самые #418/#423/#425. setTimeout уводит смену
    // в следующий макротаск, когда гидратация уже закоммичена.
    const applyLanguage = () => {
      // Промис changeLanguage не ждём: словари лежат в бандле (resources в
      // i18n/config.ts), загружать нечего, смена языка происходит сразу.
      // Снятие лоадера на него не вешаем — единственный экран, который видит
      // пользователь до конца переключения, не должен зависеть от промиса.
      i18n.changeLanguage(detectedLng);
      setCurrentLanguage(detectedLng);
      document.documentElement.setAttribute('lang', detectedLng);
      // Даём React отрисовать новый язык до снятия лоадера, иначе мелькнёт
      // английский.
      requestAnimationFrame(() => {
        setTimeout(hideLoader, 100);
      });
    };
    const languageTimer = setTimeout(applyLanguage, 0);

    // Subscribe to language updates to force re-render
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      document.documentElement.setAttribute('lang', lng);
    };
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      clearTimeout(languageTimer);
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
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      /* Тема переключится, но не запомнится. */
    }
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
