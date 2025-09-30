import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const [nome, setNome] = useState(''); // <-- 1. Adicionado estado para o nome
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // 2. Função de cadastro atualizada para ser assíncrona e fazer a chamada de API
  async function handleRegister() {
    if (!nome || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // O IP da sua máquina. 'localhost' não funciona no emulador/celular.
    const API_URL = 'http://192.168.15.4:4000/api/cadastro';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: password, // O backend espera 'senha'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o servidor retornar um erro (ex: email já existe), exibe a mensagem dele
        throw new Error(data.error || 'Ocorreu um erro no cadastro.');
      }

      // Se deu tudo certo
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      router.push('/login');

    } catch (error) {
  console.error('Erro no cadastro:', error);
  let errorMessage = 'Não foi possível conectar ao servidor. Verifique o IP e se o servidor está rodando.';
  
  // Verifica se o erro é um objeto Error padrão
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  Alert.alert('Erro', errorMessage);
}
  }

  function goToLogin() {
    router.push('/login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      
      {/* 3. Adicionado campo de input para o nome */}
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