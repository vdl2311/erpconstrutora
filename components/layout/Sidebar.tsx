'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  LayoutDashboard,
  HardHat,
  FileSpreadsheet,
  Calculator,
  DollarSign,
  ShoppingCart,
  Boxes,
  Truck,
  Users,
  Building,
  FolderKanban,
  BarChart3,
  BellRing,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  X,
  SlidersHorizontal,
  Check
} from 'lucide-react';

interface SidebarProps {
  activeModule?: string;
  onSelectModule?: (moduleKey: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { activeModule: ctxModule, setActiveModule, hasPermission, notificacoes, solicitacoesCompra, contasPagar } = useERP();
  const activeModule = props.activeModule ?? ctxModule;
  const onSelectModule = props.onSelectModule ?? setActiveModule;
  const isOpen = props.isOpen;
  const onClose = props.onClose;

  // MVP view mode state - defaults to true for clean MVP presentation
  const [showOnlyMvp, setShowOnlyMvp] = useState(true);

  const unreadAlerts = notificacoes.filter(n => !n.lida).length;
  const pendingPurchases = solicitacoesCompra.filter(s => s.status === 'solicitada' || s.status === 'aguardando_aprovacao').length;
  const overdueBills = contasPagar.filter(c => c.status === 'vencido').length;

  const mvpMenuSections: MenuSection[] = [
    {
      title: 'PRINCIPAL',
      items: [
        { key: 'dashboard', label: 'Dashboard Executivo', icon: LayoutDashboard }
      ]
    },
    {
      title: 'OBRAS & CAMPO',
      items: [
        { key: 'obras', label: 'Gestão de Obras', icon: HardHat },
        { key: 'diario', label: 'Diário de Obra', icon: FileSpreadsheet }
      ]
    },
    {
      title: 'FINANCEIRO & COMPRAS',
      items: [
        {
          key: 'financeiro',
          label: 'Contas & Fluxo de Caixa',
          icon: DollarSign,
          badge: overdueBills > 0 ? `${overdueBills} vencidas` : undefined,
          badgeColor: 'bg-red-500'
        },
        {
          key: 'compras',
          label: 'Compras & Cotações',
          icon: ShoppingCart,
          badge: pendingPurchases > 0 ? `${pendingPurchases} pend.` : undefined,
          badgeColor: 'bg-amber-500'
        }
      ]
    },
    {
      title: 'ANÁLISE',
      items: [
        { key: 'relatorios', label: 'Relatórios Gerenciais', icon: BarChart3 }
      ]
    }
  ];

  const fullMenuSections: MenuSection[] = [
    {
      title: 'VISÃO GERAL',
      items: [
        { key: 'dashboard', label: 'Dashboard Executivo', icon: LayoutDashboard }
      ]
    },
    {
      title: 'ENGENHARIA & OBRAS',
      items: [
        { key: 'obras', label: 'Gestão de Obras', icon: HardHat },
        { key: 'diario', label: 'Diário de Obra', icon: FileSpreadsheet },
        { key: 'orcamentos', label: 'Orçamentos & BDI', icon: Calculator }
      ]
    },
    {
      title: 'FINANCEIRO',
      items: [
        {
          key: 'financeiro',
          label: 'Contas & Fluxo de Caixa',
          icon: DollarSign,
          badge: overdueBills > 0 ? `${overdueBills} vencidas` : undefined,
          badgeColor: 'bg-red-500'
        }
      ]
    },
    {
      title: 'SUPRIMENTOS & MAQUINÁRIO',
      items: [
        {
          key: 'compras',
          label: 'Compras & Cotações',
          icon: ShoppingCart,
          badge: pendingPurchases > 0 ? `${pendingPurchases} pend.` : undefined,
          badgeColor: 'bg-amber-500'
        },
        { key: 'estoque', label: 'Estoque & Almoxarifado', icon: Boxes },
        { key: 'equipamentos', label: 'Frota & Equipamentos', icon: Truck }
      ]
    },
    {
      title: 'PESSOAS & CLIENTES',
      items: [
        { key: 'rh', label: 'RH & Equipes de Campo', icon: Users },
        { key: 'crm', label: 'Clientes & Contratos', icon: Building }
      ]
    },
    {
      title: 'GOVERNANÇA',
      items: [
        { key: 'documentos', label: 'Repositório Documental', icon: FolderKanban },
        { key: 'relatorios', label: 'Relatórios Gerenciais', icon: BarChart3 },
        {
          key: 'notificacoes',
          label: 'Central de Notificações',
          icon: BellRing,
          badge: unreadAlerts > 0 ? `${unreadAlerts}` : undefined,
          badgeColor: 'bg-red-600'
        },
        { key: 'permissoes', label: 'Permissões & Auditoria', icon: ShieldCheck }
      ]
    }
  ];

  const menuSections = showOnlyMvp ? mvpMenuSections : fullMenuSections;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-800 bg-[#0F0F12] text-slate-300 flex flex-col justify-between h-screen lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto select-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-4 px-3 space-y-6">
          {/* Mobile Close Header */}
          <div className="flex items-center justify-between px-3 lg:hidden border-b border-slate-800/60 pb-3">
            <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Navegação</span>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Fechar Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h2 className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {section.title}
              </h2>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.key;
                  const canView = hasPermission(item.key, 'visualizar');

                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        onSelectModule(item.key);
                        onClose?.();
                      }}
                      className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#C5A059] text-black font-semibold shadow-md'
                          : canView
                          ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          : 'text-slate-600 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-black' : 'text-slate-400 group-hover:text-[#C5A059]'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.badge && (
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${isActive ? 'bg-black text-white' : 'text-white ' + (item.badgeColor || 'bg-slate-700')}`}>
                            {item.badge}
                          </span>
                        )}
                        {!canView && (
                          <span className="text-[9px] text-slate-600 bg-slate-800/80 px-1.5 py-0.5 rounded">
                            restrito
                          </span>
                        )}
                        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isActive ? 'rotate-90 text-black' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {/* MVP Toggle Button */}
          <div className="pt-2 px-1">
            <button
              onClick={() => setShowOnlyMvp(!showOnlyMvp)}
              className="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-800 bg-[#16161A] text-slate-400 hover:text-slate-200 hover:border-slate-700 text-[11px] font-medium transition-all"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>{showOnlyMvp ? 'Visão MVP (6 Módulos)' : 'Visão Completa (13 Módulos)'}</span>
              </div>
              <span className="text-[10px] font-bold text-[#C5A059] underline">
                {showOnlyMvp ? '+ Expandir' : 'Recolher'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="p-3 border-t border-slate-800 bg-[#16161A] m-2 rounded-xl">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2 text-[#C5A059]">
              <Sparkles className="h-4 w-4" />
              <span>ObraMaster MVP</span>
            </div>
            <span className="text-[9px] font-mono bg-[#C5A059]/10 text-[#C5A059] px-1.5 py-0.5 rounded border border-[#C5A059]/20">
              v1.0.0
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Sistema ERP de Engenharia & Construção
          </p>
        </div>
      </aside>
    </>
  );
};
