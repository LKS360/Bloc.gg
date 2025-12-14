"use client";

import { useEffect, useState } from "react";

export type User = {
  steamId: string;
  name: string;
  avatar: string | null;
  role?: string;
  vip_until?: string | null;
};

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadUser() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();

      setUser({
        steamId: data.steamId,
        name: data.name,
        avatar: data.avatar,
        role: data.role,
        vip_until: data.vip_until,
      });
    } catch (err) {
      console.error("Erro em useUser:", err);
      setError("Erro ao carregar usuário");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return { user, loading, error, reloadUser: loadUser };
}
