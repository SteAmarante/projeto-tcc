import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE } from './config/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Função de login
  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login falhou.');
      }

      // ✅ Salva o email do usuário logado
      await AsyncStorage.setItem('usuarioEmail', email);

      // ✅ Verifica se há resultado pendente e envia para o backend
      try {
        const pending = await AsyncStorage.getItem('@pendingResult');
        if (pending) {
          const parsed = JSON.parse(pending);

          await fetch(`${API_BASE}/api/resultados`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: data.user?.id,
              score: parsed.score,
              answers: parsed.answers,
              createdAt: parsed.createdAt,
            }),
          });

          await AsyncStorage.removeItem('@pendingResult');
          console.log('✅ Resultado pendente enviado após login!');
        }
      } catch (err) {
        console.error('Erro enviando resultado pendente após login:', err);
      }

      // ✅ Redireciona o usuário para a tela principal
      router.push('../screens/UsuarioScreen');

    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Não foi possível conectar ao servidor.'
      );
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0A2540', marginBottom: 40, alignSelf: 'flex-start' },
  input: { width: '100%', backgroundColor: '#F7FAFC', borderRadius: 8, padding: 15, fontSize: 16, marginBottom: 15, borderColor: '#E2E8F0', borderWidth: 1 },
  loginButton: { width: '100%', backgroundColor: '#0052CC', padding: 18, borderRadius: 8, alignItems: 'center' },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cadastroButton: { marginTop: 16, alignItems: 'center' },
  cadastroButtonText: { color: '#0052CC', fontSize: 15, fontWeight: 'bold' },
});
