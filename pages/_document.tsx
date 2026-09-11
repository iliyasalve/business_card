import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Шрифты самохостятся из public/fonts, объявлены в styles/globals.css.
            Подрезанный набор Material Symbols собран под эти 20 иконок:
            arrow_forward, arrow_upward, build, call, chevron_left, chevron_right,
            close, cloud_done, dark_mode, dns, language, light_mode, mail, menu,
            palette, phone_iphone, psychology, send, terminal, verified_user.
            Новая иконка требует пересборки файла — иначе отрисуется словом. */}
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Шрифт h1 в hero — то есть шрифт LCP. Без preload браузер узнаёт
            о нём только после разбора CSS и раскладки. */}
        <link
          rel="preload"
          href="/fonts/hanken-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/material-symbols-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="font-body-md bg-background text-on-background">
        {/* Статический HTML английский. Лоадер нужен только тем, кому _app
            сейчас переключит язык, — остальным он прячет готовую страницу до
            конца загрузки JS. Выбор языка повторяет _app.tsx: сохранённый,
            иначе язык браузера. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
                } catch (e) {}
                var lng = navigator.language || 'en';
                try { lng = localStorage.getItem('i18nextLng') || lng; } catch (e) {}
                if (/^(ru|fr)\\b/.test(lng)) {
                  document.documentElement.classList.add('i18n-pending');
                }
              })();
            `,
          }}
        />
        <div id="global-loader">
          <div className="spinner"></div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            #global-loader {
              position: fixed;
              inset: 0;
              display: none;
              align-items: center;
              justify-content: center;
              background-color: #0f0a0c;
              z-index: 9999;
              transition: opacity 0.25s ease, visibility 0.25s ease;
            }
            html.i18n-pending #global-loader {
              display: flex;
            }
            html:not(.dark) #global-loader {
              background-color: #fbf9fa;
            }
            .spinner {
              width: 36px;
              height: 36px;
              border: 3px solid rgba(179, 57, 93, 0.15);
              border-top-color: #b3395d;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `
        }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
