import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Divider, List } from 'react-native-paper';

type Resultado = {
  id: number;
  titulo: string;
  resultado: string | number;
  data: string;
  perguntas?: Array<{ pergunta: string; resposta: string }>;
};

interface Props {
  resultados: Resultado[];
}

export default function ResultadoLista({ resultados }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView>
      {resultados.map((res) => (
        <Card key={res.id} style={styles.card} onPress={() => toggleExpand(res.id)}>
          <Card.Content>
            <Text style={styles.titulo}>{res.titulo}</Text>
            <Text>Resultado: {res.resultado}%</Text>
            <Text>Data: {new Date(res.data).toLocaleDateString()}</Text>

            {expandedId === res.id && res.perguntas && (
              <View style={styles.perguntasContainer}>
                <Divider style={{ marginVertical: 8 }} />
                {res.perguntas.map((p, index) => (
                  <View key={index} style={styles.pergunta}>
                    <Text style={styles.perguntaTexto}>Q: {p.pergunta}</Text>
                    <Text style={styles.respostaTexto}>R: {p.resposta}</Text>
                  </View>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  titulo: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  perguntasContainer: {
    marginTop: 8,
  },
  pergunta: {
    marginBottom: 6,
  },
  perguntaTexto: {
    fontWeight: 'bold',
  },
  respostaTexto: {
    marginLeft: 4,
  },
});
