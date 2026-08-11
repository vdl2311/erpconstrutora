'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Settings, Save, Download, Database, Building2, Key, CheckCircle2 } from 'lucide-react';

export const ParametrosModule: React.FC = () => {
  const { addAuditLog } = useERP();
  const [razaoSocial, setRazaoSocial] = useState('ObraMaster Engenharia e Construção Ltda');
  const [cnpj, setCnpj] = useState('12.345.678/0001-90');
  const [bdiPadrao, setBdiPadrao] = useState(22.5);
  const [margemPadrao, setMargemPadrao] = useState(15.0);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditLog('Configurações', 'Alteração de Parâmetros', 'Atualizados parâmetros gerais da construtora');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = localStorage.getItem('obramaster_erp_data_v1');
    if (!dataStr) return;
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `obramaster_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6 text-[#C5A059]" />
            Parâmetros & Configurações da Construtora
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Dados institucionais, índices fiscais, BDI padrão e gerenciamento de backup do banco de dados.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Settings */}
        <div className="bg-[#16161A] p-5 rounded-xl border border-slate-800 shadow-md space-y-4 text-xs">
          <h3 className="font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#C5A059]" />
            Dados Institucionais da Construtora
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Razão Social *</label>
              <input
                type="text"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] font-bold text-white focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">CNPJ *</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-mono focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>
          </div>
        </div>

        {/* Budget Defaults */}
        <div className="bg-[#16161A] p-5 rounded-xl border border-slate-800 shadow-md space-y-4 text-xs">
          <h3 className="font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-2">
            <Settings className="h-4 w-4 text-[#C5A059]" />
            Parâmetros Financeiros & BDI
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">BDI Padrão (%) *</label>
              <input
                type="number"
                step="0.1"
                value={bdiPadrao}
                onChange={(e) => setBdiPadrao(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-bold focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Margem de Lucro Alvo (%) *</label>
              <input
                type="number"
                step="0.1"
                value={margemPadrao}
                onChange={(e) => setMargemPadrao(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-bold focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>
          </div>
        </div>

        {/* Backup & Export */}
        <div className="bg-[#16161A] p-5 rounded-xl border border-slate-800 shadow-md space-y-3 text-xs">
          <h3 className="font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-2">
            <Database className="h-4 w-4 text-[#C5A059]" />
            Gerenciamento de Dados & Backup
          </h3>
          <p className="text-slate-400">
            Exporte uma cópia completa de segurança em formato JSON para restaurar a qualquer momento.
          </p>

          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center gap-2 rounded-lg bg-[#0F0F12] border border-slate-800 px-4 py-2 font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Download className="h-4 w-4 text-[#C5A059]" />
            Fazer Download do Backup JSON
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Parâmetros Salvos!
            </span>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-5 py-2.5 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
          >
            <Save className="h-4 w-4" />
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
};
