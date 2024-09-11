import { initialState, Recommendation, RecommendationsState } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const findRecommendationById = (state: RecommendationsState, id: string) => {
  return state.recommendations.find((rec) => rec.id === id);
};

export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setImpactRunId: (state, action: PayloadAction<string>) => {
      state.impactRunId = action.payload;
    },
    setRecommendations: (state, action: PayloadAction<Recommendation[]>) => {
      state.recommendations = action.payload;
    },
    updateRecommendationDates: (
      state,
      action: PayloadAction<{ id: string; startDate: string; endDate: string }>
    ) => {
      const recommendation = findRecommendationById(state, action.payload.id);

      if (recommendation) {
        recommendation.startDate = action.payload.startDate;
        recommendation.endDate = action.payload.endDate;
      }
    },    
    setSelectedRecommendationId: (state, action: PayloadAction<string | null>) => {
        state.selectedRecommendationId = action.payload;
    },
    clearSelectedRecommendationId: (state) => {
        state.selectedRecommendationId = null;
    },
  },
});

export const { setImpactRunId, setRecommendations, updateRecommendationDates, setSelectedRecommendationId, clearSelectedRecommendationId } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
