import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// Async thunk to fetch course data and subcollections
export const fetchCourseData = createAsyncThunk(
  'course/fetchCourseData',
  async (_, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'pages', 'ARCHITECTURE_UNITY_MOBILE_GAME');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Course document does not exist');
      }

      const courseData = { id: docSnap.id, ...docSnap.data() };

      // Fetch subcollections
      const subcollections = [
        'forWhom',
        'speakers',
        'speakerGeneralInfo',
        'games',
        'modules',
        'demoVideos',
      ];
      const subcollectionData = {};

      for (const sub of subcollections) {
        const subCollectionRef = collection(db, 'pages', 'ARCHITECTURE_UNITY_MOBILE_GAME', sub);
        const subSnapshot = await getDocs(subCollectionRef);
        subcollectionData[sub] = subSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }

      return { course: courseData, ...subcollectionData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
const courseSlice = createSlice({
  name: 'course',
  initialState: {
    course: null,
    forWhom: [],
    speakers: [],
    speakerGeneralInfo: [],
    games: [],
    modules: [],
    demoVideos: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearCourseData(state) {
      state.course = null;
      state.forWhom = [];
      state.speakers = [];
      state.speakerGeneralInfo = [];
      state.games = [];
      state.modules = [];
      state.demoVideos = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload.course;
        state.forWhom = action.payload.forWhom;
        state.speakers = action.payload.speakers;
        state.speakerGeneralInfo = action.payload.speakerGeneralInfo;
        state.games = action.payload.games;
        state.modules = action.payload.modules;
        state.demoVideos = action.payload.demoVideos;
      })
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearCourseData } = courseSlice.actions;

// Export reducer
export default courseSlice.reducer;

// Function to subscribe to real-time updates
export const subscribeToCourseUpdates = (dispatch) => {
  const docRef = doc(db, 'pages', 'ARCHITECTURE_UNITY_MOBILE_GAME');
  const unsubscribes = [];

  // Subscribe to main document
  const unsubscribeDoc = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        dispatch(fetchCourseData());
      }
    },
    (error) => {
      console.error('Error in course document subscription:', error);
    },
  );
  unsubscribes.push(unsubscribeDoc);

  // Subscribe to subcollections
  const subcollections = [
    'forWhom',
    'speakers',
    'speakerGeneralInfo',
    'games',
    'modules',
    'demoVideos',
  ];
  subcollections.forEach((sub) => {
    const subCollectionRef = collection(db, 'pages', 'ARCHITECTURE_UNITY_MOBILE_GAME', sub);
    const unsubscribeSub = onSnapshot(
      subCollectionRef,
      () => {
        dispatch(fetchCourseData());
      },
      (error) => {
        console.error(`Error in ${sub} subcollection subscription:`, error);
      },
    );
    unsubscribes.push(unsubscribeSub);
  });

  return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
};
