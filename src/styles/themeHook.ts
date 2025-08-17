import { useContext } from 'react';
import { ThemeModeContext } from './themeContext';

export const useThemeMode = () => useContext(ThemeModeContext);
