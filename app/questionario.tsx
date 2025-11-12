import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { questions } from '../constants/questions';

export default function QuestionnaireScreen() {
  const router = useRouter();
  // Recebe o multiplicador que foi passado da tela de segmento
  const { segmentMultiplier } = useLocalSearchParams();
  const multiplier = Number(segmentMultiplier) || 1; // Garante que é um número

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);

  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex + 1) / totalQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: 'Sim' | 'Não') => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quando o questionário termina, calcula o score e navega para o resultado
      calculateAndNavigate(newAnswers);
    }
  };

  const calculateAndNavigate = (finalAnswers: any[]) => {
    let userScore = 0;
    let maxScore = 0;

    questions.forEach(question => {
      const questionWeight = question.weight * multiplier;
      maxScore += questionWeight;

      const userAnswer = finalAnswers.find(a => a.questionId === question.id);
      if (userAnswer && userAnswer.answer === 'Sim') {
        userScore += questionWeight;
      }
    });

    const finalPercentage = maxScore > 0 ? (userScore / maxScore) * 100 : 0;

    router.replace({ 
      pathname: '/resultado', 
      params: { score: finalPercentage } 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.content}>
        <Text style={styles.questionText}>
          {currentQuestion.text}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.yesButton]}
          onPress={() => handleAnswer('Sim')}
        >
          <Text style={styles.yesButtonText}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={() => handleAnswer('Não')}
        >
          <Text style={styles.noButtonText}>Não</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0A2540',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0A2540',
    textAlign: 'center',
    lineHeight: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  yesButton: {
    backgroundColor: '#0A2540',
  },
  yesButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noButton: {
    backgroundColor: '#F0F0F0',
  },
  noButtonText: {
    color: '#0A2540',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

