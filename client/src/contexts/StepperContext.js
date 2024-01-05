import { createContext, useContext, useState } from "react";

const StepperContext = createContext({ userData: {}, setUserData: () => {} });

export function StepperContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData } = useContext(StepperContext);
  return { userData, setUserData };
}
