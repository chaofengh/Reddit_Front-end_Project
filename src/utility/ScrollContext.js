import React, { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export const useScroll = () => {
    return useContext(ScrollContext);
};

export const ScrollProvider = ({ children }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    return (
        <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
            {children}
        </ScrollContext.Provider>
    );
};
