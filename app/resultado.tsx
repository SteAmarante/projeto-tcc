import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './components/Footer';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { score } = params;

  const scorePercentage = score ? Math.round(Number(score)) : 0;

  const getResultDetails = () => {
    if (scorePercentage >= 80) {
      return {
        color: '#28A745',
        message: 'Excelente! Sua maturidade em segurança é alta.',
        recommendation: 'Continue monitorando e aprimorando seus controles continuamente.',
      };
    }
    if (scorePercentage >= 50) {
      return {
        color: '#FFC107',
        message: 'Atenção! Sua segurança tem pontos a melhorar.',
        recommendation: 'Priorize os pontos fracos e realize uma mitigação dos riscos.',
      };
    }
    return {
      color: '#DC3545',
      message: 'O que isso significa? Que está ruim a segurança dos dados.',
      recommendation: 'Realize uma mitigação dos riscos e melhore o seu score.',
    };
  };

  const details = getResultDetails();

  // Função que decide para onde levar o usuário ao clicar em "CONSULTAR"
  const handleConsultar = async () => {
    try {
      const email = await AsyncStorage.getItem('usuarioEmail');

      if (email && email.trim().length > 0) {
        // Usuário logado → vai para a tela dele
        router.replace('/screens/UsuarioScreen');
      } else {
        // Usuário não logado → vai para login
        router.replace('/login');
      }
    } catch (err) {
      console.error('Erro ao verificar login:', err);
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.circle, { borderColor: details.color }]}>
          <Text style={[styles.scoreText, { color: details.color }]}>{scorePercentage}%</Text>
          <Text style={[styles.scoreLabel, { color: details.color }]}>SEGURO</Text>
        </View>

        <Text style={styles.message}>{details.message}</Text>
        <Text style={styles.recommendation}>{details.recommendation}</Text>

        {/* Botão CONSULTAR agora verifica login */}
        <TouchableOpacity style={styles.button} onPress={handleConsultar}>
          <Text style={styles.buttonText}>CONSULTAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.restartButton} onPress={() => router.replace('/')}>
          <Text style={styles.restartButtonText}>Refazer Avaliação</Text>
        </TouchableOpacity>
      </View>

      {/* Footer reutilizável */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreText: { fontSize: 50, fontWeight: 'bold' },
  scoreLabel: { fontSize: 20, fontWeight: 'bold', letterSpacing: 2 },
  message: { fontSize: 22, fontWeight: 'bold', color: '#0A2540', textAlign: 'center', marginBottom: 10 },
  recommendation: { fontSize: 16, color: '#5E7A90', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#0052CC', paddingVertical: 18, paddingHorizontal: 80, borderRadius: 50 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  restartButton: { marginTop: 20 },
  restartButtonText: { color: '#0052CC', fontSize: 16 },
});
