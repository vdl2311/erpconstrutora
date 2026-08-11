'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Obra, ObraStatus } from '../../lib/types';
import {
  HardHat,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MoreVertical,
  LayoutGrid,
  List,
  BarChart2,
  X
} from 'lucide-react';

interface ObrasModuleProps {
  onOpenDetail: (obraId: string) => void;
  onOpenQuickAdd: (modalType: string) => void;
}

export const ObrasModule: React.FC<ObrasModuleProps> = ({ onOpenDetail, onOpenQuickAdd }) => {
  const { obras, deleteObra, activeObraFilter } = useERP();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'gantt'>('grid');

  const filtered = obras.filter(o => {
    const matchesSearch = o.nome.toLowerCase().includes(search.toLowerCase()) ||
                          o.codigo.toLowerCase().includes(search.toLowerCase()) ||
                          o.clienteNome.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || o.status === statusFilter;
    const matchesContextFilter = activeObraFilter === 'todas' || o.id === activeObraFilter;
    return matchesSearch && matchesStatus && matchesContextFilter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <HardHat className="h-6 w-6 text-[#C5A059]" />
            Gestão de Obras e Projetos
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Acompanhamento de cronogramas, custos, engenheiros e etapas de execução.
          </p>
        </div>

        <button
          onClick={() => onOpenQuickAdd('obra')}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Cadastrar Nova Obra
        </button>
      </div>

      {/* Filter and View Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#16161A] p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome da obra, código ou cliente..."
              className="w-full rounded-lg border border-slate-800 bg-[#0F0F12] pl-9 pr-3 py-1.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-800 bg-[#0F0F12] px-3 py-1.5 text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="todos">Todos os Status</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="atrasada">Atrasadas</option>
            <option value="concluida">Concluídas</option>
          </select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[#0F0F12] p-1 rounded-lg border border-slate-800 self-end md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md text-xs font-bold transition-colors ${
              viewMode === 'grid' ? 'bg-[#C5A059] text-black' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização em Cards"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md text-xs font-bold transition-colors ${
              viewMode === 'table' ? 'bg-[#C5A059] text-black' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização em Tabela"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('gantt')}
            className={`p-1.5 rounded-md text-xs font-bold transition-colors ${
              viewMode === 'gantt' ? 'bg-[#C5A059] text-black' : 'text-slate-400 hover:text-white'
            }`}
            title="Visão Cronograma Gantt"
          >
            <BarChart2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(o => (
            <div
              key={o.id}
              className="bg-[#16161A] rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img src={o.fotoUrl} alt={o.nome} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                  <span className={`absolute top-3 right-3 rounded px-2.5 py-1 text-[10px] font-bold border shadow-md ${
                    o.status === 'em_andamento'
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50'
                      : o.status === 'atrasada'
                      ? 'bg-rose-950/80 text-rose-400 border-rose-800/50'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700'
                  }`}>
                    {o.status === 'em_andamento' ? 'EM DIA' : o.status === 'atrasada' ? 'ATRASADO' : 'CONCLUÍDO'}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A059] block">
                      {o.codigo}
                    </span>
                    <h3 className="text-base font-bold text-white truncate">{o.nome}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                    <span className="truncate">{o.endereco}, {o.cidade}/{o.estado}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#0F0F12] p-2.5 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Orçamento</span>
                      <span className="font-extrabold text-white">R$ {(o.orcamentoTotal / 1000000).toFixed(2)}M</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Realizado</span>
                      <span className="font-extrabold text-[#C5A059]">R$ {(o.custoRealizadoTotal / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>

                  {/* Progress Slider */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-400">Avanço Físico:</span>
                      <span className="text-[#C5A059] font-bold">{o.percentualConcluido}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${o.status === 'atrasada' ? 'bg-rose-500' : 'bg-[#C5A059]'}`}
                        style={{ width: `${o.percentualConcluido}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenDetail(o.id)}
                  className="flex-1 rounded-lg bg-[#C5A059] py-2 text-xs font-bold text-black hover:bg-[#b08d48] transition-colors text-center"
                >
                  Painel Completo da Obra →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="bg-[#16161A] rounded-xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F0F12] border-b border-slate-800 font-bold text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Código / Obra</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Responsável</th>
                  <th className="p-3">Prazo</th>
                  <th className="p-3">Orçamento</th>
                  <th className="p-3">Realizado</th>
                  <th className="p-3">Avanço</th>
                  <th className="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
                {filtered.map(o => (
                  <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-white">{o.nome}</p>
                      <p className="text-[10px] text-[#C5A059] font-mono">{o.codigo}</p>
                    </td>
                    <td className="p-3 text-slate-400">{o.clienteNome}</td>
                    <td className="p-3 text-slate-300">{o.engenheiroNome}</td>
                    <td className="p-3 text-slate-400">{o.dataPrevistaTermino}</td>
                    <td className="p-3 font-bold text-white">R$ {o.orcamentoTotal.toLocaleString('pt-BR')}</td>
                    <td className="p-3 text-[#C5A059] font-bold">R$ {o.custoRealizadoTotal.toLocaleString('pt-BR')}</td>
                    <td className="p-3 font-bold text-[#C5A059]">{o.percentualConcluido}%</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onOpenDetail(o.id)}
                        className="rounded-lg bg-[#C5A059] text-black px-3 py-1 font-bold text-[11px] hover:bg-[#b08d48]"
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === 'gantt' && (
        <div className="bg-[#16161A] p-5 rounded-xl border border-slate-800 shadow-xl space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white">Cronograma Físico Visual (Gantt)</h3>
            <p className="text-xs text-slate-500">Acompanhamento temporal por obra e suas respectivas etapas</p>
          </div>

          <div className="space-y-6">
            {filtered.map(o => (
              <div key={o.id} className="p-4 rounded-xl border border-slate-800 space-y-3 bg-[#0F0F12]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardHat className="h-4 w-4 text-[#C5A059]" />
                    <span className="font-bold text-sm text-white">{o.nome} ({o.codigo})</span>
                  </div>
                  <span className="text-xs font-bold text-[#C5A059]">{o.percentualConcluido}% Concluído</span>
                </div>

                {/* Timeline stages */}
                <div className="space-y-2 pt-2">
                  {o.etapas.map(etp => (
                    <div key={etp.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 text-xs">
                      <span className="font-semibold text-slate-300 truncate">{etp.ordem}. {etp.nome}</span>
                      <span className="text-[11px] text-slate-500">{etp.dataInicio} → {etp.dataFim}</span>
                      <div className="md:col-span-2 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-[#C5A059] h-full rounded-full transition-all"
                          style={{ width: `${etp.percentualConcluido}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
