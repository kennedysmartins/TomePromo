import React, {createContext, useState, useEffect} from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme){
            setIsDarkMode(savedTheme === 'dark')
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode)
        localStorage.setItem('theme', newTheme)
    };

    const theme = isDarkMode ? 'dark' : 'light';


    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
export {ThemeProvider, ThemeContext};