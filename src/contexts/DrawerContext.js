'use client'
import React, {createContext, useState, useEffect} from "react";

const DrawerContext = createContext();

const DrawerProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const savedDrawer = localStorage.getItem('drawer');
        if(savedDrawer){
            setIsOpen(savedDrawer === 'closed')
        }
    }, []);

    const toggleDrawer = () => {
        const newDrawer = isOpen ? 'open' : 'closed';
        setIsOpen(!isOpen)
        localStorage.setItem('drawer', newDrawer)
    };

    const drawer = isOpen ? 'closed' : 'open';


    return (
        <DrawerContext.Provider value={{drawer, toggleDrawer}}>
            {children}
        </DrawerContext.Provider>
    );
}
export {DrawerProvider, DrawerContext};