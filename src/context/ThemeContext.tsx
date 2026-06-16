import React, { createContext, useContext, ReactNode } from 'react';
import { SDUITheme } from '../types/sdui.types';

const defaultTheme: SDUITheme = {
  primary: '#FF6B6B',
  background: '#FFFFFF',
  text: '#2D3748',
  cardBackground: '#F7FAFC',
};

const ThemeContext = createContext<SDUITheme>(defaultTheme);

interface ThemeProviderProps {
  theme?: SDUITheme;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const activeTheme = React.useMemo(() => {
    return {
      ...defaultTheme,
      ...theme,
    };
  }, [theme]);

  return <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): SDUITheme => {
  return useContext(ThemeContext);
};
