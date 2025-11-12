import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ResultadoItem({ titulo, resultado }: { titulo: string; resultado: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.valor}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titulo: {
    fontSize: 16,
    flex: 1,
  },
  valor: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
});
