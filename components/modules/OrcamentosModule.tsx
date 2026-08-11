'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Calculator, AlertTriangle, TrendingUp, DollarSign, Layers, Plus, CheckCircle2, ChevronDown } from 'lucide-react';

export const OrcamentosModule: React.FC = () => {
  const { obras, orcamentos, activeObraFilter } = useERP();
  const [selectedObraId, setSelectedObraId] = useState<string>(
    activeObraFilter !== 'todas' ? activeObraFilter : obras[0]?.id || ''
  );

  const targetObra = obras.find(o => o.id === selectedObraId) || obras[0];
  const targetOrcamento = orcamentos.find(orc => orc.obraId === targetObra?.id) || orcamentos[0];

  const bdi = targetOrcamento?.bdiPercentual || 22.5;
  const margem = targetOrcamento?.margemLucroPercentual || 15.0;

  const totalPrevisto = targetOrcamento?.itens.reduce((acc, i) => acc + i.custoTotalPrevisto, 0) || 0;
  const totalRealizado = targetOrcamento?.itens.reduce((acc, i) => acc + i.custoTotalRealizado, 0) || 0;
  const variacaoTotal = totalRealizado - totalPrevisto;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <Calculator className="h-6 w-6 text-[#C5A059]" />
            Orçamentos & Custos de Obras (SINAPI / BDI)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Elaboração de composição de custos unificados, margem BDI e acompanhamento Orçado x Realizado.
          </p>
        </div>

        {/* Obra Selector */}
        <select
          value={selectedObraId}
          onChange={(e) => setSelectedObraId(e.target.value)}
          className="rounded-lg border border-slate-800 bg-[#16161A] px-4 py-2 text-xs font-bold text-white shadow-md focus:outline-none focus:border-[#C5A059]"
        >
          {obras.map(o => (
            <option key={o.id} value={o.id} className="bg-[#16161A]">{o.codigo} - {o.nome}</option>
          ))}
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase text-slate-500">Total Previsto (Orçado)</span>
          <p className="text-xl font-bold text-white mt-1">R$ {totalPrevisto.toLocaleString('pt-BR')}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Composição de Insumos</span>
        </div>

        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase text-slate-500">Total Executado (Realizado)</span>
          <p className="text-xl font-bold text-[#C5A059] mt-1">R$ {totalRealizado.toLocaleString('pt-BR')}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Notas e Medições acumuladas</span>
        </div>

        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase text-slate-500">Taxa BDI & Margem</span>
          <p className="text-xl font-bold text-white mt-1">{bdi}% BDI | {margem}% Margem</p>
          <span className="text-[10px] text-slate-400 font-semibold">Benefícios e Despesas Indiretas</span>
        </div>

        <div className={`p-4 rounded-xl border ${variacaoTotal <= 0 ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-rose-950/20 border-rose-900/40'}`}>
          <span className="text-[10px] font-bold uppercase text-slate-400">Desvio Financeiro</span>
          <p className={`text-xl font-bold mt-1 ${variacaoTotal <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {variacaoTotal > 0 ? `+ R$ ${variacaoTotal.toLocaleString('pt-BR')}` : `R$ ${variacaoTotal.toLocaleString('pt-BR')}`}
          </p>
          <span className={`text-[10px] font-bold ${variacaoTotal <= 0 ? 'text-emerald-500' : 'text-rose-400'}`}>
            {variacaoTotal <= 0 ? 'Dentro do Limite Previsto' : 'Atenção: Custo Acima do Previsto'}
          </span>
        </div>
      </div>

      {/* Budget Items Table */}
      <div className="bg-[#16161A] rounded-xl border border-slate-800 overflow-hidden shadow-md">
        <div className="p-4 bg-[#0F0F12] border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs uppercase text-white tracking-wider">Composição Analítica dos Itens do Orçamento</h3>
            <p className="text-[11px] text-slate-400">Referências SINAPI e insumos da obra {targetObra?.nome}</p>
          </div>
          <button className="rounded-lg bg-[#C5A059] text-black px-3 py-2 text-xs font-bold shadow-md hover:bg-[#b08d48] transition-colors">
            + Adicionar Item SINAPI
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F0F12] border-b border-slate-800 font-bold text-slate-400 uppercase">
              <tr>
                <th className="p-3">Código SINAPI / Insumo</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Etapa Vinculada</th>
                <th className="p-3">Qtd / Unid</th>
                <th className="p-3">Unit. Orçado</th>
                <th className="p-3">Unit. Realizado</th>
                <th className="p-3">Total Orçado</th>
                <th className="p-3">Total Realizado</th>
                <th className="p-3 text-right">Variação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
              {targetOrcamento?.itens.map(item => {
                const diff = item.custoTotalRealizado - item.custoTotalPrevisto;
                const isOver = diff > 0;

                return (
                  <tr key={item.id} className="hover:bg-[#0F0F12] transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-white">{item.descricao}</p>
                      <span className="text-[10px] font-mono font-bold text-[#C5A059]">{item.itemCodigo}</span>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-300">
                        {item.categoria}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{item.etapaNome}</td>
                    <td className="p-3 font-semibold text-slate-200">{item.quantidade} {item.unidade}</td>
                    <td className="p-3 text-slate-400">R$ {item.custoUnitarioPrevisto.toFixed(2)}</td>
                    <td className="p-3 text-slate-400">R$ {item.custoUnitarioRealizado.toFixed(2)}</td>
                    <td className="p-3 font-bold text-white">R$ {item.custoTotalPrevisto.toLocaleString('pt-BR')}</td>
                    <td className="p-3 font-bold text-[#C5A059]">R$ {item.custoTotalRealizado.toLocaleString('pt-BR')}</td>
                    <td className={`p-3 text-right font-bold ${isOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isOver ? `+ R$ ${diff.toLocaleString('pt-BR')}` : diff === 0 ? '0.00' : `- R$ ${Math.abs(diff).toLocaleString('pt-BR')}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
