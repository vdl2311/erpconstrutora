'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Equipamento, StatusEquipamento } from '../../lib/types';
import { Truck, Plus, Wrench, AlertTriangle, CheckCircle2, Clock, MapPin, Search, X } from 'lucide-react';

export const EquipamentosModule: React.FC = () => {
  const { equipamentos, manutencoes, addEquipamento, addManutencao, obras } = useERP();
  const [showModalEqp, setShowModalEqp] = useState(false);
  const [showModalMan, setShowModalMan] = useState(false);

  // Form Equipment
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Terraplenagem');
  const [marcaModelo, setMarcaModelo] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [obraAtualId, setObraAtualId] = useState(obras[0]?.id || '');
  const [valorAquisicao, setValorAquisicao] = useState(250000);
  const [horimetroKm, setHorimetroKm] = useState(1200);

  // Form Maintenance
  const [eqpId, setEqpId] = useState(equipamentos[0]?.id || '');
  const [tipoManutencao, setTipoManutencao] = useState<'preventiva' | 'corretiva'>('preventiva');
  const [descricao, setDescricao] = useState('');
  const [custo, setCusto] = useState(3500);

  const handleCreateEqp = (e: React.FormEvent) => {
    e.preventDefault();
    const targetObra = obras.find(o => o.id === obraAtualId);

    addEquipamento({
      patrimonio: `PAT-2026-${equipamentos.length + 10}`,
      nome,
      categoria,
      marcaModelo,
      numeroSerie,
      dataAquisicao: new Date().toISOString().split('T')[0],
      valorAquisicao,
      obraAtualId: targetObra?.id,
      obraAtualNome: targetObra?.nome,
      responsavel: 'Eng. Ricardo Vasconcelos',
      status: 'operacional',
      horimetroKm,
      unidadeMedida: 'horas',
      proximaManutencaoVal: horimetroKm + 500,
      proximaManutencaoData: '2026-10-01'
    });

    setShowModalEqp(false);
    setNome('');
  };

  const handleCreateMan = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEqp = equipamentos.find(e => e.id === eqpId);
    if (!targetEqp) return;

    addManutencao({
      equipamentoId: targetEqp.id,
      equipamentoNome: targetEqp.nome,
      tipo: tipoManutencao,
      data: new Date().toISOString().split('T')[0],
      descricao,
      custo,
      oficinaResponsavel: 'Assistência Técnica Especializada',
      status: 'agendada'
    });

    setShowModalMan(false);
    setDescricao('');
  };  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <Truck className="h-6 w-6 text-[#C5A059]" />
            Frota & Equipamentos
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Gestão de máquinas, veículos, horímetros, alocações em obras e manutenções preventivas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModalMan(true)}
            className="flex items-center gap-2 rounded-lg bg-slate-800 text-slate-200 px-3.5 py-2 text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            <Wrench className="h-4 w-4" />
            Agendar Manutenção
          </button>
          <button
            onClick={() => setShowModalEqp(true)}
            className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-3.5 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Novo Equipamento
          </button>
        </div>
      </div>

      {/* Grid of Equipments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipamentos.map(eqp => (
          <div key={eqp.id} className="bg-[#16161A] rounded-xl border border-slate-800 p-5 shadow-md space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-2 py-0.5 rounded">
                  {eqp.patrimonio}
                </span>
                <h3 className="font-bold text-sm text-white mt-1.5">{eqp.nome}</h3>
                <p className="text-[11px] text-slate-400">{eqp.marcaModelo}</p>
              </div>

              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                eqp.status === 'operacional'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800/30'
                  : eqp.status === 'em_manutencao'
                  ? 'bg-rose-950 text-rose-400 border-rose-800/30 font-extrabold'
                  : 'bg-blue-950 text-blue-400 border-blue-800/30'
              }`}>
                {eqp.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-[#0F0F12] p-3 rounded-lg border border-slate-800/60">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Horímetro / KM</span>
                <span className="font-extrabold text-white">{eqp.horimetroKm.toLocaleString('pt-BR')} {eqp.unidadeMedida}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Próx. Revisão</span>
                <span className="font-bold text-[#C5A059]">{eqp.proximaManutencaoVal} {eqp.unidadeMedida}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
              <span>Obra Atual: <strong className="text-slate-200">{eqp.obraAtualNome || 'Pátio Central'}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Maintenances List */}
      <div className="bg-[#16161A] rounded-xl border border-slate-800 p-5 shadow-md space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-white">Histórico de Manutenções Registradas</h3>

        <div className="divide-y divide-slate-850 border border-slate-800 rounded-lg overflow-hidden">
          {manutencoes.map(m => (
            <div key={m.id} className="p-3 text-xs flex items-center justify-between hover:bg-[#0F0F12] transition-colors">
              <div>
                <p className="font-bold text-white">{m.equipamentoNome}</p>
                <p className="text-[11px] text-slate-400">{m.descricao} • Oficina: {m.oficinaResponsavel}</p>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-[#C5A059] block">R$ {m.custo.toLocaleString('pt-BR')}</span>
                <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-950/20 border border-amber-800/30 px-2 py-0.5 rounded">
                  {m.tipo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Equipment */}
      {showModalEqp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Cadastrar Novo Equipamento</h3>
              <button onClick={() => setShowModalEqp(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateEqp} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nome da Máquina / Equipamento *</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Miniescavadeira Bobcat E35"
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Marca e Modelo *</label>
                <input
                  type="text"
                  value={marcaModelo}
                  onChange={(e) => setMarcaModelo(e.target.value)}
                  placeholder="Ex: Caterpillar 320"
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Horímetro Inicial *</label>
                  <input
                    type="number"
                    value={horimetroKm}
                    onChange={(e) => setHorimetroKm(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Valor Aquisição (R$) *</label>
                  <input
                    type="number"
                    value={valorAquisicao}
                    onChange={(e) => setValorAquisicao(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalEqp(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Maintenance */}
      {showModalMan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Agendar Manutenção</h3>
              <button onClick={() => setShowModalMan(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateMan} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Equipamento *</label>
                <select
                  value={eqpId}
                  onChange={(e) => setEqpId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  {equipamentos.map(e => (
                    <option key={e.id} value={e.id} className="bg-[#16161A]">{e.nome} ({e.patrimonio})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Tipo de Manutenção *</label>
                <select
                  value={tipoManutencao}
                  onChange={(e) => setTipoManutencao(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="preventiva" className="bg-[#16161A]">Preventiva (Periódica)</option>
                  <option value="corretiva" className="bg-[#16161A]">Corretiva (Avaria/Defeito)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Descrição do Serviço *</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Troca de óleo, filtros, mangueiras..."
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium h-20 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalMan(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Agendar Serviço</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
