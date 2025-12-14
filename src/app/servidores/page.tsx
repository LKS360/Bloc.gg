"use client";

import useUser from "@/hooks/useUser";

export default function ServidoresPage() {
  const { user, loading } = useUser();

  const isVip =
    user?.vip_until &&
    new Date(user.vip_until).getTime() > Date.now();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        Carregando servidores...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">

        {/* ================= HERO ================= */}
        <section className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Nossos <span className="text-[#FF7A00]">Servidores</span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Servidores competitivos 128 tick, modos premium e estatísticas
            avançadas integradas ao seu perfil na Bloc.gg.
          </p>

          {isVip && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF7A00]/10 px-4 py-1.5 text-xs font-semibold text-[#FF7A00]">
              ⚡ Acesso VIP ativo
            </div>
          )}
        </section>

        {/* ================= SUGESTÃO ================= */}
        {isVip && (
          <section className="mb-14 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#0F1116] p-6 text-center shadow-[0_0_25px_rgba(0,0,0,0.6)]">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
              Sugestão da Bloc.gg
            </p>
            <p className="text-sm text-gray-200">
              🎯 Aqueça no <span className="text-[#FF7A00] font-semibold">Deathmatch HS</span> antes
              de entrar no MM 5x5 para melhorar reflexo e precisão.
            </p>
          </section>
        )}

        {/* ================= NÃO VIP ================= */}
        {!isVip && (
          <section className="max-w-xl mx-auto border border-[#FF7A00]/60 rounded-2xl p-8 text-center bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
            <h2 className="text-xl font-bold mb-3">
              Conteúdo Exclusivo VIP 🔒
            </h2>

            <p className="text-sm text-gray-300 mb-6">
              Os servidores da Bloc.gg são acessíveis apenas para membros VIP.
              Desbloqueie acesso completo aos modos premium.
            </p>

            <ul className="text-sm text-gray-400 space-y-1 mb-6 text-left inline-block">
              <li>• MM 5x5 competitivo (128 tick)</li>
              <li>• Deathmatch focado em Headshot</li>
              <li>• Retake Premium</li>
              <li>• Estatísticas estilo HLTV</li>
              <li>• Prioridade de conexão</li>
            </ul>

            <a
              href="/loja"
              className="inline-flex items-center justify-center rounded-full bg-[#FF7A00] px-6 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,122,0,0.7)] hover:bg-[#ff9a26] transition"
            >
              Tornar-se VIP
            </a>
          </section>
        )}

        {/* ================= VIP ================= */}
        {isVip && (
          <section className="space-y-10">
            <h2 className="text-xl font-semibold">
              Servidores disponíveis
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <ServerCard
                title="MM 5x5 • Mirage"
                mode="Competitivo"
                status="Online"
                players="8 / 10"
                ip="mm.bloc.gg:27015"
              />

              <ServerCard
                title="Deathmatch HS"
                mode="Treino"
                status="Online"
                players="14 / 20"
                ip="dm.bloc.gg:27016"
              />

              <ServerCard
                title="Retake Premium"
                mode="Treino tático"
                status="Em breve"
                players="—"
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* ================= COMPONENTE ================= */

function ServerCard({
  title,
  mode,
  status,
  players,
  ip,
}: {
  title: string;
  mode: string;
  status: string;
  players: string;
  ip?: string;
}) {
  const online = status === "Online";

  const handleEnter = () => {
    if (!ip) return;
    window.location.href = `steam://connect/${ip}`;
  };

  const handleCopy = () => {
    if (!ip) return;
    navigator.clipboard.writeText(`connect ${ip}`);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F1116] p-6 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            online
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-400 space-y-1 mb-5">
        <p>
          <span className="text-gray-500">Modo:</span> {mode}
        </p>
        <p>
          <span className="text-gray-500">Jogadores:</span> {players}
        </p>
        <p className="text-xs text-[#FF7A00] mt-1">
          🎖 Slot reservado VIP
        </p>
      </div>

      {ip ? (
        <div className="space-y-2">
          <button
            onClick={handleEnter}
            className="w-full rounded-lg bg-[#FF7A00] py-2 text-sm font-semibold text-black hover:bg-[#ff9a26] transition"
          >
            Entrar no servidor
          </button>

          <button
            onClick={handleCopy}
            className="w-full rounded-lg bg-white/10 py-2 text-xs text-gray-300 hover:bg-white/20 transition"
          >
            Copiar IP
          </button>
        </div>
      ) : (
        <div className="w-full text-center rounded-lg bg-white/10 py-2 text-sm text-gray-400">
          Disponível em breve
        </div>
      )}
    </div>
  );
}
