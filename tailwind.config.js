/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background), <alpha-value>)",
        "on-primary": "rgba(var(--on-primary), <alpha-value>)",
        "surface-container-low": "rgba(var(--surface-container-low), <alpha-value>)",
        tertiary: "#003c1c",
        "on-background": "rgba(var(--on-background), <alpha-value>)",
        "error-container": "#ffdad6",
        "on-primary-container": "#ff9db0",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#ffb2bf",
        "on-tertiary-fixed-variant": "#005229",
        "on-secondary-fixed-variant": "#524349",
        "tertiary-fixed": "#a8f4ba",
        "on-secondary-container": "rgba(var(--on-background), <alpha-value>)",
        surface: "rgba(var(--surface), <alpha-value>)",
        "tertiary-fixed-dim": "#8dd79f",
        "surface-tint": "#a73453",
        primary: "rgba(var(--primary), <alpha-value>)",
        "surface-variant": "rgba(var(--surface-variant), <alpha-value>)",
        "inverse-primary": "#ffb2bf",
        "on-surface-variant": "rgba(var(--on-surface-variant), <alpha-value>)",
        "surface-bright": "#24191a",
        "on-primary-fixed": "#3f0015",
        "surface-container-lowest": "#0A0708",
        "tertiary-container": "#00562b",
        "primary-fixed": "#ffd9de",
        "on-secondary": "#ffffff",
        outline: "rgba(var(--outline), <alpha-value>)",
        "surface-container": "rgba(var(--surface-container), <alpha-value>)",
        "on-primary-fixed-variant": "#871b3c",
        "secondary-fixed": "#f3dde5",
        "inverse-on-surface": "#ffecee",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#36292d",
        secondary: "#6b5a61",
        "on-secondary-fixed": "#24181e",
        error: "#ba1a1a",
        "secondary-container": "#3d2f34",
        "on-surface": "rgba(var(--on-surface), <alpha-value>)",
        "primary-container": "#8b1e3f",
        "surface-dim": "rgba(var(--surface), <alpha-value>)",
        "on-tertiary-fixed": "#00210d",
        "secondary-fixed-dim": "#d7c1c9",
        "on-error-container": "#93000a",
        "surface-container-high": "#2d2125",
        "on-tertiary-container": "#80ca93",
        "outline-variant": "rgba(var(--outline), <alpha-value>)",
        "inverse-surface": "rgba(var(--on-background), <alpha-value>)"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "1.5rem",
        full: "9999px"
      },
      spacing: {
        "section-gap-lg": "120px",
        "section-gap-md": "80px",
        unit: "8px",
        "margin-mobile": "20px",
        "container-max": "1200px",
        gutter: "24px"
      },
      fontFamily: {
        display: ["Hanken Grotesk", "Inter", "system-ui", "sans-serif"],
        "body-lg": ["Inter", "system-ui", "sans-serif"],
        "headline-md": ["Hanken Grotesk", "Inter", "system-ui", "sans-serif"],
        "label-sm": ["Geist", "Inter", "system-ui", "sans-serif"],
        code: ["Geist", "monospace"],
        "headline-lg": ["Hanken Grotesk", "Inter", "system-ui", "sans-serif"],
        "body-md": ["Inter", "system-ui", "sans-serif"]
      },
      fontSize: {
        display: ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "label-sm": ["13px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" }],
        code: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-lg": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    },
  },
  plugins: [],
};
