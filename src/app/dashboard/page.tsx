"use client";

import Image from "next/image";
import Link from "next/link";
import useUser from "@/hooks/useUser";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const { user, loading } = useUser() as any;

  const displayName = user?.name ?? "Jogador Bloc.gg";
  const steamId = user?.steamId ?? "—";
  const avatar = user?.avatar || "/logo-bloc-nome.png";

  const isVIP =
    user?.vip_until &&
    new Date(user.vip_until).getTime() > new Date().getTime();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#060608] px-4 pb-10 pt-6 text-white md:px-8">
        <div className="mb-6 h-32 rounded-2xl bg-white/5 animate-pulse" />
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.8fr,1.2fr] mb-6">
          <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
        </div>
        <div className="h-40 rounded-2xl bg-white/5 animate-pulse" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#060608] px-4 pb-10 pt-6 text-white md:px-8 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-sm text-white/70">
            Você precisa estar logado com a Steam para ver o painel.
          </p>
          <Link
            href="/api/auth/steam/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,122,0,0.6)] hover:bg-[#ff9a26] transition"
          >
            Entrar com Steam
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060608] px-4 pb-10 pt-6 text-white md:px-8 space-y-6">
      {/* HERO PERFIL */}
      <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-[#101018] via-[#0b0b10] to-[#141420] shadow-[0_0_80px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute -left-10 top-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-7 lg:p-8">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative h-20 w-20 shrink-0 rounded-full border-2 border-orange-500/70 bg-gradient-to-br from-orange-400/10 to-transparent p-[3px] shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
                <Image
                  src={avatar}
                  alt={displayName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-[-4px] rounded-full border border-orange-400/30" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {displayName}
                </h1>

                {isVIP ? (
                  <span className="rounded-full border border-yellow-400/40 bg-yellow-500/10 px-3 py-0.5 text-xs font-medium text-yellow-300">
                    VIP ativo
                  </span>
                ) : (
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-300">
                    Plano gratuito
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-white/50">
                SteamID:{" "}
                <span className="font-mono text-white/80">{steamId}</span>
              </p>

              <p className="mt-2 text-xs text-white/40">
                Este painel será conectado às estatísticas reais dos servidores
                Bloc.gg em breve. Por enquanto, os números são apenas
                demonstrativos.
              </p>
            </div>
          </div>

          {!isVIP && (
            <div className="flex flex-col items-end gap-3">
              <div className="text-right text-xs text-white/40">
                <p>Nível da conta</p>
                <p className="text-sm font-semibold text-white/80">
                  Rookie &bull;{" "}
                  <span className="text-orange-400">Pronto para evoluir</span>
                </p>
              </div>

              <Link
                href="/loja"
                className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-black shadow-[0_0_25px_rgba(249,115,22,0.6)] transition hover:-translate-y-[1px] hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
              >
                Virar VIP
                <span className="text-xs text-black/70 group-hover:translate-x-0.5 transition">
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="K/D Ratio"
          value="1.32"
          helper="Indicador fictício baseado em treinos na Bloc.gg"
        />
        <MetricCard
          label="Headshot %"
          value="48%"
          helper="Estimativa fictícia baseada em sessões de treino"
        />
        <MetricCard
          label="Tempo jogado"
          value="42h"
          helper="Registrado (fictício) nos servidores da Bloc.gg"
        />
      </section>

      {/* RADAR + METAS */}
      <section className="grid gap-4 lg:grid-cols-[1.7fr,1.3fr]">
        <SkillRadarSection />
        <LevelGoalsSection />
      </section>

      <LastMatchesSection />
    </main>
  );
}

/* AUXILIARES */

type MetricProps = {
  label: string;
  value: string;
  helper: string;
};

function MetricCard({ label, value, helper }: MetricProps) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-[#0b0b12] px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.6)] transition hover:-translate-y-[2px] hover:border-orange-500/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
      <p className="text-xs font-medium text-white/55">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-white/40">{helper}</p>
    </div>
  );
}

function SkillRadarSection() {
  const data = {
    labels: [
      "Aim",
      "Game sense",
      "Movimentação",
      "Spray control",
      "Consistência",
      "Utilitárias",
    ],
    datasets: [
      {
        label: "Perfil fictício",
        data: [68, 62, 55, 60, 72, 48],
        backgroundColor: "rgba(249,115,22,0.25)",
        borderColor: "rgba(249,115,22,0.9)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(248,250,252,1)",
        pointBorderColor: "rgba(249,115,22,1)",
        pointRadius: 3,
        pointHoverRadius: 4,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(15,23,42,0.95)",
        borderColor: "rgba(148,163,184,0.6)",
        borderWidth: 1,
        titleColor: "#e5e7eb",
        bodyColor: "#e5e7eb",
        padding: 8,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: { color: "rgba(148,163,184,0.2)" },
        angleLines: { color: "rgba(148,163,184,0.25)" },
        pointLabels: {
          color: "rgba(209,213,219,0.9)",
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0b0b12] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.6)] flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white/90">
            Perfil de habilidade
          </h2>
          <p className="mt-1 text-xs text-white/45">
            Distribuição fictícia das suas principais características dentro do
            jogo. No futuro, será alimentado pelas estatísticas reais.
          </p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
          Radar • Beta
        </span>
      </div>

      <div className="relative h-64 w-full">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

function LevelGoalsSection() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0b0b12] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.6)] flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold tracking-wide text-white/90">
          Metas para o próximo nível
        </h2>
        <p className="mt-1 text-xs text-white/45">
          Conjunto fictício de objetivos que simulam a progressão da sua conta.
          Quando a integração estiver ativa, isso será baseado em desafios
          reais.
        </p>
      </div>

      <div className="rounded-xl border border-white/5 bg-black/40 px-4 py-3 flex items-center justify-between text-xs">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">
            Próximo nível
          </p>
          <p className="text-sm font-semibold text-white/90">
            Elite I &bull;{" "}
            <span className="text-orange-400">faltam 320 XP</span>
          </p>
        </div>
        <div className="w-32">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500" />
          </div>
          <p className="mt-1 text-[10px] text-right text-white/40">
            62% concluído
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <GoalRow
          label="Completar 5 treinos em servidores da Bloc.gg"
          current={3}
          total={5}
        />
        <GoalRow
          label="Jogar 3 partidas completas sem abandonar"
          current={2}
          total={3}
        />
        <GoalRow
          label="Alcançar 50% de HS em pelo menos um treino"
          current={1}
          total={1}
          done
        />
        <GoalRow
          label="Manter atividade estável no Discord (70%)"
          current={55}
          total={70}
          isPercentage
        />
      </div>

      <p className="mt-1 text-[10px] text-white/35">
        Estes objetivos ainda não afetam nada na sua conta. Eles existem apenas
        para demonstrar como será o sistema de progressão da Bloc.gg.
      </p>
    </div>
  );
}

type GoalRowProps = {
  label: string;
  current: number;
  total: number;
  done?: boolean;
  isPercentage?: boolean;
};

function GoalRow({ label, current, total, done, isPercentage }: GoalRowProps) {
  const progress = Math.min(100, (current / total) * 100);

  return (
    <div className="rounded-lg border border-white/5 bg-black/30 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-white/80">{label}</p>
        <span className="text-[11px] font-medium text-white/60">
          {isPercentage ? `${current}% / ${total}%` : `${current}/${total}`}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${
            done ? "bg-emerald-400" : "bg-orange-400"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function LastMatchesSection() {
  const matches = [
    {
      map: "Mirage",
      result: "Vitória",
      resultType: "win" as const,
      score: "16–11",
      kd: "23–17",
      hs: "52%",
      rating: "1.18",
      timeAgo: "há 2 horas",
    },
    {
      map: "Inferno",
      result: "Derrota",
      resultType: "loss" as const,
      score: "13–16",
      kd: "19–21",
      hs: "44%",
      rating: "0.96",
      timeAgo: "há 6 horas",
    },
    {
      map: "Nuke",
      result: "Vitória",
      resultType: "win" as const,
      score: "16–9",
      kd: "26–15",
      hs: "49%",
      rating: "1.32",
      timeAgo: "há 1 dia",
    },
  ];

  return (
    <section className="mt-2 rounded-2xl border border-white/5 bg-[#0b0b12] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white/90">
            Últimas partidas (fictícias)
          </h2>
          <p className="mt-1 text-xs text-white/45">
            Esta seção mostra um mock de como será o histórico de partidas
            quando os servidores da Bloc.gg estiverem integrados.
          </p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
          Match history • Preview
        </span>
      </div>

      <div className="space-y-2">
        {matches.map((m) => (
          <MatchRow key={m.map + m.timeAgo} {...m} />
        ))}
      </div>
    </section>
  );
}

type MatchRowProps = {
  map: string;
  result: string;
  resultType: "win" | "loss";
  score: string;
  kd: string;
  hs: string;
  rating: string;
  timeAgo: string;
};

function MatchRow({
  map,
  result,
  resultType,
  score,
  kd,
  hs,
  rating,
  timeAgo,
}: MatchRowProps) {
  const isWin = resultType === "win";

  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-black/30 px-4 py-2.5 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition hover:-translate-y-[1px] hover:border-orange-400/40 hover:bg-black/50">
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
            isWin
              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/50"
              : "bg-rose-500/15 text-rose-300 border border-rose-500/50"
          }`}
        >
          {result}
        </span>
        <div className="flex flex-col">
          <span className="font-medium text-white/90">{map}</span>
          <span className="text-[11px] text-white/40">{timeAgo}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-[11px] text-white/65">
        <span>
          <span className="text-white/40">Placar:</span> {score}
        </span>
        <span>
          <span className="text-white/40">K/D:</span> {kd}
        </span>
        <span>
          <span className="text-white/40">HS:</span> {hs}
        </span>
        <span className="font-medium">
          <span className="text-white/40">Rating:</span>{" "}
          <span className={isWin ? "text-emerald-300" : "text-amber-300"}>
            {rating}
          </span>
        </span>
      </div>
    </div>
  );
}
