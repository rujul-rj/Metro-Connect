import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  // 3. Set up state, defaulting to 'light' or checking localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // 4. Update the <body> tag and localStorage whenever the theme changes
  useEffect(() => {
    // Add/remove the 'dark' class from the body
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    // Save the user's preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 5. Create the function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 6. Provide the theme and toggle function to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 7. Create a custom hook to easily use the context
export const useTheme = () => {
  return useContext(ThemeContext);
};
