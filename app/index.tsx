import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { IconButton, ActivityIndicator } from 'react-native-paper';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const email = await AsyncStorage.getItem('usuarioEmail');

        console.log('AsyncStorage usuarioEmail:', email); // <-- debug

        if (email && email.trim().length > 0) {
          // Usuário já logado → leva direto para a tela dele
          router.replace('/screens/UsuarioScreen');
        } else {
          // Usuário não logado → continua na HomeScreen
          setCheckingLogin(false);
        }
      } catch (err) {
        console.error('Erro ao verificar login:', err);
        setCheckingLogin(false);
      }
    };

    checkLogin();
  }, []);

  if (checkingLogin) {
    // Mostra loading enquanto verifica login
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginIcon}>
        <IconButton
          icon="login"
          size={28}
          onPress={() => router.push('/login')}
          iconColor="#0052CC"
        />
      </View>

      <Text style={styles.title}>RiskTrack</Text>
      
      <Text style={styles.description}>
        O RiskTrack é um aplicativo de segurança da
        informação que calcula, por meio de um
        questionário, os pontos de atenção da
        segurança de seu sistema e traz soluções de
        consultoria.
      </Text>

      <Link href="/segmento" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Começar avaliação</Text>
        </TouchableOpacity>
      </Link>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  loginIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#3A4E63',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#0052CC',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
