'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { SolicitacaoCompra, StatusCompra } from '../../lib/types';
import {
  ShoppingCart,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  DollarSign,
  FileCheck,
  Check,
  X,
  Truck,
  Boxes
} from 'lucide-react';

export const ComprasModule: React.FC = () => {
  const {
    solicitacoesCompra,
    addSolicitacaoCompra,
    updateSolicitacaoCompraStatus,
    addCotacaoItem,
    fornecedores,
    obras,
    addMovimentacaoEstoque,
    materiais
  } = useERP();

  const [showModal, setShowModal] = useState(false);
  const [selectedSol, setSelectedSol] = useState<SolicitacaoCompra | null>(null);

  // Form New Purchase
  const [obraId, setObraId] = useState(obras[0]?.id || '');
  const [itemNome, setItemNome] = useState('');
  const [categoria, setCategoria] = useState('Insumos de Alvenaria');
  const [quantidade, setQuantidade] = useState(100);
  const [unidade, setUnidade] = useState('un');
  const [dataNecessidade, setDataNecessidade] = useState(new Date().toISOString().split('T')[0]);

  // Form New Quote
  const [fornecedorQuoteId, setFornecedorQuoteId] = useState(fornecedores[0]?.id || '');
  const [precoUnitario, setPrecoUnitario] = useState(25.0);
  const [prazoEntregaDias, setPrazoEntregaDias] = useState(3);
  const [condicaoPagamento, setCondicaoPagamento] = useState('28 dias boleto');

  const handleCreateSolicitacao = (e: React.FormEvent) => {
    e.preventDefault();
    const targetObra = obras.find(o => o.id === obraId);
    if (!targetObra) return;

    addSolicitacaoCompra({
      obraId: targetObra.id,
      obraNome: targetObra.nome,
      solicitante: 'Eng. Lucas Pedrosa',
      dataSolicitacao: new Date().toISOString().split('T')[0],
      dataNecessidade,
      itemNome,
      categoria,
      quantidade,
      unidade
    });

    setShowModal(false);
    setItemNome('');
  };

  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSol) return;
    const forn = fornecedores.find(f => f.id === fornecedorQuoteId);
    if (!forn) return;

    addCotacaoItem(selectedSol.id, {
      fornecedorId: forn.id,
      fornecedorNome: forn.nomeFantasia,
      precoUnitario,
      prazoEntregaDias,
      condicaoPagamento
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-[#C5A059]" />
            Compras, Cotações & Suprimentos
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Fluxo unificado: Solicitação → Cotações Comparativas → Aprovação → Pedido → Recebimento no Estoque.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nova Solicitação de Compra
        </button>
      </div>

      {/* Procurement Process Stepper */}
      <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md flex items-center justify-between text-xs font-bold overflow-x-auto gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="h-6 w-6 rounded-lg bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center text-[10px] border border-[#C5A059]/20 font-serif font-bold">1</span>
          <span>Solicitação</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="h-6 w-6 rounded-lg bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center text-[10px] border border-[#C5A059]/20 font-serif font-bold">2</span>
          <span>Cotações (Matriz)</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="h-6 w-6 rounded-lg bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center text-[10px] border border-[#C5A059]/20 font-serif font-bold">3</span>
          <span>Aprovação Diretoria</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="h-6 w-6 rounded-lg bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center text-[10px] border border-[#C5A059]/20 font-serif font-bold">4</span>
          <span>Entrada no Estoque</span>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {solicitacoesCompra.map(sol => (
          <div key={sol.id} className="bg-[#16161A] rounded-xl border border-slate-800 p-5 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-2 py-0.5 rounded">
                    {sol.numero}
                  </span>
                  <span className="font-bold text-sm text-white">{sol.itemNome}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Obra: <span className="font-semibold text-slate-200">{sol.obraNome}</span> • Solicitante: {sol.solicitante}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-slate-300">
                  Qtd: {sol.quantidade} {sol.unidade}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                  sol.status === 'aprovada'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800/30'
                    : sol.status === 'em_cotacao'
                    ? 'bg-blue-950 text-blue-400 border-blue-800/30'
                    : 'bg-amber-950 text-amber-400 border-amber-800/30'
                }`}>
                  {sol.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Cotações Comparison Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Matriz de Cotações de Fornecedores</span>
                <button
                  onClick={() => setSelectedSol(sol)}
                  className="text-[#C5A059] font-bold hover:underline capitalize"
                >
                  + Adicionar Cotação
                </button>
              </h4>

              {sol.cotacoes.length === 0 ? (
                <div className="p-4 bg-[#0F0F12] rounded-lg text-xs text-slate-500 text-center border border-slate-800/40">
                  Nenhuma cotação cadastrada ainda. Adicione propostas dos fornecedores para comparação.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {sol.cotacoes.map((cot, idx) => {
                    const valorTotalCot = cot.precoUnitario * sol.quantidade;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs space-y-2 relative transition-all ${
                          cot.selecionada
                            ? 'bg-[#1e1e16]/60 border-[#C5A059]/40 ring-1 ring-[#C5A059]/20'
                            : 'bg-[#0F0F12] border-slate-800/60'
                        }`}
                      >
                        {cot.selecionada && (
                          <span className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-0.5" title="Melhor Custo Benefício">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                        <p className="font-bold text-white">{cot.fornecedorNome}</p>
                        <p className="text-slate-400">Unitário: <span className="font-bold text-slate-200">R$ {cot.precoUnitario.toFixed(2)}</span></p>
                        <p className="text-[#C5A059] font-bold text-sm">Total: R$ {valorTotalCot.toLocaleString('pt-BR')}</p>
                        <p className="text-[10px] text-slate-500">Prazo: {cot.prazoEntregaDias} dias • Pgto: {cot.condicaoPagamento}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              {sol.status !== 'aprovada' && (
                <button
                  onClick={() => {
                    const cotVencedora = sol.cotacoes[0];
                    updateSolicitacaoCompraStatus(
                      sol.id,
                      'aprovada',
                      cotVencedora?.fornecedorId,
                      cotVencedora ? cotVencedora.precoUnitario * sol.quantidade : 15000
                    );
                  }}
                  className="rounded-lg bg-[#C5A059] text-black px-4 py-2 font-bold text-xs hover:bg-[#b08d48] shadow-md transition-colors"
                >
                  Aprovar Ordem de Compra
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal New Solicitação */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Nova Solicitação de Compra</h3>
              <button onClick={() => setShowModal(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateSolicitacao} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Obra Destino *</label>
                <select
                  value={obraId}
                  onChange={(e) => setObraId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  {obras.map(o => (
                    <option key={o.id} value={o.id} className="bg-[#16161A]">{o.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Insumo / Material Solicitado *</label>
                <input
                  type="text"
                  value={itemNome}
                  onChange={(e) => setItemNome(e.target.value)}
                  placeholder="Ex: Cimento CP-II 50kg"
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Quantidade *</label>
                  <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Unidade *</label>
                  <input
                    type="text"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                    placeholder="saco, kg, m³..."
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Enviar Solicitação</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Quote */}
      {selectedSol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Adicionar Cotação: {selectedSol.itemNome}</h3>
              <button onClick={() => setSelectedSol(null)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleAddQuote} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Fornecedor *</label>
                <select
                  value={fornecedorQuoteId}
                  onChange={(e) => setFornecedorQuoteId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  {fornecedores.map(f => (
                    <option key={f.id} value={f.id} className="bg-[#16161A]">{f.nomeFantasia}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Preço Unitário (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={precoUnitario}
                    onChange={(e) => setPrecoUnitario(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Prazo Entrega (Dias) *</label>
                  <input
                    type="number"
                    value={prazoEntregaDias}
                    onChange={(e) => setPrazoEntregaDias(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setSelectedSol(null)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" onClick={() => setSelectedSol(null)} className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Salvar Cotação</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
