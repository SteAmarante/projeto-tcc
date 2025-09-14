import React from 'react';

// --- Componentes para compatibilidade com a Web ---

// Ícone de Escudo (SVG Padrão)
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

// Lista de fascículos com títulos e links diretos para os PDFs
const fasciculos = [
  {
    title: 'Furto de Celular',
    description: 'O que fazer em caso de furto ou perda.',
    url: 'https://cartilha.cert.br/fasciculos/furto-de-celular/fasciculo-furto-de-celular.pdf',
  },
  {
    title: 'Privacidade',
    description: 'Cuidados com sua privacidade na Internet.',
    url: 'https://cartilha.cert.br/fasciculos/privacidade/fasciculo-privacidade.pdf',
  },
  {
    title: 'Redes Sociais',
    description: 'Proteja seus perfis e sua reputação online.',
    url: 'https://cartilha.cert.br/fasciculos/redes-sociais/fasciculo-redes-sociais.pdf',
  },
  {
    title: 'Comércio Eletrônico',
    description: 'Dicas para compras online mais seguras.',
    url: 'https://cartilha.cert.br/fasciculos/comercio-eletronico/fasciculo-comercio-eletronico.pdf',
  },
];

// Componente reutilizável para os itens da lista (versão web)
const TrainingItem = ({ icon, title, description, onPress }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); onPress(); }} style={styles.itemContainerLink}>
    <div style={styles.iconContainer}>
      {icon}
    </div>
    <div style={styles.textContainer}>
      <p style={styles.itemTitle}>{title}</p>
      <p style={styles.itemDescription}>{description}</p>
    </div>
  </a>
);

const TreinamentoScreen = () => {
  // Função para abrir o link do PDF no navegador
  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={styles.safeArea}>
      <div style={styles.scrollView}>
        <div style={styles.header}>
          <p style={styles.headerTitle}>Treinamentos</p>
        </div>

        <div style={styles.section}>
          <p style={styles.sectionTitle}>Segurança da Informação</p>
          {/* Adicione aqui os itens de Segurança da Informação se desejar */}
        </div>

        <div style={styles.section}>
          <p style={styles.sectionTitle}>LGPD</p>
           {/* Adicione aqui os itens de LGPD se desejar */}
        </div>

        <div style={styles.section}>
          <p style={styles.sectionTitle}>Fascículos</p>
          {fasciculos.map((item, index) => (
            <TrainingItem
              key={index}
              icon={<ShieldIcon />}
              title={item.title}
              description={item.description}
              onPress={() => openLink(item.url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Estilos CSS-in-JS para compatibilidade com Web ---
const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  scrollView: {
    padding: '0 20px',
  },
  header: {
    padding: '20px 0',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
    margin: 0,
  },
  itemContainerLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '10px',
    border: '1px solid #EFEFEF',
    textDecoration: 'none',
    color: 'inherit',
  },
  iconContainer: {
    marginRight: '15px',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  itemDescription: {
    fontSize: '14px',
    color: '#888',
    marginTop: '2px',
    margin: 0,
  },
};

export default TreinamentoScreen;

