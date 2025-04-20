import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Interfaces
export interface CompanyDetails {
  companyNumber: string;
  legalName: string;
  taxNumber: string;
  vatNumber: string;
  address: string;
}

export interface BankDetails {
  accountType: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface ContactDetails {
  ownerName: string;
  ownerPhoneNumber: string;
  officePhoneNumbers: string;
}

export interface Settings {
  password: string;
  email: string;
}

interface ProfileState {
  companyDetails: CompanyDetails;
  bankDetails: BankDetails;
  contactDetails: ContactDetails;
  settings: Settings;
  isEditingCompany: boolean;
  isEditingBank: boolean;
  isEditingContact: boolean;
  isEditingSettings: boolean;
}


const initialState: ProfileState = {
  companyDetails: {
    companyNumber: '',
    legalName: '',
    taxNumber: '',
    vatNumber: '',
    address: ''
  },
  bankDetails: {
    accountType: 'Bireysel/şirket hesabı',
    bankName: 'Kasikorn bankası',
    accountName: 'Hakan Kzilikaya',
    accountNumber: '3635635635'
  },
  contactDetails: {
    ownerName: '',
    ownerPhoneNumber: '',
    officePhoneNumbers: ''
  },
  settings: {
    password: '************',
    email: ''
  },
  isEditingCompany: false,
  isEditingBank: false,
  isEditingContact: false,
  isEditingSettings: false
};


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateCompanyDetails: (state, action: PayloadAction<CompanyDetails>) => {
      state.companyDetails = action.payload;
    },
    updateBankDetails: (state, action: PayloadAction<BankDetails>) => {
      state.bankDetails = action.payload;
    },
    updateContactDetails: (state, action: PayloadAction<ContactDetails>) => {
      state.contactDetails = action.payload;
    },
    updateSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
    },
    setIsEditingCompany: (state, action: PayloadAction<boolean>) => {
      state.isEditingCompany = action.payload;
    },
    setIsEditingBank: (state, action: PayloadAction<boolean>) => {
      state.isEditingBank = action.payload;
    },
    setIsEditingContact: (state, action: PayloadAction<boolean>) => {
      state.isEditingContact = action.payload;
    },
    setIsEditingSettings: (state, action: PayloadAction<boolean>) => {
      state.isEditingSettings = action.payload;
    }
  }
});


export const {
  updateCompanyDetails,
  updateBankDetails,
  updateContactDetails,
  updateSettings,
  setIsEditingCompany,
  setIsEditingBank,
  setIsEditingContact,
  setIsEditingSettings
} = profileSlice.actions;


export const selectProfile = (state: RootState) => state.profile;
export const selectCompanyDetails = (state: RootState) => state.profile.companyDetails;
export const selectBankDetails = (state: RootState) => state.profile.bankDetails;
export const selectContactDetails = (state: RootState) => state.profile.contactDetails;
export const selectSettings = (state: RootState) => state.profile.settings;

export default profileSlice.reducer; 