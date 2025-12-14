// src/app/admin/servers/page.tsx
export default function AdminServersPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Servidores</h1>
        <p className="text-sm text-gray-400">
          Painel para gerenciar servidores de MM e DM da Bloc.gg.
        </p>
      </header>

      <div className="bg-[#0A0C10] border border-white/10 rounded-2xl p-6">
        <p className="text-sm text-gray-400">
          Depois podemos integrar aqui status em tempo real, slots, mapa atual, etc.
        </p>
      </div>
    </div>
  );
}
