import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Função de cadastro
  function handleRegister() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Aqui você faria a chamada à API de cadastro
    console.log('Registrando usuário:', email, password);

    // Se cadastro der certo, volta para o login
    router.push('/login');
  }

  function goToLogin() {
    router.push('/login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Voltar para Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0A2540', marginBottom: 40, alignSelf: 'flex-start' },
  input: { width: '100%', backgroundColor: '#F7FAFC', borderRadius: 8, padding: 15, fontSize: 16, marginBottom: 15, borderColor: '#E2E8F0', borderWidth: 1 },
  registerButton: { width: '100%', backgroundColor: '#0052CC', padding: 18, borderRadius: 8, alignItems: 'center' },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginButton: { marginTop: 16, alignItems: 'center', padding: 12 },
  loginButtonText: { color: '#0052CC', fontSize: 15, fontWeight: 'bold' },
});
