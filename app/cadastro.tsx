import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE } from './config/api';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleRegister() {
    if (!nome || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no cadastro.');
      }

      // ✅ Armazena o e-mail do usuário logado
      await AsyncStorage.setItem('usuarioEmail', email);

      // ✅ Se existir resultado pendente, envia agora que o usuário existe
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

          await AsyncStorage.removeItem('@pendingResult'); // limpa cache
          console.log('✅ Resultado pendente enviado com sucesso!');
        }
      } catch (err) {
        console.error('Erro enviando resultado pendente após cadastro:', err);
      }

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      router.push('/login');

    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Não foi possível conectar ao servidor. Verifique o IP e o backend.'
      );
    }
  }

  function goToLogin() {
    router.push('/login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#A0AEC0"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0AEC0"
        autoCapitalize="none"
        keyboardType="email-address"
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
