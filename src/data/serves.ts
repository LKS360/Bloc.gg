import { Server } from "@/types/server";

export const servers: Server[] = [
  {
    id: "mm-mirage",
    name: "MM 5x5 • Mirage",
    mode: "Competitivo",
    map: "de_mirage",
    status: "online",
    players: 8,
    maxPlayers: 10,
    ip: "191.96.xxx.xxx:27015",
    vipOnly: true,
    stats: {
      matchesToday: 42,
      avgPlayers: 7,
    },
  },
  {
    id: "dm-hs",
    name: "Deathmatch HS",
    mode: "Treino",
    map: "de_dust2",
    status: "online",
    players: 14,
    maxPlayers: 20,
    ip: "191.96.xxx.xxx:27016",
    vipOnly: true,
    stats: {
      matchesToday: 128,
      avgPlayers: 12,
    },
  },
  {
    id: "retake",
    name: "Retake Premium",
    mode: "Treino tático",
    map: "de_mirage",
    status: "soon",
    players: 0,
    maxPlayers: 10,
    vipOnly: true,
  },
];
