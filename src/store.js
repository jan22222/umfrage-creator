import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from './surveyslice';
import questionReducer from './questionslice';
import answerReducer from './answerslice';

const store = configureStore({
  reducer: {
    surveys: surveyReducer,
  

  },
});

export default store;