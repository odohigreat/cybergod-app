import { useState } from "react";
import App from '../App';
import React from "react";

const AppContext = React.createContext(
  {} as {
    toggleDarkMode: () => void;
  }
);


interface Props {
  children: React.ReactNode;
}

function AppProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const contextValue = {
    toggleDarkMode,
  };

  return (
    <div>
      <AppContext.Provider value={contextValue}>
        <div className={`${darkMode && "dark"}`}>
          {children}
          <App />
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default AppContext;