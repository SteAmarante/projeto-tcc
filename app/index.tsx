import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RiskTrack</Text>
      
      <Text style={styles.description}>
        O RiskTrack é um aplicativo de segurança da
        informação que calcula, por meio de um
        questionário, os pontos de atenção da
        segurança de seu sistema e traz soluções de
        consultoria.
      </Text>

      {/* ALTERAÇÃO AQUI: O botão agora leva para a tela de seleção de segmento */}
      <Link href="/segmento" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Começar avaliação</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fundo branco
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#0A2540', // Um azul escuro para o título
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#3A4E63', // Um cinza-azulado para o texto
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#0052CC', // Azul do botão
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 50, // Bordas bem arredondadas
    shadowColor: "#000", // Sombra para dar profundidade
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF', // Texto do botão branco
    fontSize: 18,
    fontWeight: 'bold',
  },
});
