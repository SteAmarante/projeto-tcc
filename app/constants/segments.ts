// Este arquivo define os segmentos de negócio e seus multiplicadores de risco.
export interface Segment {
  id: string;
  name: string;
  description: string;
  multiplier: number; // O multiplicador de risco (1 a 5)
}

export const segments: Segment[] = [
  {
    id: 'finance_health',
    name: 'Financeiro ou Saúde',
    description: 'Lida com dados altamente sensíveis e regulamentados (LGPD, sigilo bancário).',
    multiplier: 5,
  },
  {
    id: 'tech',
    name: 'Tecnologia e Consultoria',
    description: 'Dados de clientes, propriedade intelectual e segredos de negócio.',
    multiplier: 4,
  },
  {
    id: 'retail',
    name: 'Varejo e E-commerce',
    description: 'Grande volume de dados de clientes e transações de pagamento.',
    multiplier: 3,
  },
  {
    id: 'industry',
    name: 'Indústria e Manufatura',
    description: 'Foco em continuidade operacional e proteção de sistemas industriais (OT).',
    multiplier: 2,
  },
  {
    id: 'other',
    name: 'Outros Setores',
    description: 'Negócios com menor exposição a dados sensíveis ou impacto crítico.',
    multiplier: 1,
  },
];
