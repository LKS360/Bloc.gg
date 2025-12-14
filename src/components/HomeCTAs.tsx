"use client";

import Link from "next/link";
import useUser from "@/hooks/useUser";
import Image from "next/image";

const STEAM_LOGIN_URL = "/api/auth/steam/login";

export default function HomeCTAs() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center sm:flex-row gap-4 mb-10">

      {/* 🔥 Usuário NÃO logado → botão Steam aparece */}
      {!user && (
        <Link
          href={STEAM_LOGIN_URL}
          className="group flex items-center gap-2 justify-center rounded-full bg-[#FF7A00] px-10 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,122,0,0.7)] hover:bg-[#ffa53c] hover:shadow-[0_0_40px_rgba(255,150,50,0.9)] transition-all duration-200"
        >
          <Image
            src="/steam-icon.png"
            alt="Steam"
            width={20}
            height={20}
            className="opacity-90 group-hover:opacity-100 transition"
          />
          Entrar com Steam
        </Link>
      )}

      {/* 🔥 Usuário logado → botão Dashboard aparece */}
      {user && (
        <Link
          href="/dashboard"
          className="group flex items-center gap-2 justify-center rounded-full bg-white/10 px-10 py-3 text-sm font-semibold text-gray-200 border border-white/20 hover:border-[#FF7A00] hover:text-[#FF7A00] hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all duration-200"
        >
          Ir para Dashboard →
        </Link>
      )}

      {/* 🔥 Sempre aparece — botão de Planos VIP */}
      <Link
        href="/loja"
        className="group flex items-center gap-2 justify-center rounded-full bg-white/10 px-10 py-3 text-sm font-semibold text-gray-200 border border-white/20 hover:border-[#FF7A00] hover:text-[#FF7A00] hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all duration-200"
      >
        Ver planos VIP
      </Link>
    </div>
  );
}
