'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Obra,
  EtapaObra,
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
  RolePermissions,
  PermissionAction
} from '../lib/types';
import {
  INITIAL_USER,
  INITIAL_ROLES_PERMISSIONS,
  INITIAL_OBRAS,
  INITIAL_DIARIOS,
  INITIAL_CONTAS_PAGAR,
  INITIAL_CONTAS_RECEBER,
  INITIAL_ORCAMENTOS,
  INITIAL_FORNECEDORES,
  INITIAL_SOLICITACOES_COMPRA,
  INITIAL_MATERIAIS,
  INITIAL_MOVIMENTACOES_ESTOQUE,
  INITIAL_EQUIPAMENTOS,
  INITIAL_MANUTENCOES,
  INITIAL_FUNCIONARIOS,
  INITIAL_ALOCACOES,
  INITIAL_DOCUMENTOS,
  INITIAL_CLIENTES,
  INITIAL_NOTIFICACOES,
  INITIAL_AUDIT_LOGS
} from '../lib/initialData';

interface ERPContextType {
  // Active User & Filter Context
  currentUser: UserProfile;
  setCurrentRole: (role: UserRole) => void;
  activeModule: string;
  setActiveModule: (moduleKey: string) => void;
  activeObraFilter: string; // 'todas' or obra.id
  setActiveObraFilter: (obraId: string) => void;
  activeCompany: string;
  setActiveCompany: (company: string) => void;
  
  // Entities
  obras: Obra[];
  diarios: DiarioObra[];
  contasPagar: ContaPagar[];
  contasReceber: ContaReceber[];
  orcamentos: OrcamentoObra[];
  fornecedores: Fornecedor[];
  solicitacoesCompra: SolicitacaoCompra[];
  materiais: MaterialEstoque[];
  movimentacoesEstoque: MovimentacaoEstoque[];
  equipamentos: Equipamento[];
  manutencoes: ManutencaoEquipamento[];
  funcionarios: Funcionario[];
  alocacoes: AlocacaoEquipe[];
  documentos: Documento[];
  clientes: Cliente[];
  notificacoes: NotificacaoSistema[];
  auditLogs: AuditLog[];
  rolesPermissions: RolePermissions[];

  // Permissions check
  hasPermission: (moduleKey: string, action: PermissionAction) => boolean;

  // Actions
  addAuditLog: (module: string, action: string, details: string) => void;
  addNotificacao: (titulo: string, mensagem: string, tipo: 'alerta' | 'info' | 'sucesso' | 'urgente', linkModulo?: string) => void;
  markNotificacaoAsRead: (id: string) => void;
  clearAllNotificacoes: () => void;

  // Obras
  addObra: (obra: Omit<Obra, 'id' | 'codigo' | 'custoRealizadoTotal' | 'percentualConcluido' | 'etapas'>) => void;
  updateObra: (id: string, updates: Partial<Obra>) => void;
  updateEtapaObra: (obraId: string, etapaId: string, updates: Partial<EtapaObra>) => void;
  deleteObra: (id: string) => void;

  // Diário de Obra
  addDiarioObra: (diario: Omit<DiarioObra, 'id'>) => void;

  // Financeiro
  addContaPagar: (cp: Omit<ContaPagar, 'id'>) => void;
  updateContaPagarStatus: (id: string, status: ContaPagar['status'], dataPagamento?: string) => void;
  addContaReceber: (cr: Omit<ContaReceber, 'id'>) => void;
  updateContaReceberStatus: (id: string, status: ContaReceber['status'], dataRecebimento?: string) => void;

  // Compras
  addSolicitacaoCompra: (sol: Omit<SolicitacaoCompra, 'id' | 'numero' | 'status' | 'cotacoes'>) => void;
  updateSolicitacaoCompraStatus: (id: string, status: SolicitacaoCompra['status'], fornecedorVencedorId?: string, valorAprovado?: number) => void;
  addCotacaoItem: (solicitacaoId: string, cotacao: Omit<import('../lib/types').CotacaoItem, 'selecionada'>) => void;

  // Estoque
  addMaterial: (mat: Omit<MaterialEstoque, 'id'>) => void;
  addMovimentacaoEstoque: (mov: Omit<MovimentacaoEstoque, 'id' | 'data'>) => void;

  // Equipamentos
  addEquipamento: (eqp: Omit<Equipamento, 'id'>) => void;
  addManutencao: (man: Omit<ManutencaoEquipamento, 'id'>) => void;

  // RH
  addFuncionario: (fun: Omit<Funcionario, 'id'>) => void;
  addAlocacao: (alo: Omit<AlocacaoEquipe, 'id'>) => void;

  // Documentos
  addDocumento: (doc: Omit<Documento, 'id' | 'dataUpload'>) => void;

  // CRM Clientes e Fornecedores
  addCliente: (cli: Omit<Cliente, 'id'>) => void;
  addFornecedor: (forn: Omit<Fornecedor, 'id'>) => void;

  // Permissions Config
  updateRolePermission: (role: UserRole, moduleKey: string, action: PermissionAction, value: boolean) => void;

  // Reset
  resetToDefaultData: () => void;
}

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem('obramaster_erp_data_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed[key]) return parsed[key];
    }
  } catch (e) {
    console.warn('Failed to parse localStorage key', key, e);
  }
  return fallback;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export const ERPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [activeObraFilter, setActiveObraFilter] = useState<string>('todas');
  const [activeCompany, setActiveCompany] = useState<string>('ObraMaster Construtora S.A.');

  // Data states initialized lazily from LocalStorage if available
  const [obras, setObras] = useState<Obra[]>(() => getStored('obras', INITIAL_OBRAS));
  const [diarios, setDiarios] = useState<DiarioObra[]>(() => getStored('diarios', INITIAL_DIARIOS));
  const [contasPagar, setContasPagar] = useState<ContaPagar[]>(() => getStored('contasPagar', INITIAL_CONTAS_PAGAR));
  const [contasReceber, setContasReceber] = useState<ContaReceber[]>(() => getStored('contasReceber', INITIAL_CONTAS_RECEBER));
  const [orcamentos, setOrcamentos] = useState<OrcamentoObra[]>(() => getStored('orcamentos', INITIAL_ORCAMENTOS));
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(() => getStored('fornecedores', INITIAL_FORNECEDORES));
  const [solicitacoesCompra, setSolicitacoesCompra] = useState<SolicitacaoCompra[]>(() => getStored('solicitacoesCompra', INITIAL_SOLICITACOES_COMPRA));
  const [materiais, setMateriais] = useState<MaterialEstoque[]>(() => getStored('materiais', INITIAL_MATERIAIS));
  const [movimentacoesEstoque, setMovimentacoesEstoque] = useState<MovimentacaoEstoque[]>(() => getStored('movimentacoesEstoque', INITIAL_MOVIMENTACOES_ESTOQUE));
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>(() => getStored('equipamentos', INITIAL_EQUIPAMENTOS));
  const [manutencoes, setManutencoes] = useState<ManutencaoEquipamento[]>(() => getStored('manutencoes', INITIAL_MANUTENCOES));
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(() => getStored('funcionarios', INITIAL_FUNCIONARIOS));
  const [alocacoes, setAlocacoes] = useState<AlocacaoEquipe[]>(() => getStored('alocacoes', INITIAL_ALOCACOES));
  const [documentos, setDocumentos] = useState<Documento[]>(() => getStored('documentos', INITIAL_DOCUMENTOS));
  const [clientes, setClientes] = useState<Cliente[]>(() => getStored('clientes', INITIAL_CLIENTES));
  const [notificacoes, setNotificacoes] = useState<NotificacaoSistema[]>(() => getStored('notificacoes', INITIAL_NOTIFICACOES));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getStored('auditLogs', INITIAL_AUDIT_LOGS));
  const [rolesPermissions, setRolesPermissions] = useState<RolePermissions[]>(() => getStored('rolesPermissions', INITIAL_ROLES_PERMISSIONS));

  // Save state back to LocalStorage
  useEffect(() => {
    try {
      const stateToSave = {
        obras,
        diarios,
        contasPagar,
        contasReceber,
        orcamentos,
        fornecedores,
        solicitacoesCompra,
        materiais,
        movimentacoesEstoque,
        equipamentos,
        manutencoes,
        funcionarios,
        alocacoes,
        documentos,
        clientes,
        notificacoes,
        auditLogs,
        rolesPermissions
      };
      localStorage.setItem('obramaster_erp_data_v1', JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save ERP state to localStorage', e);
    }
  }, [
    obras, diarios, contasPagar, contasReceber, orcamentos, fornecedores,
    solicitacoesCompra, materiais, movimentacoesEstoque, equipamentos,
    manutencoes, funcionarios, alocacoes, documentos, clientes,
    notificacoes, auditLogs, rolesPermissions
  ]);

  // Role labels dictionary
  const roleLabels: Record<UserRole, string> = {
    administrador: 'Administrador Geral',
    diretor: 'Diretor / Sócio',
    gerente_obras: 'Gerente de Obras',
    engenheiro: 'Engenheiro Residente',
    mestre_obras: 'Mestre de Obras',
    administrativo: 'Administrativo',
    financeiro: 'Gestor Financeiro',
    compras: 'Comprador / Suprimentos',
    almoxarifado: 'Almoxarife',
    rh: 'Gestor de RH',
    operacional: 'Usuário Operacional'
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role,
      department: roleLabels[role] || 'Operacional'
    }));
    addAuditLog('Sistema', 'Alteração de Perfil', `Alternado perfil para ${roleLabels[role]}`);
  };

  const hasPermission = (moduleKey: string, action: PermissionAction): boolean => {
    if (currentUser.role === 'administrador') return true;
    const roleConfig = rolesPermissions.find(r => r.role === currentUser.role);
    if (!roleConfig) return true;
    const modConfig = roleConfig.modules[moduleKey];
    if (!modConfig) return true;
    return !!modConfig[action];
  };

  const addAuditLog = (module: string, action: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      module,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addNotificacao = (titulo: string, mensagem: string, tipo: 'alerta' | 'info' | 'sucesso' | 'urgente', linkModulo?: string) => {
    const newNot: NotificacaoSistema = {
      id: `not-${Date.now()}`,
      titulo,
      mensagem,
      tipo,
      data: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lida: false,
      linkModulo
    };
    setNotificacoes(prev => [newNot, ...prev]);
  };

  const markNotificacaoAsRead = (id: string) => {
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  const clearAllNotificacoes = () => {
    setNotificacoes([]);
  };

  // --- OBRAS ACTIONS ---
  const addObra = (obraData: Omit<Obra, 'id' | 'codigo' | 'custoRealizadoTotal' | 'percentualConcluido' | 'etapas'>) => {
    const nextNum = obras.length + 1;
    const codigo = `OBR-2026-0${nextNum}`;
    const newObra: Obra = {
      ...obraData,
      id: `obr-${Date.now()}`,
      codigo,
      custoRealizadoTotal: 0,
      percentualConcluido: 0,
      fotoUrl: obraData.fotoUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800',
      etapas: [
        { id: `etp-${Date.now()}-1`, nome: 'Projetos e Licenciamento', ordem: 1, dataInicio: obraData.dataInicio, dataFim: obraData.dataPrevistaTermino, percentualConcluido: 0, custoPrevisto: obraData.orcamentoTotal * 0.05, custoRealizado: 0, responsavel: obraData.engenheiroNome, status: 'nao_iniciada' },
        { id: `etp-${Date.now()}-2`, nome: 'Fundação e Estrutura', ordem: 2, dataInicio: obraData.dataInicio, dataFim: obraData.dataPrevistaTermino, percentualConcluido: 0, custoPrevisto: obraData.orcamentoTotal * 0.45, custoRealizado: 0, responsavel: obraData.mestreNome, status: 'nao_iniciada' },
        { id: `etp-${Date.now()}-3`, nome: 'Alvenaria e Instalações', ordem: 3, dataInicio: obraData.dataInicio, dataFim: obraData.dataPrevistaTermino, percentualConcluido: 0, custoPrevisto: obraData.orcamentoTotal * 0.35, custoRealizado: 0, responsavel: obraData.mestreNome, status: 'nao_iniciada' },
        { id: `etp-${Date.now()}-4`, nome: 'Acabamentos e Entrega', ordem: 4, dataInicio: obraData.dataInicio, dataFim: obraData.dataPrevistaTermino, percentualConcluido: 0, custoPrevisto: obraData.orcamentoTotal * 0.15, custoRealizado: 0, responsavel: obraData.gerenteNome, status: 'nao_iniciada' }
      ]
    };
    setObras(prev => [newObra, ...prev]);
    addAuditLog('Obras', 'Criação de Obra', `Criada obra ${newObra.nome} (${newObra.codigo})`);
    addNotificacao('Nova Obra Cadastrada', `Obra ${newObra.nome} foi adicionada ao ERP.`, 'sucesso', 'obras');
  };

  const updateObra = (id: string, updates: Partial<Obra>) => {
    setObras(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    addAuditLog('Obras', 'Atualização de Obra', `Atualizada obra ID ${id}`);
  };

  const updateEtapaObra = (obraId: string, etapaId: string, updates: Partial<EtapaObra>) => {
    setObras(prev => prev.map(o => {
      if (o.id !== obraId) return o;
      const newEtapas = o.etapas.map(e => e.id === etapaId ? { ...e, ...updates } : e);
      
      // recalculate overall progress
      const totalProg = newEtapas.reduce((acc, curr) => acc + curr.percentualConcluido, 0);
      const avgProg = newEtapas.length > 0 ? Math.round(totalProg / newEtapas.length) : o.percentualConcluido;
      const totalCustoRealizado = newEtapas.reduce((acc, curr) => acc + curr.custoRealizado, 0);

      return {
        ...o,
        etapas: newEtapas,
        percentualConcluido: avgProg,
        custoRealizadoTotal: totalCustoRealizado > 0 ? totalCustoRealizado : o.custoRealizadoTotal
      };
    }));
    addAuditLog('Obras', 'Atualização de Etapa', `Atualizada etapa ${etapaId} na obra ${obraId}`);
  };

  const deleteObra = (id: string) => {
    setObras(prev => prev.filter(o => o.id !== id));
    addAuditLog('Obras', 'Exclusão de Obra', `Excluída obra ID ${id}`);
  };

  // --- DIÁRIO DE OBRA ---
  const addDiarioObra = (diarioData: Omit<DiarioObra, 'id'>) => {
    const newDiario: DiarioObra = {
      ...diarioData,
      id: `dio-${Date.now()}`
    };
    setDiarios(prev => [newDiario, ...prev]);
    addAuditLog('Diário de Obra', 'Novo Registro', `Diário de obra registrado para ${diarioData.obraNome}`);
    addNotificacao('Diário de Obra Preenchido', `Novo registro em ${diarioData.obraNome} por ${diarioData.responsavel}.`, 'info', 'diario');
  };

  // --- FINANCEIRO ---
  const addContaPagar = (cpData: Omit<ContaPagar, 'id'>) => {
    const newCP: ContaPagar = {
      ...cpData,
      id: `cp-${Date.now()}`
    };
    setContasPagar(prev => [newCP, ...prev]);
    addAuditLog('Financeiro', 'Lançamento Contas a Pagar', `Nova conta a pagar para ${newCP.fornecedorNome} - R$ ${newCP.valor.toLocaleString('pt-BR')}`);
  };

  const updateContaPagarStatus = (id: string, status: ContaPagar['status'], dataPagamento?: string) => {
    setContasPagar(prev => prev.map(c => c.id === id ? {
      ...c,
      status,
      dataPagamento: status === 'pago' ? (dataPagamento || new Date().toISOString().split('T')[0]) : c.dataPagamento
    } : c));
    addAuditLog('Financeiro', 'Status Contas a Pagar', `Alterado status da conta ${id} para ${status}`);
    if (status === 'pago') {
      addNotificacao('Pagamento Realizado', `Conta a pagar foi liquidada com sucesso.`, 'sucesso', 'financeiro');
    }
  };

  const addContaReceber = (crData: Omit<ContaReceber, 'id'>) => {
    const newCR: ContaReceber = {
      ...crData,
      id: `cr-${Date.now()}`
    };
    setContasReceber(prev => [newCR, ...prev]);
    addAuditLog('Financeiro', 'Lançamento Contas a Receber', `Nova conta a receber de ${newCR.clienteNome} - R$ ${newCR.valor.toLocaleString('pt-BR')}`);
  };

  const updateContaReceberStatus = (id: string, status: ContaReceber['status'], dataRecebimento?: string) => {
    setContasReceber(prev => prev.map(c => c.id === id ? {
      ...c,
      status,
      dataRecebimento: status === 'recebido' ? (dataRecebimento || new Date().toISOString().split('T')[0]) : c.dataRecebimento
    } : c));
    addAuditLog('Financeiro', 'Status Contas a Receber', `Alterado status da medição ${id} para ${status}`);
    if (status === 'recebido') {
      addNotificacao('Recebimento Confirmado', `Recebimento financeiro confirmado no caixa.`, 'sucesso', 'financeiro');
    }
  };

  // --- COMPRAS ---
  const addSolicitacaoCompra = (solData: Omit<SolicitacaoCompra, 'id' | 'numero' | 'status' | 'cotacoes'>) => {
    const count = solicitacoesCompra.length + 1;
    const newSol: SolicitacaoCompra = {
      ...solData,
      id: `sol-${Date.now()}`,
      numero: `SOL-2026-0${count + 90}`,
      status: 'solicitada',
      cotacoes: []
    };
    setSolicitacoesCompra(prev => [newSol, ...prev]);
    addAuditLog('Compras', 'Nova Solicitação', `Solicitação de compra ${newSol.numero} (${newSol.itemNome})`);
    addNotificacao('Nova Solicitação de Compra', `${newSol.itemNome} solicitado para a obra ${newSol.obraNome}`, 'info', 'compras');
  };

  const updateSolicitacaoCompraStatus = (id: string, status: SolicitacaoCompra['status'], fornecedorVencedorId?: string, valorAprovado?: number) => {
    setSolicitacoesCompra(prev => prev.map(s => {
      if (s.id !== id) return s;
      const forn = fornecedores.find(f => f.id === fornecedorVencedorId);
      return {
        ...s,
        status,
        fornecedorVencedorId: fornecedorVencedorId || s.fornecedorVencedorId,
        fornecedorVencedorNome: forn ? forn.nomeFantasia : s.fornecedorVencedorNome,
        valorFinalAprovado: valorAprovado !== undefined ? valorAprovado : s.valorFinalAprovado
      };
    }));
    addAuditLog('Compras', 'Aprovação/Status de Compra', `Status da solicitação ${id} alterado para ${status}`);
    if (status === 'aprovada') {
      addNotificacao('Compra Aprovada', `Ordem de compra emitida para fornecedor.`, 'sucesso', 'compras');
    }
  };

  const addCotacaoItem = (solicitacaoId: string, cotacaoData: Omit<import('../lib/types').CotacaoItem, 'selecionada'>) => {
    setSolicitacoesCompra(prev => prev.map(s => {
      if (s.id !== solicitacaoId) return s;
      const newCotacoes = [...s.cotacoes, { ...cotacaoData, selecionada: s.cotacoes.length === 0 }];
      return {
        ...s,
        status: 'em_cotacao',
        cotacoes: newCotacoes
      };
    }));
    addAuditLog('Compras', 'Nova Cotação', `Adicionada cotação de ${cotacaoData.fornecedorNome} na solicitação ${solicitacaoId}`);
  };

  // --- ESTOQUE ---
  const addMaterial = (matData: Omit<MaterialEstoque, 'id'>) => {
    const nextCode = `MAT-${materiais.length + 101}`;
    const newMat: MaterialEstoque = {
      ...matData,
      id: `mat-${Date.now()}`,
      codigo: matData.codigo || nextCode
    };
    setMateriais(prev => [newMat, ...prev]);
    addAuditLog('Estoque', 'Cadastro Material', `Cadastrado material ${newMat.nome}`);
  };

  const addMovimentacaoEstoque = (movData: Omit<MovimentacaoEstoque, 'id' | 'data'>) => {
    const newMov: MovimentacaoEstoque = {
      ...movData,
      id: `mov-${Date.now()}`,
      data: new Date().toISOString().split('T')[0]
    };
    setMovimentacoesEstoque(prev => [newMov, ...prev]);

    // Update material quantity
    setMateriais(prev => prev.map(m => {
      if (m.id !== movData.materialId) return m;
      let newQty = m.estoqueAtual;
      if (movData.tipo === 'entrada' || movData.tipo === 'devolucao') {
        newQty += movData.quantidade;
      } else if (movData.tipo === 'saida') {
        newQty = Math.max(0, newQty - movData.quantidade);
      }
      return { ...m, estoqueAtual: newQty };
    }));

    addAuditLog('Estoque', 'Movimentação de Insumo', `${movData.tipo.toUpperCase()}: ${movData.quantidade} x ${movData.materialNome}`);
  };

  // --- EQUIPAMENTOS ---
  const addEquipamento = (eqpData: Omit<Equipamento, 'id'>) => {
    const newEqp: Equipamento = {
      ...eqpData,
      id: `eqp-${Date.now()}`
    };
    setEquipamentos(prev => [newEqp, ...prev]);
    addAuditLog('Equipamentos', 'Cadastro Equipamento', `Cadastrado patrimônio ${newEqp.patrimonio} (${newEqp.nome})`);
  };

  const addManutencao = (manData: Omit<ManutencaoEquipamento, 'id'>) => {
    const newMan: ManutencaoEquipamento = {
      ...manData,
      id: `man-${Date.now()}`
    };
    setManutencoes(prev => [newMan, ...prev]);
    addAuditLog('Equipamentos', 'Manutenção Agendada', `Manutenção ${manData.tipo} para ${manData.equipamentoNome}`);
  };

  // --- RH ---
  const addFuncionario = (funData: Omit<Funcionario, 'id'>) => {
    const newFun: Funcionario = {
      ...funData,
      id: `fun-${Date.now()}`
    };
    setFuncionarios(prev => [newFun, ...prev]);
    addAuditLog('RH', 'Novo Funcionário', `Cadastrado colaborador ${newFun.nome} (${newFun.cargo})`);
  };

  const addAlocacao = (aloData: Omit<AlocacaoEquipe, 'id'>) => {
    const newAlo: AlocacaoEquipe = {
      ...aloData,
      id: `alo-${Date.now()}`
    };
    setAlocacoes(prev => [newAlo, ...prev]);
    addAuditLog('RH', 'Alocação de Equipe', `Alocado ${aloData.funcionarioNome} para a obra ${aloData.obraNome}`);
  };

  // --- DOCUMENTOS ---
  const addDocumento = (docData: Omit<Documento, 'id' | 'dataUpload'>) => {
    const newDoc: Documento = {
      ...docData,
      id: `doc-${Date.now()}`,
      dataUpload: new Date().toISOString().split('T')[0]
    };
    setDocumentos(prev => [newDoc, ...prev]);
    addAuditLog('Documentos', 'Upload de Documento', `Arquivo ${docData.nome} publicado em ${docData.categoria}`);
  };

  // --- CRM ---
  const addCliente = (cliData: Omit<Cliente, 'id'>) => {
    const newCli: Cliente = {
      ...cliData,
      id: `cli-${Date.now()}`
    };
    setClientes(prev => [newCli, ...prev]);
    addAuditLog('CRM', 'Novo Cliente', `Cadastrado cliente ${newCli.nomeRazao}`);
  };

  const addFornecedor = (fornData: Omit<Fornecedor, 'id'>) => {
    const newForn: Fornecedor = {
      ...fornData,
      id: `forn-${Date.now()}`
    };
    setFornecedores(prev => [newForn, ...prev]);
    addAuditLog('Compras', 'Novo Fornecedor', `Cadastrado fornecedor ${newForn.nomeFantasia}`);
  };

  // --- PERMISSÕES CONFIG ---
  const updateRolePermission = (role: UserRole, moduleKey: string, action: PermissionAction, value: boolean) => {
    setRolesPermissions(prev => prev.map(r => {
      if (r.role !== role) return r;
      const mod = r.modules[moduleKey] || { visualizar: false, criar: false, editar: false, excluir: false, aprovar: false, exportar: false, configuracoes: false };
      return {
        ...r,
        modules: {
          ...r.modules,
          [moduleKey]: {
            ...mod,
            [action]: value
          }
        }
      };
    }));
    addAuditLog('Configurações', 'Matriz de Permissões', `Alterada permissão ${moduleKey}.${action} para o perfil ${role}`);
  };

  const resetToDefaultData = () => {
    setObras(INITIAL_OBRAS);
    setDiarios(INITIAL_DIARIOS);
    setContasPagar(INITIAL_CONTAS_PAGAR);
    setContasReceber(INITIAL_CONTAS_RECEBER);
    setOrcamentos(INITIAL_ORCAMENTOS);
    setFornecedores(INITIAL_FORNECEDORES);
    setSolicitacoesCompra(INITIAL_SOLICITACOES_COMPRA);
    setMateriais(INITIAL_MATERIAIS);
    setMovimentacoesEstoque(INITIAL_MOVIMENTACOES_ESTOQUE);
    setEquipamentos(INITIAL_EQUIPAMENTOS);
    setManutencoes(INITIAL_MANUTENCOES);
    setFuncionarios(INITIAL_FUNCIONARIOS);
    setAlocacoes(INITIAL_ALOCACOES);
    setDocumentos(INITIAL_DOCUMENTOS);
    setClientes(INITIAL_CLIENTES);
    setNotificacoes(INITIAL_NOTIFICACOES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setRolesPermissions(INITIAL_ROLES_PERMISSIONS);
    localStorage.removeItem('obramaster_erp_data_v1');
    addAuditLog('Sistema', 'Restauração de Dados', 'Dados restaurados para os padrões originais de demonstração.');
  };

  return (
    <ERPContext.Provider value={{
      currentUser,
      setCurrentRole,
      activeModule,
      setActiveModule,
      activeObraFilter,
      setActiveObraFilter,
      activeCompany,
      setActiveCompany,
      obras,
      diarios,
      contasPagar,
      contasReceber,
      orcamentos,
      fornecedores,
      solicitacoesCompra,
      materiais,
      movimentacoesEstoque,
      equipamentos,
      manutencoes,
      funcionarios,
      alocacoes,
      documentos,
      clientes,
      notificacoes,
      auditLogs,
      rolesPermissions,
      hasPermission,
      addAuditLog,
      addNotificacao,
      markNotificacaoAsRead,
      clearAllNotificacoes,
      addObra,
      updateObra,
      updateEtapaObra,
      deleteObra,
      addDiarioObra,
      addContaPagar,
      updateContaPagarStatus,
      addContaReceber,
      updateContaReceberStatus,
      addSolicitacaoCompra,
      updateSolicitacaoCompraStatus,
      addCotacaoItem,
      addMaterial,
      addMovimentacaoEstoque,
      addEquipamento,
      addManutencao,
      addFuncionario,
      addAlocacao,
      addDocumento,
      addCliente,
      addFornecedor,
      updateRolePermission,
      resetToDefaultData
    }}>
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const ctx = useContext(ERPContext);
  if (!ctx) throw new Error('useERP must be used within an ERPProvider');
  return ctx;
};
