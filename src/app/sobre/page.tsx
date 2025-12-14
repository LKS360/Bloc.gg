"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6"
        >
          Sobre a <span className="text-[#FF7A00]">Bloc.gg</span>
        </motion.h1>

        {/* Subtexto */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 text-center max-w-2xl mx-auto mb-16"
        >
          A Bloc.gg nasceu para ser a melhor plataforma brasileira de performance
          competitiva em CS2 — combinando servidores otimizados, estatísticas avançadas,
          comunidade ativa e uma experiência profissional inspirada em HLTV e Scope.gg.
        </motion.p>

        {/* Missão */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Nossa Missão
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Servidores de alto nível",
              desc: "Performance fluida, configs otimizadas e modos competitivos.",
            },
            {
              title: "Estatísticas profissionais",
              desc: "Inspiradas em HLTV e Scope.gg com foco em evolução.",
            },
            {
              title: "Comunidade ativa",
              desc: "Ambiente saudável, squads, suporte e network competitivo.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              viewport={{ once: true }}
              className="bg-[#0F1116] border border-white/10 rounded-xl p-6 shadow-lg hover:border-[#FF7A00]/40 transition"
            >
              <h3 className="text-lg font-semibold text-[#FF7A00] mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Roadmap */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          Roadmap da Plataforma
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {[
            { name: "Login via Steam", status: "concluído" },
            { name: "Perfil do Jogador", status: "concluído" },
            { name: "Página de Servidores", status: "em desenvolvimento" },
            { name: "Sistema VIP completo", status: "planejado" },
            { name: "Ranking Global", status: "planejado" },
            { name: "Histórico de Partidas", status: "planejado" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              viewport={{ once: true }}
              className="p-4 bg-[#0F1116] rounded-xl border border-white/10 hover:border-[#FF7A00]/40 transition"
            >
              <p className="font-semibold text-[#FF7A00]">{item.name}</p>
              <p className="text-gray-400 text-sm">Status: {item.status}</p>
            </motion.div>
          ))}
        </div>

        {/* Equipe */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Equipe
        </motion.h2>

        <p className="text-gray-300 mb-6">
          A Bloc.gg é mantida por pessoas apaixonadas por CS2, tecnologia e comunidade.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Cartão principal com sua foto futura */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#0F1116] p-6 rounded-xl border border-white/10 hover:border-[#FF7A00]/40 transition"
          >
            {/* Foto (será substituída pela versão refinada) */}
            <div className="w-full flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full bg-black/30 overflow-hidden border border-white/10">
                {/* Quando você enviar a foto final, eu coloco aqui */}
                <Image
                  src="/placeholder-avatar.png"
                  width={200}
                  height={200}
                  alt="Lucas Pereira"
                  className="object-cover opacity-70"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold">Lucas Pereira</h3>
            <p className="text-[#FF7A00] text-sm mb-2">Fundador & Desenvolvedor</p>

            <p className="text-gray-300 text-sm">
              Idealizador da Bloc.gg — responsável pela visão, design, desenvolvimento e
              evolução da plataforma.
            </p>
          </motion.div>

          {/* Membros futuros */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[#0F1116] p-6 rounded-xl border border-white/10 text-gray-400"
          >
            <p className="text-center opacity-80">Em breve novos membros da equipe 🚀</p>
          </motion.div>
        </div>

        {/* Parceiros / Apoiadores */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          Parceiros & Apoiadores
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {["Em breve", "Em breve", "Em breve"].map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              viewport={{ once: true }}
              className="bg-[#0F1116] rounded-xl border border-white/10 py-10 text-center text-gray-500"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
