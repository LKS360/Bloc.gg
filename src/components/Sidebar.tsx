"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, History, Settings } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Match History", href: "/match-history", icon: History },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        h-screen border-r border-white/10 fixed top-0 left-0 z-50
        flex flex-col py-6 transition-all duration-300 ease-in-out
        ${expanded ? "w-60 bg-[#0d0d0d]" : "w-16 bg-[#0b0b0b]"}
      `}
    >

      {/* LOGO */}
      <div
        className={`
          flex items-center justify-center mb-8 transition-all duration-300
          ${expanded ? "px-4" : ""}
        `}
      >
        {expanded ? (
          <Image
            src="/logo-bloc-3d.png"
            width={120}
            height={120}
            alt="Bloc.gg Logo"
            className="object-contain opacity-100 transition-all duration-300"
          />
        ) : (
          <Image
            src="/logo-bloc-3d.png"
            width={35}
            height={35}
            alt="Bloc.gg Logo"
            className="object-contain opacity-90 transition-all duration-300"
          />
        )}
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2 px-2">
        {menu.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center rounded-md px-3 py-3 transition-all cursor-pointer select-none
                ${expanded ? "gap-3" : "justify-center"}
                ${
                  active
                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/40"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }
              `}
              title={!expanded ? name : ""}
            >
              <Icon size={20} />
              {expanded && <span className="text-sm font-medium">{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER / AVATAR MINI */}
      <div className={`mt-auto px-4 ${expanded ? "" : "flex justify-center"}`}>
        <div
          className={`
            rounded-full border border-white/10 bg-black/30 text-white 
            flex items-center justify-center transition-all duration-300
            ${expanded ? "w-10 h-10" : "w-8 h-8"}
          `}
        >
          N
        </div>
      </div>

    </aside>
  );
}
