import React from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

interface Resultado {
  id: number;
  titulo: string;
  resultado: string;
}

export default function ResultadoChart({ resultados }: { resultados: Resultado[] }) {
  const data = resultados.map((r) => ({
    x: r.titulo.length > 10 ? r.titulo.slice(0, 10) + '...' : r.titulo,
    y: parseInt(r.resultado) || 0,
  }));

  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis
          style={{ tickLabels: { fontSize: 10, angle: -30, textAnchor: 'end' } }}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar data={data} barRatio={0.8} style={{ data: { fill: '#6200ee' } }} />
      </VictoryChart>
    </View>
  );
}
