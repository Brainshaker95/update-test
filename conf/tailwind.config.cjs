const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {Record<string, string>}
 */
const spacing = {};

Object.entries(defaultTheme.spacing).forEach(([key, value]) => {
  if (!Number.isNaN(Number(key)) && typeof value === 'string') {
    spacing[`${key}-em`] = `${parseFloat(value)}em`;
  }
});

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  content: [
    './src/**/*.svelte',
    './src/**/*.ts',
    './src/app.html',
  ],
  theme: {
    extend: {
      spacing,
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '2560px',
      },
      colors: {
        light: 'rgba(var(--clr-light) / <alpha-value>)',
        dark: 'rgba(var(--clr-dark) / <alpha-value>)',
        grey: 'rgba(var(--clr-grey) / <alpha-value>)',
        primary: 'rgba(var(--clr-primary) / <alpha-value>)',
        success: 'rgba(var(--clr-success) / <alpha-value>)',
        error: 'rgba(var(--clr-error) / <alpha-value>)',
      },
      content: {
        empty: '""',
      },
      fontFamily: {
        body: ['var(--ff-body)'],
      },
      fontSize: {
        xs: ['var(--fs-xs)', 'var(--lh-xs)'],
        sm: ['var(--fs-sm)', 'var(--lh-sm)'],
        md: ['var(--fs-md)', 'var(--lh-md)'],
        lg: ['var(--fs-lg)', 'var(--lh-lg)'],
        xl: ['var(--fs-xl)', 'var(--lh-xl)'],
        '2xl': ['var(--fs-2xl)', 'var(--lh-2xl)'],
        '3xl': ['var(--fs-3xl)', 'var(--lh-3xl)'],
      },
      fontWeight: {
        extralight: 'var(--fw-extralight)',
        light: 'var(--fw-light)',
        regular: 'var(--fw-regular)',
        medium: 'var(--fw-medium)',
        semibold: 'var(--fw-semibold)',
        bold: 'var(--fw-bold)',
        extrabold: 'var(--fw-extrabold)',
        black: 'var(--fw-black)',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
};

module.exports = config;
