'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme =
  | 'matrix'
  | 'cyber'
  | 'neon'
  | 'amber'
  | 'blue'
  | 'red'
  | 'purple'
  | 'white'
  | 'crt'
  | 'powershell'
  | 'atari';

export interface ThemeColors {
  background: string;
  text: string;
  textSecondary: string;
  textError: string;
  border: string;
  cursor: string;
  prompt: string;
}

const themes: Record<Theme, ThemeColors> = {
  matrix: {
    background: 'bg-black',
    text: 'text-green-400',
    textSecondary: 'text-green-300',
    textError: 'text-red-400',
    border: 'border-green-600',
    cursor: 'text-green-400',
    prompt: 'text-green-300',
  },
  cyber: {
    background: 'bg-black',
    text: 'text-cyan-400',
    textSecondary: 'text-cyan-300',
    textError: 'text-red-400',
    border: 'border-cyan-600',
    cursor: 'text-cyan-400',
    prompt: 'text-cyan-300',
  },
  neon: {
    background: 'bg-black',
    text: 'text-pink-400',
    textSecondary: 'text-pink-300',
    textError: 'text-red-400',
    border: 'border-pink-600',
    cursor: 'text-pink-400',
    prompt: 'text-pink-300',
  },
  amber: {
    background: 'bg-black',
    text: 'text-amber-400',
    textSecondary: 'text-amber-300',
    textError: 'text-red-400',
    border: 'border-amber-600',
    cursor: 'text-amber-400',
    prompt: 'text-amber-300',
  },
  blue: {
    background: 'bg-black',
    text: 'text-blue-400',
    textSecondary: 'text-blue-300',
    textError: 'text-red-400',
    border: 'border-blue-600',
    cursor: 'text-blue-400',
    prompt: 'text-blue-300',
  },
  red: {
    background: 'bg-black',
    text: 'text-red-400',
    textSecondary: 'text-red-300',
    textError: 'text-red-500',
    border: 'border-red-600',
    cursor: 'text-red-400',
    prompt: 'text-red-300',
  },
  purple: {
    background: 'bg-black',
    text: 'text-purple-400',
    textSecondary: 'text-purple-300',
    textError: 'text-red-400',
    border: 'border-purple-600',
    cursor: 'text-purple-400',
    prompt: 'text-purple-300',
  },
  white: {
    background: 'bg-black',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    textError: 'text-red-400',
    border: 'border-gray-600',
    cursor: 'text-white',
    prompt: 'text-gray-300',
  },
  crt: {
    background: 'bg-black',
    text: 'text-green-400',
    textSecondary: 'text-green-300',
    textError: 'text-red-400',
    border: 'border-green-600',
    cursor: 'text-green-400',
    prompt: 'text-green-300',
  },
  powershell: {
    background: 'bg-slate-900',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    textError: 'text-red-400',
    border: 'border-blue-600',
    cursor: 'text-white',
    prompt: 'text-blue-300',
  },
  atari: {
    background: 'bg-black',
    text: 'text-cyan-400',
    textSecondary: 'text-magenta-400',
    textError: 'text-red-400',
    border: 'border-cyan-600',
    cursor: 'text-cyan-400',
    prompt: 'text-magenta-300',
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('crt');

  useEffect(() => {
    // Always start with crt theme (classic green-on-black) for CLI
    setCurrentTheme('crt');
  }, []);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('halex9000-theme', theme);
  };

  const colors = themes[currentTheme];
  const availableThemes = Object.keys(themes) as Theme[];

  return (
    <ThemeContext.Provider
      value={{ currentTheme, colors, setTheme, availableThemes }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
