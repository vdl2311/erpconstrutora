'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { ContaPagar, ContaReceber, StatusConta } from '../../lib/types';
import {
  DollarSign,
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building,
  CreditCard,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  X
} from 'lucide-react';

export const FinanceiroModule: React.FC = () => {
  const {
    contasPagar,
    contasReceber,
    addContaPagar,
    updateContaPagarStatus,
    addContaReceber,
    updateContaReceberStatus,
    obras,
    fornecedores,
    clientes,
    activeObraFilter
  } = useERP();

  const [activeTab, setActiveTab] = useState<'pagar' | 'receber' | 'fluxo'>('pagar');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showModalPagar, setShowModalPagar] = useState(false);
  const [showModalReceber, setShowModalReceber] = useState(false);

  // Form Pagar State
  const [fornecedorId, setFornecedorId] = useState(fornecedores[0]?.id || '');
  const [categoria, setCategoria] = useState('Materiais de Construção');
  const [obraIdPagar, setObraIdPagar] = useState(obras[0]?.id || '');
  const [descricaoPagar, setDescricaoPagar] = useState('');
  const [valorPagar, setValorPagar] = useState(15000);
  const [vencimentoPagar, setVencimentoPagar] = useState(new Date().toISOString().split('T')[0]);
  const [formaPagamento, setFormaPagamento] = useState<ContaPagar['formaPagamento']>('boleto');
  const [centroCusto, setCentroCusto] = useState('CC-101 (Estrutura)');

  // Form Receber State
  const [clienteId, setClienteId] = useState(clientes[0]?.id || '');
  const [obraIdReceber, setObraIdReceber] = useState(obras[0]?.id || '');
  const [descricaoReceber, setDescricaoReceber] = useState('');
  const [valorReceber, setValorReceber] = useState(120000);
  const [vencimentoReceber, setVencimentoReceber] = useState(new Date().toISOString().split('T')[0]);

  // Filter calculations
  const filteredCP = contasPagar.filter(c => {
    const matchesStatus = statusFilter === 'todos' || c.status === statusFilter;
    const matchesObra = activeObraFilter === 'todas' || c.obraId === activeObraFilter;
    return matchesStatus && matchesObra;
  });

  const filteredCR = contasReceber.filter(c => {
    const matchesStatus = statusFilter === 'todos' || c.status === statusFilter;
    const matchesObra = activeObraFilter === 'todas' || c.obraId === activeObraFilter;
    return matchesStatus && matchesObra;
  });

  const totalPagarPendente = contasPagar.filter(c => c.status === 'pendente' || c.status === 'vencido').reduce((acc, c) => acc + c.valor, 0);
  const totalPagarVencido = contasPagar.filter(c => c.status === 'vencido').reduce((acc, c) => acc + c.valor, 0);
  const totalReceberPendente = contasReceber.filter(c => c.status === 'pendente' || c.status === 'vencido').reduce((acc, c) => acc + c.valor, 0);
  const totalRecebido = contasReceber.filter(c => c.status === 'recebido').reduce((acc, c) => acc + c.valor, 0);

  const handleCreateCP = (e: React.FormEvent) => {
    e.preventDefault();
    const forn = fornecedores.find(f => f.id === fornecedorId);
    const ob = obras.find(o => o.id === obraIdPagar);

    addContaPagar({
      fornecedorId,
      fornecedorNome: forn ? forn.nomeFantasia : 'Fornecedor Diversos',
      categoria,
      obraId: ob?.id,
      obraNome: ob?.nome,
      descricao: descricaoPagar,
      valor: valorPagar,
      vencimento: vencimentoPagar,
      status: 'pendente',
      formaPagamento,
      centroCusto
    });

    setShowModalPagar(false);
    setDescricaoPagar('');
  };

  const handleCreateCR = (e: React.FormEvent) => {
    e.preventDefault();
    const cli = clientes.find(c => c.id === clienteId);
    const ob = obras.find(o => o.id === obraIdReceber);

    addContaReceber({
      clienteId,
      clienteNome: cli ? cli.nomeRazao : 'Cliente',
      obraId: ob?.id || '',
      obraNome: ob?.nome || '',
      descricao: descricaoReceber,
      valor: valorReceber,
      vencimento: vencimentoReceber,
      status: 'pendente',
      formaRecebimento: 'boleto'
    });

    setShowModalReceber(false);
    setDescricaoReceber('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-[#C5A059]" />
            Gestão Financeira & Contas
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Controle de contas a pagar, contas a receber, medições e conciliação do fluxo de caixa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModalPagar(true)}
            className="flex items-center gap-2 rounded-lg bg-rose-950 text-rose-300 border border-rose-800/50 px-3.5 py-2 text-xs font-bold shadow-sm hover:bg-rose-900 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Conta a Pagar
          </button>
          <button
            onClick={() => setShowModalReceber(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800/50 px-3.5 py-2 text-xs font-bold shadow-sm hover:bg-emerald-900 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Conta a Receber
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>A PAGAR (PENDENTE)</span>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-xl font-bold text-white mt-2">R$ {totalPagarPendente.toLocaleString('pt-BR')}</p>
          <p className="text-[10px] text-red-400 font-semibold mt-1">
            {totalPagarVencido > 0 ? `R$ ${totalPagarVencido.toLocaleString('pt-BR')} em atraso` : 'Nenhum atraso'}
          </p>
        </div>

        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>A RECEBER (PREVISTO)</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-white mt-2">R$ {totalReceberPendente.toLocaleString('pt-BR')}</p>
          <p className="text-[10px] text-slate-400 mt-1">Medições de clientes</p>
        </div>

        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>RECEBIDO NO MÊS</span>
            <ArrowUpRight className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-[#C5A059] mt-2">R$ {totalRecebido.toLocaleString('pt-BR')}</p>
          <p className="text-[10px] text-emerald-400 font-semibold mt-1">Entradas liquidadas</p>
        </div>

        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>SALDO PROJETADO</span>
            <DollarSign className="h-4 w-4 text-[#C5A059]" />
          </div>
          <p className="text-xl font-bold text-white mt-2">
            R$ {(totalReceberPendente - totalPagarPendente).toLocaleString('pt-BR')}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Fluxo operacional líquido</p>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#16161A] p-3 rounded-xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pagar')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pagar'
                ? 'bg-rose-950 text-rose-300 border border-rose-800/50 shadow-md'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Contas a Pagar ({contasPagar.length})
          </button>
          <button
            onClick={() => setActiveTab('receber')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'receber'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50 shadow-md'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Contas a Receber ({contasReceber.length})
          </button>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-800 bg-[#0F0F12] px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#C5A059]"
        >
          <option value="todos" className="bg-[#16161A]">Todos os Status</option>
          <option value="pendente" className="bg-[#16161A]">Pendentes</option>
          <option value="vencido" className="bg-[#16161A]">Vencidos</option>
          <option value="pago" className="bg-[#16161A]">Pagos / Recebidos</option>
        </select>
      </div>

      {/* Tab Content: Contas a Pagar */}
      {activeTab === 'pagar' && (
        <div className="bg-[#16161A] rounded-xl border border-slate-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F0F12] border-b border-slate-800 font-bold text-slate-400 uppercase">
                <tr>
                  <th className="p-3">Descrição / Fornecedor</th>
                  <th className="p-3">Obra / Centro de Custo</th>
                  <th className="p-3">Vencimento</th>
                  <th className="p-3">Valor</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                {filteredCP.map(c => (
                  <tr key={c.id} className="hover:bg-[#0F0F12] transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-white">{c.descricao}</p>
                      <p className="text-[10px] text-slate-400">{c.fornecedorNome} • {c.categoria}</p>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-slate-200">{c.obraNome || 'Central'}</p>
                      <p className="text-[10px] text-slate-500">{c.centroCusto}</p>
                    </td>
                    <td className="p-3 font-semibold text-slate-400">{c.vencimento}</td>
                    <td className="p-3 font-extrabold text-white">R$ {c.valor.toLocaleString('pt-BR')}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        c.status === 'pago'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/30'
                          : c.status === 'vencido'
                          ? 'bg-rose-950 text-rose-400 border-rose-800/30 font-extrabold'
                          : 'bg-amber-950 text-amber-400 border-amber-800/30'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {c.status !== 'pago' && (
                        <button
                          onClick={() => updateContaPagarStatus(c.id, 'pago')}
                          className="rounded-lg bg-[#C5A059] text-black px-3 py-1 font-bold text-[11px] hover:bg-[#b08d48] shadow-sm transition-colors"
                        >
                          Liquidar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Contas a Receber */}
      {activeTab === 'receber' && (
        <div className="bg-[#16161A] rounded-xl border border-slate-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F0F12] border-b border-slate-800 font-bold text-slate-400 uppercase">
                <tr>
                  <th className="p-3">Medição / Cliente</th>
                  <th className="p-3">Obra Relacionada</th>
                  <th className="p-3">Vencimento</th>
                  <th className="p-3">Valor</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                {filteredCR.map(c => (
                  <tr key={c.id} className="hover:bg-[#0F0F12] transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-white">{c.descricao}</p>
                      <p className="text-[10px] text-slate-400">{c.clienteNome}</p>
                    </td>
                    <td className="p-3 font-semibold text-slate-200">{c.obraNome}</td>
                    <td className="p-3 font-semibold text-slate-400">{c.vencimento}</td>
                    <td className="p-3 font-extrabold text-[#C5A059]">R$ {c.valor.toLocaleString('pt-BR')}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        c.status === 'recebido'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/30'
                          : 'bg-blue-950 text-blue-400 border-blue-800/30'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {c.status !== 'recebido' && (
                        <button
                          onClick={() => updateContaReceberStatus(c.id, 'recebido')}
                          className="rounded-lg bg-[#C5A059] text-black px-3 py-1 font-bold text-[11px] hover:bg-[#b08d48] shadow-sm transition-colors"
                        >
                          Confirmar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Conta Pagar */}
      {showModalPagar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Lançar Nova Conta a Pagar</h3>
              <button onClick={() => setShowModalPagar(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateCP} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Fornecedor *</label>
                <select
                  value={fornecedorId}
                  onChange={(e) => setFornecedorId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  {fornecedores.map(f => (
                    <option key={f.id} value={f.id} className="bg-[#16161A]">{f.nomeFantasia}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Descrição / Insumo *</label>
                <input
                  type="text"
                  value={descricaoPagar}
                  onChange={(e) => setDescricaoPagar(e.target.value)}
                  placeholder="Ex: Fornecimento de Aço CA-50"
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Valor (R$) *</label>
                  <input
                    type="number"
                    value={valorPagar}
                    onChange={(e) => setValorPagar(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Vencimento *</label>
                  <input
                    type="date"
                    value={vencimentoPagar}
                    onChange={(e) => setVencimentoPagar(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalPagar(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Lançar Conta</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Conta Receber */}
      {showModalReceber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Lançar Nova Conta a Receber</h3>
              <button onClick={() => setShowModalReceber(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateCR} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Cliente *</label>
                <select
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  {clientes.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#16161A]">{c.nomeRazao}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Descrição / Medição *</label>
                <input
                  type="text"
                  value={descricaoReceber}
                  onChange={(e) => setDescricaoReceber(e.target.value)}
                  placeholder="Ex: Medição #07 - Estrutura"
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Valor (R$) *</label>
                  <input
                    type="number"
                    value={valorReceber}
                    onChange={(e) => setValorReceber(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Vencimento *</label>
                  <input
                    type="date"
                    value={vencimentoReceber}
                    onChange={(e) => setVencimentoReceber(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalReceber(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Lançar Recebimento</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
