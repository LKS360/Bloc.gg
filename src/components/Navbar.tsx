"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";

const STEAM_LOGIN_URL = "/api/auth/steam/login";
const STEAM_LOGOUT_URL = "/api/auth/steam/logout";

export default function Navbar() {
  const { user, loading } = useUser();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    pathname === path ? "text-[#FF7A00]" : "text-gray-300";

  const handleLogout = () => {
    window.location.href = STEAM_LOGOUT_URL;
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/5 transition-all ${
        scrolled
          ? "bg-[#05060A]/90 backdrop-blur shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          : "bg-[#05060A]/70 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-[140px] flex items-center">
            <Image
              src="/logo-bloc-nome.png"
              alt="Bloc.gg"
              fill
              sizes="140px"
              className="object-contain"
            />
          </div>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={`${isActive("/")} hover:text-[#FF7A00] transition`}
          >
            Início
          </Link>

          <Link
            href="/servidores"
            className={`${isActive("/servidores")} hover:text-[#FF7A00] transition`}
          >
            Servidores
          </Link>

          <Link
            href="/loja"
            className={`${isActive("/loja")} hover:text-[#FF7A00] transition`}
          >
            Loja VIP
          </Link>

          <Link
            href="/discord"
            className={`${isActive("/discord")} hover:text-[#FF7A00] transition`}
          >
            Discord
          </Link>

          <Link
            href="/sobre"
            className={`${isActive("/sobre")} hover:text-[#FF7A00] transition`}
          >
            Sobre
          </Link>
        </div>

        {/* BOTÃO / PERFIL */}
        <div className="flex items-center gap-4">
          {/* Não logado */}
          {!loading && !user && (
            <Link
              href={STEAM_LOGIN_URL}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,122,0,0.6)] hover:bg-[#ff9a26] transition"
            >
              <Image
                src="/steam.svg"
                alt="Steam"
                width={18}
                height={18}
              />
              Entrar com Steam
            </Link>
          )}

          {/* Logado */}
          {!loading && user && (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full border border-white/20"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs">
                    {user.name?.[0]?.toUpperCase() ?? "B"}
                  </div>
                )}
                <span className="text-sm">
                  {user.name ? user.name.split(" ")[0] : "Player"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-red-400 transition"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="md:hidden border-t border-white/5 text-[12px] text-gray-300">
        <div className="max-w-6xl mx-auto flex items-center justify-around px-3 py-2">
          <Link
            href="/"
            className={`${isActive("/")} hover:text-[#FF7A00] transition`}
          >
            Início
          </Link>

          <Link
            href="/servidores"
            className={`${isActive("/servidores")} hover:text-[#FF7A00] transition`}
          >
            Servidores
          </Link>

          <Link
            href="/loja"
            className={`${isActive("/loja")} hover:text-[#FF7A00] transition`}
          >
            Loja VIP
          </Link>

          <Link
            href="/discord"
            className={`${isActive("/discord")} hover:text-[#FF7A00] transition`}
          >
            Discord
          </Link>

          <Link
            href="/sobre"
            className={`${isActive("/sobre")} hover:text-[#FF7A00] transition`}
          >
            Sobre
          </Link>
        </div>
      </div>
    </header>
  );
}
