import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import UserService from '../../services/userService';
import { AuthState, Company } from '../types';


const initialState: AuthState = {
  user: null,
  company: null,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ id, password }: { id: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await UserService.login(id, password);
      return data;
    } catch (error: any) {
      console.error('Login thunk hatası:', error);
      console.error('Tam hata detayı:', JSON.stringify(error));
      
      let errorMsg = 'Giriş başarısız';
      
      if (error.response) {
        console.log('Hata statusu:', error.response.status);
        console.log('Hata yanıtı:', error.response.data);
        
        if (error.response.status === 401) {
          errorMsg = 'Kullanıcı adı veya şifre hatalı';
        } else if (error.response.data?.message) {
          errorMsg = error.response.data.message;
        }
      } else if (error.request) {
        console.log('Hata isteği:', error.request);
        errorMsg = 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.';
      }
      
      return rejectWithValue(errorMsg);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await UserService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Çıkış başarısız');
    }
  }
);

export const getCompany = createAsyncThunk(
  'auth/getCompany',
  async (_, { rejectWithValue }) => {
    try {
      const data = await UserService.getProfile();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Şirket bilgileri alınamadı');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.company = null;
      state.token = null;
      state.isLoggedIn = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Company
    builder.addCase(getCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCompany.fulfilled, (state, action: PayloadAction<Company>) => {
      state.loading = false;
      state.company = action.payload;
    });
    builder.addCase(getCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer; 