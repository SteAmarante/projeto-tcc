import { Stack, Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* A tela "index" não terá cabeçalho visível */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/*Tela para selecionar o segmento */}
        <Stack.Screen 
          name="segmento" 
          options={{ 
            title: 'Segmento de Negócio',
            headerBackTitle: 'Voltar',
          }} 
        />
        {/* A tela "questionario" terá um título no cabeçalho */}
        <Stack.Screen 
          name="questionario" 
          options={{ 
            title: 'Avaliação de Risco',
            headerBackTitle: 'Voltar',
          }} 
        />
        {/* Tela de resultado, sem cabeçalho */}
        <Stack.Screen 
          name="resultado" 
          options={{ 
            headerShown: false,
          }} 
        />
        {/* TELA NOVA: Tela de login */}
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Login',
            headerBackTitle: 'Voltar',
            headerShadowVisible: false
          }} 
        />
      </Stack>
      // ...existing code...
    </>
  );
}

