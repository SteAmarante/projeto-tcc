import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { segments } from '../constants/segments';

export default function SegmentScreen() {
  const router = useRouter();

  const handleSelectSegment = (multiplier: number) => {
    // Navega para a tela do questionário, passando o multiplicador como parâmetro
    router.push({
      pathname: '/questionario',
      params: { segmentMultiplier: multiplier },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Qual o segmento da sua empresa?</Text>
        <Text style={styles.subHeader}>
          Isso nos ajuda a entender o nível de criticidade dos seus dados e operações.
        </Text>
        <View style={styles.listContainer}>
          {segments.map((segment) => (
            <TouchableOpacity
              key={segment.id}
              style={styles.card}
              onPress={() => handleSelectSegment(segment.multiplier)}
            >
              <Text style={styles.cardTitle}>{segment.name}</Text>
              <Text style={styles.cardDescription}>{segment.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0A2540',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subHeader: {
    fontSize: 16,
    color: '#5E7A90',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  cardDescription: {
    fontSize: 14,
    color: '#5E7A90',
    marginTop: 5,
  },
});
