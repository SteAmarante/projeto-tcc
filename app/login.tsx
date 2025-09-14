import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PocketBase from 'pocketbase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const pb = new PocketBase('http://127.0.0.1:8090'); // Altere para o endereço do seu servidor PocketBase
  const router = useRouter();

  async function handleLogin() {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      Alert.alert('Sucesso!', 'Login realizado com sucesso!');
      // Exemplo: router.push('/usuario');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível fazer login.');
    }
  }

  function goToCadastro() {
    router.push('/cadastro');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0AEC0"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A0AEC0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCadastro} style={styles.cadastroButton}>
        <Text style={styles.cadastroButtonText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
// ...existing code...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 40,
    alignSelf: 'flex-start'
  },
  input: {
    width: '100%',
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#0052CC',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#A0AEC0',
    marginVertical: 25,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 8,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  googleButtonText: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cadastroButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  cadastroButtonText: {
    color: '#0052CC',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

