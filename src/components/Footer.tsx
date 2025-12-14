export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Bloc.gg — Todos os direitos reservados
        </p>

        <div className="flex gap-6 text-sm">
          <a href="/sobre" className="text-zinc-400 hover:text-white">
            Sobre
          </a>
          <a href="/discord" className="text-zinc-400 hover:text-white">
            Discord
          </a>
          <a href="/loja" className="text-zinc-400 hover:text-white">
            Loja VIP
          </a>
        </div>
      </div>
    </footer>
  );
}
