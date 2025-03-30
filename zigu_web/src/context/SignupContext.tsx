import React, {createContext, ReactNode, useContext, useState} from 'react';

export interface SignupData {
  email: string;
  password: string;
  name: string;
  nameTag: string;
  role: string;
  purposes: string[];
  loginType: string;
}

interface SignupContextType {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  resetSignupData: () => void;
  setSignupData: (data: SignupData) => void;
}

const initialSignupData: SignupData = {
  email: '',
  password: '',
  name: '',
  nameTag: '',
  role: '',
  purposes: [],
  loginType: '',
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [signupData, setSignupData] = useState<SignupData>(initialSignupData);

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({...prev, ...data}));
  };

  const resetSignupData = () => {
    setSignupData(initialSignupData);
  };

  return (
    <SignupContext.Provider
      value={{
        signupData,
        updateSignupData,
        setSignupData,
        resetSignupData,
      }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignupContext must be used within a SignupProvider');
  }
  return context;
};
