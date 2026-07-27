export const THEME_KEYS = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const getStoredTheme = () => {
  if (typeof window === 'undefined') return THEME_KEYS.LIGHT;
  return localStorage.getItem('theme') || THEME_KEYS.LIGHT;
};

export const setStoredTheme = (theme) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
};