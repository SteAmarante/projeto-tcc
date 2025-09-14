import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';


export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { score } = params; // Recebe o score da tela do questionário

  const scorePercentage = score ? Math.round(Number(score)) : 0;

  const getResultDetails = () => {
    if (scorePercentage >= 80) {
      return {
        color: '#28A745', // Verde
        message: 'Excelente! Sua maturidade em segurança é alta.',
        recommendation: 'Continue monitorando e aprimorando seus controles continuamente.',
      };
    }
    if (scorePercentage >= 50) {
      return {
        color: '#FFC107', // Amarelo
        message: 'Atenção! Sua segurança tem pontos a melhorar.',
        recommendation: 'Priorize os pontos fracos e realize uma mitigação dos riscos.',
      };
    }
    return {
      color: '#DC3545', // Vermelho
      message: 'O que isso significa? Que está ruim a segurança dos dados.',
      recommendation: 'Realize uma mitigação dos riscos e melhore o seu score.',
    };
  };

  const details = getResultDetails();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.circle, { borderColor: details.color }]}>
        <Text style={[styles.scoreText, { color: details.color }]}>{scorePercentage}%</Text>
        <Text style={[styles.scoreLabel, { color: details.color }]}>SEGURO</Text>
      </View>

      <Text style={styles.message}>{details.message}</Text>
      <Text style={styles.recommendation}>{details.recommendation}</Text>

      {/* ALTERAÇÃO AQUI: O botão agora leva para a tela de login */}
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CONSULTAR</Text>
        </TouchableOpacity>
      </Link>


      <TouchableOpacity style={styles.restartButton} onPress={() => router.replace('/')}>
        <Text style={styles.restartButtonText}>Refazer Avaliação</Text>
      </TouchableOpacity>
      
      <Text style={styles.footer}>2024 all rights reserved</Text>
    </SafeAreaView>
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
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  message: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A2540',
    textAlign: 'center',
    marginBottom: 10,
  },
  recommendation: {
    fontSize: 16,
    color: '#5E7A90',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0052CC',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restartButton: {
    marginTop: 20,
  },
  restartButtonText: {
    color: '#0052CC',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#A0AEC0',
    fontSize: 12,
  },
});

