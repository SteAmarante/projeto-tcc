import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="questionario"
        options={{
          title: 'Questionário',
        }}
      />
      <Tabs.Screen
        name="treinamento"
        options={{
          title: 'Treinamento',
        }}
      />
      <Tabs.Screen
        name="usuario"
        options={{
          title: 'Usuário',
        }}
      />
    </Tabs>
  );
}
