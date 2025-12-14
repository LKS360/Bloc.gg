"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { motion } from "framer-motion";

const STEAM_LOGIN_URL = "/api/auth/steam/login";
const DISCORD_INVITE = "https://discord.gg/zcCNP3wxtn";

/* ================= ANIMAÇÕES ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (searchParams.get("logged") === "1" && user) {
      setShowWelcome(true);
      router.replace("/");
    }
  }, [searchParams, user, router]);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white flex flex-col">
      {/* ================= POPUP BOAS-VINDAS ================= */}
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0F1116] border border-white/10 rounded-2xl p-8 max-w-md text-center shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
            <h2 className="text-2xl font-bold text-[#FF7A00] mb-3">
              Bem-vindo à Bloc.gg 🎉
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              Login com Steam realizado com sucesso. Explore servidores,
              estatísticas e recursos exclusivos.
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="rounded-full bg-[#FF7A00] px-6 py-2 font-semibold text-black hover:bg-[#ff9a26] transition"
            >
              Continuar
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url('/fundo-cs2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#0A0C10]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative max-w-6xl mx-auto px-4 py-24 md:py-28 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.35em] uppercase text-[#FF7A00]/80 mb-4"
          >
            servidores competitivos de cs2
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-6"
          >
            Treine, evolua e acompanhe seu <br />
            desempenho na <span className="text-[#FF7A00]">Bloc.gg</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Jogue em servidores MM e Deathmatch com monitoramento completo de
            performance, estatísticas avançadas e benefícios exclusivos para
            membros VIP.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            {!user && (
              <Link
                href={STEAM_LOGIN_URL}
                className="rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-black shadow-[0_0_30px_rgba(255,122,0,0.8)] hover:bg-[#ff9a26] transition"
              >
                Entrar com Steam
              </Link>
            )}

            {user && (
              <Link
                href="/dashboard"
                className="rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-black shadow-[0_0_30px_rgba(255,122,0,0.8)] hover:bg-[#ff9a26] transition"
              >
                Ir para Dashboard
              </Link>
            )}

            <Link
              href="/loja"
              className="rounded-full border border-white/20 px-8 py-3 font-semibold hover:border-[#FF7A00] hover:text-[#FF7A00] transition"
            >
              Ver planos VIP
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 text-xs text-gray-300">
            <Tag text="MM 5x5 competitivo" />
            <Tag text="Deathmatch focado em HS" />
            <Tag text="Estatísticas estilo HLTV / Scope.gg" />
            <Tag text="Comunidade ativa no Discord" />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="bg-[#05060A] border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-6xl mx-auto px-4 py-14 grid gap-8 md:grid-cols-3"
        >
          <Card
            title="Servidores"
            sub="MM e Deathmatch dedicados"
            items={[
              "Modos competitivos 5x5 e DM",
              "Configurações otimizadas para treino",
              "Slots reservados para VIP",
              "Novos modos em breve",
            ]}
          />

          <Card
            title="Estatísticas"
            sub="Inspirado em HLTV / Scope.gg"
            items={[
              "K/D, HS%, ADR e mais",
              "Histórico por servidor",
              "Mapa mais jogado",
              "Base para rankings",
            ]}
          />

          <Card
            title="Comunidade"
            sub="Discord oficial Bloc.gg"
            items={[
              "Canais de treino e call",
              "Eventos e campeonatos",
              "Suporte direto",
              "Forme squads facilmente",
            ]}
            link={DISCORD_INVITE}
          />
        </motion.div>
      </section>
    </div>
  );
}

/* ================= COMPONENTES ================= */

function Tag({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10">
      {text}
    </span>
  );
}

function Card({
  title,
  sub,
  items,
  link,
}: {
  title: string;
  sub: string;
  items: string[];
  link?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-[#0A0C10] border border-white/10 rounded-2xl px-6 py-7 shadow-[0_0_18px_rgba(0,0,0,0.7)]"
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xs text-[#FF7A00]/90 mb-4">{sub}</p>

      <ul className="text-sm text-gray-300 space-y-1.5">
        {items.map((i, idx) => (
          <li key={idx}>• {i}</li>
        ))}
      </ul>

      {link && (
        <Link
          href={link}
          target="_blank"
          className="inline-block mt-3 text-xs font-semibold text-[#1A73FF] underline"
        >
          Entrar no Discord
        </Link>
      )}
    </motion.div>
  );
}
