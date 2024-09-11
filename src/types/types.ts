export interface JwtDecoded {
  "custom:organizationId": string;
  "custom:role": string;
  "custom:organizationRole": string;
  name: string;
  family_name: string;
}
  
export interface AuthResponse {
  accessToken: {
    jwtToken: string
  }
  idToken: {
    jwtToken: string
  }
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  userInfo: JwtDecoded | null;
  error: string | null;
}

export interface AuthAction { accessToken: string; decodedToken: JwtDecoded }

export interface LanguageState {
  language: string;
}

export interface Recommendation {
  id: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
}

export interface RecommendationsState {
  impactRunId: string;
  recommendations: Recommendation[];
  selectedRecommendationId: string | null;
}

export const initialState: RecommendationsState = {
  impactRunId: '',
  recommendations: [],
  selectedRecommendationId: null,
};

export interface OrganizationDetailsState {
  organizationName: string | null;
  industryName: string | null;
  countryName: string | null;
  status: 'idle' | 'loading' | 'failed';
}

export interface Industry {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface OrganizationResponse {
  name: string;
  industryId: string;
  countryId: string;
}
  