import axios from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//* Kullanıcı servisi
const UserService = {

  login: async (id: string, password: string) => {
    try {
    
      const response = await axios.post('/auth/login', { id, password });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        
      }
      return response.data;
    } catch (error: any) {
      console.error('Login hatası:', error);
      console.error('Hata detayları:', error.response?.data || 'Detay yok');
      console.error('Hata statusu:', error.response?.status || 'Status yok');
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

 
  getProfile: async () => {
    try {
      const companyId = '4448d7b2-9b3c-42f8-b9cd-b06e6fa96081';
      const response = await axios.get(`/companies/${companyId}`);
      return response.data;

    } catch (error: any) {

      console.error('Şirket bilgileri hatası:', error);
      console.error('Hata detayları:', error.response?.data || 'Detay yok');
      
      throw error;
    }
  },

  //! Not: Aşağıdaki fonksiyonlar axios istekleri yapmayacak, sadece reference için tutuyoruz.
  //! Bu fonksiyonlar artık ileride doldurulabilinir.

  updateProfile: async (profileData: any) => {
    console.log('Update Profile çağrıldı, fakat axios isteği yapılmadı');
    return profileData; 
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    console.log('Change Password çağrıldı, fakat axios isteği yapılmadı');
    return { success: true };
  },

  changeEmail: async (newEmail: string) => {
    console.log('Change Email çağrıldı, fakat axios isteği yapılmadı');
    return { success: true };
  }
};

export default UserService; 