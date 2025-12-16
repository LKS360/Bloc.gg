// src/app/loja/page.tsx

import Link from "next/link";

export default function LojaVipPage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-gray-100">
      {/* GLOW de fundo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-[#FF7A00] opacity-10 blur-3xl" />
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-[#1A73FF] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#FFD54A] opacity-5 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-20 pt-16">
        {/* HERO */}
        <section className="text-center mb-14">
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.35em] uppercase text-[#FF7A00]/80 mb-4">
            acessos exclusivos nos servidores bloc.gg
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Torne-se{" "}
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FFD54A] to-[#FF7A00] bg-clip-text text-transparent">
              VIP
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300 mb-6">
            Desbloqueie comandos <span className="font-mono text-[#FF7A00]">!ws</span>,{" "}
            <span className="font-mono text-[#FF7A00]">!knife</span>,{" "}
            <span className="font-mono text-[#FF7A00]">!gloves</span>, slot reservado e vantagens
            exclusivas nos servidores competitivos da{" "}
            <span className="text-[#FF7A00] font-semibold">Bloc.gg</span>.
          </p>

          <div className="inline-flex items-center gap-3 text-[11px] md:text-xs text-gray-400">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-black/40">
              💎 Acesso imediato após pagamento
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-black/40">
              ⚡ 128 tickrate • servidores dedicados
            </span>
          </div>
        </section>

        {/* PLANOS */}
        <section className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] mb-14">
          {/* PLANO VIP – destaque */}
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#FF7A00] via-[#FFD54A] to-[#FF7A00] opacity-70 blur-sm" />
            <div className="relative rounded-3xl bg-[#070910] border border-[#FF7A00]/40 px-7 py-7 md:px-10 md:py-9 shadow-[0_0_35px_rgba(0,0,0,0.9)]">
              <div className="flex justify-between items-center mb-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1F2A] px-3 py-1 text-[11px] font-semibold text-[#FFD54A] border border-[#FFD54A]/30">
                  <span className="text-xs">🔥</span> MAIS VENDIDO
                </span>
                <span className="text-[11px] text-gray-400">
                  Ideal pra quem quer jogar sério todo dia
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-2">VIP Mensal</h2>
              <p className="text-xs md:text-sm text-gray-400 mb-6">
                Plano completo com todos os benefícios para treinar e competir nos servidores
                Bloc.gg.
              </p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-extrabold text-[#FF7A00]">
                  R$ 24,90
                </span>
                <span className="text-xs text-gray-500 line-through">R$ 34,90</span>
                <span className="text-[11px] text-emerald-400 bg-emerald-900/40 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  -29% lançamento
                </span>
              </div>

              <ul className="space-y-2.5 mb-7 text-sm">
                <PlanItem>Comandos liberados: !ws, !knife, !gloves</PlanItem>
                <PlanItem>Slot reservado nos servidores VIP</PlanItem>
                <PlanItem>Tag VIP no chat e na comunidade</PlanItem>
                <PlanItem>Prioridade para entrar quando o servidor estiver cheio</PlanItem>
                <PlanItem>Ajuda direta no desenvolvimento do projeto</PlanItem>
              </ul>

              <Link
                href="/loja"
                className="group inline-flex w-full items-center justify-center rounded-full bg-[#FF7A00] px-6 py-3 text-sm md:text-base font-semibold text-black shadow-[0_0_30px_rgba(255,122,0,0.8)] hover:bg-[#ff9a26] transition"
              >
                Ativar VIP agora
                <span className="ml-2 text-xs transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <p className="mt-3 text-[11px] text-gray-400">
                Pagamento seguro. Ativação automática em poucos minutos após a confirmação.
              </p>
            </div>
          </div>

          {/* APOIAR O PROJETO */}
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#1A73FF] via-[#4F46E5] to-[#00E0FF] opacity-40 blur-sm" />
            <div className="relative rounded-3xl bg-[#050712] border border-[#1A73FF]/35 px-7 py-7 md:px-9 md:py-9 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1020] px-3 py-1 text-[11px] font-semibold text-[#8AB4FF] border border-[#8AB4FF]/40 mb-4">
                💙 Apoiar o Projeto
              </span>

              <h2 className="text-xl md:text-2xl font-bold mb-2">Apoiar o desenvolvimento</h2>
              <p className="text-xs md:text-sm text-gray-400 mb-6">
                Para quem curte o projeto e quer ajudar a manter os servidores sempre online,
                financiar novos modos e melhorias na Bloc.gg.
              </p>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl md:text-4xl font-extrabold text-[#8AB4FF]">
                  R$ 44,90
                </span>
                <span className="text-[11px] text-gray-400">contribuição única</span>
              </div>

              <ul className="space-y-2.5 mb-7 text-sm">
                <PlanItem color="blue">Todos os benefícios do plano VIP</PlanItem>
                <PlanItem color="blue">Ajuda direta na manutenção dos servidores</PlanItem>
                <PlanItem color="blue">Reconhecimento na comunidade Bloc.gg</PlanItem>
                <PlanItem color="blue">Prioridade em futuros testes e features</PlanItem>
              </ul>

              <button
                type="button"
                className="group inline-flex w-full items-center justify-center rounded-full border border-[#8AB4FF]/70 bg-[#0B1020] px-6 py-3 text-sm md:text-base font-semibold text-[#E0EAFF] hover:bg-[#121932] transition"
              >
                Apoiar o desenvolvimento
                <span className="ml-2 text-xs transition-transform group-hover:translate-x-1">
                  ♥
                </span>
              </button>

              <p className="mt-3 text-[11px] text-gray-400">
                Esse valor ajuda a manter infraestrutura, proteção DDoS e novos modos de jogo.
              </p>
            </div>
          </div>
        </section>

        {/* COMPARAÇÃO FREE x VIP */}
        <section className="mb-14">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg md:text-xl font-semibold">
              Compare <span className="text-[#FF7A00]">Gratuito vs VIP</span>
            </h2>
            <span className="text-[11px] text-gray-400">
              Veja o que muda ao ativar o plano VIP nos servidores.
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#05060A]/80">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left">Recurso</th>
                  <th className="px-4 py-3 text-center">Plano Gratuito</th>
                  <th className="px-4 py-3 text-center bg-gradient-to-r from-[#FF7A00]/10 to-[#FF7A00]/0">
                    VIP Bloc.gg
                  </th>
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Acesso a comandos !ws, !knife, !gloves" free={false} vip />
                <CompareRow label="Slot reservado" free={false} vip />
                <CompareRow label="Tag VIP no chat / Discord" free={false} vip />
                <CompareRow label="Prioridade ao entrar no servidor" free={false} vip />
                <CompareRow label="Participação em ações e eventos especiais" free={false} vip />
                <CompareRow label="Acesso padrão aos servidores" free vip />
              </tbody>
            </table>
          </div>
        </section>

        {/* GARANTIA + COMO FUNCIONA */}
        <section className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-white/10 bg-[#05060A]/90 px-6 py-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="text-lg">🛡️</span> Segurança e transparência
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-300">
              <li>• Pagamento processado por plataforma segura.</li>
              <li>• Ativação automática do plano após confirmação.</li>
              <li>• Suporte da staff da Bloc.gg em caso de qualquer problema.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05060A]/90 px-6 py-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="text-lg">⚙️</span> Como funciona na prática
            </h3>
            <ol className="space-y-2 text-xs md:text-sm text-gray-300">
              <li>1. Clique em <span className="font-semibold text-[#FF7A00]">“Ativar VIP agora”</span>.</li>
              <li>2. Finalize o pagamento na plataforma configurada.</li>
              <li>3. Entre nos servidores Bloc.gg com sua Steam logada e aproveite.</li>
            </ol>
          </div>
        </section>

        {/* CALL FINAL */}
        <section className="text-center">
          <p className="text-sm md:text-base text-gray-300 mb-4">
            Pronto pra subir de nível nos treinos e partidas?
          </p>
          <Link
            href="/servidores"
            className="inline-flex items-center justify-center rounded-full border border-[#FF7A00]/70 bg-transparent px-6 py-2.5 text-xs md:text-sm font-semibold text-[#FF7A00] hover:bg-[#FF7A00] hover:text-black transition"
          >
            Ver servidores disponíveis antes de ativar
          </Link>
        </section>
      </main>
    </div>
  );
}

/* ---------------------- COMPONENTES AUXILIARES ---------------------- */

function PlanItem({
  children,
  color = "orange",
}: {
  children: React.ReactNode;
  color?: "orange" | "blue";
}) {
  const bullet =
    color === "orange" ? (
      <span className="mr-2 text-[#FFB74D]">✔</span>
    ) : (
      <span className="mr-2 text-[#8AB4FF]">✔</span>
    );

  return (
    <li className="flex items-start text-gray-200">
      {bullet}
      <span className="text-xs md:text-sm">{children}</span>
    </li>
  );
}

function CompareRow({
  label,
  free,
  vip,
}: {
  label: string;
  free: boolean;
  vip: boolean;
}) {
  return (
    <tr className="border-t border-white/[0.04]">
      <td className="px-4 py-3 text-xs md:text-sm text-gray-200">{label}</td>
      <td className="px-4 py-3 text-center text-lg">
        {free ? <span className="text-emerald-400">✔</span> : <span className="text-red-500">✕</span>}
      </td>
      <td className="px-4 py-3 text-center text-lg bg-white/[0.01]">
        {vip ? <span className="text-[#FFB74D]">✔</span> : <span className="text-red-500">✕</span>}
      </td>
    </tr>
  );
}
