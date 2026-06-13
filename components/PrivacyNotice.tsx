import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyNotice: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('privacyAccepted');
    if (!accepted) {
      setTimeout(() => setVisible(true), 300);
    }
  }, []);

  const acceptPrivacy = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full
      bg-surface-container text-on-surface border-t border-outline/20
      p-4 md:p-6 shadow-2xl z-50 text-sm md:text-base animate-fade-in
      flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6"
    >
      <p className="flex-1 text-center sm:text-left leading-relaxed">
        {(() => {
          const message = t('privacy.message');
          // Simple parser for markdown links: [text](url)
          const parts = message.split(/(\[[^\]]+\]\([^)]+\))/g);
          return parts.map((part: string, index: number) => {
            const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (match) {
              return (
                <a
                  key={index}
                  href={match[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold hover:text-primary transition-colors"
                >
                  {match[1]}
                </a>
              );
            }
            return part;
          });
        })()}
      </p>
      <button
        onClick={acceptPrivacy}
        className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 text-sm shrink-0"
      >
        {t('privacy.accept', 'OK')}
      </button>
    </div>
  );
};

export default PrivacyNotice;
