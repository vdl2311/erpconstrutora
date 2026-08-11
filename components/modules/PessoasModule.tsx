'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Funcionario } from '../../lib/types';
import { Users, Plus, ShieldCheck, HardHat, Calendar, DollarSign, MapPin, Search, X } from 'lucide-react';

export const PessoasModule: React.FC = () => {
  const { funcionarios, alocacoes, addFuncionario, obras } = useERP();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('Pedreiro Especializado');
  const [departamento, setDepartamento] = useState('Obras & Operações');
  const [salarioBase, setSalarioBase] = useState(3800);
  const [dataAdmissao, setDataAdmissao] = useState(new Date().toISOString().split('T')[0]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addFuncionario({
      nome,
      cpf,
      cargo,
      departamento,
      dataAdmissao,
      salario: salarioBase,
      email: 'colaborador@obramaster.com.br',
      telefone: '(11) 98888-7777',
      status: 'ativo',
      certificados: ['NR-35 Trabalho em Altura', 'NR-18 Segurança na Construção'],
      obraAlocadaId: obras[0]?.id,
      obraAlocadaNome: obras[0]?.nome
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
            <Users className="h-6 w-6 text-[#C5A059]" />
            Recursos Humanos & Mão de Obra
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cadastro de colaboradores, efetivo alocado em canteiro, controle de EPIs e salários.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Adicionar Colaborador
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-[#16161A] rounded-xl border border-slate-800 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F0F12] border-b border-slate-800 font-bold text-slate-400 uppercase">
              <tr>
                <th className="p-3">Nome / CPF</th>
                <th className="p-3">Cargo / Função</th>
                <th className="p-3">Contrato</th>
                <th className="p-3">Admissão</th>
                <th className="p-3">Salário Base</th>
                <th className="p-3">EPIs Entregues</th>
                <th className="p-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
              {funcionarios.map(f => (
                <tr key={f.id} className="hover:bg-[#0F0F12] transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-white">{f.nome}</p>
                    <p className="text-[10px] text-[#C5A059] font-mono">{f.cpf}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-slate-200">{f.cargo}</p>
                    <p className="text-[10px] text-slate-500">{f.departamento}</p>
                  </td>
                  <td className="p-3 font-semibold text-slate-400">{f.email}</td>
                  <td className="p-3 text-slate-400">{f.dataAdmissao}</td>
                  <td className="p-3 font-bold text-white">R$ {f.salario.toLocaleString('pt-BR')}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded w-fit">
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      {f.certificados.length} Certificados / NR
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Employee */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Cadastrar Colaborador</h3>
              <button onClick={() => setShowModal(false)}><X className="h-4 w-4 text-slate-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nome Completo *</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">CPF *</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-mono focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Cargo / Função *</label>
                  <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-medium focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Salário Base (R$) *</label>
                  <input
                    type="number"
                    value={salarioBase}
                    onChange={(e) => setSalarioBase(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Data Admissão *</label>
                  <input
                    type="date"
                    value={dataAdmissao}
                    onChange={(e) => setDataAdmissao(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 p-2.5 bg-[#0F0F12] text-white font-semibold focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#C5A059] font-bold text-black hover:bg-[#b08d48]">Cadastrar Colaborador</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
