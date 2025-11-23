import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type ProtectedProps = {
  children: ReactNode;
};

export function Protected({ children }: ProtectedProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verify() {
      const email = await AsyncStorage.getItem('usuarioEmail');
      if (!email) {
        router.replace('/login'); // Não logado → login
      } else {
        setChecking(false); // Logado → mostra a tela
      }
    }
    verify();
  }, []);

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Protected;
