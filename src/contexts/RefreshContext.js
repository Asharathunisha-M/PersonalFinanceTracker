import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => {
  return useContext(RefreshContext);
};

export const RefreshProvider = ({ children }) => {
  const [refreshCount, setRefreshCount] = useState(0);

  const refresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <RefreshContext.Provider value={{ refresh, refreshCount }}>
      {children}
    </RefreshContext.Provider>
  );
};