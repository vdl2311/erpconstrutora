'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { BarChart3, FileSpreadsheet, Download, Printer, Shield, History, Calendar, CheckCircle2, Filter } from 'lucide-react';

export const RelatoriosModule: React.FC = () => {
  const { auditLogs, obras, contasPagar, contasReceber } = useERP();
  const [selectedTipo, setSelectedTipo] = useState('consolidado');
  const [selectedObraId, setSelectedObraId] = useState('todas');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#C5A059]" />
            Relatórios Gerenciais, Curva S & Auditoria
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Geração de relatórios consolidados para diretoria, exportação de dados e rastreabilidade total de ações.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
          >
            <Printer className="h-4 w-4" />
            Imprimir / Gerar PDF
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="font-semibold text-slate-400 block mb-1">Tipo de Relatório *</label>
          <select
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-bold text-white focus:outline-none focus:border-[#C5A059]"
          >
            <option value="consolidado">Relatório Consolidado de Obras (Físico-Financeiro)</option>
            <option value="curva_s">Curva S de Custos e Desembolso</option>
            <option value="dre_obra">DRE Gerencial por Centro de Custos</option>
            <option value="auditoria">Trilha de Auditoria & Segurança</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-slate-400 block mb-1">Filtrar por Obra *</label>
          <select
            value={selectedObraId}
            onChange={(e) => setSelectedObraId(e.target.value)}
            className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-semibold text-white focus:outline-none focus:border-[#C5A059]"
          >
            <option value="todas">Todas as Obras Consolidadas</option>
            {obras.map(o => (
              <option key={o.id} value={o.id}>{o.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold text-slate-400 block mb-1">Formato de Exportação</label>
          <div className="flex items-center gap-2 pt-0.5">
            <button className="flex-1 py-2 bg-[#0F0F12] text-emerald-400 font-bold rounded-lg border border-emerald-800/50 hover:bg-emerald-950/40 text-center transition-colors">
              Exportar CSV / Excel
            </button>
            <button className="flex-1 py-2 bg-[#0F0F12] text-red-400 font-bold rounded-lg border border-red-800/50 hover:bg-red-950/40 text-center transition-colors">
              Exportar PDF Oficial
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Report Preview */}
      {selectedTipo === 'consolidado' && (
        <div className="bg-[#16161A] p-6 rounded-xl border border-slate-800 shadow-md space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">RELATÓRIO CONSOLIDADO FÍSICO-FINANCEIRO DE OBRAS</h2>
              <p className="text-xs text-slate-400">Documento de Controle Gerencial • ObraMaster ERP</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#C5A059]">Emissão: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F0F12] border-b border-slate-800 font-bold text-slate-400 uppercase">
                <tr>
                  <th className="p-3">Código / Obra</th>
                  <th className="p-3">Engenheiro</th>
                  <th className="p-3">Valor Contratado</th>
                  <th className="p-3">Orçado Previsto</th>
                  <th className="p-3">Custo Realizado</th>
                  <th className="p-3">Margem / Saldo</th>
                  <th className="p-3">Avanço Físico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                {obras.map(o => {
                  const saldo = o.orcamentoTotal - o.custoRealizadoTotal;
                  return (
                    <tr key={o.id} className="hover:bg-[#0F0F12] transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-white">{o.nome}</p>
                        <span className="text-[10px] text-[#C5A059] font-mono">{o.codigo}</span>
                      </td>
                      <td className="p-3 text-slate-300">{o.engenheiroNome}</td>
                      <td className="p-3 font-bold text-white">R$ {o.valorContratado.toLocaleString('pt-BR')}</td>
                      <td className="p-3 text-slate-300">R$ {o.orcamentoTotal.toLocaleString('pt-BR')}</td>
                      <td className="p-3 font-bold text-[#C5A059]">R$ {o.custoRealizadoTotal.toLocaleString('pt-BR')}</td>
                      <td className={`p-3 font-extrabold ${saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        R$ {saldo.toLocaleString('pt-BR')}
                      </td>
                      <td className="p-3 font-black text-[#C5A059]">{o.percentualConcluido}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTipo === 'auditoria' && (
        <div className="bg-[#16161A] p-6 rounded-xl border border-slate-800 shadow-md space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#C5A059]" />
              Trilha de Auditoria & Histórico de Operações (Rastreabilidade)
            </h2>
            <span className="text-xs text-slate-400">{auditLogs.length} eventos gravados</span>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden text-xs bg-[#0F0F12]">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 hover:bg-[#16161A] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{log.userName}</span>
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-700">
                      {log.userRole}
                    </span>
                    <span className="bg-slate-800 text-[#C5A059] px-2 py-0.5 rounded text-[10px] font-bold border border-slate-700">
                      {log.module}
                    </span>
                    <span className="font-mono text-[10px] text-[#C5A059] font-bold bg-[#16161A] px-1.5 py-0.5 rounded border border-slate-800">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-slate-400">{log.details}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[10px] text-slate-500 block">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
