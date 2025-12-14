"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCards";
import { stagger } from "@/lib/animations";

export default function Features() {
  return (
    <section className="bg-[#05060A] border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-6xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-3"
      >
        <FeatureCard
          title="Servidores"
          subtitle="MM e Deathmatch"
          items={[
            "128 tickrate",
            "Configuração competitiva",
            "Acesso VIP",
            "Retake em breve",
          ]}
        />

        <FeatureCard
          title="Estatísticas"
          subtitle="Estilo HLTV / Scope.gg"
          items={[
            "K/D, HS%, ADR",
            "Histórico por mapa",
            "Evolução de performance",
            "Perfil detalhado",
          ]}
        />

        <FeatureCard
          title="Comunidade"
          subtitle="Discord oficial"
          items={[
            "Canais de treino",
            "Eventos internos",
            "Staff ativa",
            "Squads e mix",
          ]}
          link="/discord"
        />
      </motion.div>
    </section>
  );
}
