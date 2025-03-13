import React, {createContext, ReactNode, useContext, useState} from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar';

export interface QuestionnaireData {
  name: string;
  nameTag: string;
  role: string;
  purposes: string[];
  loginType: string;
  profileImage: string;
}

interface QuestionnaireContextType {
  questionnaireData: QuestionnaireData;
  updateQuestionnaireData: (data: Partial<QuestionnaireData>) => void;
  resetQuestionnaireData: () => void;
  setQuestionnaireData: (data: QuestionnaireData) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const initialQuestionnaireData: QuestionnaireData = {
  name: '',
  nameTag: '',
  role: '',
  purposes: [],
  loginType: '',
  profileImage: '',
};

const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

export const QuestionnaireProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(
    {
      ...initialQuestionnaireData,
      nameTag: sessionStorage.getItem('storedNameTag') || '',
    },
  );
  const [progress, setProgress] = useState<number>(0);

  const updateQuestionnaireData = (data: Partial<QuestionnaireData>) => {
    setQuestionnaireData(prev => ({...prev, ...data}));
  };

  const resetQuestionnaireData = () => {
    setQuestionnaireData(initialQuestionnaireData);
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        questionnaireData,
        updateQuestionnaireData,
        setQuestionnaireData,
        resetQuestionnaireData,
        progress,
        setProgress,
      }}>
      {progress > 0 && <ProgressBar progress={progress} />}
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error(
      'useQuestionnaireContext must be used within a QuestionnaireProvider',
    );
  }
  return context;
};
