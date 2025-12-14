"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ============================================================
// TYPES
// ============================================================
type User = {
  id: number;
  steam_id: string;
  name: string;
  avatar: string;
  role: "user" | "staff" | "admin" | "owner";
  banned: boolean;
  ban_reason: string | null;
  security_flags: string[];
  vip_until: string | null;
  created_at: string;
  last_login: string;
};

// ============================================================
// COMPONENT
// ============================================================
export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [tab, setTab] = useState("info");

  const ITEMS_PER_PAGE = 10;

  // ============================================================
  // LOAD USERS
  // ============================================================
  useEffect(() => {
    async function loadUsers() {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
      setFiltered(data);
    }
    loadUsers();
  }, []);

  // ============================================================
  // SEARCH + SORT
  // ============================================================
  useEffect(() => {
    let list = [...users];

    const term = search.toLowerCase();
    list = list.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.steam_id.includes(term)
    );

    switch (sort) {
      case "az":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "recent":
        list.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        break;

      case "old":
        list.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
        break;
    }

    setFiltered(list);
    setPage(1);
  }, [search, sort, users]);

  // ============================================================
  // PAGE ITEMS
  // ============================================================
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // ============================================================
  // API ACTIONS
  // ============================================================
  async function updateUser(fields: Partial<User>) {
    if (!modalUser) return;

    const res = await fetch("/api/admin/users/update", {
      method: "POST",
      body: JSON.stringify({ id: modalUser.id, ...fields }),
    });

    if (res.ok) {
      const updated = { ...modalUser, ...fields };
      setModalUser(updated);
      setUsers(
        users.map((u) => (u.id === updated.id ? updated : u))
      );
    }
  }

  async function deleteUser(id: number) {
    if (!confirm("Tem certeza que deseja remover este usuário?")) return;

    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setUsers(users.filter((u) => u.id !== id));
      setModalUser(null);
    }
  }

  // ============================================================
  // MODAL UI
  // ============================================================
  function renderModal() {
    if (!modalUser) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#0C0F16] w-[420px] rounded-2xl border border-white/10 p-6"
        >
          {/* HEADER */}
          <div className="text-center">
            <Image
              src={modalUser.avatar}
              width={80}
              height={80}
              alt="avatar"
              className="rounded-full mx-auto border border-white/10"
            />
            <h3 className="text-lg font-semibold mt-3">{modalUser.name}</h3>
            <p className="text-xs text-gray-400">SteamID: {modalUser.steam_id}</p>
          </div>

          {/* TABS */}
          <div className="flex justify-around mt-4 border-b border-white/10 pb-2">
            {["info", "permissions", "security", "vip", "ban"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-xs px-2 pb-1 ${
                  tab === t ? "text-blue-400 border-b border-blue-400" : "text-gray-400"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            {/* INFO TAB */}
            {tab === "info" && (
              <>
                <p>Criado em: {new Date(modalUser.created_at).toLocaleDateString()}</p>
                <p>Último login: {new Date(modalUser.last_login).toLocaleString()}</p>

                <button
                  onClick={() => deleteUser(modalUser.id)}
                  className="w-full bg-red-600/60 hover:bg-red-600 text-white p-2 mt-3 rounded"
                >
                  Remover usuário
                </button>
              </>
            )}

            {/* PERMISSIONS TAB */}
            {tab === "permissions" && (
              <>
                <label className="text-gray-400 text-xs">Cargo / Permissão</label>
                <select
                  value={modalUser.role}
                  onChange={(e) => updateUser({ role: e.target.value as any })}
                  className="w-full bg-black/30 border border-white/10 p-2 rounded"
                >
                  <option value="user">Usuário</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                </select>
              </>
            )}

            {/* SECURITY TAB */}
            {tab === "security" && (
              <>
                <label className="text-xs text-gray-400">Security Flags</label>
                <textarea
                  defaultValue={modalUser.security_flags?.join(", ")}
                  onBlur={(e) =>
                    updateUser({
                      security_flags: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full bg-black/30 border border-white/10 p-2 rounded text-xs"
                />
              </>
            )}

            {/* VIP TAB */}
            {tab === "vip" && (
              <>
                <label className="text-xs text-gray-400">VIP até</label>
                <input
                  type="date"
                  defaultValue={
                    modalUser.vip_until
                      ? modalUser.vip_until.split("T")[0]
                      : ""
                  }
                  onChange={(e) => updateUser({ vip_until: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 p-2 rounded"
                />
              </>
            )}

            {/* BAN TAB */}
            {tab === "ban" && (
              <>
                <label className="text-xs text-gray-400">Banido?</label>
                <select
                  value={modalUser.banned ? "yes" : "no"}
                  onChange={(e) =>
                    updateUser({ banned: e.target.value === "yes" })
                  }
                  className="w-full bg-black/30 border border-white/10 p-2 rounded"
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>

                <label className="text-xs text-gray-400 mt-2">
                  Motivo do banimento
                </label>
                <textarea
                  defaultValue={modalUser.ban_reason ?? ""}
                  onBlur={(e) => updateUser({ ban_reason: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 p-2 rounded text-xs"
                />
              </>
            )}
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setModalUser(null)}
            className="mt-5 w-full bg-gray-600/40 hover:bg-gray-600 p-2 rounded text-sm"
          >
            Fechar
          </button>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Usuários</h2>

      {/* CONTROLES */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <input
          placeholder="Buscar por nome ou SteamID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded-lg bg-[#0C0F16] border border-white/10 text-sm"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded-lg bg-[#0C0F16] border border-white/10 text-sm"
        >
          <option value="recent">Mais recentes</option>
          <option value="old">Mais antigos</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* LISTA DE USUÁRIOS */}
      <div className="space-y-3">
        {pageItems.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center justify-between bg-[#07090F] border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <Image
                src={user.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full border border-white/10"
              />

              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">
                  {user.role.toUpperCase()} • SteamID: {user.steam_id}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setModalUser(user);
                setTab("info");
              }}
              className="px-3 py-1 text-xs rounded bg-blue-600/60 hover:bg-blue-600"
            >
              Gerenciar
            </button>
          </motion.div>
        ))}
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-[#0C0F16] border border-white/10"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL */}
      {renderModal()}
    </div>
  );
}
