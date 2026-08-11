'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Obra, EtapaObra } from '../../lib/types';
import {
  X,
  HardHat,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  FolderKanban,
  AlertTriangle,
  Plus,
  BarChart2,
  MapPin,
  TrendingUp,
  Layers,
  ChevronRight,
  UserCheck,
  Edit2
} from 'lucide-react';

interface PainelObraModalProps {
  obraId: string | null;
  onClose: () => void;
  onNavigateModule: (moduleKey: string) => void;
}

export const PainelObraModal: React.FC<PainelObraModalProps> = ({ obraId, onClose, onNavigateModule }) => {
  const { obras, updateEtapaObra, diarios, contasPagar, solicitacoesCompra, documentos, funcionarios, alocacoes } = useERP();
  const [activeTab, setActiveTab] = useState<'visao' | 'cronograma' | 'diarios' | 'financeiro' | 'documentos'>('visao');
  const [editingEtapa, setEditingEtapa] = useState<EtapaObra | null>(null);

  if (!obraId) return null;
  const obra = obras.find(o => o.id === obraId);
  if (!obra) return null;

  const obraDiarios = diarios.filter(d => d.obraId === obra.id);
  const obraContas = contasPagar.filter(c => c.obraId === obra.id);
  const obraCompras = solicitacoesCompra.filter(s => s.obraId === obra.id);
  const obraDocs = documentos.filter(d => d.obraId === obra.id);
  const obraAlocados = alocacoes.filter(a => a.obraId === obra.id);

  const saldoOrcamento = obra.orcamentoTotal - obra.custoRealizadoTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#16161A] shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh] text-slate-300 my-auto">
        {/* Modal Header */}
        <div className="relative bg-[#0F0F12] border-b border-slate-800 p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059] mb-1">
                <span className="bg-[#C5A059]/10 px-2.5 py-0.5 rounded border border-[#C5A059]/30 font-mono">
                  {obra.codigo}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-[#C5A059]" />
                  {obra.endereco}, {obra.cidade}/{obra.estado}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif italic text-white">{obra.nome}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Cliente: <span className="font-semibold text-slate-200">{obra.clienteNome}</span> • Gerente: {obra.gerenteNome}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 bg-[#16161A] p-3 rounded-xl border border-slate-800">
              <div className="text-center">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Conclusão</span>
                <span className="text-2xl font-light text-[#C5A059]">{obra.percentualConcluido}%</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Status</span>
                <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${
                  obra.status === 'em_andamento'
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50'
                    : obra.status === 'atrasada'
                    ? 'bg-rose-950/80 text-rose-400 border-rose-800/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {obra.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-800 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('visao')}
              className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'visao' ? 'border-[#C5A059] text-[#C5A059] font-bold' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Painel Geral
            </button>
            <button
              onClick={() => setActiveTab('cronograma')}
              className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'cronograma' ? 'border-[#C5A059] text-[#C5A059] font-bold' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Etapas & Cronograma ({obra.etapas.length})
            </button>
            <button
              onClick={() => setActiveTab('diarios')}
              className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'diarios' ? 'border-[#C5A059] text-[#C5A059] font-bold' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Diário de Obra ({obraDiarios.length})
            </button>
            <button
              onClick={() => setActiveTab('financeiro')}
              className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'financeiro' ? 'border-[#C5A059] text-[#C5A059] font-bold' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Contas & Compras ({obraContas.length + obraCompras.length})
            </button>
            <button
              onClick={() => setActiveTab('documentos')}
              className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'documentos' ? 'border-[#C5A059] text-[#C5A059] font-bold' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Documentos ({obraDocs.length})
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'visao' && (
            <div className="space-y-6">
              {/* Financial & Schedule Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0F0F12] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Valor Contratado</span>
                  <p className="text-lg font-black text-white mt-1">R$ {obra.valorContratado.toLocaleString('pt-BR')}</p>
                </div>

                <div className="bg-[#0F0F12] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Orçamento Previsto</span>
                  <p className="text-lg font-black text-[#C5A059] mt-1">R$ {obra.orcamentoTotal.toLocaleString('pt-BR')}</p>
                </div>

                <div className="bg-[#0F0F12] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Custo Realizado</span>
                  <p className="text-lg font-black text-[#C5A059] mt-1">R$ {obra.custoRealizadoTotal.toLocaleString('pt-BR')}</p>
                </div>

                <div className={`p-4 rounded-xl border ${saldoOrcamento >= 0 ? 'bg-emerald-950/20 border-emerald-800/30' : 'bg-rose-950/20 border-rose-800/30'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Saldo de Orçamento</span>
                  <p className={`text-lg font-black mt-1 ${saldoOrcamento >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    R$ {saldoOrcamento.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              {/* Technical Team & Roles */}
              <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-[#C5A059]" />
                  Corpo Técnico Responsável
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#0F0F12] p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Gerente Geral</span>
                    <span className="font-bold text-slate-200">{obra.gerenteNome}</span>
                  </div>
                  <div className="bg-[#0F0F12] p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Engenheiro Residente</span>
                    <span className="font-bold text-slate-200">{obra.engenheiroNome}</span>
                  </div>
                  <div className="bg-[#0F0F12] p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Mestre de Obras</span>
                    <span className="font-bold text-slate-200">{obra.mestreNome}</span>
                  </div>
                </div>
              </div>

              {/* Stage Progress Bars */}
              <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#C5A059]" />
                  Progresso por Etapa de Execução
                </h4>

                <div className="space-y-3">
                  {obra.etapas.map(etp => (
                    <div key={etp.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                        <span>{etp.nome} ({etp.responsavel})</span>
                        <span className="font-bold text-[#C5A059]">{etp.percentualConcluido}%</span>
                      </div>
                      <div className="w-full bg-[#0F0F12] border border-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#C5A059] h-full rounded-full transition-all duration-300"
                          style={{ width: `${etp.percentualConcluido}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cronograma' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-slate-500">Acompanhamento das Etapas</h4>
                <span className="text-xs text-slate-400">Clique na etapa para atualizar o % de avanço</span>
              </div>

              <div className="divide-y divide-slate-850 border border-slate-800 rounded-xl overflow-hidden bg-[#0F0F12]">
                {obra.etapas.map(etp => (
                  <div key={etp.id} className="p-4 hover:bg-[#16161A] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{etp.ordem}. {etp.nome}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                          etp.status === 'concluida' 
                            ? 'bg-emerald-950 text-emerald-450 border-emerald-850/40' 
                            : etp.status === 'em_andamento' 
                            ? 'bg-blue-950 text-blue-450 border-blue-850/40' 
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}>
                          {etp.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Prazo: {etp.dataInicio} até {etp.dataFim} • Resp: {etp.responsavel}
                      </p>
                      <p className="text-[11px] font-semibold text-[#C5A059]">
                        Custo Orçado: R$ {etp.custoPrevisto.toLocaleString('pt-BR')} | Realizado: R$ {etp.custoRealizado.toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={etp.percentualConcluido}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          updateEtapaObra(obra.id, etp.id, {
                            percentualConcluido: val,
                            status: val === 100 ? 'concluida' : val > 0 ? 'em_andamento' : 'nao_iniciada'
                          });
                        }}
                        className="w-28 accent-[#C5A059] cursor-pointer"
                      />
                      <span className="w-12 text-right text-xs font-black text-[#C5A059]">{etp.percentualConcluido}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'diarios' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-slate-500">Registros de Campo Recentes</h4>
                <button
                  onClick={() => { onClose(); onNavigateModule('diario'); }}
                  className="text-xs font-bold text-[#C5A059] hover:underline"
                >
                  + Abrir Módulo Diário de Obra
                </button>
              </div>

              {obraDiarios.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-[#0F0F12] rounded-xl border border-slate-800">
                  Nenhum diário registrado ainda para esta obra.
                </div>
              ) : (
                <div className="space-y-3">
                  {obraDiarios.map(d => (
                    <div key={d.id} className="p-4 bg-[#0F0F12] rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{d.data} • {d.responsavel}</span>
                        <span className="capitalize bg-amber-950/30 text-[#C5A059] border border-amber-800/30 px-2 py-0.5 rounded text-[10px] font-bold">
                          Clima: {d.condicoesClimaticas} • {d.trabalhadoresPresentes} trabalhadores
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{d.servicosExecutados}</p>
                      {d.ocorrencias && (
                        <p className="text-[11px] text-rose-400 font-semibold bg-rose-950/20 border border-rose-850/30 p-2 rounded">
                          Ocorrência: {d.ocorrencias}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'financeiro' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-slate-500">Contas a Pagar Relacionadas</h4>
              <div className="divide-y divide-slate-850 border border-slate-800 rounded-xl overflow-hidden bg-[#0F0F12]">
                {obraContas.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">Nenhuma conta associada.</div>
                ) : (
                  obraContas.map(c => (
                    <div key={c.id} className="p-3 text-xs flex items-center justify-between hover:bg-[#16161A]/40 transition-colors">
                      <div>
                        <p className="font-bold text-white">{c.descricao}</p>
                        <p className="text-[11px] text-slate-400">{c.fornecedorNome} • Vencimento: {c.vencimento}</p>
                      </div>
                      <span className="font-bold text-white">R$ {c.valor.toLocaleString('pt-BR')}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-slate-500">Documentação e Projetos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {obraDocs.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 col-span-2">Nenhum documento anexado.</div>
                ) : (
                  obraDocs.map(doc => (
                    <div key={doc.id} className="p-3 bg-[#0F0F12] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white truncate max-w-[200px]">{doc.nome}</p>
                        <p className="text-[10px] text-slate-400">{doc.categoria} • v{doc.versao}</p>
                      </div>
                      <span className="bg-[#16161A] border border-slate-800 text-[#C5A059] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        {doc.tipoArquivo}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
