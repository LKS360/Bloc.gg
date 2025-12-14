"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";
import { fadeUp, stagger } from "@/lib/animations";

const STEAM_LOGIN_URL = "/api/auth/steam/login";

export default function Hero() {
  const { user } = useUser();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('/fundo-cs2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0A0C10]" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative max-w-6xl mx-auto px-4 py-28 text-center"
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
          Estatísticas avançadas, servidores premium e perfil completo
          integrados à sua Steam.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {!user && (
            <Link
              href={STEAM_LOGIN_URL}
              className="rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-black shadow-[0_0_30px_rgba(255,122,0,0.7)] hover:bg-[#ff9a26] transition"
            >
              Entrar com Steam
            </Link>
          )}

          {user && (
            <>
              <Link
                href="/dashboard"
                className="rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-black shadow-[0_0_30px_rgba(255,122,0,0.7)] hover:bg-[#ff9a26] transition"
              >
                Ver Perfil
              </Link>

              <Link
                href="/dashboard#stats"
                className="rounded-full border border-white/20 px-8 py-3 font-semibold hover:border-[#FF7A00] hover:text-[#FF7A00] transition"
              >
                Ver Estatísticas
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
