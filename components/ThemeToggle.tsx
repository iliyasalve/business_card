import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {theme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Sun icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m8.485-9h1M3 12h1m15.364-5.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Moon icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
