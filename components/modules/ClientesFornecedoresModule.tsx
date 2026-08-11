'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Cliente, Fornecedor } from '../../lib/types';
import { Building, Plus, Star, Phone, Mail, MapPin, Search, FileText, X } from 'lucide-react';

export const ClientesFornecedoresModule: React.FC = () => {
  const { clientes, fornecedores, addCliente, addFornecedor } = useERP();
  const [activeTab, setActiveTab] = useState<'clientes' | 'fornecedores'>('clientes');
  const [showModalCli, setShowModalCli] = useState(false);
  const [showModalForn, setShowModalForn] = useState(false);

  // Form Client
  const [nomeRazao, setNomeRazao] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // Form Fornecedor
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [fornCnpj, setFornCnpj] = useState('');
  const [categoriaInsumos, setCategoriaInsumos] = useState('Insumos de Concreto');
  const [qualificacao, setQualificacao] = useState(5);

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    addCliente({
      nomeRazao,
      cpfCnpj,
      email,
      telefone,
      tipo: 'PJ',
      cidade: 'São Paulo',
      estado: 'SP',
      totalContratado: 0,
      status: 'ativo'
    });
    setShowModalCli(false);
    setNomeRazao('');
  };

  const handleCreateForn = (e: React.FormEvent) => {
    e.preventDefault();
    addFornecedor({
      nomeFantasia,
      razaoSocial: nomeFantasia,
      cnpj: fornCnpj,
      categoria: categoriaInsumos,
      contatoNome: 'Atendimento Comercial',
      telefone: '(11) 3300-4000',
      email: 'vendas@fornecedor.com.br',
      avaliacao: 5,
      cidade: 'São Paulo/SP'
    });
    setShowModalForn(false);
    setNomeFantasia('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <Building className="h-6 w-6 text-[#C5A059]" />
            Clientes, Investidores & Fornecedores
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cadastro de contratantes, investidores de empreendimentos e qualificação de fornecedores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'clientes' ? (
            <button
              onClick={() => setShowModalCli(true)}
              className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Novo Cliente
            </button>
          ) : (
            <button
              onClick={() => setShowModalForn(true)}
              className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Novo Fornecedor
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#16161A] p-1.5 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('clientes')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'clientes' ? 'bg-[#C5A059] text-black font-bold shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Clientes Contratantes ({clientes.length})
        </button>
        <button
          onClick={() => setActiveTab('fornecedores')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'fornecedores' ? 'bg-[#C5A059] text-black font-bold shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Fornecedores Homologados ({fornecedores.length})
        </button>
      </div>

      {/* Clients View */}
      {activeTab === 'clientes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientes.map(c => (
            <div key={c.id} className="bg-[#16161A] p-5 rounded-xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{c.nomeRazao}</h3>
                  <p className="text-[10px] text-[#C5A059] font-mono">{c.cpfCnpj}</p>
                </div>
                <span className="bg-[#0F0F12] text-[#C5A059] border border-slate-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                  {c.tipo}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-400">
                <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-slate-500" /> {c.email}</p>
                <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-500" /> {c.telefone}</p>
                <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-500" /> {c.cidade} - {c.estado}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fornecedores View */}
      {activeTab === 'fornecedores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fornecedores.map(f => (
            <div key={f.id} className="bg-[#16161A] p-5 rounded-xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{f.nomeFantasia}</h3>
                  <p className="text-[10px] text-[#C5A059] font-mono">{f.cnpj}</p>
                </div>
                <div className="flex items-center text-[#C5A059] font-bold text-xs gap-0.5">
                  <Star className="h-3.5 w-3.5 fill-[#C5A059]" />
                  <span>{f.avaliacao}.0</span>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-300 bg-[#0F0F12] p-2 rounded-lg border border-slate-800">
                Insumos: <span className="text-[#C5A059]">{f.categoria}</span>
              </p>

              <div className="space-y-1 text-xs text-slate-400">
                <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-slate-500" /> {f.email}</p>
                <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-500" /> {f.telefone}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Client */}
      {showModalCli && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Cadastrar Cliente</h3>
              <button onClick={() => setShowModalCli(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nome / Razão Social *</label>
                <input
                  type="text"
                  value={nomeRazao}
                  onChange={(e) => setNomeRazao(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">CPF / CNPJ *</label>
                  <input
                    type="text"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-mono focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Telefone *</label>
                  <input
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">E-mail *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalCli(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Fornecedor */}
      {showModalForn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Cadastrar Fornecedor</h3>
              <button onClick={() => setShowModalForn(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateForn} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nome Fantasia / Empresa *</label>
                <input
                  type="text"
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">CNPJ *</label>
                  <input
                    type="text"
                    value={fornCnpj}
                    onChange={(e) => setFornCnpj(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-mono focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Insumos Fornecidos *</label>
                  <input
                    type="text"
                    value={categoriaInsumos}
                    onChange={(e) => setCategoriaInsumos(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModalForn(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
