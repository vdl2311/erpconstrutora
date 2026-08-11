import {
  Obra,
  DiarioObra,
  ContaPagar,
  ContaReceber,
  OrcamentoObra,
  Fornecedor,
  SolicitacaoCompra,
  MaterialEstoque,
  MovimentacaoEstoque,
  Equipamento,
  ManutencaoEquipamento,
  Funcionario,
  AlocacaoEquipe,
  Documento,
  Cliente,
  NotificacaoSistema,
  AuditLog,
  UserProfile,
  RolePermissions
} from './types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-001',
  name: 'Eng. Ricardo Vasconcelos',
  email: 'ricardo.v@obramaster.com.br',
  role: 'administrador',
  department: 'Diretoria Técnica & Operações',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250'
};

export const INITIAL_ROLES_PERMISSIONS: RolePermissions[] = [
  {
    role: 'administrador',
    label: 'Administrador Geral',
    modules: {
      obras: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      diario: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      financeiro: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      orcamento: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      compras: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      estoque: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      equipamentos: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      rh: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      documentos: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      crm: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      relatorios: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
    }
  },
  {
    role: 'gerente_obras',
    label: 'Gerente de Obras',
    modules: {
      obras: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: true, exportar: true, configuracoes: false },
      diario: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: false },
      financeiro: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      orcamento: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: true, exportar: true, configuracoes: false },
      compras: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: true, exportar: true, configuracoes: false },
      estoque: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      equipamentos: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      rh: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      documentos: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      crm: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: false, configuracoes: false },
      relatorios: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: true, configuracoes: false },
    }
  },
  {
    role: 'engenheiro',
    label: 'Engenheiro Residente',
    modules: {
      obras: { visualizar: true, criar: false, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      diario: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: true, exportar: true, configuracoes: false },
      financeiro: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: false, configuracoes: false },
      orcamento: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      compras: { visualizar: true, criar: true, editar: false, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      estoque: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      equipamentos: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      rh: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      documentos: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      crm: { visualizar: false, criar: false, editar: false, excluir: false, aprovar: false, exportar: false, configuracoes: false },
      relatorios: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: true, configuracoes: false },
    }
  },
  {
    role: 'financeiro',
    label: 'Gestor Financeiro',
    modules: {
      obras: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      diario: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: false, configuracoes: false },
      financeiro: { visualizar: true, criar: true, editar: true, excluir: true, aprovar: true, exportar: true, configuracoes: true },
      orcamento: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: true, exportar: true, configuracoes: false },
      compras: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: true, exportar: true, configuracoes: false },
      estoque: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: false, configuracoes: false },
      equipamentos: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: false, configuracoes: false },
      rh: { visualizar: true, criar: false, editar: false, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      documentos: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      crm: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: false, exportar: true, configuracoes: false },
      relatorios: { visualizar: true, criar: true, editar: true, excluir: false, aprovar: true, exportar: true, configuracoes: false },
    }
  }
];

export const INITIAL_OBRAS: Obra[] = [
  {
    id: 'obr-001',
    codigo: 'OBR-2026-01',
    nome: 'Residencial Horizon Bella Vista',
    clienteId: 'cli-001',
    clienteNome: 'Incorporadora Bella Vista S.A.',
    endereco: 'Av. das Nações Unidas, 14200 - Torre A',
    cidade: 'São Paulo',
    estado: 'SP',
    gerenteId: 'usr-002',
    gerenteNome: 'Engª. Amanda Silveira',
    engenheiroNome: 'Eng. Lucas Pedrosa',
    mestreNome: 'Mestre Benedito Alcantara',
    dataInicio: '2025-08-01',
    dataPrevistaTermino: '2026-12-15',
    valorContratado: 18500000,
    orcamentoTotal: 14200000,
    custoRealizadoTotal: 8950000,
    status: 'em_andamento',
    percentualConcluido: 62,
    fotoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800',
    observacoes: 'Obra residencial vertical de 18 andares. Ritmo acelerado de alvenaria e instalações elétricas/hidráulicas.',
    etapas: [
      { id: 'etp-101', nome: 'Projetos e Licenciamento', ordem: 1, dataInicio: '2025-08-01', dataFim: '2025-09-15', percentualConcluido: 100, custoPrevisto: 450000, custoRealizado: 438000, responsavel: 'Eng. Lucas', status: 'concluida' },
      { id: 'etp-102', nome: 'Terraplenagem e Contenções', ordem: 2, dataInicio: '2025-09-16', dataFim: '2025-11-01', percentualConcluido: 100, custoPrevisto: 1200000, custoRealizado: 1250000, responsavel: 'Mestre Benedito', status: 'concluida' },
      { id: 'etp-103', nome: 'Fundação e Estacas', ordem: 3, dataInicio: '2025-11-02', dataFim: '2026-01-20', percentualConcluido: 100, custoPrevisto: 2800000, custoRealizado: 2790000, responsavel: 'Eng. Lucas', status: 'concluida' },
      { id: 'etp-104', nome: 'Estrutura de Concreto Armado', ordem: 4, dataInicio: '2026-01-21', dataFim: '2026-05-30', percentualConcluido: 100, custoPrevisto: 4100000, custoRealizado: 3980000, responsavel: 'Mestre Benedito', status: 'concluida' },
      { id: 'etp-105', nome: 'Alvenaria e Vedações', ordem: 5, dataInicio: '2026-05-15', dataFim: '2026-08-30', percentualConcluido: 85, custoPrevisto: 1800000, custoRealizado: 1492000, responsavel: 'Mestre Benedito', status: 'em_andamento' },
      { id: 'etp-106', nome: 'Instalações Elétricas e Hidráulicas', ordem: 6, dataInicio: '2026-07-01', dataFim: '2026-10-15', percentualConcluido: 40, custoPrevisto: 1950000, custoRealizado: 810000, responsavel: 'Eng. Lucas', status: 'em_andamento' },
      { id: 'etp-107', nome: 'Revestimentos e Fachada', ordem: 7, dataInicio: '2026-09-01', dataFim: '2026-11-20', percentualConcluido: 0, custoPrevisto: 1300000, custoRealizado: 0, responsavel: 'Mestre Benedito', status: 'nao_iniciada' },
      { id: 'etp-108', nome: 'Acabamentos e Pintura', ordem: 8, dataInicio: '2026-10-15', dataFim: '2026-12-10', percentualConcluido: 0, custoPrevisto: 600000, custoRealizado: 0, responsavel: 'Mestre Benedito', status: 'nao_iniciada' }
    ]
  },
  {
    id: 'obr-002',
    codigo: 'OBR-2026-02',
    nome: 'Centro Empresarial Vanguardia',
    clienteId: 'cli-002',
    clienteNome: 'Vanguardia Empreendimentos Imobiliários',
    endereco: 'Rua Funchal, 890 - Vila Olímpia',
    cidade: 'São Paulo',
    estado: 'SP',
    gerenteId: 'usr-001',
    gerenteNome: 'Eng. Ricardo Vasconcelos',
    engenheiroNome: 'Eng. Marcelo Antunes',
    mestreNome: 'Mestre Geraldo Ramos',
    dataInicio: '2025-10-10',
    dataPrevistaTermino: '2027-04-30',
    valorContratado: 34000000,
    orcamentoTotal: 26500000,
    custoRealizadoTotal: 11200000,
    status: 'em_andamento',
    percentualConcluido: 42,
    fotoUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    observacoes: 'Edifício comercial de alto padrão com pele de vidro e certificação LEED. Execução das lajes protendidas do 8º pav.',
    etapas: [
      { id: 'etp-201', nome: 'Fundação Profunda e Contenção', ordem: 1, dataInicio: '2025-10-10', dataFim: '2026-01-15', percentualConcluido: 100, custoPrevisto: 5500000, custoRealizado: 5620000, responsavel: 'Eng. Marcelo', status: 'concluida' },
      { id: 'etp-202', nome: 'Subsolos e Garagem', ordem: 2, dataInicio: '2026-01-16', dataFim: '2026-04-30', percentualConcluido: 100, custoPrevisto: 6800000, custoRealizado: 6680000, responsavel: 'Mestre Geraldo', status: 'concluida' },
      { id: 'etp-203', nome: 'Estrutura Principal de Concreto', ordem: 3, dataInicio: '2026-05-01', dataFim: '2026-11-15', percentualConcluido: 55, custoPrevisto: 8200000, custoRealizado: 4510000, responsavel: 'Eng. Marcelo', status: 'em_andamento' },
      { id: 'etp-204', nome: 'Instalações Especiais e Climatização', ordem: 4, dataInicio: '2026-08-01', dataFim: '2027-01-30', percentualConcluido: 10, custoPrevisto: 4000000, custoRealizado: 390000, responsavel: 'Eng. Marcelo', status: 'em_andamento' }
    ]
  },
  {
    id: 'obr-003',
    codigo: 'OBR-2026-03',
    nome: 'Complexo Logístico Rodovia Anhanguera',
    clienteId: 'cli-003',
    clienteNome: 'Global Logistics Brasil Ltda',
    endereco: 'KM 28 Rodovia Anhanguera - Distrito Industrial',
    cidade: 'Jundiaí',
    estado: 'SP',
    gerenteId: 'usr-003',
    gerenteNome: 'Eng. Fernando Diniz',
    engenheiroNome: 'Engª. Clarissa Prado',
    mestreNome: 'Mestre Otávio Neves',
    dataInicio: '2026-01-05',
    dataPrevistaTermino: '2026-09-30',
    valorContratado: 12800000,
    orcamentoTotal: 9800000,
    custoRealizadoTotal: 7850000,
    status: 'atrasada',
    percentualConcluido: 78,
    fotoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    observacoes: 'Galpão pré-moldado com piso industrial de alta resistência. Atraso devido às fortes chuvas no período de fundação.',
    etapas: [
      { id: 'etp-301', nome: 'Terraplenagem e Pavimentação Externa', ordem: 1, dataInicio: '2026-01-05', dataFim: '2026-03-10', percentualConcluido: 100, custoPrevisto: 1800000, custoRealizado: 2010000, responsavel: 'Engª. Clarissa', status: 'concluida' },
      { id: 'etp-302', nome: 'Montagem de Pré-Moldados', ordem: 2, dataInicio: '2026-03-11', dataFim: '2026-06-15', percentualConcluido: 100, custoPrevisto: 4200000, custoRealizado: 4150000, responsavel: 'Mestre Otávio', status: 'concluida' },
      { id: 'etp-303', nome: 'Cobertura e Fechamento Lateral', ordem: 3, dataInicio: '2026-06-16', dataFim: '2026-08-10', percentualConcluido: 70, custoPrevisto: 2300000, custoRealizado: 1690000, responsavel: 'Mestre Otávio', status: 'atrasada' }
    ]
  },
  {
    id: 'obr-004',
    codigo: 'OBR-2026-04',
    nome: 'Escola Técnica Estadual de Barueri',
    clienteId: 'cli-004',
    clienteNome: 'Secretaria de Infraestrutura de SP',
    endereco: 'Rua das Camélias, 300',
    cidade: 'Barueri',
    estado: 'SP',
    gerenteId: 'usr-001',
    gerenteNome: 'Eng. Ricardo Vasconcelos',
    engenheiroNome: 'Eng. Gabriel Martins',
    mestreNome: 'Mestre Benedito Alcantara',
    dataInicio: '2025-03-01',
    dataPrevistaTermino: '2026-03-30',
    dataRealTermino: '2026-04-10',
    valorContratado: 8900000,
    orcamentoTotal: 6800000,
    custoRealizadoTotal: 6710000,
    status: 'concluida',
    percentualConcluido: 100,
    fotoUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
    observacoes: 'Obra concluída e entregue à Secretaria. Vistoria técnica aprovada com termo de recebimento definitivo.',
    etapas: [
      { id: 'etp-401', nome: 'Fundação e Estrutura', ordem: 1, dataInicio: '2025-03-01', dataFim: '2025-07-30', percentualConcluido: 100, custoPrevisto: 2500000, custoRealizado: 2480000, responsavel: 'Eng. Gabriel', status: 'concluida' },
      { id: 'etp-402', nome: 'Instalações e Acabamentos', ordem: 2, dataInicio: '2025-08-01', dataFim: '2026-04-10', percentualConcluido: 100, custoPrevisto: 4300000, custoRealizado: 4230000, responsavel: 'Eng. Gabriel', status: 'concluida' }
    ]
  }
];

export const INITIAL_DIARIOS: DiarioObra[] = [
  {
    id: 'dio-001',
    obraId: 'obr-001',
    obraNome: 'Residencial Horizon Bella Vista',
    data: '2026-08-10',
    responsavel: 'Mestre Benedito Alcantara',
    condicoesClimaticas: 'ensolarado',
    trabalhadoresPresentes: 38,
    servicosExecutados: 'Concretagem da laje do 14º pavimento realizada com sucesso (Volume: 42m³). Continuidade do assentamento de blocos de vedação no 10º pavimento e tubulação hidráulica nos banheiros do 7º ao 9º andar.',
    materiaisUtilizados: '42 m³ Concreto FCK 30MPa; 850 unidades de Bloco Cerâmico 14x19x29; 12 barras Tubo PVC 100mm; 250kg Argamassa colante.',
    equipamentosUtilizados: '1x Guindaste de Torre (Grua); 1x Caminhão Betoneira com bomba de concreto; 2x Elevadores de Carga de cremalheira.',
    ocorrencias: 'Sem acidentes nem paralisações. Entrega do lote de cabos elétricos realizada pela fornecedora às 10:30h com conferência pelo almoxarife.',
    visitasTecnicas: 'Eng. Fiscal da Caixa Econômica Federal esteve presente para medição do 6º boletim mensal.',
    fotos: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=600']
  },
  {
    id: 'dio-002',
    obraId: 'obr-001',
    obraNome: 'Residencial Horizon Bella Vista',
    data: '2026-08-09',
    responsavel: 'Eng. Lucas Pedrosa',
    condicoesClimaticas: 'nublado',
    trabalhadoresPresentes: 35,
    servicosExecutados: 'Montagem de fôrmas de compensado resinado e armação de aço CA-50 no 14º pavimento. Passagem de conduítes de iluminação.',
    materiaisUtilizados: '3.200 kg Aço CA-50 10mm e 12mm; 45 chapas de Compensado 18mm; 180m Conduíte Corrugado 3/4.',
    equipamentosUtilizados: '1x Grua Torre; 1x Cortadora/Dobradora de Aço.',
    ocorrencias: 'Instabilidade no fornecimento de água no período da manhã resolvida após acionamento da concessionária local.',
    visitasTecnicas: 'Técnico de Segurança do Trabalho realizou DDS (Diálogo Diário de Segurança) sobre uso de cinto de paraquedista em altura.'
  },
  {
    id: 'dio-003',
    obraId: 'obr-002',
    obraNome: 'Centro Empresarial Vanguardia',
    data: '2026-08-10',
    responsavel: 'Eng. Marcelo Antunes',
    condicoesClimaticas: 'ensolarado',
    trabalhadoresPresentes: 52,
    servicosExecutados: 'Tensionamento das cordoalhas da laje protendida do 8º pavimento. Instalação das tubulações de incêndio e shafts principais de ar condicionado.',
    materiaisUtilizados: '840m Cordoalha de Aço CP-190 RB; 60m Tubulação de Aço Carbono 4"; 12 registros de recalque.',
    equipamentosUtilizados: '1x Macaco hidráulico de protensão; 2x Elevadores de obra; 1x Gerador de Emergência 150kVA.',
    ocorrencias: 'Atraso na entrega do segundo lote de tubos galvanizados. Fornecedor notificado pelo departamento de compras.',
    visitasTecnicas: 'Consultor de Acústica e Fachadas para aferição de isolamento nos caixilhos das suítes.'
  }
];

export const INITIAL_CONTAS_PAGAR: ContaPagar[] = [
  {
    id: 'cp-001',
    fornecedorId: 'for-001',
    fornecedorNome: 'Cimento & Concreto Votoran S.A.',
    categoria: 'Materiais de Construção',
    obraId: 'obr-001',
    obraNome: 'Residencial Horizon Bella Vista',
    descricao: 'Fornecimento de Concreto Usinado FCK 30MPa - Laje 14º Pavimento',
    valor: 48500,
    vencimento: '2026-08-15',
    status: 'pendente',
    formaPagamento: 'boleto',
    centroCusto: 'CC-101 (Horizon - Estrutura)'
  },
  {
    id: 'cp-002',
    fornecedorId: 'for-002',
    fornecedorNome: 'Gerdau Aços Longos S.A.',
    categoria: 'Materiais de Construção',
    obraId: 'obr-002',
    obraNome: 'Centro Empresarial Vanguardia',
    descricao: 'Lote de Aço CA-50 / CA-60 em barras cortadas e dobradas',
    valor: 112000,
    vencimento: '2026-08-08',
    status: 'vencido',
    formaPagamento: 'boleto',
    centroCusto: 'CC-102 (Vanguardia - Estrutura)'
  },
  {
    id: 'cp-003',
    fornecedorId: 'for-003',
    fornecedorNome: 'LocaMáquinas Equipamentos de Construção',
    categoria: 'Locação de Equipamentos',
    obraId: 'obr-003',
    obraNome: 'Complexo Logístico Rodovia Anhanguera',
    descricao: 'Aluguel de Escavadeira 20T e Plataforma Elevatória Tesoura',
    valor: 26400,
    vencimento: '2026-08-20',
    status: 'pendente',
    formaPagamento: 'transferencia',
    centroCusto: 'CC-103 (Logístico - Equipamentos)'
  },
  {
    id: 'cp-004',
    fornecedorId: 'for-004',
    fornecedorNome: 'EletroInstalações SP Ltda',
    categoria: 'Subempreiteiros',
    obraId: 'obr-001',
    obraNome: 'Residencial Horizon Bella Vista',
    descricao: 'Medição #04 - Mão de obra de instalações elétricas prévias',
    valor: 35000,
    vencimento: '2026-08-02',
    dataPagamento: '2026-08-02',
    status: 'pago',
    formaPagamento: 'pix',
    centroCusto: 'CC-101 (Horizon - Elétrica)'
  },
  {
    id: 'cp-005',
    fornecedorId: 'for-005',
    fornecedorNome: 'Engenharia de Solos & Ensaios Ltda',
    categoria: 'Serviços Técnicos',
    obraId: 'obr-002',
    obraNome: 'Centro Empresarial Vanguardia',
    descricao: 'Ensaios de Esclerometria e Rompimento de Corpos de Prova',
    valor: 8200,
    vencimento: '2026-08-05',
    dataPagamento: '2026-08-05',
    status: 'pago',
    formaPagamento: 'pix',
    centroCusto: 'CC-102 (Vanguardia - Qualidade)'
  }
];

export const INITIAL_CONTAS_RECEBER: ContaReceber[] = [
  {
    id: 'cr-001',
    clienteId: 'cli-001',
    clienteNome: 'Incorporadora Bella Vista S.A.',
    obraId: 'obr-001',
    obraNome: 'Residencial Horizon Bella Vista',
    descricao: 'Medição #06 - Concretagem de Estrutura e Alvenaria 10º ao 12º Pav.',
    valor: 1450000,
    vencimento: '2026-08-18',
    status: 'pendente',
    formaRecebimento: 'transferencia'
  },
  {
    id: 'cr-002',
    clienteId: 'cli-002',
    clienteNome: 'Vanguardia Empreendimentos Imobiliários',
    obraId: 'obr-002',
    obraNome: 'Centro Empresarial Vanguardia',
    descricao: 'Aporte de Cronograma Físico-Financeiro - Etapa Lajes Protendidas',
    valor: 2800000,
    vencimento: '2026-08-25',
    status: 'pendente',
    formaRecebimento: 'boleto'
  },
  {
    id: 'cr-003',
    clienteId: 'cli-003',
    clienteNome: 'Global Logistics Brasil Ltda',
    obraId: 'obr-003',
    obraNome: 'Complexo Logístico Rodovia Anhanguera',
    descricao: 'Parcela de Medição #03 - Estrutura Pré-Moldada',
    valor: 890000,
    vencimento: '2026-07-30',
    dataRecebimento: '2026-07-29',
    status: 'recebido',
    formaRecebimento: 'pix'
  },
  {
    id: 'cr-004',
    clienteId: 'cli-004',
    clienteNome: 'Secretaria de Infraestrutura de SP',
    obraId: 'obr-004',
    obraNome: 'Escola Técnica Estadual de Barueri',
    descricao: 'Termo de Entrega Definitivo e Retenção Contratual Liberada',
    valor: 445000,
    vencimento: '2026-06-15',
    dataRecebimento: '2026-06-14',
    status: 'recebido',
    formaRecebimento: 'transferencia'
  }
];

export const INITIAL_ORCAMENTOS: OrcamentoObra[] = [
  {
    id: 'orc-001',
    obraId: 'obr-001',
    obraNome: 'Residencial Horizon Bella Vista',
    bdiPercentual: 22.5,
    margemLucroPercentual: 15.0,
    itens: [
      { id: 'orc-item-01', itemCodigo: 'SINAPI-92765', descricao: 'Aço CA-50 d=10mm corte e dobra em fábrica', quantidade: 48000, unidade: 'kg', custoUnitarioPrevisto: 9.80, custoUnitarioRealizado: 9.65, custoTotalPrevisto: 470400, custoTotalRealizado: 463200, categoria: 'Material', etapaNome: 'Estrutura de Concreto Armado' },
      { id: 'orc-item-02', itemCodigo: 'SINAPI-94970', descricao: 'Concreto fck=30MPa usinado com lançamento por bomba', quantidade: 2100, unidade: 'm³', custoUnitarioPrevisto: 490.00, custoUnitarioRealizado: 510.00, custoTotalPrevisto: 1029000, custoTotalRealizado: 1071000, categoria: 'Material', etapaNome: 'Estrutura de Concreto Armado' },
      { id: 'orc-item-03', itemCodigo: 'SINAPI-88309', descricao: 'Pedreiro de Alvenaria com encargos complementares', quantidade: 3800, unidade: 'hr', custoUnitarioPrevisto: 32.50, custoUnitarioRealizado: 34.00, custoTotalPrevisto: 123500, custoTotalRealizado: 129200, categoria: 'Mão de Obra', etapaNome: 'Alvenaria e Vedações' },
      { id: 'orc-item-04', itemCodigo: 'SINAPI-93208', descricao: 'Bloco Cerâmico de Vedação 14x19x29cm', quantidade: 85000, unidade: 'un', custoUnitarioPrevisto: 2.80, custoUnitarioRealizado: 2.75, custoTotalPrevisto: 238000, custoTotalRealizado: 233750, categoria: 'Material', etapaNome: 'Alvenaria e Vedações' },
      { id: 'orc-item-05', itemCodigo: 'SINAPI-91834', descricao: 'Eletroduto Flexível Corrugado PVC 3/4"', quantidade: 12000, unidade: 'm', custoUnitarioPrevisto: 3.40, custoUnitarioRealizado: 3.20, custoTotalPrevisto: 40800, custoTotalRealizado: 38400, categoria: 'Material', etapaNome: 'Instalações Elétricas e Hidráulicas' }
    ]
  }
];

export const INITIAL_FORNECEDORES: Fornecedor[] = [
  { id: 'for-001', razaoSocial: 'Cimento & Concreto Votoran S.A.', nomeFantasia: 'Votoran Concretos', cnpj: '01.234.567/0001-89', categoria: 'Concreto e Agregados', contatoNome: 'Carlos Eduardo', telefone: '(11) 98765-4321', email: 'vendas@votoran.com.br', avaliacao: 4.8, cidade: 'São Paulo' },
  { id: 'for-002', razaoSocial: 'Gerdau Aços Longos S.A.', nomeFantasia: 'Gerdau Aços', cnpj: '02.345.678/0001-90', categoria: 'Aço e Estrutura', contatoNome: 'Juliana Costa', telefone: '(11) 97654-3210', email: 'atendimento@gerdau.com.br', avaliacao: 4.9, cidade: 'São Paulo' },
  { id: 'for-003', razaoSocial: 'LocaMáquinas Equipamentos de Construção Ltda', nomeFantasia: 'LocaMáquinas', cnpj: '03.456.789/0001-12', categoria: 'Locação de Máquinas', contatoNome: 'Roberto Mendes', telefone: '(11) 96543-2109', email: 'locacao@locamaquinas.com.br', avaliacao: 4.6, cidade: 'Guarulhos' },
  { id: 'for-004', razaoSocial: 'EletroInstalações SP Materiais Elétricos Ltda', nomeFantasia: 'EletroSP', cnpj: '04.567.890/0001-23', categoria: 'Materiais Elétricos', contatoNome: 'Renata Lima', telefone: '(11) 95432-1098', email: 'comercial@eletrosp.com.br', avaliacao: 4.5, cidade: 'São Paulo' },
  { id: 'for-005', razaoSocial: 'Tigre Tubos e Conexões S.A.', nomeFantasia: 'Tigre Brasil', cnpj: '05.678.901/0001-34', categoria: 'Hidráulica e Saneamento', contatoNome: 'Sérgio Freitas', telefone: '(11) 94321-0987', email: 'vendas@tigre.com.br', avaliacao: 4.9, cidade: 'Campinas' }
];

export const INITIAL_SOLICITACOES_COMPRA: SolicitacaoCompra[] = [
  {
    id: 'sol-001',
    numero: 'SOL-2026-088',
    obraId: 'obr-001',
    obraNome: 'Residencial Horizon Bella Vista',
    solicitante: 'Mestre Benedito Alcantara',
    dataSolicitacao: '2026-08-08',
    dataNecessidade: '2026-08-18',
    itemNome: 'Tubo PVC Rigido 100mm Esgoto com Junta Elástica',
    categoria: 'Hidráulica',
    quantidade: 150,
    unidade: 'm',
    status: 'em_cotacao',
    observacoes: 'Uso prioritário nos prumadas do 11º ao 14º pavimento.',
    cotacoes: [
      { fornecedorId: 'for-005', fornecedorNome: 'Tigre Brasil', precoUnitario: 38.50, prazoEntregaDias: 3, condicaoPagamento: '28 dias boleto', selecionada: true },
      { fornecedorId: 'for-004', fornecedorNome: 'EletroSP', precoUnitario: 41.20, prazoEntregaDias: 2, condicaoPagamento: 'À vista PIX', selecionada: false }
    ]
  },
  {
    id: 'sol-002',
    numero: 'SOL-2026-089',
    obraId: 'obr-002',
    obraNome: 'Centro Empresarial Vanguardia',
    solicitante: 'Eng. Marcelo Antunes',
    dataSolicitacao: '2026-08-09',
    dataNecessidade: '2026-08-15',
    itemNome: 'Argamassa Colante AC-III com Aditivo Polimérico (Saco 20kg)',
    categoria: 'Acabamento',
    quantidade: 400,
    unidade: 'saco',
    status: 'aguardando_aprovacao',
    observacoes: 'Assentamento de porcelanato nas áreas comuns do mezanino.',
    cotacoes: [
      { fornecedorId: 'for-001', fornecedorNome: 'Votoran Concretos', precoUnitario: 34.00, prazoEntregaDias: 2, condicaoPagamento: '30 dias', selecionada: true },
      { fornecedorId: 'for-002', fornecedorNome: 'Gerdau Aços', precoUnitario: 37.50, prazoEntregaDias: 5, condicaoPagamento: '15 dias', selecionada: false }
    ],
    valorFinalAprovado: 13600,
    fornecedorVencedorId: 'for-001',
    fornecedorVencedorNome: 'Votoran Concretos'
  },
  {
    id: 'sol-003',
    numero: 'SOL-2026-090',
    obraId: 'obr-003',
    obraNome: 'Complexo Logístico Rodovia Anhanguera',
    solicitante: 'Engª. Clarissa Prado',
    dataSolicitacao: '2026-08-10',
    dataNecessidade: '2026-08-12',
    itemNome: 'Manta Asfáltica Alumínio 4mm Rolo 10m²',
    categoria: 'Impermeabilização',
    quantidade: 85,
    unidade: 'rolo',
    status: 'solicitada',
    cotacoes: []
  }
];

export const INITIAL_MATERIAIS: MaterialEstoque[] = [
  { id: 'mat-001', codigo: 'MAT-101', nome: 'Cimento CP-II F 32 Saco 50kg', categoria: 'Agregados e Aglomerantes', unidade: 'saco', estoqueMinimo: 100, estoqueAtual: 280, custoMedioUnitario: 38.50, localizacao: 'Depósito Central' },
  { id: 'mat-002', codigo: 'MAT-102', nome: 'Aço CA-50 10mm (3/8") Barra 12m', categoria: 'Aço e Estrutura', unidade: 'barra', estoqueMinimo: 200, estoqueAtual: 45, custoMedioUnitario: 68.00, localizacao: 'Almoxarifado Horizon' },
  { id: 'mat-003', codigo: 'MAT-103', nome: 'Bloco Cerâmico 14x19x29cm (Vedação)', categoria: 'Alvenaria', unidade: 'milheiro', estoqueMinimo: 10, estoqueAtual: 18, custoMedioUnitario: 2750.00, localizacao: 'Pátio Vanguardia' },
  { id: 'mat-004', codigo: 'MAT-104', nome: 'Tubo PVC Esgoto 100mm Barra 6m', categoria: 'Hidráulica', unidade: 'barra', estoqueMinimo: 50, estoqueAtual: 12, custoMedioUnitario: 82.00, localizacao: 'Depósito Central' },
  { id: 'mat-005', codigo: 'MAT-105', nome: 'Fio Flexível 2,5mm² Rolo 100m Azul', categoria: 'Elétrica', unidade: 'rolo', estoqueMinimo: 30, estoqueAtual: 65, custoMedioUnitario: 185.00, localizacao: 'Almoxarifado Horizon' }
];

export const INITIAL_MOVIMENTACOES_ESTOQUE: MovimentacaoEstoque[] = [
  { id: 'mov-001', materialId: 'mat-001', materialNome: 'Cimento CP-II F 32 Saco 50kg', tipo: 'entrada', quantidade: 200, data: '2026-08-05', responsavel: 'Almoxarife João Carlos', observacao: 'Entrada referente a NF-89021' },
  { id: 'mov-002', materialId: 'mat-002', materialNome: 'Aço CA-50 10mm (3/8") Barra 12m', tipo: 'saida', quantidade: 80, data: '2026-08-09', obraOrigemId: 'obr-001', obraOrigemNome: 'Residencial Horizon Bella Vista', responsavel: 'Mestre Benedito Alcantara', observacao: 'Retirada para armação de pilares 14º pav.' },
  { id: 'mov-003', materialId: 'mat-004', materialNome: 'Tubo PVC Esgoto 100mm Barra 6m', tipo: 'transferencia', quantidade: 25, data: '2026-08-07', obraOrigemId: 'obr-002', obraOrigemNome: 'Centro Empresarial Vanguardia', obraDestinoId: 'obr-001', obraDestinoNome: 'Residencial Horizon Bella Vista', responsavel: 'Eng. Lucas Pedrosa', observacao: 'Transferência emergencial entre almoxarifados' }
];

export const INITIAL_EQUIPAMENTOS: Equipamento[] = [
  { id: 'eqp-001', patrimonio: 'PAT-2024-01', nome: 'Escavadeira Hidráulica 20T Caterpillar 320', categoria: 'Terraplenagem e Pesados', marcaModelo: 'CAT 320 GX', numeroSerie: 'CAT320GX-98217', dataAquisicao: '2024-03-15', valorAquisicao: 680000, obraAtualId: 'obr-003', obraAtualNome: 'Complexo Logístico Rodovia Anhanguera', responsavel: 'Operador Valdir Souza', status: 'operacional', horimetroKm: 2840, unidadeMedida: 'horas', proximaManutencaoVal: 3000, proximaManutencaoData: '2026-09-01' },
  { id: 'eqp-002', patrimonio: 'PAT-2025-08', nome: 'Grua de Torre Fixa 50m Carga 5T', categoria: 'Elevação e Cargas', marcaModelo: 'Liebherr 85 EC-B', numeroSerie: 'LIEB-85ECB-4421', dataAquisicao: '2025-01-10', valorAquisicao: 450000, obraAtualId: 'obr-001', obraAtualNome: 'Residencial Horizon Bella Vista', responsavel: 'Operador Tiago Guimarães', status: 'alocado', horimetroKm: 1950, unidadeMedida: 'horas', proximaManutencaoVal: 2000, proximaManutencaoData: '2026-08-18' },
  { id: 'eqp-003', patrimonio: 'PAT-2023-14', nome: 'Caminhão Munk 12T Ford Cargo', categoria: 'Transporte e Transbordo', marcaModelo: 'Ford Cargo 1723 Munk Argus', numeroSerie: '9BF-CARGO-77821', dataAquisicao: '2023-08-20', valorAquisicao: 320000, obraAtualId: 'obr-002', obraAtualNome: 'Centro Empresarial Vanguardia', responsavel: 'Motorista Robson Alves', status: 'em_manutencao', horimetroKm: 84200, unidadeMedida: 'km', proximaManutencaoVal: 85000, proximaManutencaoData: '2026-08-12' },
  { id: 'eqp-004', patrimonio: 'PAT-2025-22', nome: 'Gerador Silenciado 150 kVA Stemac', categoria: 'Energia e Utilidades', marcaModelo: 'Stemac Cummins 150kVA', numeroSerie: 'STEM-CUM-150-112', dataAquisicao: '2025-06-01', valorAquisicao: 125000, obraAtualId: 'obr-002', obraAtualNome: 'Centro Empresarial Vanguardia', responsavel: 'Eletricista Cláudio Viana', status: 'operacional', horimetroKm: 620, unidadeMedida: 'horas', proximaManutencaoVal: 1000, proximaManutencaoData: '2026-11-01' }
];

export const INITIAL_MANUTENCOES: ManutencaoEquipamento[] = [
  { id: 'man-001', equipamentoId: 'eqp-003', equipamentoNome: 'Caminhão Munk 12T Ford Cargo', tipo: 'corretiva', data: '2026-08-10', descricao: 'Troca do cilindro hidráulico da lança principal e substituição de mangueiras com vazamento de óleo.', custo: 7400, oficinaResponsavel: 'Munk & Cia Assistência Técnica', status: 'em_andamento' },
  { id: 'man-002', equipamentoId: 'eqp-002', equipamentoNome: 'Grua de Torre Fixa 50m Carga 5T', tipo: 'preventiva', data: '2026-08-18', descricao: 'Revisão periódica de 2.000 horas: Lubrificação da coroa de giros e verificação dos cabos de aço.', custo: 3800, oficinaResponsavel: 'Liebherr Serviços de Elevação', status: 'agendada' }
];

export const INITIAL_FUNCIONARIOS: Funcionario[] = [
  { id: 'fun-001', cpf: '123.456.789-00', nome: 'Eng. Lucas Pedrosa', cargo: 'Engenheiro Residente', departamento: 'Engenharia', telefone: '(11) 98111-2233', email: 'lucas.pedrosa@obramaster.com.br', dataAdmissao: '2023-02-15', salario: 12500, status: 'ativo', obraAlocadaId: 'obr-001', obraAlocadaNome: 'Residencial Horizon Bella Vista', certificados: ['CREA-SP Ativo', 'NR-35 Trabalho em Altura', 'Gerenciamento BIM'] },
  { id: 'fun-002', cpf: '234.567.890-11', nome: 'Mestre Benedito Alcantara', cargo: 'Mestre de Obras', departamento: 'Operacional', telefone: '(11) 98222-3344', email: 'benedito.alcantara@obramaster.com.br', dataAdmissao: '2020-05-10', salario: 7800, status: 'ativo', obraAlocadaId: 'obr-001', obraAlocadaNome: 'Residencial Horizon Bella Vista', certificados: ['NR-18 Segurança na Construção', 'NR-35', 'Primeiros Socorros'] },
  { id: 'fun-003', cpf: '345.678.901-22', nome: 'Eng. Marcelo Antunes', cargo: 'Engenheiro Residente', departamento: 'Engenharia', telefone: '(11) 98333-4455', email: 'marcelo.antunes@obramaster.com.br', dataAdmissao: '2022-09-01', salario: 13200, status: 'ativo', obraAlocadaId: 'obr-002', obraAlocadaNome: 'Centro Empresarial Vanguardia', certificados: ['CREA-SP Ativo', 'PMP Certified', 'Concreto Protendido Especialista'] },
  { id: 'fun-004', cpf: '456.789.012-33', nome: 'Mestre Geraldo Ramos', cargo: 'Mestre de Obras', departamento: 'Operacional', telefone: '(11) 98444-5566', email: 'geraldo.ramos@obramaster.com.br', dataAdmissao: '2019-11-15', salario: 8100, status: 'ativo', obraAlocadaId: 'obr-002', obraAlocadaNome: 'Centro Empresarial Vanguardia', certificados: ['NR-18', 'NR-35', 'Liderança de Campo'] },
  { id: 'fun-005', cpf: '567.890.123-44', nome: 'Juliana Medeiros', cargo: 'Analista de Compras Pleno', departamento: 'Suprimentos', telefone: '(11) 98555-6677', email: 'juliana.medeiros@obramaster.com.br', dataAdmissao: '2024-01-20', salario: 5400, status: 'ativo', certificados: ['Negociação Estratégica', 'Gestão de Cadeia de Suprimentos'] }
];

export const INITIAL_ALOCACOES: AlocacaoEquipe[] = [
  { id: 'alo-001', obraId: 'obr-001', obraNome: 'Residencial Horizon Bella Vista', funcionarioId: 'fun-001', funcionarioNome: 'Eng. Lucas Pedrosa', cargo: 'Engenheiro Residente', dataInicio: '2025-08-01', dataFimPrevista: '2026-12-15', status: 'alocado', horasTrabalhadasSemana: 44 },
  { id: 'alo-002', obraId: 'obr-001', obraNome: 'Residencial Horizon Bella Vista', funcionarioId: 'fun-002', funcionarioNome: 'Mestre Benedito Alcantara', cargo: 'Mestre de Obras', dataInicio: '2025-08-01', dataFimPrevista: '2026-12-15', status: 'alocado', horasTrabalhadasSemana: 44 },
  { id: 'alo-003', obraId: 'obr-002', obraNome: 'Centro Empresarial Vanguardia', funcionarioId: 'fun-003', funcionarioNome: 'Eng. Marcelo Antunes', cargo: 'Engenheiro Residente', dataInicio: '2025-10-10', dataFimPrevista: '2027-04-30', status: 'alocado', horasTrabalhadasSemana: 48 },
  { id: 'alo-004', obraId: 'obr-002', obraNome: 'Centro Empresarial Vanguardia', funcionarioId: 'fun-004', funcionarioNome: 'Mestre Geraldo Ramos', cargo: 'Mestre de Obras', dataInicio: '2025-10-10', dataFimPrevista: '2027-04-30', status: 'sobrecarregado', horasTrabalhadasSemana: 54 }
];

export const INITIAL_DOCUMENTOS: Documento[] = [
  { id: 'doc-001', nome: 'Contrato_Principal_Incorporadora_Bella_Vista.pdf', categoria: 'Contratos', obraId: 'obr-001', obraNome: 'Residencial Horizon Bella Vista', dataUpload: '2025-07-28', tamanhoKb: 2450, tipoArquivo: 'PDF', versao: '1.2', enviadoPor: 'Eng. Ricardo Vasconcelos' },
  { id: 'doc-002', nome: 'Planta_Estrutural_Lajes_10_ao_18_Rev04.dwg', categoria: 'Projetos e Plantas', obraId: 'obr-001', obraNome: 'Residencial Horizon Bella Vista', dataUpload: '2026-01-10', tamanhoKb: 18400, tipoArquivo: 'DWG', versao: '4.0', enviadoPor: 'Eng. Lucas Pedrosa' },
  { id: 'doc-003', nome: 'Alvara_de_Execucao_Prefeitura_SP_2025_0911.pdf', categoria: 'Licenças e Alvarás', obraId: 'obr-001', obraNome: 'Residencial Horizon Bella Vista', dataUpload: '2025-08-02', tamanhoKb: 890, tipoArquivo: 'PDF', versao: '1.0', enviadoPor: 'Amanda Silveira' },
  { id: 'doc-004', nome: 'Relatorio_Sondagem_SPT_Terreno_Vanguardia.pdf', categoria: 'Projetos e Plantas', obraId: 'obr-002', obraNome: 'Centro Empresarial Vanguardia', dataUpload: '2025-09-15', tamanhoKb: 3120, tipoArquivo: 'PDF', versao: '1.0', enviadoPor: 'Eng. Marcelo Antunes' },
  { id: 'doc-005', nome: 'NF_Cimento_Votoran_89021.pdf', categoria: 'Notas Fiscais', obraId: 'obr-001', obraNome: 'Residencial Horizon Bella Vista', dataUpload: '2026-08-05', tamanhoKb: 420, tipoArquivo: 'PDF', versao: '1.0', enviadoPor: 'João Carlos (Almoxarife)' }
];

export const INITIAL_CLIENTES: Cliente[] = [
  { id: 'cli-001', tipo: 'PJ', nomeRazao: 'Incorporadora Bella Vista S.A.', cpfCnpj: '12.345.678/0001-99', email: 'contato@bellavista.com.br', telefone: '(11) 3090-8800', cidade: 'São Paulo', estado: 'SP', totalContratado: 18500000, status: 'ativo', historicoNotas: 'Cliente de alto volume. Pagamentos em dia referente às medições mensais.' },
  { id: 'cli-002', tipo: 'PJ', nomeRazao: 'Vanguardia Empreendimentos Imobiliários', cpfCnpj: '98.765.432/0001-11', email: 'diretoria@vanguardiaemp.com.br', telefone: '(11) 3888-2200', cidade: 'São Paulo', estado: 'SP', totalContratado: 34000000, status: 'ativo', historicoNotas: 'Parceiro estratégico para edifícios corporativos Triple A.' },
  { id: 'cli-003', tipo: 'PJ', nomeRazao: 'Global Logistics Brasil Ltda', cpfCnpj: '45.678.912/0001-33', email: 'obra.jundiai@globallog.com.br', telefone: '(11) 4580-9000', cidade: 'Jundiaí', estado: 'SP', totalContratado: 12800000, status: 'ativo', historicoNotas: 'Galpões fabris e centros de distribuição.' },
  { id: 'cli-004', tipo: 'PJ', nomeRazao: 'Secretaria de Infraestrutura de SP', cpfCnpj: '00.111.222/0001-00', email: 'licitacoes@infraestrutura.sp.gov.br', telefone: '(11) 2190-0000', cidade: 'São Paulo', estado: 'SP', totalContratado: 8900000, status: 'ativo', historicoNotas: 'Obras públicas. Medição rigorosa por etapas.' }
];

export const INITIAL_NOTIFICACOES: NotificacaoSistema[] = [
  { id: 'not-001', titulo: 'Conta Vencida - Gerdau Aços', mensagem: 'A conta no valor de R$ 112.000,00 referente à obra Vanguardia venceu em 08/08/2026.', tipo: 'urgente', data: '2026-08-09 08:30', lida: false, linkModulo: 'financeiro' },
  { id: 'not-002', titulo: 'Estoque Baixo: Aço CA-50 10mm', mensagem: 'Estoque do Aço CA-50 10mm está em 45 barras (mínimo exigido: 200 barras).', tipo: 'alerta', data: '2026-08-10 09:15', lida: false, linkModulo: 'estoque' },
  { id: 'not-003', titulo: 'Manutenção Agendada: Grua de Torre', mensagem: 'Revisão de 2.000 horas da Grua da Obra Horizon agendada para 18/08/2026.', tipo: 'info', data: '2026-08-10 11:00', lida: true, linkModulo: 'equipamentos' },
  { id: 'not-004', titulo: 'Solicitação de Compra Pendente', mensagem: 'Solicitação SOL-2026-089 (Argamassa AC-III - R$ 13.600,00) aguarda aprovação.', tipo: 'alerta', data: '2026-08-09 16:45', lida: false, linkModulo: 'compras' },
  { id: 'not-005', titulo: 'Cronograma Atrasado: Galpão Logístico', mensagem: 'Etapa de Cobertura e Fechamento Lateral com 12 dias de atraso estimado.', tipo: 'urgente', data: '2026-08-10 07:00', lida: false, linkModulo: 'obras' }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'aud-001', timestamp: '2026-08-10 10:15:22', userId: 'usr-001', userName: 'Eng. Ricardo Vasconcelos', userRole: 'administrador', module: 'Obras', action: 'Aprovação de Boletim', details: 'Aprovada a medição #06 da Obra Residencial Horizon Bella Vista.' },
  { id: 'aud-002', timestamp: '2026-08-10 09:42:10', userId: 'usr-002', userName: 'Mestre Benedito Alcantara', userRole: 'mestre_obras', module: 'Diário de Obra', action: 'Registro Diário', details: 'Cadastrado diário de obra para Obra Horizon (38 trabalhadores presentes).' },
  { id: 'aud-003', timestamp: '2026-08-09 17:10:05', userId: 'usr-005', userName: 'Juliana Medeiros', userRole: 'compras', module: 'Compras', action: 'Aprovação de Cotação', details: 'Selecionada cotação de Votoran Concretos para solicitação SOL-2026-089.' }
];
