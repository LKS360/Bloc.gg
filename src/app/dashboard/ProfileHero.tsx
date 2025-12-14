"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfileHero({ user }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-[#0F0F0F] border border-[#1c1c1c] rounded-xl p-6 flex items-center gap-6 shadow-xl"
    >
      {/* Avatar */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500 shadow-lg">
        <Image
          src={user?.avatar || "/default-avatar.png"}
          alt="avatar"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>

      {/* Infos */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-white">{user?.name || "Jogador"}</h2>
        <p className="text-gray-400 text-sm">SteamID: {user?.steamId}</p>
      </div>

      <a
        href="/loja"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r 
        from-orange-500 to-[#FF7A00] px-6 py-2 text-sm font-semibold text-black
        shadow-[0_0_15px_rgba(255,122,0,0.7)] hover:brightness-110 transition-all"
>
  Virar VIP
</a>
    </motion.div>
  );
}
