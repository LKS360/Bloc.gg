"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Log = {
  id: number;
  admin_id: number | null;
  action: string;
  details: string;
  ip: string | null;
  created_at: string;
};

export default function LogsAdminPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filtered, setFiltered] = useState<Log[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadLogs() {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      setLogs(data);
      setFiltered(data);
    }
    loadLogs();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      logs.filter(
        (l) =>
          l.action.toLowerCase().includes(term) ||
          (l.details || "").toLowerCase().includes(term)
      )
    );
  }, [search, logs]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Logs administrativos</h2>
      <p className="text-sm text-gray-400">
        Histórico de ações de administradores.
      </p>

      {/* SEARCH */}
      <input
        placeholder="Buscar por ação, detalhes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 p-2 rounded-lg bg-[#0C0F16] border border-white/10 text-sm"
      />

      <div className="space-y-3 mt-4">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum log encontrado.</p>
        )}

        {filtered.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="p-4 rounded-xl bg-[#07090F] border border-white/10"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{log.action}</p>
                <p className="text-xs text-gray-400">{log.details}</p>
              </div>

              <p className="text-[11px] text-gray-500">
                {new Date(log.created_at).toLocaleString()}
              </p>
            </div>

            {log.ip && (
              <p className="text-[10px] mt-1 text-gray-600">IP: {log.ip}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
