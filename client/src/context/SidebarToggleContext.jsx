import React, { createContext, useState } from 'react';

export const SidebarToggleContext = createContext();

export const SidebarToggleProvider = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <SidebarToggleContext.Provider value={{ sidebarToggle, setSidebarToggle }}>
      {children}
    </SidebarToggleContext.Provider>
  );
};