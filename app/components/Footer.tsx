import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Footer() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Dúvidas? Entre em contato:{' '}
        <Text 
          style={styles.link}
          onPress={() => Linking.openURL('mailto:risktrackapp.seguranca@gmail.com')}
        >
          risktrackapp.seguranca@gmail.com
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  text: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  link: {
    color: '#0052CC',
    textDecorationLine: 'underline',
  },
});
