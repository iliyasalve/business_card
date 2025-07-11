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
      bg-privacy-light dark:bg-privacy-dark
      text-privacy-textLight dark:text-privacy-textDark
      p-4 shadow-xl z-50 text-base animate-fade-in
      flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4"
    >
      <p className="flex-1 text-center sm:text-left">
        {t('privacy.message')}{' '}
        <a
          href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-privacy-textDark dark:hover:text-privacy-textLight"
        >
          GitHub Privacy Policy
        </a>
        .
      </p>
      <button
        onClick={acceptPrivacy}
        className="
            bg-privacy DEFAULT
            dark:bg-privacy-buttonDarkBg
            text-privacy-textLight
            dark:text-privacy-textDark
            px-4 py-2 rounded
            hover:bg-privacy-buttonDarkHover
            transition
        "
        >
        {t('privacy.accept')}
      </button>
    </div>
  );
};

export default PrivacyNotice;
