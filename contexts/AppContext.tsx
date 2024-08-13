import React, { createContext, ReactNode, useContext, useState } from 'react';

export type AppContextValue = {
  generatedContent?: string;
};

interface AppContextProps {
  contextValue: AppContextValue;
  setContextValue: React.Dispatch<React.SetStateAction<AppContextValue>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contextValue, setContextValue] = useState<AppContextValue>({});

  return (
    <AppContext.Provider value={{ contextValue, setContextValue }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useContentGeneratorContext must be used within a ContentGeneratorProvider',
    );
  }
  return context;
};
