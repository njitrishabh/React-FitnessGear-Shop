import React, { createContext, useContext } from 'react';

const MyContext = createContext();

export const MyContextProvider = MyContext.Provider;

export const useMyContext = () => {
    return useContext(MyContext);
};
