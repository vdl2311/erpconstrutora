'use client';

import React from 'react';
import { useERP } from '../../context/ERPContext';
import {
  HardHat,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Boxes,
  Truck,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Building
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardModuleProps {
  onNavigate?: (moduleKey: string) => void;
  onNavigateModule?: (moduleKey: string) => void;
  onOpenObraDetail: (obraId: string) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = (props) => {
  const onNavigate = props.onNavigate || props.onNavigateModule || (() => {});
  const { onOpenObraDetail } = props;
  const {
    obras,
    contasPagar,
    contasReceber,
    solicitacoesCompra,
    materiais,
    equipamentos,
    funcionarios,
    activeObraFilter
  } = useERP();

  // Filter obras if specific obra filter selected
  const filteredObras = activeObraFilter === 'todas'
    ? obras
    : obras.filter(o => o.id === activeObraFilter);

  // Metrics
  const totalContratado = filteredObras.reduce((acc, o) => acc + o.valorContratado, 0);
  const totalOrcado = filteredObras.reduce((acc, o) => acc + o.orcamentoTotal, 0);
  const totalCustosRealizados = filteredObras.reduce((acc, o) => acc + o.custoRealizadoTotal, 0);

  const emAndamento = filteredObras.filter(o => o.status === 'em_andamento').length;
  const concluidas = filteredObras.filter(o => o.status === 'concluida').length;
  const atrasadas = filteredObras.filter(o => o.status === 'atrasada').length;

  const totalPagar = contasPagar.reduce((acc, c) => acc + (c.status === 'pendente' || c.status === 'vencido' ? c.valor : 0), 0);
  const totalReceber = contasReceber.reduce((acc, c) => acc + (c.status === 'pendente' || c.status === 'vencido' ? c.valor : 0), 0);
  const totalRecebido = contasReceber.reduce((acc, c) => acc + (c.status === 'recebido' ? c.valor : 0), 0);
  const fluxoCaixaSaldo = totalRecebido - contasPagar.reduce((acc, c) => acc + (c.status === 'pago' ? c.valor : 0), 0);

  const comprasPendentes = solicitacoesCompra.filter(s => s.status === 'solicitada' || s.status === 'aguardando_aprovacao').length;
  const materiaisAlerta = materiais.filter(m => m.estoqueAtual <= m.estoqueMinimo).length;
  const equipamentosEmUso = equipamentos.filter(e => e.status === 'operacional' || e.status === 'alocado').length;
  const funcionariosAtivos = funcionarios.filter(f => f.status === 'ativo').length;

  // Chart 1 Data: Budget x Realized per Obra
  const chartOrcadoRealizado = filteredObras.map(o => ({
    nome: o.nome.length > 15 ? o.nome.substring(0, 15) + '...' : o.nome,
    Orçado: Math.round(o.orcamentoTotal / 1000000 * 10) / 10,
    Realizado: Math.round(o.custoRealizadoTotal / 1000000 * 10) / 10
  }));

  // Chart 2 Data: Monthly Cashflow Forecast
  const cashflowData = [
    { mes: 'Mai', Entradas: 2.1, Saídas: 1.4, Saldo: 0.7 },
    { mes: 'Jun', Entradas: 3.4, Saídas: 2.1, Saldo: 1.3 },
    { mes: 'Jul', Entradas: 2.8, Saídas: 1.9, Saldo: 0.9 },
    { mes: 'Ago (Atual)', Entradas: Math.round(totalReceber / 1000000 * 10) / 10, Saídas: Math.round(totalPagar / 1000000 * 10) / 10, Saldo: Math.round((totalReceber - totalPagar) / 1000000 * 10) / 10 },
    { mes: 'Set', Entradas: 3.8, Saídas: 2.4, Saldo: 1.4 },
    { mes: 'Out', Entradas: 4.2, Saídas: 2.9, Saldo: 1.3 }
  ];

  // Chart 3 Data: Obras Status Pie
  const pieStatusData = [
    { name: 'Em Andamento', value: emAndamento, color: '#C5A059' },
    { name: 'Concluídas', value: concluidas, color: '#10b981' },
    { name: 'Atrasadas', value: atrasadas, color: '#f43f5e' }
  ].filter(d => d.value > 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-300">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F0F12] border border-slate-800 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#C5A059]/10 px-3 py-1 text-xs font-semibold text-[#C5A059] border border-[#C5A059]/30 mb-2">
            <Building className="h-3.5 w-3.5" />
            Painel de Controle Executivo • Construtora
          </div>
          <h1 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight">
            Visão Geral Executiva
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Resumo em tempo real de obras, financeiro, compras, insumos e cronogramas.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('obras')}
            className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black shadow-md hover:bg-[#b08d48] transition-colors"
          >
            <HardHat className="h-4 w-4" />
            Gerenciar Obras
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Obras Ativas */}
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Obras em Andamento</span>
            <HardHat className="h-4 w-4 text-[#C5A059]" />
          </div>
          <p className="text-2xl font-light text-white mt-2">{emAndamento}</p>
          <p className="text-[10px] font-medium text-slate-400 mt-1">
            {atrasadas > 0 ? `${atrasadas} com alerta` : 'No cronograma'}
          </p>
        </div>

        {/* Valor Contratado */}
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Contratado</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-lg sm:text-xl font-light text-white mt-2">
            R$ {(totalContratado / 1000000).toFixed(1)}M
          </p>
          <p className="text-[10px] font-medium text-emerald-400 flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="h-3 w-3" />
            Em contratos
          </p>
        </div>

        {/* Contas a Pagar */}
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Contas a Pagar</span>
            <TrendingUp className="h-4 w-4 text-rose-400" />
          </div>
          <p className="text-lg sm:text-xl font-light text-white mt-2">
            R$ {(totalPagar / 1000).toFixed(0)}k
          </p>
          <p className="text-[10px] font-medium text-slate-400 mt-1">Pendente</p>
        </div>

        {/* Contas a Receber */}
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Contas a Receber</span>
            <DollarSign className="h-4 w-4 text-sky-400" />
          </div>
          <p className="text-lg sm:text-xl font-light text-white mt-2">
            R$ {(totalReceber / 1000000).toFixed(2)}M
          </p>
          <p className="text-[10px] font-medium text-slate-400 mt-1">Medições</p>
        </div>

        {/* Insumos em Alerta */}
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Estoque Crítico</span>
            <Boxes className="h-4 w-4 text-[#C5A059]" />
          </div>
          <p className="text-2xl font-light text-white mt-2">{materiaisAlerta}</p>
          <p className="text-[10px] font-medium text-[#C5A059] mt-1">Abaixo do mínimo</p>
        </div>

        {/* Equipes Ativas */}
        <div className="bg-[#16161A] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Equipes em Campo</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-light text-white mt-2">{funcionariosAtivos}</p>
          <p className="text-[10px] font-medium text-slate-400 mt-1">Ativos</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget x Realized Chart (2 cols) */}
        <div className="lg:col-span-2 bg-[#16161A] p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">Custos das Obras: Orçado x Realizado</h3>
              <p className="text-xs text-slate-500">Comparativo financeiro em milhões de reais (R$ Mi)</p>
            </div>
            <button onClick={() => onNavigate('orcamentos')} className="text-xs font-semibold text-[#C5A059] hover:underline">
              Ver Detalhes →
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartOrcadoRealizado} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="nome" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  formatter={(val: any) => [`R$ ${val}M`, '']}
                  contentStyle={{ backgroundColor: '#0F0F12', borderColor: '#27272a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                <Bar dataKey="Orçado" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Realizado" fill="#C5A059" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Obras Status Distribution */}
        <div className="bg-[#16161A] p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-1">Status do Portfólio</h3>
            <p className="text-xs text-slate-500 mb-4">Distribuição atual das obras ativas</p>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0F0F12', borderColor: '#27272a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            {pieStatusData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="text-white">{d.value} obras</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cashflow Chart */}
      <div className="bg-[#16161A] p-5 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Projeção de Fluxo de Caixa</h3>
            <p className="text-xs text-slate-500">Entradas x Saídas consolidadas nos últimos e próximos meses (R$ Mi)</p>
          </div>
          <button onClick={() => onNavigate('financeiro')} className="text-xs font-semibold text-emerald-400 hover:underline">
            Ir ao Financeiro →
          </button>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashflowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                formatter={(val: any) => [`R$ ${val}M`, '']}
                contentStyle={{ backgroundColor: '#0F0F12', borderColor: '#27272a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              <Line type="monotone" dataKey="Entradas" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Saídas" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Saldo" stroke="#C5A059" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Obras Quick Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white tracking-wide">Obras em Destaque</h3>
          <button onClick={() => onNavigate('obras')} className="text-xs font-semibold text-[#C5A059] hover:underline">
            Ver Todas ({obras.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredObras.slice(0, 3).map(o => (
            <div
              key={o.id}
              onClick={() => onOpenObraDetail(o.id)}
              className="bg-[#16161A] rounded-xl border border-slate-800 p-4 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3 bg-slate-900">
                <img src={o.fotoUrl} alt={o.nome} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                <span className={`absolute top-2 right-2 rounded px-2 py-0.5 text-[10px] font-bold border ${
                  o.status === 'em_andamento'
                    ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800/50'
                    : o.status === 'atrasada'
                    ? 'bg-rose-900/40 text-rose-400 border-rose-800/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {o.status === 'em_andamento' ? 'EM DIA' : o.status === 'atrasada' ? 'ATRASADO' : 'CONCLUÍDO'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span className="truncate">{o.nome}</span>
                <span className="text-[#C5A059] shrink-0">{o.percentualConcluido}%</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">{o.codigo} • {o.cidade}/{o.estado}</p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${o.status === 'atrasada' ? 'bg-rose-500' : 'bg-[#C5A059]'}`}
                  style={{ width: `${o.percentualConcluido}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-3 border-t border-slate-800/80">
                <span>R$ {(o.custoRealizadoTotal / 1000000).toFixed(1)}M <span className="text-slate-600">/ R$ {(o.orcamentoTotal / 1000000).toFixed(1)}M</span></span>
                <span className="text-slate-300">Eng. {o.engenheiroNome.split(' ')[1] || o.engenheiroNome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
