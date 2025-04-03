import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar';

export interface QuestionnaireData {
  name: string;
  nameTag: string;
  role: string;
  purposes: string[];
  loginType: string;
  profileImage: string;
  template: string;
}
interface QuestionnaireContextType {
  questionnaireData: QuestionnaireData;
  updateQuestionnaireData: (data: Partial<QuestionnaireData>) => void;
  resetQuestionnaireData: () => void;
  setQuestionnaireData: (data: QuestionnaireData) => void;
  progress: number;
  setProgress: (progress: number) => void;
  templateList: {
    value: string;
    image: string;
  }[];
  updateTemplateList: (
    data: {
      value: string;
      image: string;
    }[],
  ) => void;
}

const initialQuestionnaireData: QuestionnaireData = {
  name: '',
  nameTag: '',
  role: '',
  purposes: [],
  loginType: '',
  profileImage: '',
  template: '',
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
  const [templateList, setTemplateList] = useState<
    {
      value: string;
      image: string;
    }[]
  >([]);
  const [progress, setProgress] = useState<number>(0);

  const updateQuestionnaireData = (data: Partial<QuestionnaireData>) => {
    setQuestionnaireData(prev => {
      sessionStorage.setItem(
        'questionnaireData',
        JSON.stringify({...prev, ...data}),
      );
      return {...prev, ...data};
    });
  };

  useEffect(() => {
    const list = JSON.parse(sessionStorage.getItem('templateList') || '[]');
    console.log('list', list);
    setTemplateList(list);
    const qData = JSON.parse(
      sessionStorage.getItem('questionnaireData') || '{}',
    );
    console.log('questionnaireData', qData);

    setQuestionnaireData(qData);
  }, []);
  const updateTemplateList = (
    data: {
      value: string;
      image: string;
    }[],
  ) => {
    console.log('data in updateTemplateList', data);

    setTemplateList(data);
    sessionStorage.setItem('templateList', JSON.stringify(data));
  };
  const resetQuestionnaireData = () => {
    setQuestionnaireData(initialQuestionnaireData);
    sessionStorage.removeItem('templateList');
    sessionStorage.removeItem('questionnaireData');
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
        templateList,
        updateTemplateList,
      }}>
      {progress > 0 && (
        <ProgressBar progress={progress} setProgress={setProgress} />
      )}
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
