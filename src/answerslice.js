
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const SurveysState = {
  surveys: [],
  isLoading: false,
  error: null
}

const surveysSlice = createSlice({
  name: 'surveys',
  SurveysState,
  reducers: {
    
  },
   extraReducers: (builder) => {
    builder
      .addCase(createSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSurvey.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(loadSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.surveys.push(action.payload)
      })
      .addCase(loadSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(updateSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSurvey.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSurvey.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
})


export const createSurvey = createAsyncThunk(
  "survey/createSurvey",
  async ({user, values}, thunkAPI) => {
    try {
      const ref = collection(db, user.uid);
      addDoc(ref, { title: values.title });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
 
export const loadSurveys = createAsyncThunk(
  "survey/loadSurveys",
  async ({user}, thunkAPI) => {
    try {
          const colRef = collection(db, user.uid);
          const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const newTimes = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            return newTimes
          });
        } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateSurvey = createAsyncThunk(
  "survey/updateSurvey",
  async ({updatedSurvey, user}, thunkAPI) => {
    try {
           const docRef = doc(db, user.uid, updatedSurvey.id);
            setDoc(docRef, updatedSurvey);
        } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteSurvey = createAsyncThunk(
  "survey/deleteSurvey",
  async ({user, id}, thunkAPI) => {
    try {
          await deleteDoc(doc(db, user.uid, id));
        } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



export default surveysSlice.reducer