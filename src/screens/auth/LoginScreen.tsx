import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/slices/authSlice';
import Logo from '../../components/Logo';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert('Hata', 'Kullanıcı ID ve şifre gereklidir');
      return;
    }

    try {
      await dispatch(login({ id, password })).unwrap();
    } catch (error) {
      throw error;
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Bilgi', 'Şifremi unuttum sayfası henüz hazır değil');
  };

  const handleRegisterAsOperator = () => {
    Alert.alert('Bilgi', 'Operatör kayıt sayfası henüz hazır değil');
  };

  const handleRegisterAsSeller = () => {
    Alert.alert('Bilgi', 'Satıcı kayıt sayfası henüz hazır değil');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoContainer}>
        <Logo size={50} />
      </View>

      <Text style={styles.title}>LOG IN</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="User ID"
            value={id}
            onChangeText={setId}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerAs}>Register as</Text>
        <View style={styles.registerOptions}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterAsOperator}
          >
            <Text style={styles.registerButtonText}>Operator</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterAsSeller}
          >
            <Text style={styles.registerButtonText}>Seller</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'left',
    color: '#555',
    marginTop: 5,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#F39C12',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  registerAs: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  registerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#F39C12',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen; 