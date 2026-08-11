'use client';

import React, { useState, useEffect } from 'react';
import { useERP } from '../../context/ERPContext';
import { Search, X, HardHat, FileText, DollarSign, ShoppingCart, Boxes, Truck, Users, Building, FolderKanban, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (moduleKey: string) => void;
  onSelectObra?: (obraId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate, onSelectObra }) => {
  const { obras, diarios, contasPagar, contasReceber, fornecedores, solicitacoesCompra, materiais, equipamentos, funcionarios, clientes, documentos } = useERP();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // trigger parent open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search calculations
  const matchObras = q ? obras.filter(o => o.nome.toLowerCase().includes(q) || o.codigo.toLowerCase().includes(q) || o.cidade.toLowerCase().includes(q)) : [];
  const matchDiarios = q ? diarios.filter(d => d.servicosExecutados.toLowerCase().includes(q) || d.obraNome.toLowerCase().includes(q) || d.responsavel.toLowerCase().includes(q)) : [];
  const matchContas = q ? contasPagar.filter(c => c.descricao.toLowerCase().includes(q) || c.fornecedorNome.toLowerCase().includes(q)) : [];
  const matchCompras = q ? solicitacoesCompra.filter(s => s.itemNome.toLowerCase().includes(q) || s.numero.toLowerCase().includes(q)) : [];
  const matchMateriais = q ? materiais.filter(m => m.nome.toLowerCase().includes(q) || m.codigo.toLowerCase().includes(q) || m.categoria.toLowerCase().includes(q)) : [];
  const matchEquipamentos = q ? equipamentos.filter(e => e.nome.toLowerCase().includes(q) || e.patrimonio.toLowerCase().includes(q)) : [];
  const matchPessoas = q ? funcionarios.filter(f => f.nome.toLowerCase().includes(q) || f.cargo.toLowerCase().includes(q)) : [];
  const matchClientes = q ? clientes.filter(c => c.nomeRazao.toLowerCase().includes(q) || c.cpfCnpj.includes(q)) : [];
  const matchDocs = q ? documentos.filter(d => d.nome.toLowerCase().includes(q) || d.categoria.toLowerCase().includes(q)) : [];

  const hasResults = matchObras.length + matchDiarios.length + matchContas.length + matchCompras.length + matchMateriais.length + matchEquipamentos.length + matchPessoas.length + matchClientes.length + matchDocs.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#16161A] shadow-2xl border border-slate-800 overflow-hidden text-slate-300">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-[#0F0F12]">
          <Search className="h-5 w-5 text-[#C5A059] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise por obras, fornecedores, insumos, contas, compras, fotos, documentos..."
            className="w-full bg-transparent text-sm font-medium text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-500 hover:text-white mr-2">
              <X className="h-4 w-4" />
            </button>
          )}
          <button onClick={onClose} className="rounded border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-mono font-semibold text-slate-400 hover:text-white">
            ESC
          </button>
        </div>

        {/* Search Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-xs text-slate-500 space-y-2">
              <p className="font-semibold text-slate-300">Busca Inteligente Global no ERP</p>
              <p>Digite para localizar registros instantaneamente em todos os módulos da construtora.</p>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Nenhum registro encontrado para <span className="font-bold text-slate-300">&quot;{query}&quot;</span>.
            </div>
          ) : (
            <>
              {/* Obras */}
              {matchObras.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                    <HardHat className="h-3.5 w-3.5 text-[#C5A059]" /> Obras ({matchObras.length})
                  </h4>
                  <div className="space-y-1">
                    {matchObras.map(o => (
                      <div
                        key={o.id}
                        onClick={() => { onNavigate('obras'); onClose(); }}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0F0F12] hover:bg-[#C5A059]/10 cursor-pointer group border border-slate-800"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{o.nome}</p>
                          <p className="text-[11px] text-slate-400">{o.codigo} • {o.cidade}/{o.estado}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#C5A059]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contas */}
              {matchContas.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" /> Financeiro / Contas ({matchContas.length})
                  </h4>
                  <div className="space-y-1">
                    {matchContas.map(c => (
                      <div
                        key={c.id}
                        onClick={() => { onNavigate('financeiro'); onClose(); }}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0F0F12] hover:bg-emerald-950/40 cursor-pointer group border border-slate-800"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{c.descricao}</p>
                          <p className="text-[11px] text-slate-400">{c.fornecedorNome} • R$ {c.valor.toLocaleString('pt-BR')}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compras */}
              {matchCompras.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                    <ShoppingCart className="h-3.5 w-3.5 text-purple-400" /> Compras ({matchCompras.length})
                  </h4>
                  <div className="space-y-1">
                    {matchCompras.map(s => (
                      <div
                        key={s.id}
                        onClick={() => { onNavigate('compras'); onClose(); }}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0F0F12] hover:bg-purple-950/40 cursor-pointer group border border-slate-800"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{s.itemNome}</p>
                          <p className="text-[11px] text-slate-400">{s.numero} • Obra: {s.obraNome}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-purple-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materiais */}
              {matchMateriais.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                    <Boxes className="h-3.5 w-3.5 text-sky-400" /> Estoque / Almoxarifado ({matchMateriais.length})
                  </h4>
                  <div className="space-y-1">
                    {matchMateriais.map(m => (
                      <div
                        key={m.id}
                        onClick={() => { onNavigate('estoque'); onClose(); }}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0F0F12] hover:bg-sky-950/40 cursor-pointer group border border-slate-800"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{m.nome}</p>
                          <p className="text-[11px] text-slate-400">{m.codigo} • Est. Atual: {m.estoqueAtual} {m.unidade}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-sky-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipamentos */}
              {matchEquipamentos.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#C5A059]" /> Frota & Equipamentos ({matchEquipamentos.length})
                  </h4>
                  <div className="space-y-1">
                    {matchEquipamentos.map(e => (
                      <div
                        key={e.id}
                        onClick={() => { onNavigate('equipamentos'); onClose(); }}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0F0F12] hover:bg-[#C5A059]/10 cursor-pointer group border border-slate-800"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{e.nome}</p>
                          <p className="text-[11px] text-slate-400">{e.patrimonio} • Obra: {e.obraAtualNome || 'Pátio'}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#C5A059]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
