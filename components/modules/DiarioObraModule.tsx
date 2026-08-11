'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { DiarioObra } from '../../lib/types';
import {
  FileText,
  Plus,
  Sun,
  Cloud,
  CloudRain,
  AlertTriangle,
  Users,
  HardHat,
  Calendar,
  Camera,
  Printer,
  FileDown,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';

export const DiarioObraModule: React.FC = () => {
  const { diarios, addDiarioObra, obras, activeObraFilter } = useERP();
  const [showModal, setShowModal] = useState(false);
  const [selectedDiario, setSelectedDiario] = useState<DiarioObra | null>(null);
  const [filterObra, setFilterObra] = useState<string>('todas');

  // Form State
  const [obraId, setObraId] = useState(obras[0]?.id || '');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [responsavel, setResponsavel] = useState('Mestre Benedito Alcantara');
  const [condicoesClimaticas, setCondicoesClimaticas] = useState<DiarioObra['condicoesClimaticas']>('ensolarado');
  const [trabalhadoresPresentes, setTrabalhadoresPresentes] = useState(35);
  const [servicosExecutados, setServicosExecutados] = useState('');
  const [materiaisUtilizados, setMateriaisUtilizados] = useState('');
  const [equipamentosUtilizados, setEquipamentosUtilizados] = useState('');
  const [ocorrencias, setOcorrencias] = useState('');
  const [visitasTecnicas, setVisitasTecnicas] = useState('');

  const filteredDiarios = diarios.filter(d => {
    const matchesObra = (filterObra === 'todas' && (activeObraFilter === 'todas' || d.obraId === activeObraFilter)) || d.obraId === filterObra;
    return matchesObra;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetObra = obras.find(o => o.id === obraId);
    if (!targetObra) return;

    addDiarioObra({
      obraId: targetObra.id,
      obraNome: targetObra.nome,
      data,
      responsavel,
      condicoesClimaticas,
      trabalhadoresPresentes,
      servicosExecutados,
      materiaisUtilizados,
      equipamentosUtilizados,
      ocorrencias,
      visitasTecnicas,
      fotos: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=600']
    });

    setShowModal(false);
    setServicosExecutados('');
    setOcorrencias('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#C5A059]" />
            Diário de Obra Digital
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Registro diário de efetivo, clima, serviços executados, insumos e ocorrências de campo.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Registrar Diário de Campo
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 bg-[#16161A] p-3 rounded-xl border border-slate-800 shadow-md">
        <select
          value={filterObra}
          onChange={(e) => setFilterObra(e.target.value)}
          className="rounded-lg border border-slate-800 bg-[#0F0F12] px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#C5A059]"
        >
          <option value="todas">Filtrar por Obra: Todas</option>
          {obras.map(o => (
            <option key={o.id} value={o.id} className="bg-[#16161A]">{o.nome}</option>
          ))}
        </select>
        <span className="text-xs font-semibold text-slate-400">
          Exibindo {filteredDiarios.length} registros
        </span>
      </div>

      {/* List of Diarios */}
      <div className="space-y-4">
        {filteredDiarios.map(d => (
          <div key={d.id} className="bg-[#16161A] rounded-xl border border-slate-800 p-5 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C5A059]/10 text-[#C5A059] font-bold text-xs shrink-0 border border-[#C5A059]/20">
                  <Calendar className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{d.obraNome}</h3>
                  <p className="text-xs text-slate-400">Data: <span className="font-bold text-[#C5A059]">{d.data}</span> • Resp: {d.responsavel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 bg-slate-800/50 px-3 py-1 rounded-full text-xs font-bold text-slate-300 border border-slate-700/50">
                  {d.condicoesClimaticas === 'ensolarado' ? <Sun className="h-3.5 w-3.5 text-amber-500" /> : <CloudRain className="h-3.5 w-3.5 text-blue-400" />}
                  Clima: {d.condicoesClimaticas}
                </span>
                <span className="flex items-center gap-1 bg-[#C5A059]/10 px-3 py-1 rounded-full text-xs font-bold text-[#C5A059] border border-[#C5A059]/20">
                  <Users className="h-3.5 w-3.5 text-[#C5A059]" />
                  {d.trabalhadoresPresentes} trabalhadores
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-400 block mb-0.5">Serviços Executados no Dia:</span>
                <p className="text-slate-200 leading-relaxed bg-[#0F0F12] p-3 rounded-lg border border-slate-800/60">
                  {d.servicosExecutados}
                </p>
              </div>

              {d.materiaisUtilizados && (
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Insumos e Materiais Utilizados:</span>
                  <p className="text-slate-300 bg-[#0F0F12] p-2.5 rounded-lg border border-slate-800/40">
                    {d.materiaisUtilizados}
                  </p>
                </div>
              )}

              {d.ocorrencias && (
                <div className="p-3 bg-red-950/40 rounded-lg border border-red-900/40 text-red-300 font-medium flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-red-200">Ocorrências / Imprevistos:</span>
                    <span>{d.ocorrencias}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Diario Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#16161A] rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-800 my-8 text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Registrar Diário de Obra</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Obra *</label>
                  <select
                    value={obraId}
                    onChange={(e) => setObraId(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-semibold text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  >
                    {obras.map(o => (
                      <option key={o.id} value={o.id} className="bg-[#16161A]">{o.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Data de Registro *</label>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-semibold text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Responsável *</label>
                  <input
                    type="text"
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-semibold text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Clima *</label>
                  <select
                    value={condicoesClimaticas}
                    onChange={(e) => setCondicoesClimaticas(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-semibold text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="ensolarado" className="bg-[#16161A]">Ensolarado / Bom</option>
                    <option value="nublado" className="bg-[#16161A]">Nublado</option>
                    <option value="chuvoso" className="bg-[#16161A]">Chuvoso / Impraticável</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Efetivo de Campo *</label>
                  <input
                    type="number"
                    value={trabalhadoresPresentes}
                    onChange={(e) => setTrabalhadoresPresentes(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-semibold text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Serviços Executados no Dia *</label>
                <textarea
                  value={servicosExecutados}
                  onChange={(e) => setServicosExecutados(e.target.value)}
                  placeholder="Descreva detalhadamente os serviços realizados pelas equipes..."
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-medium text-white h-20 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Materiais e Equipamentos Utilizados</label>
                <textarea
                  value={materiaisUtilizados}
                  onChange={(e) => setMateriaisUtilizados(e.target.value)}
                  placeholder="Ex: Concreto 30m³, 80 barras de aço 10mm, 1x Grua..."
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-medium text-white h-16 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Ocorrências ou Impedimentos</label>
                <input
                  type="text"
                  value={ocorrencias}
                  onChange={(e) => setOcorrencias(e.target.value)}
                  placeholder="Ocorrências de segurança, falta de material ou atrasos..."
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-medium text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 font-bold text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48] shadow-md transition-colors"
                >
                  Salvar Diário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
