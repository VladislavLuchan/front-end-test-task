import React, { useState, useEffect  } from 'react'
import ThemeToggle from './ThemeToggle';

interface ThemeProviderProps {  
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const setDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
  }, []);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} dark:bg-neutral-900 dark:text-white`}>
      <ThemeToggle setIsDarkMode={setDarkMode} isDarkMode={isDarkMode} />
      {children}
    </div>
  )
}

export default ThemeProvider;
