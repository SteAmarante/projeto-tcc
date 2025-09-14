import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Importe suas páginas
import QuestionarioScreen from '../questionario';
import TreinamentoScreen from '../treinamento';
import UsuarioScreen from '../usuario';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Questionário" component={QuestionarioScreen} />
        <Tab.Screen name="Treinamento" component={TreinamentoScreen} />
        <Tab.Screen name="Usuário" component={UsuarioScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}