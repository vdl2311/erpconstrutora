'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { UserRole, RolePermissions } from '../../lib/types';
import { ShieldCheck, Lock, Users, Check, X, ShieldAlert } from 'lucide-react';

export const PermissoesModule: React.FC = () => {
  const { rolesPermissions, updateRolePermission, currentUser } = useERP();
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'administrador', label: 'Administrador ERP', desc: 'Acesso total a todos os módulos e parâmetros do sistema' },
    { role: 'diretor', label: 'Diretor / Sócio', desc: 'Visão estratégica, dashboards financeiros e aprovações de alto valor' },
    { role: 'gerente_obras', label: 'Gerente de Obras', desc: 'Gestão operacional de canteiros, cronogramas e orçamentos' },
    { role: 'engenheiro', label: 'Engenheiro Residente', desc: 'Diários de obra, medições, requisição de insumos e avanço físico' },
    { role: 'mestre_obras', label: 'Mestre de Obras', desc: 'Registro de campo, presença de equipe e ocorrências diárias' },
    { role: 'financeiro', label: 'Gestor Financeiro', desc: 'Contas a pagar, receber, fluxo de caixa e relatórios fiscais' },
    { role: 'compras', label: 'Comprador / Suprimentos', desc: 'Cotações de fornecedores, matriz de comparação e ordens de compra' },
    { role: 'almoxarifado', label: 'Almoxarife / Estoque', desc: 'Controle de entradas, saídas, ferramentas e nível de estoque' },
    { role: 'rh', label: 'Recursos Humanos', desc: 'Gestão de funcionários, documentos trabalhistas e alocações' }
  ];

  const modulesList = [
    { key: 'dashboard', label: 'Dashboard Gerencial' },
    { key: 'obras', label: 'Gestão de Obras' },
    { key: 'diario', label: 'Diário de Obra (RDO)' },
    { key: 'financeiro', label: 'Financeiro & Caixa' },
    { key: 'orcamentos', label: 'Orçamentos (SINAPI/BDI)' },
    { key: 'compras', label: 'Compras & Cotações' },
    { key: 'estoque', label: 'Estoque & Almoxarifado' },
    { key: 'equipamentos', label: 'Equipamentos & Frota' },
    { key: 'pessoas', label: 'Pessoas & RH' },
    { key: 'documentos', label: 'Documentos & Projetos' },
    { key: 'relatorios', label: 'Relatórios & Auditoria' },
    { key: 'permissoes', label: 'Gestão de Permissões' },
    { key: 'clientes', label: 'CRM Clientes & Fornecedores' },
    { key: 'parametros', label: 'Configurações do Sistema' },
  ];

  const currentRolePerms = rolesPermissions.find(p => p.role === selectedRole);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <Lock className="h-6 w-6 text-[#C5A059]" />
            Matriz de Permissões & Níveis de Acesso
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configuração granular de direitos por perfil (Visualizar, Criar, Editar, Excluir, Aprovar, Exportar).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">Selecione o Perfil</h3>
          <div className="space-y-1.5">
            {rolesList.map(r => (
              <button
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                  selectedRole === r.role
                    ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md font-bold'
                    : 'bg-[#16161A] text-slate-300 border-slate-800 hover:bg-[#0F0F12]'
                }`}
              >
                <p className="font-bold">{r.label}</p>
                <p className={`text-[10px] mt-0.5 ${selectedRole === r.role ? 'text-black/80' : 'text-slate-500'}`}>
                  {r.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Grid Matrix */}
        <div className="md:col-span-2 bg-[#16161A] p-5 rounded-xl border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white">
                Permissões para: <span className="text-[#C5A059] font-serif italic">{rolesList.find(r => r.role === selectedRole)?.label}</span>
              </h3>
              <p className="text-xs text-slate-400">Marque ou desmarque para atualizar os privilégios no ERP</p>
            </div>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden text-xs bg-[#0F0F12]">
            {modulesList.map(m => {
              const perm = currentRolePerms?.modules[m.key] || {
                visualizar: false,
                criar: false,
                editar: false,
                excluir: false,
                aprovar: false,
                exportar: false,
                configuracoes: false
              };
              return (
                <div key={m.key} className="p-3.5 hover:bg-[#16161A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                  <div>
                    <span className="font-bold text-white block">{m.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">key: {m.key}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={perm.visualizar}
                        onChange={(e) => updateRolePermission(selectedRole, m.key, 'visualizar', e.target.checked)}
                        className="accent-[#C5A059] rounded"
                      />
                      <span className="text-[11px] font-semibold text-slate-300">Ver</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={perm.criar}
                        onChange={(e) => updateRolePermission(selectedRole, m.key, 'criar', e.target.checked)}
                        className="accent-[#C5A059] rounded"
                      />
                      <span className="text-[11px] font-semibold text-slate-300">Criar</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={perm.editar}
                        onChange={(e) => updateRolePermission(selectedRole, m.key, 'editar', e.target.checked)}
                        className="accent-[#C5A059] rounded"
                      />
                      <span className="text-[11px] font-semibold text-slate-300">Editar</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={perm.excluir}
                        onChange={(e) => updateRolePermission(selectedRole, m.key, 'excluir', e.target.checked)}
                        className="accent-[#C5A059] rounded"
                      />
                      <span className="text-[11px] font-semibold text-slate-300">Excluir</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={perm.aprovar}
                        onChange={(e) => updateRolePermission(selectedRole, m.key, 'aprovar', e.target.checked)}
                        className="accent-[#C5A059] rounded"
                      />
                      <span className="text-[11px] font-semibold text-slate-300">Aprovar</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
