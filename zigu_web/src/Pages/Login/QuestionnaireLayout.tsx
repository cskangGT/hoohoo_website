import React from 'react';
import {Outlet} from 'react-router-dom';
import {QuestionnaireProvider} from '../../context/QuestionnaireContext';

function QuestionnaireLayout() {
  return (
    <QuestionnaireProvider>
      <Outlet />
    </QuestionnaireProvider>
  );
}

export default QuestionnaireLayout;
