import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Função de login
  function handleLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Aqui você faria a chamada à API de login
    console.log('Tentando login com:', email, password);

    // Se login der certo
    router.push('/usuario');
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0A2540', marginBottom: 40, alignSelf: 'flex-start' },
  input: { width: '100%', backgroundColor: '#F7FAFC', borderRadius: 8, padding: 15, fontSize: 16, marginBottom: 15, borderColor: '#E2E8F0', borderWidth: 1 },
  loginButton: { width: '100%', backgroundColor: '#0052CC', padding: 18, borderRadius: 8, alignItems: 'center' },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cadastroButton: { marginTop: 16, alignItems: 'center' },
  cadastroButtonText: { color: '#0052CC', fontSize: 15, fontWeight: 'bold' },
});
