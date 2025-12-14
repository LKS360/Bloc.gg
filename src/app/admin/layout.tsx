// src/app/admin/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Painel Admin | Bloc.gg",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#05060A] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0A0C10] border-r border-white/10 px-5 py-8 flex flex-col">
        <div className="mb-8">
            <p className="text-xl font-bold text-[#FF7A00] mt-1">
            Painel Admin
          </p>
        </div>

        <nav className="space-y-2 text-sm flex-1">
          <AdminLink href="/admin">Dashboard</AdminLink>
          <AdminLink href="/admin/users">Usuários</AdminLink>
          <AdminLink href="/admin/servers">Servidores</AdminLink>
          <AdminLink href="/admin/vip">Planos VIP</AdminLink>
          <AdminLink href="/admin/logs">Logs</AdminLink>
        </nav>

        <div className="mt-8 text-[11px] text-gray-500">
          <p>Versão 0.1 • Internal build</p>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 px-6 md:px-10 py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function AdminLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition"
    >
      {children}
    </Link>
  );
}
