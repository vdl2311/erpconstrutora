'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Documento } from '../../lib/types';
import { FolderKanban, Plus, FileText, Download, Eye, Tag, Calendar, MapPin, X } from 'lucide-react';

export const DocumentosModule: React.FC = () => {
  const { documentos, addDocumento, obras } = useERP();
  const [showModal, setShowModal] = useState(false);
  const [filterCategoria, setFilterCategoria] = useState('todas');

  // Form State
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState<Documento['categoria']>('Projetos e Plantas');
  const [obraId, setObraId] = useState(obras[0]?.id || '');
  const [versao, setVersao] = useState('1.0');
  const [tipoArquivo, setTipoArquivo] = useState('PDF');

  const filteredDocs = documentos.filter(d => filterCategoria === 'todas' || d.categoria === filterCategoria);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const targetObra = obras.find(o => o.id === obraId);

    addDocumento({
      nome,
      categoria,
      obraId: targetObra?.id,
      obraNome: targetObra?.nome,
      versao,
      enviadoPor: 'Eng. Ricardo Vasconcelos',
      tamanhoKb: 2450,
      tipoArquivo,
      url: '#'
    });

    setShowModal(false);
    setNome('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-[#C5A059]" />
            Documentos, Projetos & ARTs
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Ged de projetos executivos, alvarás, licenças ambientais, memoriais e revisões técnicas.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Anexar Novo Documento
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2 bg-[#16161A] p-2 rounded-xl border border-slate-800 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setFilterCategoria('todas')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
            filterCategoria === 'todas' ? 'bg-[#C5A059] text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Todos os Documentos ({documentos.length})
        </button>
        <button
          onClick={() => setFilterCategoria('projeto_executivo')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
            filterCategoria === 'projeto_executivo' ? 'bg-[#C5A059] text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Projetos Executivos
        </button>
        <button
          onClick={() => setFilterCategoria('alvara_licenca')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
            filterCategoria === 'alvara_licenca' ? 'bg-[#C5A059] text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Alvarás e Licenças
        </button>
        <button
          onClick={() => setFilterCategoria('art_rrt')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
            filterCategoria === 'art_rrt' ? 'bg-[#C5A059] text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          ARTs / RRTs
        </button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-[#16161A] p-4 rounded-xl border border-slate-800 shadow-md space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-[#0F0F12] text-[#C5A059] border border-slate-800 shrink-0">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-xs text-white truncate max-w-[180px]">{doc.nome}</h3>
                  <p className="text-[10px] text-slate-500">Versão: v{doc.versao}</p>
                </div>
              </div>

              <span className="bg-[#0F0F12] border border-slate-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#C5A059]">
                {doc.tipoArquivo}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 bg-[#0F0F12] p-2.5 rounded-lg border border-slate-800/80">
              <p>Obra: <strong className="text-white">{doc.obraNome || 'Geral / Sede'}</strong></p>
              <p>Enviado por: <strong className="text-slate-300">{doc.enviadoPor}</strong></p>
              <p>Upload em: <strong className="text-slate-300">{doc.dataUpload}</strong></p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button className="flex items-center gap-1 text-[11px] font-bold text-[#C5A059] hover:underline">
                <Download className="h-3.5 w-3.5" /> Baixar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Document */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Anexar Documento de Obra</h3>
              <button onClick={() => setShowModal(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Título do Documento *</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Projeto Estrutural Bloco A - Rev 02"
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Categoria *</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none"
                  >
                    <option value="Projetos e Plantas">Projetos e Plantas</option>
                    <option value="Licenças e Alvarás">Licenças e Alvarás</option>
                    <option value="RH e Segurança">RH e Segurança</option>
                    <option value="Contratos">Contratos</option>
                    <option value="Notas Fiscais">Notas Fiscais</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Versão *</label>
                  <input
                    type="text"
                    value={versao}
                    onChange={(e) => setVersao(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Obra Associada *</label>
                <select
                  value={obraId}
                  onChange={(e) => setObraId(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none"
                >
                  {obras.map(o => (
                    <option key={o.id} value={o.id}>{o.nome}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Salvar Anexo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
