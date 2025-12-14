"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    vip_active: 0,
    servers: 0,
    revenue_30d: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: "Usuários",
      value: stats.users,
      sub: "Total de contas conectadas via Steam",
    },
    {
      title: "VIP ativos",
      value: stats.vip_active,
      sub: "Jogadores com planos VIP válidos",
    },
    {
      title: "Servidores",
      value: stats.servers,
      sub: "Servidores conectados à plataforma",
    },
    {
      title: "Receita (30 dias)",
      value: `R$ ${stats.revenue_30d}`,
      sub: "Entradas estimadas via planos VIP",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Título / descrição */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Visão geral</h2>
          <p className="text-sm text-gray-400">
            Aqui você acompanha os principais números da Bloc.gg e, em breve,
            controla tudo em tempo real.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
          <span className="px-2.5 py-1 rounded-full border border-white/10">
            Roadmap: painel em construção
          </span>
          <span className="px-2.5 py-1 rounded-full border border-[#FF7A00]/30 text-[#FF7A00]">
            Fase: MVP administrativo
          </span>
        </div>
      </div>

      {/* Cards de métrica */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="rounded-2xl border border-white/10 bg-[#07090F] px-4 py-4 shadow-[0_0_20px_rgba(0,0,0,0.55)]"
          >
            <p className="text-xs text-gray-400 mb-1">{card.title}</p>
            <p className="text-xl font-semibold mb-1">{card.value}</p>
            <p className="text-[11px] text-gray-500">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Seções futuras */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 grid gap-4 md:grid-cols-[1.6fr,1fr]"
      >
        <div className="rounded-2xl border border-white/10 bg-[#07090F] p-4">
          <h3 className="text-sm font-semibold mb-2">
            Próximos passos do painel
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5">
            <li>• Conectar contagem real de usuários e VIPs.</li>
            <li>• Listar usuários com busca, filtros e ações.</li>
            <li>• Integrar dados dos servidores (status, players, mapas).</li>
            <li>• Exibir logs básicos de acesso e ações administrativas.</li>
            <li>• Configurar permissões avançadas por tipo de admin.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#FF7A00]/30 bg-[#100A05] p-4">
          <h3 className="text-sm font-semibold text-[#FF7A00] mb-2">
            Status do projeto
          </h3>
          <p className="text-xs text-gray-200 mb-2">
            O painel admin da <span className="font-semibold">Bloc.gg</span>{" "}
            está na fase inicial. A estrutura visual e de rotas já está pronta.
          </p>
          <p className="text-[11px] text-gray-400">
            Na próxima etapa, podemos conectar esse painel ao banco de dados
            (Supabase / PostgreSQL) para trazer números reais, editar usuários,
            controlar VIPs e ler dados dos servidores.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
