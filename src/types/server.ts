export type ServerStatus = "online" | "offline" | "maintenance" | "soon";

export interface Server {
  id: string;
  name: string;
  mode: string;
  map: string;
  status: ServerStatus;
  players: number;
  maxPlayers: number;
  ip?: string;
  vipOnly: boolean;

  stats?: {
    matchesToday: number;
    avgPlayers: number;
  };
}
