import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Ícones por categoria
const IconByCategory = ({ category }: { category: string }) => {
  let emoji = '🛡️'; // default
  if (category === 'LGPD') emoji = '📄';
  else if (category === 'Fascículos') emoji = '📘';
  else if (category === 'Segurança da Informação') emoji = '🛡️';
  return (
    <View style={{ width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </View>
  );
};

// Itens de fascículos
const fasciculos = [
  { title: 'Furto de Celular', description: 'O que fazer em caso de furto ou perda.', url: 'https://cartilha.cert.br/fasciculos/furto-de-celular/fasciculo-furto-de-celular.pdf' },
  { title: 'Privacidade', description: 'Cuidados com sua privacidade na Internet.', url: 'https://cartilha.cert.br/fasciculos/privacidade/fasciculo-privacidade.pdf' },
  { title: 'Redes Sociais', description: 'Proteja seus perfis e sua reputação online.', url: 'https://cartilha.cert.br/fasciculos/redes-sociais/fasciculo-redes-sociais.pdf' },
  { title: 'Comércio Eletrônico', description: 'Dicas para compras online mais seguras.', url: 'https://cartilha.cert.br/fasciculos/comercio-eletronico/fasciculo-comercio-eletronico.pdf' },
];

// Cursos por categoria
const cursos = [
  {
    section: 'Segurança da Informação',
    items: [
      {
        title: 'Segurança em Tecnologia da Informação',
        description: 'Aprenda boas práticas de segurança da informação.',
        url: 'https://www.ev.org.br/cursos/seguranca-em-tecnologia-da-informacao',
      },
    ],
  },
  {
    section: 'LGPD',
    items: [
      {
        title: 'Texto da Lei Geral de Proteção de Dados (LGPD)',
        description: 'Leia o texto oficial da lei.',
        url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
      },
      {
        title: 'Curso Conhecendo a LGPD',
        description: 'Domine os princípios da LGPD e fortaleça sua carreira em segurança da informação e compliance.',
        url: 'https://play.senai.br/curso/conhecendo-a-lgpd',
      },
    ],
  },
];

// Componente do item clicável
const TrainingItem = ({ category, title, description, url }: { category: string; title: string; description: string; url: string }) => {
  const openLink = async () => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.warn('Erro abrindo link', err);
    }
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={openLink} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <IconByCategory category={category} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function TreinamentoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Treinamentos</Text>
          <Text style={styles.headerSubtitle}>
            Todo o material listado abaixo é gratuito. Você será redirecionado para uma página externa do site responsável. 
            Esta página existe para facilitar a disseminação do conhecimento.
          </Text>
        </View>

        {cursos.map((curso, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{curso.section}</Text>
            {curso.items.map((item, i) => (
              <TrainingItem
                key={i}
                category={curso.section}
                title={item.title}
                description={item.description}
                url={item.url}
              />
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fascículos</Text>
          {fasciculos.map((item, index) => (
            <TrainingItem
              key={index}
              category="Fascículos"
              title={item.title}
              description={item.description}
              url={item.url}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { paddingHorizontal: 20, paddingVertical: 16 },
  header: { paddingVertical: 12, alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 6 },
  headerSubtitle: { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#EFEFEF' },
  iconContainer: { marginRight: 14 },
  textContainer: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemDescription: { fontSize: 14, color: '#888', marginTop: 4 },
});
