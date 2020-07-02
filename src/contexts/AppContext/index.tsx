import React, {useContext, createContext, useState} from 'react';

export const AppContext = createContext({}); // cria um contexto atribuíndo à um objeto.

export const AppProvider = ({children}) => {
  const [scenario, setScenario] = useState('');

  const updateScenario = value => {
    setScenario(value);
  };

  return (
    <AppContext.Provider value={{scenario, updateScenario}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider.');
  }

  return context;
};
