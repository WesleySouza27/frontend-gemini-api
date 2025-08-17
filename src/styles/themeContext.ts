import { createContext } from 'react';
import { themes } from './theme';

export type ThemeName = keyof typeof themes;

export type ThemeModeCtx = { mode: ThemeName; toggle: () => void };

export const ThemeModeContext = createContext<ThemeModeCtx>({
  mode: 'dark',
  toggle: () => {},
});