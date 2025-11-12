import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function AlterarSenhaScreen({ navigation }: any) {
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (senha !== confirmacao) {
      alert('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      // Chamada para API de alteração
      await new Promise((r) => setTimeout(r, 1000));
      alert('Senha alterada com sucesso!');
      navigation.goBack();
    } catch (err) {
      alert('Erro ao alterar senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar senha</Text>

      <TextInput
        label="Nova senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />
      <TextInput
        label="Confirmar senha"
        secureTextEntry
        value={confirmacao}
        onChangeText={setConfirmacao}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSalvar}
        loading={loading}
        disabled={loading}
      >
        Salvar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
});
