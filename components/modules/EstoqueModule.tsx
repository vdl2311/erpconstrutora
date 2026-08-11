'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { MaterialEstoque, TipoMovimentacaoEstoque } from '../../lib/types';
import {
  Boxes,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  AlertTriangle,
  Search,
  Filter,
  Layers,
  MapPin,
  X
} from 'lucide-react';

export const EstoqueModule: React.FC = () => {
  const {
    materiais,
    movimentacoesEstoque,
    addMaterial,
    addMovimentacaoEstoque,
    obras
  } = useERP();

  const [activeTab, setActiveTab] = useState<'materiais' | 'movimentacoes'>('materiais');
  const [showModalMovimentacao, setShowModalMovimentacao] = useState(false);
  const [showModalMaterial, setShowModalMaterial] = useState(false);

  // Form Movement State
  const [materialId, setMaterialId] = useState(materiais[0]?.id || '');
  const [tipo, setTipo] = useState<TipoMovimentacaoEstoque>('saida');
  const [quantidade, setQuantidade] = useState(10);
  const [obraOrigemId, setObraOrigemId] = useState(obras[0]?.id || '');
  const [responsavel, setResponsavel] = useState('Mestre Benedito Alcantara');
  const [observacao, setObservacao] = useState('');

  // Form Material State
  const [nomeMaterial, setNomeMaterial] = useState('');
  const [categoria, setCategoria] = useState('Estrutura e Aço');
  const [unidade, setUnidade] = useState('un');
  const [estoqueMinimo, setEstoqueMinimo] = useState(50);
  const [estoqueAtual, setEstoqueAtual] = useState(100);
  const [custoMedioUnitario, setCustoMedioUnitario] = useState(45.0);
  const [localizacao, setLocalizacao] = useState('Depósito Central');

  const handleMovimentacao = (e: React.FormEvent) => {
    e.preventDefault();
    const mat = materiais.find(m => m.id === materialId);
    const ob = obras.find(o => o.id === obraOrigemId);
    if (!mat) return;

    addMovimentacaoEstoque({
      materialId: mat.id,
      materialNome: mat.nome,
      tipo,
      quantidade,
      obraOrigemId: ob?.id,
      obraOrigemNome: ob?.nome,
      responsavel,
      observacao
    });

    setShowModalMovimentacao(false);
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    addMaterial({
      codigo: `MAT-${materiais.length + 101}`,
      nome: nomeMaterial,
      categoria,
      unidade,
      estoqueMinimo,
      estoqueAtual,
      custoMedioUnitario,
      localizacao
    });

    setShowModalMaterial(false);
    setNomeMaterial('');
  };

  const materiaisCriticos = materiais.filter(m => m.estoqueAtual <= m.estoqueMinimo);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <Boxes className="h-6 w-6 text-[#C5A059]" />
            Gestão de Estoque & Almoxarifado
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Controle físico e financeiro de insumos, entradas, saídas para obras e alertas de reposição.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModalMaterial(true)}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Novo Material
          </button>
          <button
            onClick={() => setShowModalMovimentacao(true)}
            className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-3.5 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Registrar Movimentação
          </button>
        </div>
      </div>

      {/* Critical Stock Alert Banner */}
      {materiaisCriticos.length > 0 && (
        <div className="p-4 bg-amber-950/20 rounded-xl border border-amber-900/40 flex items-center justify-between text-xs text-amber-300 font-semibold">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-[#C5A059] shrink-0" />
            <div>
              <p className="font-bold">Atenção: {materiaisCriticos.length} materiais em nível crítico de estoque!</p>
              <p className="text-[11px] text-amber-400/80">Insumos com quantidade abaixo do estoque mínimo de segurança.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#16161A] p-1 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('materiais')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'materiais' ? 'bg-[#C5A059] text-black shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Catálogo de Insumos ({materiais.length})
        </button>
        <button
          onClick={() => setActiveTab('movimentacoes')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'movimentacoes' ? 'bg-[#C5A059] text-black shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Histórico de Movimentações ({movimentacoesEstoque.length})
        </button>
      </div>

      {/* Materials Grid */}
      {activeTab === 'materiais' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materiais.map(m => {
            const isLow = m.estoqueAtual <= m.estoqueMinimo;
            const totalVal = m.estoqueAtual * m.custoMedioUnitario;

            return (
              <div
                key={m.id}
                className={`bg-[#16161A] p-5 rounded-xl border transition-all shadow-md ${
                  isLow ? 'border-[#C5A059] ring-1 ring-[#C5A059]/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-2 py-0.5 rounded">
                      {m.codigo}
                    </span>
                    <h3 className="font-bold text-sm text-white mt-1.5">{m.nome}</h3>
                    <p className="text-[11px] text-slate-400">{m.categoria}</p>
                  </div>

                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                    isLow ? 'bg-amber-950 text-amber-400 border-amber-800/30' : 'bg-emerald-950 text-emerald-400 border-emerald-800/30'
                  }`}>
                    {isLow ? 'Estoque Baixo' : 'Ok'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-[#0F0F12] p-3 rounded-lg border border-slate-800/60">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Qtd Atual</span>
                    <span className="font-extrabold text-white text-sm">{m.estoqueAtual} {m.unidade}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Estoque Mín.</span>
                    <span className="font-bold text-slate-400">{m.estoqueMinimo} {m.unidade}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-slate-800 font-medium text-slate-400">
                  <span>Local: <strong className="text-slate-200">{m.localizacao}</strong></span>
                  <span>Total: <strong className="text-[#C5A059] font-bold">R$ {totalVal.toLocaleString('pt-BR')}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Movements Table */}
      {activeTab === 'movimentacoes' && (
        <div className="bg-[#16161A] rounded-xl border border-slate-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F0F12] border-b border-slate-800 font-bold text-slate-400 uppercase">
                <tr>
                  <th className="p-3">Data</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Material / Insumo</th>
                  <th className="p-3">Quantidade</th>
                  <th className="p-3">Obra / Origem</th>
                  <th className="p-3">Responsável</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                {movimentacoesEstoque.map(mov => (
                  <tr key={mov.id} className="hover:bg-[#0F0F12] transition-colors">
                    <td className="p-3 font-mono text-slate-400">{mov.data}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        mov.tipo === 'entrada'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/30'
                          : mov.tipo === 'saida'
                          ? 'bg-rose-950 text-rose-400 border-rose-800/30'
                          : 'bg-blue-950 text-blue-400 border-blue-800/30'
                      }`}>
                        {mov.tipo}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-white">{mov.materialNome}</td>
                    <td className="p-3 font-extrabold text-[#C5A059]">{mov.quantidade}</td>
                    <td className="p-3 text-slate-300">{mov.obraOrigemNome || 'Almoxarifado Central'}</td>
                    <td className="p-3 text-slate-400">{mov.responsavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Movimentação */}
      {showModalMovimentacao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Registrar Movimentação de Insumo</h3>
              <button onClick={() => setShowModalMovimentacao(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleMovimentacao} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Material / Insumo *</label>
                <select
                  value={materialId}
                  onChange={(e) => setMaterialId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  {materiais.map(m => (
                    <option key={m.id} value={m.id} className="bg-[#16161A]">{m.nome} (Atual: {m.estoqueAtual} {m.unidade})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Tipo Movimento *</label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="saida" className="bg-[#16161A]">Saída para Obra</option>
                    <option value="entrada" className="bg-[#16161A]">Entrada / Nota Fiscal</option>
                    <option value="transferencia" className="bg-[#16161A]">Transferência</option>
                    <option value="devolucao" className="bg-[#16161A]">Devolução</option>
                  </select>
                </div>

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
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Obra / Destino *</label>
                <select
                  value={obraOrigemId}
                  onChange={(e) => setObraOrigemId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  {obras.map(o => (
                    <option key={o.id} value={o.id} className="bg-[#16161A]">{o.nome}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalMovimentacao(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Material */}
      {showModalMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Cadastrar Novo Insumo no Estoque</h3>
              <button onClick={() => setShowModalMaterial(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateMaterial} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nome do Insumo *</label>
                <input
                  type="text"
                  value={nomeMaterial}
                  onChange={(e) => setNomeMaterial(e.target.value)}
                  placeholder="Ex: Tinta Acrílica Suvinil 18L"
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Unidade *</label>
                  <input
                    type="text"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                    placeholder="lata, m³, kg, un..."
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Custo Médio (R$) *</label>
                  <input
                    type="number"
                    value={custoMedioUnitario}
                    onChange={(e) => setCustoMedioUnitario(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Estoque Mínimo *</label>
                  <input
                    type="number"
                    value={estoqueMinimo}
                    onChange={(e) => setEstoqueMinimo(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Estoque Inicial *</label>
                  <input
                    type="number"
                    value={estoqueAtual}
                    onChange={(e) => setEstoqueAtual(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalMaterial(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Cadastrar Insumo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
