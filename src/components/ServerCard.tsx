"use client";

import { Server } from "@/types/server";
import useUser from "@/hooks/useUser";

export default function ServerCard({ server }: { server: Server }) {
  const { user } = useUser();

  const isVip =
    user?.vip_until && new Date(user.vip_until) > new Date();

  const canAccess = !server.vipOnly || isVip;
  const canConnect = server.ip && server.status === "online" && canAccess;

  return (
    <div className="bg-[#0A0C10] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-[0_0_18px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">{server.name}</h3>

        {server.status === "online" && (
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
            Online
          </span>
        )}

        {server.status === "soon" && (
          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">
            Em breve
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 mb-2">
        Modo: {server.mode}
      </p>

      <p className="text-xs text-gray-400 mb-2">
        Jogadores: {server.players} / {server.maxPlayers}
      </p>

      {server.stats && (
        <p className="text-xs text-gray-400 mb-4">
          Partidas hoje: {server.stats.matchesToday}
        </p>
      )}

      {!canAccess && (
        <div className="text-xs text-[#FF7A00] mb-3">
          🔒 Exclusivo VIP
        </div>
      )}

      <button
        disabled={!canConnect}
        onClick={() =>
          canConnect &&
          window.open(`steam://connect/${server.ip}`, "_self")
        }
        className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition
          ${
            canConnect
              ? "bg-[#FF7A00] text-black hover:bg-[#ff9a26]"
              : "bg-white/10 text-gray-400 cursor-not-allowed"
          }`}
      >
        {server.status === "soon"
          ? "Disponível em breve"
          : canAccess
          ? "Conectar"
          : "Tornar-se VIP"}
      </button>
    </div>
  );
}
