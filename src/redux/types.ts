
export interface User {
  id: string;
  username: string;
  email: string | null;
  operatorId: string;
  role: string;
  companyId: string;
  permissions: string[];
  phoneNumber: string | null;
  lastLoginAt: string | null;
}

export interface Company {
  id: string;
  companyNumber: string;
  legalName: string;
  taxNumber: string;
  vatNumber: string;
  address: string;
  logoUrl: string | null;
  ownerId: string;
  ownerName: string;
  ownerPhoneNumber: string;
  officePhoneNumbers: string;
  companyMailAddresses: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  users: User[];
}

export interface AuthState {
  user: User | null;
  company: Company | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}


export interface RootState {
  auth: AuthState;
} 