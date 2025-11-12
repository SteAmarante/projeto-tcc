// Este arquivo armazena todas as perguntas e seus pesos base.
// Manter isso separado deixa o código da tela mais limpo e fácil de gerenciar.

export interface Question {
  id: number;
  text: string;
  weight: number; // Peso base da pergunta (criticidade)
}

export const questions: Question[] = [
  { id: 1, text: 'A sua empresa está monitorando as novas vulnerabilidades dos sistemas críticos (operacionais, aplicações, bancos de dados, serviços, etc.)?', weight: 4 },
  { id: 2, text: 'Os sistemas de informação são testados antes de serem colocados em produção?', weight: 3 },
  { id: 3, text: 'A topologia de rede e a arquitetura dos sistemas críticos da empresa são revisados periodicamente?', weight: 3 },
  { id: 4, text: 'Os planos de contingência e de continuidade de negócios são testados através de simulações?', weight: 5 },
  { id: 5, text: 'A política de segurança da empresa é testada regularmente contra simulações de ataques e testes de intrusão?', weight: 4 },
  { id: 6, text: 'Você pode estimar quais seriam os recursos necessários para alguém romper a segurança e invadir os sistemas de sua empresa?', weight: 4 },
  { id: 7, text: 'Você pode qualificar as ameaças para sua empresa?', weight: 3 },
  { id: 8, text: 'Os perfis de atacantes são revisados e redefinidos periodicamente?', weight: 2 },
  { id: 9, text: 'A sua empresa já estimou o custo de uma paralisação dos processos críticos?', weight: 5 },
  { id: 10, text: 'No caso de rupturas de segurança ou acesso indevido aos sistemas, é possível estimar as perdas financeiras?', weight: 5 },
  { id: 11, text: 'A sua empresa está adotando as ações recomendadas para proteger os sistemas de acordo com as novas vulnerabilidades descobertas?', weight: 4 },
  { id: 12, text: 'A sua organização tem uma política de segurança formal e documentada?', weight: 2 },
  { id: 13, text: 'Existe uma base de dados de segurança centralizada de todos os usuários?', weight: 2 },
  { id: 14, text: 'A sua empresa pode controlar o acesso de usuários externos e internos aos servidores de sua rede?', weight: 3 },
  { id: 15, text: 'É possível monitorar as atividades em toda a rede e em todos os servidores?', weight: 3 },
  { id: 16, text: 'A sua empresa monitora as atividades de cada usuário ou estação de trabalho?', weight: 2 },
  { id: 17, text: 'A sua empresa conseguiria confirmar a ocorrência de acesso indevido nos últimos 12 meses?', weight: 4 },
  { id: 18, text: 'As transações críticas da rede de sua empresa são criptografadas?', weight: 3 },
  { id: 19, text: 'A política e a infra-estrutura de segurança podem ser administradas de forma integrada?', weight: 2 },
  { id: 20, text: 'Existe um alerta em tempo real para tentativas de intrusão ou acesso indevido?', weight: 4 },
];
