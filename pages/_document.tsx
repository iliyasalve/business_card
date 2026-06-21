import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Geist:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-body-md bg-background text-on-background">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
                } catch (e) {}
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
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #0f0a0c;
              z-index: 9999;
              transition: opacity 0.25s ease, visibility 0.25s ease;
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
