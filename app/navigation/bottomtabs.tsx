import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// Importe suas páginas
import QuestionarioScreen from '../questionario';
import UsuarioScreen from '../screens/UsuarioScreen';
import TreinamentoScreen from '../screens/treinamento';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Questionário" component={QuestionarioScreen} />
      <Tab.Screen name="Treinamento" component={TreinamentoScreen} />
      <Tab.Screen name="Usuário" component={UsuarioScreen} />
    </Tab.Navigator>
  );
}