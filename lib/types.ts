export type UserRole = 
  | 'administrador'
  | 'diretor'
  | 'gerente_obras'
  | 'engenheiro'
  | 'mestre_obras'
  | 'administrativo'
  | 'financeiro'
  | 'compras'
  | 'almoxarifado'
  | 'rh'
  | 'operacional';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
}

export type PermissionAction = 'visualizar' | 'criar' | 'editar' | 'excluir' | 'aprovar' | 'exportar' | 'configuracoes';

export interface ModulePermission {
  module: string; // e.g. 'obras', 'financeiro', 'compras', etc.
  actions: Record<PermissionAction, boolean>;
}

export interface RolePermissions {
  role: UserRole;
  label: string;
  modules: Record<string, Record<PermissionAction, boolean>>;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  module: string;
  action: string;
  details: string;
}

export type ObraStatus = 'planejamento' | 'em_andamento' | 'atrasada' | 'proxima_prazo' | 'concluida' | 'pausada';

export interface EtapaObra {
  id: string;
  nome: string; // ex: Fundação, Estrutura, Alvenaria, Elétrica...
  ordem: number;
  dataInicio: string;
  dataFim: string;
  percentualConcluido: number;
  custoPrevisto: number;
  custoRealizado: number;
  responsavel: string;
  status: 'nao_iniciada' | 'em_andamento' | 'concluida' | 'atrasada';
  observacoes?: string;
}

export interface Obra {
  id: string;
  codigo: string; // ex: OBR-001
  nome: string;
  clienteId: string;
  clienteNome: string;
  endereco: string;
  cidade: string;
  estado: string;
  gerenteId: string;
  gerenteNome: string;
  engenheiroNome: string;
  mestreNome: string;
  dataInicio: string;
  dataPrevistaTermino: string;
  dataRealTermino?: string;
  valorContratado: number;
  orcamentoTotal: number;
  custoRealizadoTotal: number;
  status: ObraStatus;
  percentualConcluido: number;
  etapas: EtapaObra[];
  observacoes?: string;
  fotoUrl?: string;
}

export interface DiarioObra {
  id: string;
  obraId: string;
  obraNome: string;
  data: string;
  responsavel: string;
  condicoesClimaticas: 'ensolarado' | 'nublado' | 'chuvoso' | 'impraticavel';
  trabalhadoresPresentes: number;
  servicosExecutados: string;
  materiaisUtilizados: string;
  equipamentosUtilizados: string;
  ocorrencias: string;
  visitasTecnicas?: string;
  fotos?: string[];
}

export type StatusConta = 'pendente' | 'vencido' | 'pago' | 'cancelado';

export interface ContaPagar {
  id: string;
  fornecedorId: string;
  fornecedorNome: string;
  categoria: string; // ex: Materiais, Mão de Obra, Equipamentos, Subempreiteiros
  obraId?: string;
  obraNome?: string;
  descricao: string;
  valor: number;
  vencimento: string;
  dataPagamento?: string;
  status: StatusConta;
  formaPagamento: 'pix' | 'boleto' | 'transferencia' | 'cartao';
  centroCusto: string;
  observacoes?: string;
}

export interface ContaReceber {
  id: string;
  clienteId: string;
  clienteNome: string;
  obraId: string;
  obraNome: string;
  descricao: string; // ex: Medição 03 - Bloco A
  valor: number;
  vencimento: string;
  dataRecebimento?: string;
  status: 'pendente' | 'vencido' | 'recebido' | 'cancelado';
  formaRecebimento: 'pix' | 'boleto' | 'transferencia';
  observacoes?: string;
}

export interface ItemOrcamento {
  id: string;
  itemCodigo: string; // SINAPI ou Código Interno
  descricao: string;
  quantidade: number;
  unidade: string; // m², m³, kg, un, hr
  custoUnitarioPrevisto: number;
  custoUnitarioRealizado: number;
  custoTotalPrevisto: number;
  custoTotalRealizado: number;
  categoria: 'Mão de Obra' | 'Material' | 'Equipamento' | 'Indiretos' | 'Subempreiteiro';
  etapaNome: string;
}

export interface OrcamentoObra {
  id: string;
  obraId: string;
  obraNome: string;
  bdiPercentual: number;
  margemLucroPercentual: number;
  itens: ItemOrcamento[];
}

export interface Fornecedor {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  categoria: string; // Cimento, Aço, Locação de Máquinas, Eletrica...
  contatoNome: string;
  telefone: string;
  email: string;
  avaliacao: number; // 1 a 5
  cidade: string;
}

export type StatusCompra = 'solicitada' | 'em_cotacao' | 'aguardando_aprovacao' | 'aprovada' | 'rejeitada' | 'pedido_emitido' | 'recebida' | 'cancelada';

export interface CotacaoItem {
  fornecedorId: string;
  fornecedorNome: string;
  precoUnitario: number;
  prazoEntregaDias: number;
  condicaoPagamento: string;
  selecionada: boolean;
}

export interface SolicitacaoCompra {
  id: string;
  numero: string; // ex: SOL-2026-001
  obraId: string;
  obraNome: string;
  solicitante: string;
  dataSolicitacao: string;
  dataNecessidade: string;
  itemNome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  status: StatusCompra;
  cotacoes: CotacaoItem[];
  valorFinalAprovado?: number;
  fornecedorVencedorId?: string;
  fornecedorVencedorNome?: string;
  observacoes?: string;
}

export interface MaterialEstoque {
  id: string;
  codigo: string; // MAT-101
  nome: string;
  categoria: string; // Agregados, Estrutura, Acabamento, Hidráulica, Elétrica
  unidade: string;
  estoqueMinimo: number;
  estoqueAtual: number;
  custoMedioUnitario: number;
  localizacao: string; // Depósito Central, Almoxarifado Obra A
  fornecedorPadraoId?: string;
}

export type TipoMovimentacaoEstoque = 'entrada' | 'saida' | 'transferencia' | 'ajuste' | 'devolucao';

export interface MovimentacaoEstoque {
  id: string;
  materialId: string;
  materialNome: string;
  tipo: TipoMovimentacaoEstoque;
  quantidade: number;
  data: string;
  obraOrigemId?: string;
  obraOrigemNome?: string;
  obraDestinoId?: string;
  obraDestinoNome?: string;
  responsavel: string;
  observacao?: string;
}

export type StatusEquipamento = 'operacional' | 'em_manutencao' | 'alocado' | 'inativo';

export interface Equipamento {
  id: string;
  patrimonio: string; // PAT-2024-001
  nome: string; // Escavadeira Hidráulica 20T
  categoria: string; // Terraplenagem, Elevação, Ferramental
  marcaModelo: string;
  numeroSerie: string;
  dataAquisicao: string;
  valorAquisicao: number;
  obraAtualId?: string;
  obraAtualNome?: string;
  responsavel: string;
  status: StatusEquipamento;
  horimetroKm: number;
  unidadeMedida: 'horas' | 'km';
  proximaManutencaoVal: number; // Ex: 500 horas
  proximaManutencaoData: string;
}

export interface ManutencaoEquipamento {
  id: string;
  equipamentoId: string;
  equipamentoNome: string;
  tipo: 'preventiva' | 'corretiva';
  data: string;
  descricao: string;
  custo: number;
  oficinaResponsavel: string;
  status: 'agendada' | 'em_andamento' | 'concluida';
}

export interface Funcionario {
  id: string;
  cpf: string;
  nome: string;
  cargo: string;
  departamento: string;
  telefone: string;
  email: string;
  dataAdmissao: string;
  salario: number;
  status: 'ativo' | 'ferias' | 'afastado' | 'desligado';
  obraAlocadaId?: string;
  obraAlocadaNome?: string;
  certificados: string[];
}

export interface AlocacaoEquipe {
  id: string;
  obraId: string;
  obraNome: string;
  funcionarioId: string;
  funcionarioNome: string;
  cargo: string;
  dataInicio: string;
  dataFimPrevista: string;
  status: 'disponivel' | 'alocado' | 'sobrecarregado';
  horasTrabalhadasSemana: number;
}

export interface Documento {
  id: string;
  nome: string;
  categoria: 'Contratos' | 'Notas Fiscais' | 'Projetos e Plantas' | 'RH e Segurança' | 'Licenças e Alvarás' | 'Outros';
  obraId?: string;
  obraNome?: string;
  dataUpload: string;
  tamanhoKb: number;
  tipoArquivo: string; // PDF, DWG, XLSX, PNG
  url?: string;
  versao: string;
  enviadoPor: string;
}

export interface Cliente {
  id: string;
  tipo: 'PF' | 'PJ';
  nomeRazao: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  totalContratado: number;
  status: 'prospeccao' | 'ativo' | 'inativo';
  historicoNotas?: string;
}

export interface NotificacaoSistema {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'alerta' | 'info' | 'sucesso' | 'urgente';
  data: string;
  lida: boolean;
  linkModulo?: string;
}
