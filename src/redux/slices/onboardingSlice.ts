import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OnboardingState {
  companyName: string;
  domain: string;
  siteName: string;
  siteDescription: string;
  accountType: string;
}

const initialState: OnboardingState = {
  companyName: "",
  domain: "",
  siteName: "",
  siteDescription: "",
  accountType: "admin",
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingDetails: (
      state,
      action: PayloadAction<Partial<OnboardingState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    resetOnboardingDetails: () => initialState,
  },
});

export const { setOnboardingDetails, resetOnboardingDetails } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;
