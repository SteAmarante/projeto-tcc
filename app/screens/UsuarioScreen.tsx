import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Button, Card, Divider, Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE } from '../config/api';
import Footer from '../components/Footer';

type Pergunta = { pergunta: string; resposta: string };
type Resultado = {
  id: number;
  titulo: string;
  resultado: number;
  data?: string;
  perguntas?: Pergunta[];
};

// Habilita animação no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function UsuarioScreen() {
  const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const router = useRouter();

  const sairDaConta = async () => {
    try {
      await AsyncStorage.removeItem('usuarioEmail');
      router.replace('/login');
    } catch (err) {
      console.error('Erro ao sair da conta:', err);
    }
  };

  // Carrega usuário e resultados na primeira renderização
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const emailUsuario = await AsyncStorage.getItem('usuarioEmail');
        if (!emailUsuario) return;

        const [userResponse, resultsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/usuario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailUsuario }),
          }),
          fetch(`${API_BASE}/api/usuario/resultados`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailUsuario }),
          }),
        ]);

        const userData = await userResponse.json();
        const resultsData = await resultsResponse.json();

        const resultsWithDate = resultsData.map((res: Resultado) => ({
          ...res,
          data: res.data || new Date().toISOString(),
        }));

        setUsuario(userData);
        setResultados(resultsWithDate);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Atualiza resultados sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      async function fetchResults() {
        try {
          const emailUsuario = await AsyncStorage.getItem('usuarioEmail');
          if (!emailUsuario) return;

          const resultsResponse = await fetch(`${API_BASE}/api/usuario/resultados`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailUsuario }),
          });

          const resultsData = await resultsResponse.json();

          const resultsWithDate = resultsData.map((res: Resultado) => ({
            ...res,
            data: res.data || new Date().toISOString(),
          }));

          setResultados(resultsWithDate);
        } catch (err) {
          console.error('Erro ao atualizar resultados:', err);
        }
      }

      fetchResults();
    }, [])
  );

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const getResultDetails = (score: number) => {
    if (score >= 80) return { color: '#28A745', message: 'Excelente!', recommendation: 'Continue monitorando seus controles.' };
    if (score >= 50) return { color: '#FFC107', message: 'Atenção!', recommendation: 'Priorize pontos fracos e realize mitigação de riscos.' };
    return { color: '#DC3545', message: 'Sua segurança precisa melhorar.', recommendation: 'Realize mitigação de riscos e melhore o score.' };
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Olá, {usuario?.nome || 'Usuário'} 👋</Text>

        {/* Card do usuário */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>E-mail:</Text>
            <Text>{usuario?.email}</Text>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'space-between' }}>
            <Button mode="contained-tonal" onPress={() => router.push('/screens/AlterarSenhaScreen')}>
              Alterar senha
            </Button>
            <Button mode="outlined" onPress={sairDaConta} style={{ borderColor: '#DC3545', borderWidth: 1 }} textColor="#DC3545">
              Sair
            </Button>
          </Card.Actions>
        </Card>

        {/* Treinamento */}
        <Card style={styles.cardTreinamento}>
          <Card.Content>
            <Text style={styles.subtitulo}>Treinamento</Text>
            <Text style={{ marginBottom: 8 }}>
              Acesse conteúdos e práticas para aprimorar seus resultados.
            </Text>
            <Button mode="contained" onPress={() => router.push('/screens/treinamento')}>
              Ir para Treinamento
            </Button>
          </Card.Content>
        </Card>

        {/* Novo Questionário */}
        <Card style={{ borderRadius: 12, elevation: 2, marginBottom: 16, backgroundColor: '#FFF3E0' }}>
          <Card.Content>
            <Text style={styles.subtitulo}>Novo Questionário</Text>
            <Text style={{ marginBottom: 8 }}>
              Faça outro questionário e acompanhe seus resultados.
            </Text>
            <Button mode="contained" onPress={() => router.push('/segmento')}>
              Fazer Questionário
            </Button>
          </Card.Content>
        </Card>

        <Divider style={{ marginVertical: 16 }} />

        <Text style={styles.subtitulo}>Resultados do seu questionário</Text>

        {resultados.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 16, color: '#888' }}>
            Nenhum resultado encontrado ainda.
          </Text>
        ) : (
          resultados.map((res) => {
            const details = getResultDetails(res.resultado);
            const scoreFormatted = Math.round(res.resultado);

            return (
              <TouchableOpacity key={res.id} activeOpacity={0.8} onPress={() => toggleExpand(res.id)}>
                <Card style={styles.card}>
                  <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.circle, { borderColor: details.color }]}>
                      <Text style={[styles.scoreText, { color: details.color }]}>{scoreFormatted}%</Text>
                    </View>

                    <View style={{ flex: 1, marginLeft: 16 }}>
                      <Text style={styles.resultTitulo}>{res.titulo}</Text>
                      {res.data && (
                        <Text style={{ fontSize: 12, color: '#555' }}>
                          Data: {new Date(res.data).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </Text>
                      )}
                      <Text style={{ color: details.color, marginTop: 4 }}>{details.message}</Text>
                      <Text style={{ color: '#5E7A90', marginTop: 2 }}>{details.recommendation}</Text>
                    </View>

                    <IconButton
                      icon={expandedId === res.id ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      onPress={() => toggleExpand(res.id)}
                    />
                  </Card.Content>

                  {expandedId === res.id && res.perguntas && (
                    <View style={{ marginTop: 8, paddingHorizontal: 8 }}>
                      <Divider style={{ marginVertical: 8 }} />
                      {res.perguntas.map((p, index) => (
                        <View key={index} style={{ marginBottom: 6 }}>
                          <Text style={{ fontWeight: 'bold' }}>Q: {p.pergunta}</Text>
                          <Text style={{ marginLeft: 4 }}>R: {p.resposta}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })
        )}

        {/* Footer */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fafafa' },
  container: { paddingHorizontal: 16, paddingVertical: 16 },
  titulo: { fontSize: 24, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  subtitulo: { fontSize: 18, fontWeight: '500', marginBottom: 8 },
  card: { borderRadius: 12, elevation: 2, marginBottom: 16 },
  cardTreinamento: { borderRadius: 12, elevation: 2, marginBottom: 16, backgroundColor: '#E3F2FD' },
  label: { fontWeight: 'bold', marginBottom: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circle: { width: 60, height: 60, borderRadius: 30, borderWidth: 5, justifyContent: 'center', alignItems: 'center' },
  scoreText: { fontSize: 18, fontWeight: 'bold' },
  resultTitulo: { fontSize: 16, fontWeight: '600' },
});
