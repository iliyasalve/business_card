import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Уведомление о приватности и управление измерением аудитории.
 *
 * Почему отказ, а не баннер согласия: CNIL читает статью 82 loi Informatique
 * et Libertés как покрывающую чтение с устройства, а не только запись, — то
 * есть beacon попадает в область действия даже без кук. Из-под согласия он
 * выходит через исключение для измерения аудитории, а оно даётся при условии,
 * что у посетителя есть постоянно доступный способ возразить. Этот способ —
 * кнопка ниже плюс ссылка в футере, которая возвращает панель после закрытия.
 *
 * Флаг отказа — единственное, что сайт пишет в браузер по своей инициативе.
 * Хранение самого отказа согласия не требует: оно существует ровно для того,
 * чтобы исполнить просьбу посетителя.
 */
const DISMISSED = 'privacyAccepted';
const OPT_OUT = 'analyticsOptOut';
const BEACON = 'https://static.cloudflareinsights.com/beacon.min.js';

/** Событие из футера: вернуть панель после того, как её закрыли. */
export const PRIVACY_OPEN_EVENT = 'privacy:open';

/** Чтение падает в приватных режимах и при заблокированном хранилище. */
function optedOut(): boolean {
  try {
    return localStorage.getItem(OPT_OUT) === 'true';
  } catch {
    // Нечитаемое хранилище — это неизвестный выбор. Измерять в таком случае
    // значило бы проигнорировать отказ, которого мы просто не видим.
    return true;
  }
}

function dismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED) === 'true';
  } catch {
    return false;
  }
}

/**
 * Ставит beacon, если посетитель не возражал. Без токена не делает ничего,
 * поэтому сайт живёт без аналитики, пока переменная сборки не задана.
 */
function injectBeacon(): void {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token || optedOut()) return;
  if (document.querySelector(`script[src="${BEACON}"]`)) return;

  const s = document.createElement('script');
  // type=module повторяет сниппет, который Cloudflare выдаёт в панели.
  // Модуль отложен по умолчанию, отдельный defer ему не нужен.
  s.type = 'module';
  s.src = BEACON;
  s.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(s);
}

const PrivacyNotice: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [refused, setRefused] = useState(false);

  useEffect(() => {
    injectBeacon();
    setRefused(optedOut());

    if (!dismissed()) {
      setTimeout(() => setVisible(true), 300);
    }

    const open = () => setVisible(true);
    window.addEventListener(PRIVACY_OPEN_EVENT, open);
    return () => window.removeEventListener(PRIVACY_OPEN_EVENT, open);
  }, []);

  const acceptPrivacy = () => {
    try {
      localStorage.setItem(DISMISSED, 'true');
    } catch {
      /* Панель всё равно закроется до конца сессии. */
    }
    setVisible(false);
  };

  const toggleAnalytics = () => {
    const next = !refused;
    try {
      if (next) localStorage.setItem(OPT_OUT, 'true');
      else localStorage.removeItem(OPT_OUT);
      localStorage.setItem(DISMISSED, 'true');
    } catch {
      /* Выбор не сохранился; страница отражает его до перезагрузки. */
    }
    // Перезагрузка, чтобы ответ был однозначным: уже загруженный beacon
    // выгрузить нельзя, и оставить его работать после отказа значило бы
    // сделать кнопку декорацией.
    window.location.reload();
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
      <div className="flex items-center gap-3 shrink-0">
        {/* aria-pressed описывает возражение, а не измерение: нажато — значит
            посетитель отказался. */}
        <button
          onClick={toggleAnalytics}
          aria-pressed={refused}
          className="px-4 py-2.5 rounded-xl border border-outline/40 text-on-surface/80 font-semibold hover:text-on-surface hover:border-outline transition-all active:scale-95 text-sm"
        >
          {refused
            ? t('privacy.optIn', 'Allow analytics')
            : t('privacy.optOut', 'Opt out of analytics')}
        </button>
        <button
          onClick={acceptPrivacy}
          className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 text-sm"
        >
          {t('privacy.accept', 'OK')}
        </button>
      </div>
    </div>
  );
};

export default PrivacyNotice;
