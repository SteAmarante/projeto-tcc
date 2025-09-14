import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function UsuarioScreen() {
  const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null);
  const [resultados, setResultados] = useState<Array<{ id: number; titulo: string; resultado: string }>>([]);
  const [senha, setSenha] = useState('');
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados do usuário e resultados do backend
    async function fetchData() {
      setLoading(true);
      try {
        // Exemplo de requisição (substitua pela sua API)
        // const userResponse = await fetch('URL_API_USUARIO');
        // const userData = await userResponse.json();
        // setUsuario(userData);

        // const resultsResponse = await fetch('URL_API_RESULTADOS');
        // const resultsData = await resultsResponse.json();
        // setResultados(resultsData);
      } catch (error) {
        // Trate erros de requisição
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAlterarSenha = () => {
    // Implemente a lógica de alteração de senha (API)
    setEditandoSenha(false);
    setSenha('');
    alert('Senha alterada com sucesso!');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Bem-vindo{usuario ? `, ${usuario.nome}` : ''}!
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.email}>{usuario ? usuario.email : '-'}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Alterar Senha:</Text>
        {editandoSenha ? (
          <View style={styles.senhaBox}>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Nova senha"
              value={senha}
              onChangeText={setSenha}
            />
            <Button title="Salvar" onPress={handleAlterarSenha} />
          </View>
        ) : (
          <Button title="Alterar Senha" onPress={() => setEditandoSenha(true)} />
        )}
      </View>

      <View style={styles.resultadosBox}>
        <Text style={styles.label}>Resultados dos Questionários:</Text>
        {resultados.length === 0 ? (
          <Text style={{ color: '#888', marginTop: 8 }}>Nenhum resultado encontrado.</Text>
        ) : (
          resultados.map((res) => (
            <View key={res.id} style={styles.resultadoItem}>
              <Text style={styles.resultadoTitulo}>{res.titulo}</Text>
              <Text style={styles.resultadoStatus}>{res.resultado}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

// ...existing code...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  senhaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    flex: 1,
    marginRight: 8,
  },
  resultadosBox: {
    marginTop: 32,
  },
  resultadoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultadoTitulo: {
    fontSize: 16,
  },
  resultadoStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
