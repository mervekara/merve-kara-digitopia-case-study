import { fetchData } from '@/services/apiService';
import { Country, Industry, OrganizationDetailsState, OrganizationResponse } from '@/types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: OrganizationDetailsState = {
  organizationName: null,
  industryName: null,
  countryName: null,
  status: 'idle',
};

export const fetchOrganizationDetails = createAsyncThunk(
  'organization/fetchOrganizationDetails',
  async ({ organizationId, accessToken }: { organizationId: string, accessToken: string }) => {
    const organizationResponse = await fetchData<OrganizationResponse>(`/organization/${organizationId}/detail`, accessToken);
    
    const industriesResponse = await fetchData<Industry[]>('/industries');
    const countriesResponse = await fetchData<Country[]>('/countries');

    const industry = industriesResponse.find((item: Industry) => item.id === organizationResponse.industryId);
    const country = countriesResponse.find((item: Country) => item.id === organizationResponse.countryId);

    return {
      organizationName: organizationResponse.name,
      industryName: industry ? industry.name : null,
      countryName: country ? country.name : null,
    };
  }
);

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.organizationName = action.payload.organizationName;
        state.industryName = action.payload.industryName;
        state.countryName = action.payload.countryName;
      })
      .addCase(fetchOrganizationDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default organizationSlice.reducer;
