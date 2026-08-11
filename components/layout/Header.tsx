'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { UserRole } from '../../lib/types';
import {
  Building2,
  Search,
  Bell,
  PlusCircle,
  ShieldCheck,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HardHat,
  DollarSign,
  ShoppingCart,
  Layers,
  FileText,
  Menu
} from 'lucide-react';

interface HeaderProps {
  onOpenGlobalSearch?: () => void;
  onNavigateModule?: (moduleKey: string) => void;
  onOpenQuickAdd?: (modalType: string) => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGlobalSearch = () => {},
  onNavigateModule = () => {},
  onOpenQuickAdd = () => {},
  onToggleSidebar = () => {}
}) => {
  const {
    currentUser,
    setCurrentRole,
    obras,
    activeObraFilter,
    setActiveObraFilter,
    activeCompany,
    setActiveCompany,
    notificacoes,
    markNotificacaoAsRead,
    clearAllNotificacoes,
    resetToDefaultData
  } = useERP();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showQuickAddDropdown, setShowQuickAddDropdown] = useState(false);

  const unreadNotifs = notificacoes.filter(n => !n.lida);

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'administrador', label: 'Administrador Geral' },
    { role: 'gerente_obras', label: 'Gerente de Obras' },
    { role: 'engenheiro', label: 'Engenheiro Residente' },
    { role: 'mestre_obras', label: 'Mestre de Obras' },
    { role: 'financeiro', label: 'Gestor Financeiro' },
    { role: 'compras', label: 'Comprador / Suprimentos' },
    { role: 'almoxarifado', label: 'Almoxarife' },
    { role: 'rh', label: 'Gestor de RH' },
    { role: 'operacional', label: 'Operacional' }
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-[#0F0F12]/95 px-4 backdrop-blur md:px-6">
      {/* Left: Brand & Context Selectors */}
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg lg:hidden shrink-0"
          title="Abrir Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/10">
            <HardHat className="h-6 w-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold tracking-tight text-white leading-none">
              ObraMaster <span className="text-[#C5A059]">ERP</span>
            </h1>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Gestão Integrada de Construção
            </p>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 hidden md:block" />

        {/* Active Company Selector */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/50 px-2.5 py-1.5 rounded-lg border border-slate-700">
          <Building2 className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={activeCompany}
            onChange={(e) => setActiveCompany(e.target.value)}
            className="bg-transparent font-semibold text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ObraMaster Construtora S.A." className="bg-[#16161A] text-white">ObraMaster Construtora S.A.</option>
            <option value="Horizon Engenharia & Obras Ltda" className="bg-[#16161A] text-white">Horizon Engenharia & Obras Ltda</option>
            <option value="Vanguardia Infraestrutura" className="bg-[#16161A] text-white">Vanguardia Infraestrutura</option>
          </select>
        </div>

        {/* Obra Filter Dropdown */}
        <div className="flex items-center gap-1.5 text-xs text-[#C5A059] bg-[#C5A059]/10 px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
          <Layers className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
          <span className="hidden sm:inline font-medium text-slate-300">Obra:</span>
          <select
            value={activeObraFilter}
            onChange={(e) => setActiveObraFilter(e.target.value)}
            className="bg-transparent font-bold text-[#C5A059] focus:outline-none cursor-pointer max-w-[140px] sm:max-w-[200px] truncate"
          >
            <option value="todas" className="bg-[#16161A] text-white">Todas as Obras ({obras.length})</option>
            {obras.map(o => (
              <option key={o.id} value={o.id} className="bg-[#16161A] text-white">
                {o.codigo} - {o.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center/Right: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Global Search Button */}
        <button
          onClick={onOpenGlobalSearch}
          className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#16161A] px-3 py-1.5 text-xs font-medium text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
          title="Buscar no ERP (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden md:inline">Pesquisar tudo...</span>
          <kbd className="hidden md:inline-block rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-500 font-mono">
            Ctrl+K
          </kbd>
        </button>

        {/* Quick Add Button */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAddDropdown(!showQuickAddDropdown)}
            className="flex items-center gap-1.5 rounded-lg bg-[#C5A059] px-3 py-1.5 text-xs font-semibold text-black shadow-md hover:bg-[#b08d48] transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Criar</span>
            <ChevronDown className="h-3 w-3 opacity-80" />
          </button>

          {showQuickAddDropdown && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-800 bg-[#16161A] p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1 text-[11px] font-semibold uppercase text-slate-500">Atalhos Rápidos</div>
              <button
                onClick={() => { setShowQuickAddDropdown(false); onOpenQuickAdd('obra'); }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <HardHat className="h-4 w-4 text-[#C5A059]" />
                Nova Obra
              </button>
              <button
                onClick={() => { setShowQuickAddDropdown(false); onOpenQuickAdd('diario'); }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <FileText className="h-4 w-4 text-blue-400" />
                Novo Diário de Obra
              </button>
              <button
                onClick={() => { setShowQuickAddDropdown(false); onOpenQuickAdd('contaPagar'); }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <DollarSign className="h-4 w-4 text-emerald-400" />
                Nova Conta a Pagar
              </button>
              <button
                onClick={() => { setShowQuickAddDropdown(false); onOpenQuickAdd('solicitacaoCompra'); }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <ShoppingCart className="h-4 w-4 text-purple-400" />
                Solicitação de Compra
              </button>
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Central de Notificações"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A059] text-[10px] font-bold text-black ring-2 ring-[#0F0F12]">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-800 bg-[#16161A] shadow-2xl z-50 p-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">Notificações e Alertas</h3>
                  <span className="rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 px-2 py-0.5 text-[10px] font-bold text-[#C5A059]">
                    {unreadNotifs.length} novas
                  </span>
                </div>
                {notificacoes.length > 0 && (
                  <button
                    onClick={clearAllNotificacoes}
                    className="text-[11px] font-medium text-slate-500 hover:text-slate-300"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 my-1">
                {notificacoes.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    Nenhuma notificação no momento.
                  </div>
                ) : (
                  notificacoes.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificacaoAsRead(notif.id);
                        if (notif.linkModulo) onNavigateModule(notif.linkModulo);
                        setShowNotifications(false);
                      }}
                      className={`p-2.5 rounded-lg transition-colors cursor-pointer hover:bg-slate-800/50 ${
                        !notif.lida ? 'bg-[#C5A059]/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notif.tipo === 'urgente' ? (
                          <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                        ) : notif.tipo === 'alerta' ? (
                          <Clock className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white">{notif.titulo}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{notif.mensagem}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">{notif.data}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigateModule('notificacoes');
                  }}
                  className="text-xs font-semibold text-[#C5A059] hover:underline"
                >
                  Ver Central Completa de Alertas →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (confirm('Deseja restaurar todos os dados do ERP para o estado original de demonstração?')) {
              resetToDefaultData();
            }
          }}
          className="hidden lg:flex items-center gap-1.5 p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg text-xs font-medium"
          title="Restaurar Dados de Demonstração"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* User Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#16161A] p-1.5 pl-2 hover:bg-slate-800 transition-colors"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-slate-700"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0F0F12]" />
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </p>
              <p className="text-[10px] font-semibold text-[#C5A059] leading-tight">
                {currentUser.department}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-800 bg-[#16161A] p-2 shadow-2xl z-50">
              <div className="p-2 border-b border-slate-800 mb-1">
                <p className="text-xs font-bold text-white">{currentUser.name}</p>
                <p className="text-[11px] text-slate-400">{currentUser.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#C5A059]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Perfil Atual: {currentUser.department}
                </div>
              </div>

              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Simular Perfil de Acesso
              </div>

              <div className="max-h-60 overflow-y-auto space-y-0.5">
                {rolesList.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setCurrentRole(r.role);
                      setShowUserDropdown(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      currentUser.role === r.role
                        ? 'bg-[#C5A059]/20 text-[#C5A059] font-bold border border-[#C5A059]/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{r.label}</span>
                    {currentUser.role === r.role && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
