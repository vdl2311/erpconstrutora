'use client';

import React, { useState } from 'react';
import { ERPProvider, useERP } from '../context/ERPContext';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { GlobalSearchModal } from '../components/common/GlobalSearchModal';

// Modules
import { DashboardModule } from '../components/modules/DashboardModule';
import { ObrasModule } from '../components/modules/ObrasModule';
import { PainelObraModal } from '../components/modules/PainelObraModal';
import { DiarioObraModule } from '../components/modules/DiarioObraModule';
import { FinanceiroModule } from '../components/modules/FinanceiroModule';
import { OrcamentosModule } from '../components/modules/OrcamentosModule';
import { ComprasModule } from '../components/modules/ComprasModule';
import { EstoqueModule } from '../components/modules/EstoqueModule';
import { EquipamentosModule } from '../components/modules/EquipamentosModule';
import { PessoasModule } from '../components/modules/PessoasModule';
import { DocumentosModule } from '../components/modules/DocumentosModule';
import { RelatoriosModule } from '../components/modules/RelatoriosModule';
import { PermissoesModule } from '../components/modules/PermissoesModule';
import { ClientesFornecedoresModule } from '../components/modules/ClientesFornecedoresModule';
import { ParametrosModule } from '../components/modules/ParametrosModule';

function ERPAppContent() {
  const { activeModule, setActiveModule, hasPermission } = useERP();
  const [selectedObraId, setSelectedObraId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if current user has permission for active module
  const canAccess = hasPermission(activeModule, 'visualizar');

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col font-sans text-slate-300 antialiased selection:bg-[#C5A059] selection:text-black">
      {/* Top Bar Header */}
      <Header
        onOpenGlobalSearch={() => setIsSearchOpen(true)}
        onNavigateModule={(mod) => setActiveModule(mod)}
        onOpenQuickAdd={() => {}}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content View Container */}
        <main className="flex-1 overflow-y-auto">
          {!canAccess ? (
            <div className="p-8 max-w-md mx-auto my-12 text-center bg-[#16161A] rounded-2xl border border-slate-800 shadow-xl space-y-3">
              <div className="p-3 bg-red-950/50 text-red-400 border border-red-800/50 rounded-full w-fit mx-auto font-black">!</div>
              <h2 className="text-base font-bold text-white">Acesso Restrito ao Módulo</h2>
              <p className="text-xs text-slate-400">
                Seu perfil de usuário não possui permissão para visualizar o módulo <span className="font-bold uppercase text-amber-400">{activeModule}</span>.
              </p>
            </div>
          ) : (
            <>
              {activeModule === 'dashboard' && (
                <DashboardModule
                  onNavigateModule={(mod) => setActiveModule(mod)}
                  onOpenObraDetail={(id) => setSelectedObraId(id)}
                />
              )}

              {activeModule === 'obras' && (
                <ObrasModule
                  onOpenDetail={(id) => setSelectedObraId(id)}
                  onOpenQuickAdd={() => {}}
                />
              )}

              {activeModule === 'diario' && <DiarioObraModule />}

              {activeModule === 'financeiro' && <FinanceiroModule />}

              {activeModule === 'orcamentos' && <OrcamentosModule />}

              {activeModule === 'compras' && <ComprasModule />}

              {activeModule === 'estoque' && <EstoqueModule />}

              {activeModule === 'equipamentos' && <EquipamentosModule />}

              {activeModule === 'rh' && <PessoasModule />}

              {activeModule === 'documentos' && <DocumentosModule />}

              {activeModule === 'relatorios' && <RelatoriosModule />}

              {activeModule === 'permissoes' && <PermissoesModule />}

              {activeModule === 'crm' && <ClientesFornecedoresModule />}

              {activeModule === 'parametros' && <ParametrosModule />}
            </>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(mod) => {
          setIsSearchOpen(false);
          setActiveModule(mod);
        }}
        onSelectObra={(id) => {
          setIsSearchOpen(false);
          setSelectedObraId(id);
        }}
      />

      {/* Obra Full Detail Dashboard Modal */}
      {selectedObraId && (
        <PainelObraModal
          obraId={selectedObraId}
          onClose={() => setSelectedObraId(null)}
          onNavigateModule={(mod) => {
            setSelectedObraId(null);
            setActiveModule(mod);
          }}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <ERPProvider>
      <ERPAppContent />
    </ERPProvider>
  );
}
