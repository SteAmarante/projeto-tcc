import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import ResultadoChart from '../components/ResultadoChart';
import ResultadoItem from '../components/ResultadoItem';

export default function UsuarioScreen() {
  const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null);
  const [resultados, setResultados] = useState<Array<{ id: number; titulo: string; resultado: string }>>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const emailUsuario = await AsyncStorage.getItem('usuarioEmail');
        if (!emailUsuario) return;

        const [userResponse, resultsResponse] = await Promise.all([
          fetch('http://localhost:4000/api/usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailUsuario })
          }),
          fetch('http://localhost:4000/api/usuario/resultados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailUsuario })
          })
        ]);

        const userData = await userResponse.json();
        const resultsData = await resultsResponse.json();

        setUsuario(userData);
        setResultados(resultsData);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Olá, {usuario?.nome || 'Usuário'} 👋</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>E-mail:</Text>
          <Text>{usuario?.email}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained-tonal" onPress={() => router.push('/alterar-senha' as any)}>
            Alterar senha
          </Button>
        </Card.Actions>
      </Card>

      <Divider style={{ marginVertical: 16 }} />

      <Text style={styles.subtitulo}>Resultados do seu questionário</Text>

      {resultados.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 16, color: '#888' }}>
          Nenhum resultado encontrado ainda.
        </Text>
      ) : (
        <>
          <ResultadoChart resultados={resultados} />
          {resultados.map((res) => (
            <ResultadoItem key={res.id} titulo={res.titulo} resultado={res.resultado} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
