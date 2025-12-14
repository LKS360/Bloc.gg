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

export default function HomeClient() {
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
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-6"
          >
            Treine, evolua e acompanhe seu <br />
            desempenho na <span className="text-[#FF7A00]">Bloc.gg</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex justify-center gap-4">
            {!user ? (
              <Link
                href={STEAM_LOGIN_URL}
                className="rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-black hover:bg-[#ff9a26]"
              >
                Entrar com Steam
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-black"
              >
                Ir para Dashboard
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
