import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from './theme';
import { ThemeModeContext } from './themeContext';
import type { ThemeName } from './themeContext';

export const AppThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<ThemeName>(
    () => (localStorage.getItem('theme') as ThemeName) || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggle = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  const value = useMemo(() => ({ mode, toggle }), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};